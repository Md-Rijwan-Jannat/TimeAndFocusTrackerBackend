-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Student', 'Admin');

-- CreateEnum
CREATE TYPE "FocusSessionStatus" AS ENUM ('Active', 'Paused', 'Complete');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('FocusNovice', 'ConsistencyKing', 'ProductivityMaster', 'TimeManagementExpert', 'FocusChampion', 'HabitBuilder', 'GoalGetter', 'EfficiencyGuru');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT DEFAULT 'https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg',
    "role" "UserRole" NOT NULL DEFAULT 'Student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "focusDuration" INTEGER NOT NULL,
    "breakDuration" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "pausedAt" TIMESTAMP(3),
    "resumedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "status" "FocusSessionStatus" NOT NULL DEFAULT 'Active',
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FocusSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rewards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rewardType" "RewardType" NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FocusSession" ADD CONSTRAINT "FocusSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
