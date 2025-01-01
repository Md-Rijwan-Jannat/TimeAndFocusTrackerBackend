/*
  Warnings:

  - You are about to drop the `badges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `focus_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `streaks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "badges" DROP CONSTRAINT "badges_user_id_fkey";

-- DropForeignKey
ALTER TABLE "focus_sessions" DROP CONSTRAINT "focus_sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "streaks" DROP CONSTRAINT "streaks_user_id_fkey";

-- DropTable
DROP TABLE "badges";

-- DropTable
DROP TABLE "focus_sessions";

-- DropTable
DROP TABLE "streaks";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "avatar_url" TEXT,
    "role" TEXT NOT NULL DEFAULT 'student',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "FocusSession" (
    "session_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "session_type" TEXT NOT NULL,
    "is_successful" BOOLEAN NOT NULL,

    CONSTRAINT "FocusSession_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "FocusMetric" (
    "metric_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_focus_time" INTEGER NOT NULL,
    "sessions_completed" INTEGER NOT NULL,
    "streak_count" INTEGER NOT NULL,
    "longest_streak" INTEGER NOT NULL,
    "badge_awarded" TEXT,

    CONSTRAINT "FocusMetric_pkey" PRIMARY KEY ("metric_id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "badge_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("badge_id")
);

-- CreateTable
CREATE TABLE "RewardHistory" (
    "reward_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "awarded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "RewardHistory_pkey" PRIMARY KEY ("reward_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FocusSession" ADD CONSTRAINT "FocusSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMetric" ADD CONSTRAINT "FocusMetric_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardHistory" ADD CONSTRAINT "RewardHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardHistory" ADD CONSTRAINT "RewardHistory_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge"("badge_id") ON DELETE CASCADE ON UPDATE CASCADE;
