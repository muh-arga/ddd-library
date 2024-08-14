/*
  Warnings:

  - You are about to drop the `_MemberBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MemberBooks" DROP CONSTRAINT "_MemberBooks_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberBooks" DROP CONSTRAINT "_MemberBooks_B_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "penaltyUntil" TIMESTAMP(3);

-- DropTable
DROP TABLE "_MemberBooks";

-- CreateTable
CREATE TABLE "BorrowedBook" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "penalty" INTEGER,

    CONSTRAINT "BorrowedBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowedBook" ADD CONSTRAINT "BorrowedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowedBook" ADD CONSTRAINT "BorrowedBook_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
