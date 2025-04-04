'use client'
import { Box } from "@chakra-ui/react"
import { serverSearchFriend } from "@/lib/handler/friend"
import type { Friend } from "@/lib/definition"
import PreviewPeople from "../../people/preview"
import { FormEvent } from "react"
import { Alert } from "@chakra-ui/react"
import { CloseButton } from "@/components/ui/close-button"
import { addConversation } from "@/lib/handler/chat"
import { useState } from "react"
import { useRouter } from "next/navigation"

type SearchFriends = {
    data: Friend[],
    success: boolean,
    message: string
}

export default function AddConversation() {


    const [friends, setFriends] = useState<SearchFriends | null | unknown>(null);

    const [inputMsg, setInputMsg] = useState<{ open: boolean, message: string | null }>({
        open: false,
        message: null
    })

    async function searchFriend(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setInputMsg({
            open: false,
            message: null
        });
        setFriends(null)
        const formData = new FormData(e.currentTarget);
        const findFriends = await serverSearchFriend(formData);

        const userInput = formData.get("friendName") as string;

        if (userInput == "" || userInput.length < 5) {
            return setInputMsg({
                open: true,
                message: "Please input at least 5 characters length"
            });
        }

        if (!findFriends?.success) return setInputMsg({
            open: true,
            message: findFriends?.message as string
        });

        if (findFriends!.data!.length < 1) {
            return setInputMsg({
                open: true,
                message: "User not Found"
            });
        }
        setFriends(findFriends!.data);


    }

    function closeAlert() {
        return setInputMsg({ open: false, message: null })
    }

    return (
        <Box w={"full"} display={"flex"} flexDir={"column"} color={"black"}>
            <Box w={"full"} display={"flex"} mt={10} mb={5}>
                <form onSubmit={searchFriend} className="flex flex-row w-full gap-1 justify-center">

                    <input type="text" className="bg-transparent shadow-sm border border-slate-400 rounded-lg p-2 w-96" placeholder="Search friend Name" name={"friendName"} required />
                    <button className="bg-slate-800 text-white rounded-lg px-5 text-lg h-full" type={"submit"}>Find</button>
                </form>
            </Box>

            {inputMsg.open ? (
                <Box w={"96"} display={"flex"} mx={"auto"}>
                    <Alert.Root status={"error"} variant={"surface"} shadow={"sm"}>
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>Error !</Alert.Title>
                            <Alert.Description>{inputMsg.message}</Alert.Description>
                        </Alert.Content>
                        <CloseButton pos="relative" top="-2" insetEnd="-2" onClick={closeAlert} />
                    </Alert.Root>
                </Box>
            ) : (<></>)}

            <Box w={'full'} color={"black"} p={5} display={"flex"} flexDir={"column"}>
                {Array.isArray(friends) ? (
                    <Box w={"full"} display={"flex"} flexDir={"column"} gap={4}>
                        {friends.map((friend: Friend, index: number) => (
                            <Box key={index} w={"full"} display={"flex"} flexDir={"column"} gap={4}>
                                <PreviewPeople userData={friend.friendData} previewButtonAction={<AddConversationButton userId={friend.friendData.id} />} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <></>
                )}
            </Box>

        </Box>
    )
}

export function AddConversationButton({ userId }: { userId: string }): React.ReactNode {

    const router = useRouter();

    async function clientAddConversation() {
        const addConv = await addConversation(userId);
        if (addConv?.success) {
            router.push(`/pages/messages/conversation/${addConv.message}`)
        }
    }

    return (
        <button
            className="bg-slate-800 ms-auto p-3 rounded-xl text-white h-fit"
            onClick={clientAddConversation}
        >
            Start Chat
        </button>
    )
}
