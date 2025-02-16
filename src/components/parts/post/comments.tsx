'use server'
import { getComments } from "@/lib/handler/post";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { CommentProps } from "@/lib/definition";

type CommentsPageProps = {
    postId: string,
    limit: number
    
}

export async function Comments({postId, limit}: CommentsPageProps): Promise<React.ReactNode>{
    const comments: CommentProps[] | null = await getComments(postId, limit);

    if(comments!.length < 0){
        return (
            <Box bgColor={"gray.300"} _hover={{shadow: "xs"}} transition={"all 0.2s"}  px={3} py={2} rounded={"lg"} my={1} display={'flex'} flexDir={"column"} gapY={2}>
                <Text textStyle={"md"} textAlign={"center"}>No Comments yet</Text>
            </Box>
        );
    }

    return (
        <>
            {comments?.map((comment, index) => (
                <Box shadow={"sm"}  px={3} py={2} rounded={"lg"} my={1} key={index} display={'flex'} flexDir={"column"} gapY={2}>
                    <Text textStyle={"sm"} fontWeight={"semibold"}>{comment.author.name}</Text>
                    <Text key={index} textStyle={"md"}>{comment.description}</Text>
                </Box>
            ))}
        </>
    );
}