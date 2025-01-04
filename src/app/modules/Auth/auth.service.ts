import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import prisma from "../../config/prismaClient";

const registerUser = async (name: string, email: string, password: string) => {
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
      last_login: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      avatar_url:
        "https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg",
    },
  });

  return user;
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.user_id, user.role, user.email);
  return { token, user };
};

const getUserById = async (userId: number) => {
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
