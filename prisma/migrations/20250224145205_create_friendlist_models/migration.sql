-- CreateTable
CREATE TABLE "FriendList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "friendListId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendList_id_key" ON "FriendList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_id_key" ON "Friend"("id");

-- AddForeignKey
ALTER TABLE "FriendList" ADD CONSTRAINT "FriendList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendListId_fkey" FOREIGN KEY ("friendListId") REFERENCES "FriendList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
