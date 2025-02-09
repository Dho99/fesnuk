import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
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
import type { Post } from "@/lib/definition";
import React from "react";
import { daysFromToday } from "@/lib/utils";
import Image from "next/image";
import { CommentBox } from "./commentBox";
import { Comments } from "./comments";
import { Suspense } from "react";

export async function EmojiButton() {
  return (
    <Button>
      <FaceSmileIcon className="size-7 text-black" />
    </Button>
  );
}

export default async function Post(): Promise<React.ReactNode> {
  const posts = await getAllPosts();

  const handleLike = async (data: FormData) => {
    "use server";
    const postId = data.get("postId") as string;
    await likePost(postId);
  };

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
              >
                {post.user && typeof post.user.image == "string" ? (
                  <Image src={post.user.image} alt="Profile Image" width={12} />
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
       
            {post.likes.length > 0 ? (
              <Button type={"button"}>
                <HandThumbUpIcon className="size-7 text-red-500" />
              </Button>
            ) : (     
                <form action={handleLike}>
                  <Input type="hidden" name="postId" value={post.postId} />
                  <Button type={"submit"}>
                    <HandThumbUpIcon className="size-7" />
                  </Button>
                </form>
        
            )}
         
            <ChatBubbleLeftIcon className="size-7" />
            <PaperAirplaneIcon className="size-7" />
          </Box>
          <Box ms="auto" display={"flex"} flexDir={"row"} gapX="8">
            <ArrowTurnUpRightIcon className="size-7" />
            <BookmarkIcon className="size-7" />
          </Box>
        </Flex>

        <Flex p="4" direction={"row"}>
          <Box>
            <Text textStyle="md" fontWeight={"bold"}>
              {post.likes.length} likes
            </Text>
          </Box>
          <Box
            ms="auto"
            color={"gray.700"}
            display={"flex"}
            flexDirection={"row"}
            gapX="4"
          >
            <Box>
              <Text textStyle={"md"}>{post.comments.length} Comments</Text>
            </Box>
          </Box>
        </Flex>
        <CommentBox postId={post.postId} />
        <Box m={2}>
          <Suspense fallback={<Text>Loading...</Text>}>
            <Comments postId={post.postId} limit={1} />
          </Suspense>
        </Box>
      </Box>
    );
  });
}
