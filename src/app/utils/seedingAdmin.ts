/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const seed = async () => {
  try {
    console.log("Starting seeding process...");

    // Check if an admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: "admin@example.com",
      },
    });

    if (!existingAdmin) {
      // Create the admin user
      await prisma.user.create({
        data: {
          name: "Admin Name",
          role: "Admin",
          email: "admin@example.com",
          password: await bcrypt.hash("password123", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("Admin created successfully.");
    } else {
      console.log("Admin already exists, skipping creation.");
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error occurred during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the seed function if this file is run directly
if (require.main === module) {
  seed();
}
