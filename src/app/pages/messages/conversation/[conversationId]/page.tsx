'use client'

import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react"
import { getConversationInfo } from "@/lib/handler/chat";
import type { Conversation } from "@/lib/definition";

export default function Messages() {
  const params = useParams<{ conversationId: string }>();

  const [chats, setChatsData] = useState<null | Conversation>(null);

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
      <Box position={"relative"} top={0} py={3} px={5} w={"full"} display={"flex"} flexDir={"row"} gapX={"2"} border={"xs"} borderColor={"black/30"} rounded={"md"}>s</Box>
      <Box></Box>

      <Box position={"absolute"} bottom={0} py={3} px={5} w={"full"} display={"flex"} flexDir={"row"} gapX={"2"} border={"xs"} borderColor={"black/30"} rounded={"md"}>
        <textarea name="" className="rounded-lg w-full bg-transparent border border-slate-300 focus:outline focus:outline-slate-500 my-auto px-3 " id=""></textarea>
        <button className="bg-slate-800 rounded-lg px-3 text-white">Send</button>
      </Box>
    </Box>

  );
}
