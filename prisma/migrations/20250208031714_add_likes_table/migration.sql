-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
