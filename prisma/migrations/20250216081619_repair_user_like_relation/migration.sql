/*
  Warnings:

  - You are about to drop the `_LikeToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LikeToUser" DROP CONSTRAINT "_LikeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToUser" DROP CONSTRAINT "_LikeToUser_B_fkey";

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_LikeToUser";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
