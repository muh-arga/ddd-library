/*
  Warnings:

  - You are about to drop the column `penaltyUntil` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "penaltyUntil";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "penaltyUntil" TIMESTAMP(3);
