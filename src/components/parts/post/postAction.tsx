"use client"

import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Suspense } from "react";
import type { Post } from "@/lib/definition";
import {useState, useEffect} from "react";
import { showLikes } from "@/lib/handler/post";
import type { Like } from "@/lib/definition";

export function PostAction({
  post,
  actionType,
}: {
  post: string;
  actionType: string;
}): React.ReactNode {

  const [likesData, setLikesData] = useState<{ data: Like | null }>({
    data: null
  })
  const postData = JSON.parse(post);

  const getLikeData = async(postId: string) => {
    const postLikesData = await showLikes(postId);
    // setLikesData({ data: postLikesData });

  }
  
  
  return (
    <Box position={"relative"}>
    <Link textStyle="md" fontWeight={"bold"} onClick={async() => {await getLikeData(postData.postId)}}>
        {postData?.likes?.length} likes
    </Link>
      {
        likesData.data ? (
          <Box w={"max"} h={"auto"} py={3} px={4} bgColor={"white"} position={"absolute"} zIndex={"2"} top={0}>
            <Text textStyle={"lg"} fontWeight={"semibold"}>Liked by</Text>
            <Flex dir="row" gapY={3}>
              {/* {likesData.data.userId.map((user, index) => (

              ))} */}
            </Flex>

          </Box>
        ) : (
          <></>
        )
      }
    </Box>
  );
}
