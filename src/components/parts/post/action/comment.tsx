"use client"
import { useState } from "react";
import type { CommentProps, Post } from "@/lib/definition.ts";
import { getComments } from "@/lib/handler/post";
import {Link, Box, Text, Flex} from "@chakra-ui/react"
import { XMarkIcon } from "@heroicons/react/24/outline";

type CommentActionProps = {
    postData: Post | null;
  };
  

export default function PostommentAction({ postData }: CommentActionProps) {
    const [commentsData, setCommentsData] = useState<{ data: CommentProps[] | null}>({
      data: [],
    });
  
    const getCommentsData = async (postId: string)=> {
      const serverCommentsData: CommentProps[] | null = await getComments(postId, 99);
      setCommentsData({ data: serverCommentsData });
    };
  
    const closePostAction = () => {
        setCommentsData({ data: [] });
    };
  
    return (
      <>
        <Link
          textStyle="md"
          fontWeight={"bold"}
          onClick={async () => {
            await getCommentsData(postData!.id);
          }}
        >
          {postData?.comments?.length} comments
        </Link>

        {commentsData?.data!.length > 0 ? (
          <Box
            maxW={"auto"}
            minW={"500px"}
            h={"auto"}
            maxH={"400px"}
            overflowY={"auto"}
            py={3}
            px={4}
            bgColor={"white"}
            position={"absolute"}
            zIndex={"2"}
            top={"-200px"}
            left={"-450px"}
            rounded={"lg"}
            shadow={"md"}
          >
            <Box display={"flex"} alignItems={"center"}>
            <Text textStyle={"lg"} fontWeight={"bold"}>{postData?.user.name} Comments Post</Text>
              <XMarkIcon
                className="size-5 ms-auto cursor-pointer"
                onClick={() => {
                  closePostAction();
                }}
              />
            </Box>
            <Flex direction="column" gapY={2} my={5}>
              {commentsData?.data?.map((data, index) => (
                <Box key={index} p={3} shadow={"xs"} bgColor={"black/5"} rounded={"lg"} gap={2} display={"flex"} flexDir={"column"}>
                    <Text textStyle={"md"} fontWeight={"semibold"} color={"black"}>{data.author.name}</Text>
                    <Text>{data.description}</Text>
                </Box>
              ))}
            </Flex>
          </Box>
        ) : (<></>)}
      </>
    );
  }