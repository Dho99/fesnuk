/*
  Warnings:

  - Added the required column `createdAt` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SavedPost" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedPost_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
