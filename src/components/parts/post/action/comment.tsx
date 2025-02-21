
import { useState } from "react";
import type { CommentProps, Post } from "@/lib/definition.ts";
import { getComments } from "@/lib/handler/post";
import {Link, Box, Text, Flex} from "@chakra-ui/react"
import { XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CommentBox } from "../commentBox";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CommentActionProps = {
    postData: Post | null;
  };
  

export default function PostommentAction({ postData }: CommentActionProps) {
    const router = useRouter();

    const [commentsData, setCommentsData] = useState<{ data: CommentProps[] | null, isOpened: boolean}>({
      data: [],
      isOpened: false
    });
  
    const getCommentsData = async ()=> {
      const serverCommentsData: CommentProps[] | null = await getComments(postData!.id, 99);
      // setCommentsData({ data: serverCommentsData, isOpened: true });
      router.refresh();
      setCommentsData(prev => ({
        ...prev,
        isOpened: true,
        data: serverCommentsData
      }))
    };
  
    const closePostAction = () => {
        setCommentsData({ data: [], isOpened: false });
    };
  
    return (
      <>
      <Link
        textStyle="md"
        fontWeight={"bold"}
        onClick={async () => {
        await getCommentsData();
        }}
      >
        {postData?.comments?.length} comments
      </Link>

      {commentsData.isOpened && (
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
        {commentsData?.data!.length > 0 ? (
          <Flex direction="column" gapY={2} my={5} >
            {commentsData?.data?.map((data, index) => (

              <Flex flexDir={"row"} key={index} alignItems={"center"} gapX={"2"} bgColor={"black/5"} px={3} shadow={"xs"}>
                  <Box flexBasis={"10%"}>
                    {data.author && typeof data.author.image == "string" ? (
                        <Image src={data.author.image} alt="Profile Image" width={60}  height={60}/>
                      ) : (
                      <UserCircleIcon className="text-slate-500" />
                    )}
                  </Box>
                  <Box p={3}  rounded={"lg"} gap={2} display={"flex"} flexDir={"column"} flexBasis={"100%"}>
                      <Text textStyle={"md"} fontWeight={"semibold"} color={"black"}>{data.author.name}</Text>
                      <Text>{data.description}</Text>
                  </Box>
              </Flex>
    
            ))}
          </Flex>
        ) : (
          <Box display={"flex"} justifyContent={"center"} py={10}>
            <Text textStyle={"xl"} fontWeight={"bold"}>No one Commented</Text>
          </Box>
        )}
        <CommentBox postId={postData!.id} callback={getCommentsData}/>
        </Box>
      )}
      </>
    );
  }