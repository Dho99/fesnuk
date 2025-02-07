'use server'

import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";

import {
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  ArrowTurnUpRightIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { getAllPosts } from "@/lib/handler/post";
import type { Post } from "@/lib/definition";
import React from "react";

export async function EmojiButton() {
  return (
    <Button>
      <FaceSmileIcon className="size-7 text-black" />
    </Button>
  );
}



export default async function Post(): Promise<React.ReactNode> {

    const posts = await getAllPosts();

    return posts.map((post, i) => {
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
                d
              </Box>
              <Flex direction={"column"} my="auto" gapY="1">
                <Box display="flex" gapX={4}>
                  <Text textStyle="sm" color="black" fontWeight={"semibold"}>
                    Ray Hammond
                  </Text>
                  <Text textStyle={"sm"} color="gray.500">
                    2d Ago
                  </Text>
                </Box>
                <Text textStyle={"sm"}>New York, United States</Text>
              </Flex>
            </Flex>
          </Box>
          <Box className="ms-auto" alignContent={"center"}>
            <EllipsisHorizontalIcon className="size-8" />
          </Box>
        </Flex>
        <Box mt="3" mx="2" borderBottom={"1px solid black"} pb="5">
          <Text textStyle={"md"}>{post.description}</Text>
    
          <Flex direction="row" gapX="2" mt="3">
            <Box h="56" w="1/2" bgColor={"gray.700"} rounded="md"></Box>
            <Box h="56" w="1/2" bgColor={"gray.700"} rounded="md"></Box>
          </Flex>
        </Box>
        <Flex dir="row" p="4" borderBottom={"1px solid black"}>
          <Box flexBasis={"50%"} display="flex" flexDir={"row"} gapX="8">
            <HandThumbUpIcon className="size-7" />
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
              925 likes
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
              <Text textStyle={"md"}>22 Comments</Text>
            </Box>
            <Box>
              <Text textStyle={"md"}>4 Reports</Text>
            </Box>
          </Box>
        </Flex>
        <Box p="2" >
          <InputGroup flex="1" endElement={<EmojiButton />} w="full" >
            <Input
              placeholder="Add a comment..."
              variant={"outline"}
              border={"1px solid gray"}
              px="4"
              rounded="lg"
            />
          </InputGroup>
        </Box>
        </Box>
      )
    })
   


}
