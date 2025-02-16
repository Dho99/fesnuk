"use client";

import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import PostLikeAction from "./action/like";
import PostommentAction from "./action/comment";

export function PostAction({
  post,
  actionType,
}: {
  post: string;
  actionType: string;
}): React.ReactNode {
  const postData = JSON.parse(post);

  return (
    <Box position={"relative"}>
      {actionType == "like" ? <PostLikeAction postData={postData} /> : <PostommentAction postData={postData} />}
    </Box>
  );
}



