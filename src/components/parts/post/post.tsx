import { Box, Flex, Text, Input, Button, Center } from "@chakra-ui/react";
import {
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  ArrowTurnUpRightIcon,
  BookmarkIcon,
  FaceSmileIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { getAllPosts, likePost } from "@/lib/handler/post";
import type { Post, User } from "@/lib/definition";
import React from "react";
import { daysFromToday } from "@/lib/utils";
import Image from "next/image";
import { CommentBox } from "./commentBox";
import { Suspense } from "react";
import { PostAction } from "./postAction";

export async function EmojiButton() {
  return (
    <Button>
      <FaceSmileIcon className="size-7 text-black" />
    </Button>
  );
}

type PageProps = {
  pageProps: User | null;
};

export default async function Post({
  pageProps,
}: PageProps): Promise<React.ReactNode> {
  const posts = await getAllPosts();

  return posts?.map((post, i) => {
    return (
      <Box shadow="sm" bg="white" rounded="xl" p="5" key={i}>
        <Flex direction="col">
          <Box>
            <Flex direction={"row"} gap="4">
              <Box
                bgColor={"gray.300"}
                h="14"
                w="14"
                rounded="full"
                alignContent={"center"}
                textAlign={"center"}
                overflow={"hidden"}
              >
                {post.user && post.user.image ? (
                  post.user.image.startsWith('http') ? (
                  <Image src={post.user.image} alt="Profile Image" width={60} height={60} />
                  ) : (
                  <Image src={`/uploads/profile/${post.user.image}`} alt="Profile Image" width={60} height={60} />
                  )
                ) : (
                  <UserCircleIcon className="text-slate-500" />
                )}
              </Box>
              <Flex direction={"column"} my="auto" gapY="1">
                <Box display="flex" gapX={4}>
                  <Text textStyle="sm" color="black" fontWeight={"semibold"}>
                    {post.user.name}
                  </Text>
                  <Text textStyle={"sm"} color="gray.500">
                    {daysFromToday(post.createdAt)} Ago
                  </Text>
                </Box>
                <Text textStyle={"sm"}>Location</Text>
              </Flex>
            </Flex>
          </Box>
          <Box className="ms-auto" alignContent={"center"}>
            <EllipsisHorizontalIcon className="size-8" />
          </Box>
        </Flex>
        <Box mt="3" mx="2" borderBottom={"1px solid black"} pb="5">
          <Text textStyle={"md"}>{post.description}</Text>
          {post.images.length > 1 ? (
            <Flex direction="row" gapX="2" mt="3">
              <Box h="56" w="1/2" bgColor={"gray.700"} rounded="md"></Box>
              <Box h="56" w="1/2" bgColor={"gray.700"} rounded="md"></Box>
            </Flex>
          ) : (
            <></>
          )}
        </Box>
        <Flex
          dir="row"
          px="4"
          py={2}
          borderBottom={"1px solid black"}
          alignItems={"center"}
        >
          <Box
            flexBasis={"50%"}
            display="flex"
            flexDir={"row"}
            gapX="8"
            alignItems={"center"}
          >
            <LikePost post={post} userData={pageProps} />

            <ChatBubbleLeftIcon className="size-7" />
            <PaperAirplaneIcon className="size-7" />
          </Box>
          <Box ms="auto" display={"flex"} flexDir={"row"} gapX="8">
            <ArrowTurnUpRightIcon className="size-7" />
            <BookmarkIcon className="size-7" />
          </Box>
        </Flex>

        <Flex p="4" direction={"row"} position={"relative"}>
          <PostAction post={JSON.stringify(post)} actionType={"like"} />
          <Box
            ms="auto"
            color={"gray.700"}
            display={"flex"}
            flexDirection={"row"}
            gapX="4"
          >
          <PostAction post={JSON.stringify(post)} actionType={"comment"} />
          </Box>
        </Flex>
      </Box>
    );
  });
}

type LikePostProps = {
  userData: User | null;
  post: Post | null;
};

export function LikePost({ userData, post }: LikePostProps) {
  const handleLike = async (data: FormData) => {
    "use server";
    const postId = data.get("postId") as string;
    const userEmail = userData?.email;
    if (!userEmail) return;
    await likePost(postId, userEmail);
  };


  if (post!.likes!.length > 0) {
    return (
      <>
        {post?.likes.some((like) => like?.userId === userData?.id) ? (
          <Button type={"button"}>
            <HandThumbUpIcon className="size-7 text-red-500" />
          </Button>
        ) : (
          <form action={handleLike}>
            <Input type="hidden" name="postId" value={post?.id} />
            <Button type={"submit"}>
              <HandThumbUpIcon className="size-7" />
            </Button>
          </form>
        )}
      </>
    );
  } else {
    return (
      <form action={handleLike}>
        <Input type="hidden" name="postId" value={post?.id} />
        <Button type={"submit"}>
          <HandThumbUpIcon className="size-7" />
        </Button>
      </form>
    );
  }
}
