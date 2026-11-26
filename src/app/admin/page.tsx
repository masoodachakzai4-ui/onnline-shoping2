"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Building2, CalendarDays, TrendingUp,
  Loader2, Eye, CheckCircle, XCircle, Settings
} from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Link from "next/link";

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalUsers: number;
  totalServices: number;
  totalRevenue: number;
  recentBookings: Array<{
    id: string;
    date: string;
    timeSlot: string;
    status: string;
    totalPrice?: number;
    service: { title: string };
    user: { name: string; email: string };
  }>;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
    if (status === "authenticated") {
      const role = (session?.user as { role?: string })?.role;
      if (role !== "ADMIN") router.push("/dashboard");
      else fetchStats();
    }
  }, [status, session]);

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }

  async function updateBookingStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success("Booking updated");
      fetchStats();
    } catch {
      toast.error("Failed to update booking");
    }
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>;
  }

  if (!stats) return null;

  const statCards = [
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarDays, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Pending Review", value: stats.pendingBookings, icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Total Clients", value: stats.totalUsers, icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Total Revenue", value: `$${(stats.totalRevenue || 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-1">Admin Panel</p>
            <h1 className="font-display font-bold text-4xl text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/services" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl border border-slate-700 transition-all">
              Manage Services
            </Link>
            <Link href="/admin/bookings" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all">
              All Bookings
            </Link>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card-glass rounded-2xl p-6">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`font-display font-bold text-3xl ${color} mb-1`}>{value}</p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Booking Status Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Pending", count: stats.pendingBookings, color: "text-yellow-400" },
            { label: "Confirmed", count: stats.confirmedBookings, color: "text-blue-400" },
            { label: "Completed", count: stats.completedBookings, color: "text-emerald-400" },
            { label: "Cancelled", count: stats.cancelledBookings, color: "text-red-400" },
          ].map(({ label, count, color }) => (
            <div key={label} className="card-glass rounded-xl p-4 flex items-center gap-3">
              <div className={`text-2xl font-bold ${color}`}>{count}</div>
              <div className="text-slate-400 text-sm">{label} Bookings</div>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display font-semibold text-2xl text-white mb-5">Recent Bookings</h2>
          <div className="card-glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/60">
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Client</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Service</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Date & Time</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Amount</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {stats.recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white text-sm font-medium">{booking.user.name}</p>
                          <p className="text-slate-500 text-xs">{booking.user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{booking.service.title}</td>
                      <td className="px-6 py-4">
                        <p className="text-slate-300 text-sm">{format(new Date(booking.date), "MMM d, yyyy")}</p>
                        <p className="text-slate-500 text-xs">{booking.timeSlot}</p>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                      <td className="px-6 py-4 text-amber-400 text-sm font-medium">
                        {booking.totalPrice ? `$${booking.totalPrice.toLocaleString()}` : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.status === "PENDING" && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, "CONFIRMED")}
                              className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                              title="Confirm"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {["PENDING", "CONFIRMED"].includes(booking.status) && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, "CANCELLED")}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {booking.status === "CONFIRMED" && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, "COMPLETED")}
                              className="px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs rounded-lg transition-colors font-medium"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {stats.recentBookings.length === 0 && (
              <div className="text-center py-12">
                <CalendarDays className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No bookings yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

