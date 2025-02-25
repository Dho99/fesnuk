import { Text, Box } from "@chakra-ui/react";
import { getAllChats } from "@/lib/handler/chat";
import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const chats = await getAllChats();


    return (
        <>
            <Text textStyle={"3xl"} fontWeight={"bold"} mb={3} color={"black/80"}>
                Messages
            </Text>
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
                <Box maxW={"24%"} borderRight={"md"} maxH={"80vh"}>
                    <Box justifyContent={"center"} h={"70px"} display={"flex"} alignContent={"center"} alignItems={"center"}>
                        <input type="text" className="border border-slate-400 outline-sky-500 bg-transparent p-2 rounded-md" placeholder="Find Conversation" />
                    </Box>
                    <Box overflowY={"auto"} maxH={"80vh"} display={"flex"} flexDir={"column"} px={3} gapY={1}>
                        {JSON.stringify(chats)}

                        <Link href={"/pages/messages/2"}>
                            <Box
                                py={"3"}
                                borderY={"sm"}
                                maxH={"100px"}
                                overflow={"hidden"}
                                borderColor={"black/50"}
                            >
                                <Text textStyle={"md"} fontWeight={"bold"} mb={2}>
                                    Nigga
                                </Text>
                                <Text truncate>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    Maxime dignissimos blanditiis atque nihil a vel libero esse id
                                    distinctio doloremque?
                                </Text>
                            </Box>
                        </Link>




                    </Box>
                </Box>
                <Box w={"full"}>{children}</Box>
            </Box>
        </>
    );
}
