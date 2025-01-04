import QueryBuilder from "../../builder/queryBuilder";
import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";

// Get user by ID
export const getAllUser = async (query: Record<string, unknown>) => {
  const qb = new QueryBuilder(prisma.user, query);

  // Build the query using QueryBuilder methods and execute
  const result = await qb
    .search(["name", "email"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .execute();

  if (!result || result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No users found");
  }

  const meta = await qb.countTotal();

  return { result, meta };
};

// Get user by ID
export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

// Update user details
export const updateUser = async (id: number, updatedData: Partial<any>) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updatedData,
  });

  return updatedUser;
};

// Delete user by ID
export const deleteUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  await prisma.user.delete({
    where: { id: id },
  });

  return { message: "User deleted successfully" };
};

export const userService = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
