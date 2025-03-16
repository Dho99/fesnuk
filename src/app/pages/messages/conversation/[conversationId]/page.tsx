'use client'

import { Box, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react"
import { getConversationInfo } from "@/lib/handler/chat";
import Image from "next/image";
import type { Conversation } from "@/lib/definition";

type ConversationPage = {
  authUser: null | { email: string | unknown, name: string | unknown, image: string | unknown };
  chatData: null | Conversation;
}

export default function Messages() {
  const params = useParams<{ conversationId: string }>();

  const [chats, setChatsData] = useState<null | ConversationPage>(null);

  const getConvData = async () => {
    const chats = await getConversationInfo(params.conversationId);

    setChatsData(chats);
    // console.log(chats);
  }

  useEffect(() => {
    getConvData();
  }, []) //eslint-disable-line

  return (
    <Box w={"full"} h={"full"} position={"relative"}>
      <Box position={"relative"} top={0} py={3} px={5} w={"full"} display={"flex"} flexDir={"row"} gapX={"2"} border={"xs"} borderColor={"black/30"} rounded={"md"}>
        {
          chats?.chatData?.rooms?.filter((room) => chats?.authUser && room.user.name !== chats.authUser.name).map((room) => (
            <Box key={room.id} display={"flex"} flexDir={"row"} alignItems={"center"} gap={3}>
              {room.user.image ? (
                <Box rounded={"full"} maxH={"40px"} maxW={"40px"} overflow={"hidden"}>
                  <Image src={room.user.image} alt={`${room.user.name} Profile image`} height={40} width={40} />
                </Box>
              ) : (<></>)}
              <Text textStyle={"xl"} fontWeight={"bold"}>
                {room.user.name}
              </Text>
            </Box>
          ))
        }
      </Box>


      <Box position={"absolute"} bottom={0} py={3} px={5} w={"full"} display={"flex"} flexDir={"row"} gapX={"2"} border={"xs"} borderColor={"black/30"} rounded={"md"}>
        <textarea name="" className="rounded-lg w-full bg-transparent border border-slate-300 focus:outline focus:outline-slate-500 my-auto p-2 " id="" rows={1}></textarea>
        <button className="bg-slate-800 rounded-lg px-3 text-white">Send</button>
      </Box>
    </Box>

  );
}
