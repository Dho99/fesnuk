'use client'

import { Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { getAllChats } from "@/lib/handler/chat";
import type { Conversation, User } from "@/lib/definition";
import { pusherClient } from "@/lib/handler/pusherClient";

type ConvState = {
    authUser: User,
    chats: Conversation[]
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [conversations, setConversation] = useState<ConvState | null>(null);

    const getChatsData = useCallback(async () => {
        const allChats = await getAllChats();

        setConversation(allChats);
    }, [])




    useEffect(() => {
        getChatsData();

        const channel = pusherClient.subscribe(`new-conversation`);

        channel.bind(`newconv${conversations?.authUser?.id}`, (data: Conversation) => {
            setConversation(prev => {
                if (!prev) return null;

                const chatExists = prev.chats.some(chat => chat.id === data.id);

                if (chatExists) {
                    return {
                        ...prev,
                        chats: prev.chats.map(chat => chat.id === data.id ? { ...chat, ...data } : chat)
                    };
                } else {
                    return {
                        ...prev,
                        chats: [...prev.chats, data]
                    };
                }
            });
        });



        return () => {
            channel.unsubscribe();
        }

    }, [getChatsData, conversations?.authUser?.id]) //eslint-disable-line


    return (
        <>
            <Box display={"flex"} flexDir={"row"} mb={4}>
                <Text textStyle={"3xl"} fontWeight={"bold"} mb={3} color={"black/80"}>
                    Messages
                </Text>

                <button className="bg-slate-800 text-white px-5 py-0 ms-auto rounded-lg shadow-md text-sm md:text-base hover:bg-slate-700 transition-all transition-duration-300" onClick={() => { router.push('/pages/messages/addConversation') }}>Add Conversation</button>

            </Box>
            <Box
                bg={"white"}
                rounded={"md"}
                shadow={"sm"}
                color={"black"}
                display={"flex"}
                flexDir={"row"}
                minH={"80vh"}
                maxH={"80vh"}
                overflow={"hidden"}
            >
                <Box maxW={"20%"} borderRight={"xs"} borderColor={"black/70"} maxH={"80vh"} shadow={"sm"}>
                    <Box justifyContent={"center"} h={"70px"} display={"flex"} alignContent={"center"} alignItems={"center"}>
                        <input type="text" className="border border-slate-400 outline-sky-500 bg-transparent p-2 m-2 rounded-md w-full" placeholder="Find Conversation" />
                    </Box>
                    <Box overflowY={"auto"} maxH={"80vh"} display={"flex"} flexDir={"column"} gapY={1}>
                        {
                            conversations?.chats?.map((conv, index) => (
                                <Box
                                    key={index}
                                    p={"3"}
                                    borderY={"sm"}
                                    maxH={"100px"}
                                    overflow={"hidden"}
                                    borderColor={"black/50"}
                                    onClick={() => { router.push(`/pages/messages/conversation/${conv.id}`) }}
                                    _hover={{ cursor: "pointer", bgColor: "black/20" }}
                                    transition={"all 0.3s"}
                                >

                                    {conv.rooms.filter((room) => room.userId !== conversations.authUser.id).map((room, index) => (
                                        <div key={index}>
                                            <Text key={conv.id} truncate textStyle={"md"} fontWeight={"bold"} mb={2}>
                                                {room.user.name}
                                            </Text>
                                            <Text truncate>{conv?.messages[0] ? conv.messages[0].message : `Start chat with ${room.user.name}`}</Text>
                                        </div>
                                    ))}

                                </Box>
                            ))
                        }

                    </Box>
                </Box>



                <Box w={"full"}>{children}</Box>


            </Box>
        </>
    );
}

