/*
  Warnings:

  - Added the required column `heroImage` to the `TripRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripRecommendation" ADD COLUMN     "heroImage" TEXT NOT NULL;
