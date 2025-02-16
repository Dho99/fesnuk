"use client"
import { useState } from "react";
import type { Like, Post } from "@/lib/definition.ts";
import { showLikes } from "@/lib/handler/post";
import {Link, Box, Text, Flex} from "@chakra-ui/react"
import { XMarkIcon } from "@heroicons/react/24/outline";

type LikeActionProps = {
    postData: Post | null;
  };
  

export default function PostLikeAction({ postData }: LikeActionProps) {
    const [likesData, setLikesData] = useState<{ data: Like[] | null }>({
      data: null,
    });
  
    const getLikeData = async (postId: string) => {
      const postLikesData = await showLikes(postId);
      setLikesData({ data: postLikesData });
    };
  
    const closePostAction = () => {
      setLikesData({ data: null });
    };
  
    return (
      <>
        <Link
          textStyle="md"
          fontWeight={"bold"}
          onClick={async () => {
            await getLikeData(postData!.id);
          }}
        >
          {postData?.likes?.length} likes
        </Link>
        {likesData.data && (
          <Box
            maxW={"auto"}
            minW={"300px"}
            h={"auto"}
            py={3}
            px={4}
            bgColor={"white"}
            position={"absolute"}
            zIndex={"2"}
            top={"-100px"}
            left={"150px"}
            rounded={"lg"}
            shadow={"md"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Text textStyle={"lg"} fontWeight={"semibold"}>
                Liked by
              </Text>
              <XMarkIcon
                className="size-5 ms-auto cursor-pointer"
                onClick={() => {
                  closePostAction();
                }}
              />
            </Box>
            <Flex direction="column" gapY={2} my={3}>
              {likesData.data.map((data, index) => (
                <Text key={index}>{data.user.name}</Text>
              ))}
            </Flex>
          </Box>
        )}
      </>
    );
  }