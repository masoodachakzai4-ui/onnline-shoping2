import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, Users, Building2, ArrowRight, Heart } from "lucide-react";

const team = [
  { name: "Marcus Thornton", role: "CEO & Founder", emoji: "👷" },
  { name: "Elena Vasquez", role: "Chief Architect", emoji: "📐" },
  { name: "James Park", role: "Head of Construction", emoji: "🏗️" },
  { name: "Sophie Williams", role: "Project Director", emoji: "📋" },
];

const values = [
  { icon: "🏆", title: "Excellence", desc: "We set the standard for quality in every project we undertake." },
  { icon: "🤝", title: "Integrity", desc: "Transparent pricing, honest timelines, no hidden surprises." },
  { icon: "🌱", title: "Sustainability", desc: "Building responsibly for future generations." },
  { icon: "⚡", title: "Innovation", desc: "Embracing modern techniques and technologies." },
];

export default function AboutPage() {
  return (
    <div className="pt-20 pb-24 overflow-hidden">
      {/* Hero */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-6 leading-tight">
                25 Years of<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Building Dreams
                </span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Founded in 1999, ARCVAULT began as a small residential construction firm with a big vision: to build spaces that genuinely improve people's lives. Today, we're one of the most respected names in premium construction.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                With over 500 completed projects, 1,200+ satisfied clients, and a team of 80+ dedicated professionals, we continue to push the boundaries of what's possible in construction and design.
              </p>
              <div className="flex gap-4">
                <Link href="/book" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
                  Work With Us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all">
                  View Projects
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-96">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="ARCVAULT team at work"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 card-glass rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-400" />
                  <div>
                    <p className="text-white font-bold text-sm">Award-Winning</p>
                    <p className="text-slate-400 text-xs">Best Builder 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="font-display font-bold text-4xl text-white">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="card-glass rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all">
                <span className="text-4xl mb-4 block">{icon}</span>
                <h3 className="font-display font-semibold text-xl text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">The People Behind ARCVAULT</p>
          <h2 className="font-display font-bold text-4xl text-white">Leadership Team</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ name, role, emoji }) => (
            <div key={name} className="card-glass rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all group">
              <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl group-hover:bg-amber-500/20 transition-colors">
                {emoji}
              </div>
              <h3 className="font-semibold text-white mb-1">{name}</h3>
              <p className="text-amber-400 text-sm">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="card-glass rounded-3xl p-12">
          <Heart className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h2 className="font-display font-bold text-3xl text-white mb-3">Join Our Family of Clients</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            Over 1,200 clients trust ARCVAULT. Let us bring your vision to life.
          </p>
          <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

