'use client'

import { Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllChats } from "@/lib/handler/chat";
import type { Conversation } from "@/lib/definition";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [conversations, setConversation] = useState<Conversation[] | null>(null);

    const getChatsData = async () => {
        const allChats = await getAllChats();
        setConversation(allChats);
    }

    useEffect(() => {
        getChatsData();
    }, [])

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
                    <Box overflowY={"auto"} maxH={"80vh"} display={"flex"} flexDir={"column"} px={3} gapY={1}>
                        {
                            conversations?.map((conv, index) => (
                                <Box
                                    key={index}
                                    py={"3"}
                                    borderY={"sm"}
                                    maxH={"100px"}
                                    overflow={"hidden"}
                                    borderColor={"black/50"}
                                    onClick={() => { router.push(`/pages/messages/conversation/${conv.id}`) }}
                                    _hover={{ cursor: "pointer" }}
                                >
                                    <div key={index}>
                                        {conv.rooms
                                            .filter((room) => room.user.id !== conv.userId)
                                            .map((room) => (
                                                <div key={index}>
                                                    <Text key={room.id} truncate textStyle={"md"} fontWeight={"bold"} mb={2}>
                                                        {room.user.name}
                                                    </Text>
                                                    <Text truncate>{conv.messages[0] ? conv.messages[0].message : `Start chat with ${room.user.name}`}</Text>
                                                </div>
                                            ))}
                                    </div>

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

