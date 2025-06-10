/*
  Warnings:

  - The `interests` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `number_of_persons` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "number_of_persons" INTEGER NOT NULL,
DROP COLUMN "interests",
ADD COLUMN     "interests" TEXT[];
