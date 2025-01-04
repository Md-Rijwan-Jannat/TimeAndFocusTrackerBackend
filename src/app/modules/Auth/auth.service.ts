import bcrypt from "bcryptjs";
import prisma from "../../config/prismaClient";
import { generateToken } from "../../utils/jwt";

const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "Student",
    },
  });

  return user;
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid email or password");

  const token = generateToken(user.id, user.role, user.email);
  return { token, user };
};

const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  return user;
};

export const AuthService = {
  registerUser,
  loginUser,
  getUserById,
};
