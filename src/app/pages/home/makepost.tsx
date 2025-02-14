"use client";

import { Flex, Box, Text, Button, Textarea } from "@chakra-ui/react";
import {
  FaceSmileIcon,
  PhotoIcon,
  PaperAirplaneIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { useActionState, useRef } from "react";
import { createPost } from "@/lib/handler/post";
import Image from "next/image";

type MakePostProps = {
  session: string|null|undefined
}

export default function MakePost({session}: MakePostProps) {

  const [errorMessage, submitHandler] = useActionState(
    async(state: unknown, payload: FormData) => {
      if(payload === null){
        return null;
      }

      const response = await createPost(state, payload);
      return response;
    },
    null
  );

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
          {
            typeof errorMessage == "string" && (
              <Box w="" bgColor={"red.500"} p={4} rounded={"lg"} mb={5} color={"white"}>{errorMessage}</Box>
            )
          }

          <form ref={formRef} action={submitHandler}>
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
                  {/* {
                    session && typeof session == "string" ? (
                      <Image src={session} alt="Profile Image" width={12}/>
                    ):( */}
                      <UserCircleIcon className="text-slate-500"/>
                    {/* )
                  } */}
                </Box>
              </Box>

              <Box flexBasis={"70%"} alignContent={"center"} display={"flex"}>
                <Textarea
                  resize={"none"}
                  w="100%"
                  placeholder="What's New ?"
                  alignContent={"center"}
                  px="2"
                  textStyle={"lg"}
                  name={"description"}
                />
              </Box>
              <Box flexBasis={"20%"} alignContent={"center"} ms={"auto"}>
                <Flex
                  direction="row"
                  gapX={5}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <FaceSmileIcon className="size-8" />
                  <PhotoIcon className="size-8" />
                  <Button type="submit">
                    <PaperAirplaneIcon className="size-8 " />
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </form>
    </>
  );
}
