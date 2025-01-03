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
