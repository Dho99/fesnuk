'use client'
import { Box, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { getUserFriend } from "@/lib/handler/friend"
import type { Friend } from "@/lib/definition"
import PreviewPeople from "../../people/preview"


export default function AddConversation() {

    const [friends, setFriends] = useState<Friend[] | null>(null);

    const serverGetUserFriend = async () => {
        const friendsData = await getUserFriend();

        if (!friendsData) return;

        setFriends(friendsData.friends);
    }

    useEffect(() => {
        serverGetUserFriend();
    }, [])

    return (
        <Box w={'full'} color={"black"} p={5} display={"flex"} flexDir={"column"}>
            {friends && friends!.length > 0 ? (
                <Box w={"full"} display={"flex"} flexDir={"column"} gap={4}>
                    {friends!.map((friend, index) => (
                        <Box key={index} w={"full"} display={"flex"} flexDir={"column"} gap={4}>
                            <PreviewPeople userData={friend.friendData} previewButtonAction={<AddConversationButton userId={friend.friendData.id} />} />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box
                    w={"3/4"}
                    h={"20vh"}
                    bgColor={"white"}
                    mx={"auto"}
                    shadow={"sm"}
                    rounded={"lg"}
                    color={"black/70"}
                    p={5}
                    textAlign={"center"}
                    alignContent={"center"}
                >
                    <Text textStyle={"4xl"} fontWeight={"bold"}>
                        ?
                    </Text>
                    <Text textStyle={"2xl"} fontWeight={"bold"}>
                        Empty User
                    </Text>
                </Box>
            )}
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