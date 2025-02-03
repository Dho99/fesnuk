"use client";

import { Flex, Box, Text, Button, Textarea } from "@chakra-ui/react";
import {
  FaceSmileIcon,
  PhotoIcon,
  // EllipsisHorizontalIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import Events from "@/components/parts/events";
import Post from "@/components/parts/post";
import { useActionState } from "react";
import { createPost } from "@/lib/handler/post";

export default function Page() {
  const [errorMessage, submitHandler] = useActionState(createPost, undefined);

  return (
    <Flex
      direction={"row"}
      color={"black"}
      gapX={{ lg: 8, md: 0 }}
      position={"relative"}
      justifyContent={{ lg: "start", md: "center" }}
    >
      <Flex flexBasis={{ lg: "60%", md: "90%" }} direction={"column"}>
        <form action={submitHandler}>
          <Flex
            direction={"row"}
            bg={"white"}
            px="5"
            py="4"
            rounded="xl"
            shadow="xs"
            alignItems={"center"}
            gap={2}
          >
            <Box flexBasis={"10%"}>
              <Box
                bgColor={"gray.300"}
                rounded={"full"}
                w={12}
                h={12}
                textAlign={"center"}
                alignContent={"center"}
              >
                d
              </Box>
            </Box>

            <Box flexBasis={"70%"} alignContent={"center"} display={"flex"}>
              <Textarea resize={"none"} w="100%" placeholder="What's New ?" alignContent={"center"} px="2" textStyle={"lg"} name={"description"}/>
            </Box>
            <Box flexBasis={"20%"} alignContent={"center"} ms={"auto"}>
              <Flex direction="row" gapX={5} display={"flex"} alignItems={"center"}>
                <FaceSmileIcon className="size-8" />
                <PhotoIcon className="size-8" />
                <Button type="submit">
                  <PaperAirplaneIcon className="size-8 "/>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </form>
        <Flex mt="8" direction={"column"} gapY="5">
          <Post />
        </Flex>
      </Flex>
      <Box position={"relative"}>
        <Events />
      </Box>
    </Flex>
  );
}
