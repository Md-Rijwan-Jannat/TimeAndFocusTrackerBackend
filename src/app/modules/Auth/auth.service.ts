import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import prisma from "../../config/prismaClient";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
      role: "USER",
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.user_id, user.role, user.email);
  return { token, user };
};

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const authService = {
  registerUser,
  loginUser,
  getUserById,
};
