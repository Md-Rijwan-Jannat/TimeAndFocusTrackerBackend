/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const seed = async () => {
  try {
    // At first, check if the admin exists or not
    const admin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
        email: "admin@example.com",
      },
    });

    if (!admin) {
      await prisma.user.create({
        data: {
          name: "Admin Name",
          role: "ADMIN",
          email: "admin@example.com",
          password_hash: await bcrypt.hash("password123", 10),
          last_login: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
          avatar_url:
            "https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg",
        },
      });
      console.log("Admin created successfully...");
    }
    console.log("Seeding completed...");
  } catch (error) {
    console.log("Error in seeding", error);
  } finally {
    await prisma.$disconnect();
  }
};
