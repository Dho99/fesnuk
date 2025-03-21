'use client'

import { Box, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react"
import { pusherClient } from "@/lib/handler/pusherClient";
import { getConversationInfo, serverSendMessage } from "@/lib/handler/chat";
import type { Conversation, User } from "@/lib/definition";
import Image from "next/image";

type ConversationPage = {
  authUser: null | User;
  chatData: null | Conversation;
}

export default function Messages() {
  const params = useParams<{ conversationId: string }>();

  const [chats, setChatsData] = useState<null | ConversationPage>(null);
  const [isSendError, sendError] = useState<null | { error: boolean, message: string }>(null);

  const getConvData = async () => {
    const chats = await getConversationInfo(params.conversationId);

    setChatsData({
      ...chats,
      chatData: chats?.chatData
        ? {
          ...chats.chatData,
          messages: chats.chatData.messages?.map((msg) => ({
            ...msg,
            roomId: msg.chatId, // Map chatId to roomId
          })),
        }
        : null,
    });
    // console.log(chats);
  }

  useEffect(() => {
    getConvData();
    const channel = pusherClient.subscribe(params.conversationId);

    channel.bind('new-message', (data: { message: string; id: string; senderId: string; created_at: Date; roomId: string }) => {
      setChatsData((prev) => {
        if (!prev || !prev.chatData) {
          return prev;
        }

        return {
          ...prev,
          chatData: {
            ...prev.chatData,
            messages: [...(prev.chatData.messages || []), data],
            id: prev.chatData.id
          },
          authUser: prev.authUser
        };
      });
    });

    return () => {
      pusherClient.unsubscribe(params.conversationId);
    }

  }, []) //eslint-disable-line

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = new FormData(e.currentTarget);

    if (payload.get('messageBody') == '') {
      sendError({ error: true, message: "Please input your message" });
      return;
    }


    const sendChatBtn = document.getElementById("sendChatBtn") as HTMLButtonElement | null;
    if (sendChatBtn) {
      sendChatBtn.disabled = true;

      const send = await serverSendMessage(payload, params.conversationId as string);

      if (send) {
        sendChatBtn.disabled = false;
        (document.getElementById('msgInput') as HTMLTextAreaElement).value = '';
        sendError(null);
      }
    }
  }

  return (
    <Box w={"full"} h={"full"} position={"relative"}>
      <Box position={"relative"} top={0} left={0} py={3} px={5} w={"full"} display={"flex"} flexDir={"row"} gapX={"2"} border={"xs"} borderColor={"black/30"} rounded={"md"}>



        {chats?.chatData?.rooms?.filter((room) => room.userId !== chats?.authUser?.id).map((room, index) => (

          <Box display={"flex"} flexDir={"row"} alignItems={"center"} gap={3} key={index}>
            <Box rounded={"full"} maxH={"40px"} maxW={"40px"} overflow={"hidden"}>
              {room?.user?.image ? (<Image src={room?.user?.image} alt={`${room?.user?.name} Profile image`} height={40} width={40} />) : (<></>)}
            </Box>
            <Text textStyle={"xl"} fontWeight={"bold"}>
              {room?.user?.name}
            </Text>

          </Box>
        ))}



      </Box>

      <Box display={"flex"} flexDir={"column"} gap={2} py={2} h={"75%"} px={5} overflow={"auto"} justifyItems={"center"}>

        {
          chats?.chatData?.messages!.map((msg, index) => (
            <Box key={index}>
              <Box py={2} px={5} bgColor={msg.senderId == chats.authUser?.id ? "blue/30" : "black/20"} maxW={"45%"} w={"fit"} display={"flex"} ms={msg.senderId == chats.authUser?.id ? "auto" : ""} rounded={"lg"}>
                <Text textStyle={"lg"}>{msg.message}</Text>
              </Box>
            </Box>
          ))
        }
      </Box>


      <form action="" className="absolute bottom-0 w-full px-5 py-3 flex flex-col rounded-md border border-slate-400 bg-white shadow-xl" onSubmit={sendMessage}>
        <div className="flex flex-row">

          <textarea name="messageBody" className={`border bg-transparent ${isSendError?.error ? 'border-red-600' : '  border-slate-300 '} rounded-lg w-full bg-transparentfocus:outline focus:outline-slate-500 my-auto p-2`} id="msgInput" rows={1}></textarea>
          <button className={`${isSendError?.error ? 'bg-red-600' : 'bg-slate-800'} rounded-lg px-3 text-white`} type={"submit"} id="sendChatBtn">Send</button>
        </div>
        {
          isSendError?.error ? (<div className="w-full text-red-600">{isSendError.message}</div>) : (<></>)
        }

      </form>


    </Box>

  );
}
