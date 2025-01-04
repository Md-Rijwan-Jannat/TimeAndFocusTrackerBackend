import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";

// Create a reward
const createReward = async (
  userId: number,
  rewardType: "Streak" | "Badge",
  details?: string
) => {
  // Check if the user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Create the reward for the user
  const reward = await prisma.rewards.create({
    data: {
      userId,
      rewardType,
      details,
    },
  });

  return reward;
};

// Get rewards for a user
const getUserRewards = async (userId: number) => {
  // Fetch rewards for the specified user
  const rewards = await prisma.rewards.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc", // Order by created date, most recent first
    },
  });

  return rewards;
};

// Get reward by ID
const getRewardById = async (rewardId: number) => {
  const reward = await prisma.rewards.findUnique({
    where: {
      id: rewardId,
    },
  });

  if (!reward) {
    throw new AppError(httpStatus.NOT_FOUND, "Reward not found");
  }

  return reward;
};

// Update reward by ID
const updateReward = async (
  rewardId: number,
  rewardType?: "Streak" | "Badge",
  details?: string
) => {
  // Find the existing reward
  const reward = await prisma.rewards.findUnique({
    where: {
      id: rewardId,
    },
  });

  if (!reward) {
    throw new AppError(httpStatus.NOT_FOUND, "Reward not found");
  }

  // Update the reward
  const updatedReward = await prisma.rewards.update({
    where: {
      id: rewardId,
    },
    data: {
      rewardType: rewardType ?? reward.rewardType,
      details: details ?? reward.details,
    },
  });

  return updatedReward;
};

// Delete reward by ID
const deleteReward = async (rewardId: number) => {
  // Check if the reward exists
  const reward = await prisma.rewards.findUnique({
    where: {
      id: rewardId,
    },
  });

  if (!reward) {
    throw new AppError(httpStatus.NOT_FOUND, "Reward not found");
  }

  // Delete the reward
  await prisma.rewards.delete({
    where: {
      id: rewardId,
    },
  });

  return { message: "Reward deleted successfully" };
};

export const RewardService = {
  createReward,
  getUserRewards,
  getRewardById,
  updateReward,
  deleteReward,
};
