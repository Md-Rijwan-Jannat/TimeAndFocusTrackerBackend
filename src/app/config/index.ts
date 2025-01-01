import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Initialize Prisma Client
export const prisma = new PrismaClient();

const config = {
  avatarUrl: process.env.AVATAR_URL,
};

export default config;
