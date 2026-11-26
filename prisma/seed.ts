import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SERVICES_DATA, TESTIMONIALS_DATA, PROJECTS_DATA } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@arcvault.com" },
    update: {},
    create: {
      name: "ARCVAULT Admin",
      email: "admin@arcvault.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "+15551234567",
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash("user123456", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@arcvault.com" },
    update: {},
    create: {
      name: "Demo Client",
      email: "demo@arcvault.com",
      password: userPassword,
      role: "USER",
      phone: "+15559876543",
    },
  });
  console.log("✅ Demo user:", user.email);

  // Seed services
  for (const service of SERVICES_DATA) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ Seeded ${SERVICES_DATA.length} services`);

  // Seed projects
  for (const project of PROJECTS_DATA) {
    await prisma.project.create({ data: project }).catch(() => {});
  }
  console.log(`✅ Seeded ${PROJECTS_DATA.length} projects`);

  // Seed testimonials
  for (const t of TESTIMONIALS_DATA) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }
  console.log(`✅ Seeded ${TESTIMONIALS_DATA.length} testimonials`);

  // Seed a sample booking
  const residentialService = await prisma.service.findUnique({
    where: { slug: "residential-construction" },
  });

  if (residentialService) {
    await prisma.booking.create({
      data: {
        userId: user.id,
        serviceId: residentialService.id,
        date: new Date("2026-12-15"),
        timeSlot: "10:00 AM",
        status: "CONFIRMED",
        address: "456 Oak Avenue, Brooklyn, NY 11201",
        phone: "+15559876543",
        notes: "Looking to build a 4-bedroom custom home on a 0.5 acre lot.",
        totalPrice: residentialService.price,
      },
    }).catch(() => {});
  }
  console.log("✅ Sample booking created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\nDefault accounts:");
  console.log("  Admin: admin@arcvault.com / admin123456");
  console.log("  User:  demo@arcvault.com  / user123456");
}

main()
  .catch(e => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());

