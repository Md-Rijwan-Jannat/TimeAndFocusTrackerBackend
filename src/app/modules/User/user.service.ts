import prisma from "../../config/prismaClient";

// Get user by ID
export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Update user details
export const updateUser = async (userId: number, updatedData: Partial<any>) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { user_id: userId },
    data: updatedData,
  });

  return updatedUser;
};

// Delete user by ID
export const deleteUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: { user_id: userId },
  });

  return { message: "User deleted successfully" };
};

export const userService = {
  getUserById,
  updateUser,
  deleteUser,
};
