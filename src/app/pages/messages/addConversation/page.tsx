'use client'
import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { serverSearchFriend } from "@/lib/handler/friend"
import type { Friend } from "@/lib/definition"
import PreviewPeople from "../../people/preview"
import { FormEvent } from "react"


type SearchFriends = {
    data: Friend[],
    success: boolean,
    message: string
}

export default function AddConversation() {


    const [friends, setFriends] = useState<SearchFriends | null | unknown>(null);
    const [inputMsg, setInputMsg] = useState<null | string>(null)


    async function searchFriend(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setInputMsg(null);
        const formData = new FormData(e.currentTarget);
        const findFriends = await serverSearchFriend(formData);

        const userInput = formData.get("friendName") as string;

        if (userInput == "" || userInput.length <= 5) {
            return setInputMsg("Please input at least 5 characters length");
        }

        if (!findFriends?.success) return setInputMsg(findFriends!.message);

        if (findFriends!.data!.length < 1) {
            return setInputMsg("User not found")
        }
        setFriends(findFriends!.data);


    }

    return (
        <Box w={"full"} display={"flex"} flexDir={"column"} color={"black"}>
            {inputMsg && JSON.stringify(inputMsg)}
            <Box w={"full"} display={"flex"} mt={10} mb={5}>
                <form onSubmit={searchFriend} className="flex flex-row w-full gap-1 justify-center">

                    <input type="text" className="bg-transparent shadow-sm border border-slate-400 rounded-lg p-2 w-96" placeholder="Search friend Name" name={"friendName"} required />
                    <button className="bg-slate-800 text-white rounded-lg px-5 text-lg h-full" type={"submit"}>Find</button>
                </form>
            </Box>

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
    return (
        <button
            className="bg-slate-800 ms-auto p-3 rounded-xl text-white h-fit"
            onClick={() => {
                alert(userId);
            }}
        >
            Add Friend
        </button>
    )
}