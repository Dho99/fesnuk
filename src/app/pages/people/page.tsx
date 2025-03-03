"use client";

import { getPeoples } from "@/lib/handler/user";
import { getUserFriendId, addFriend, removeFriend } from "@/lib/handler/friend";
import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { User } from "@/lib/definition";
import PreviewPeople from "./preview";

type FriendProps = {
    id: string,
    userId: string,
    friends: {
        userFriendId: string,
    }[],
}

export default function Page() {
    const [peoples, setPeoples] = useState<null | User[]>(null);
    const [friends, setFriends] = useState<null | FriendProps>(null);
    const [addFriendRes, setAddFriendRes] = useState<null | { success: boolean, message: string }>(null);

    const getPeoplesData = async (limit: number, take: number) => {
        const peoplesData = await getPeoples(limit, take);

        if (!peoplesData) return;

        setPeoples(peoplesData);
    };

    const getFriendsData = async () => {
        const friendsData = await getUserFriendId();
        setFriends(friendsData);
    }

    const removeUserFriend = async (id: string) => {
        if (confirm("Are you sure want to delete this friend from friendlist ? ")) {
            const serverRemoveFriend = await removeFriend(id)

            if (serverRemoveFriend) {
                await getFriendsData();
                setAddFriendRes(serverRemoveFriend)
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            await getPeoplesData(0, 10);
            await getFriendsData();
        };

        getData();
    }, []);

    async function addUserFriend(id: string) {
        const userAddFriend = await addFriend(id);

        if (userAddFriend) {
            getFriendsData();
            setAddFriendRes(userAddFriend);
        }
    }

    return (
        <Box w={"full"}>
            <Text
                textStyle={"3xl"}
                fontWeight={"bold"}
                color={"black/80"}
                textAlign={"center"}
            >
                People
            </Text>
            <Box
                w={"full"}
                minH={"80vh"}
                h={"full"}
                my={5}
                display={"flex"}
                flexDir={"column"}
                gapY={5}
            >
                {
                    addFriendRes ? (
                        <Box w={{ md: "3/4", base: "full" }} mx={"auto"} rounded={"lg"} p={4} bgColor={addFriendRes?.success ? "green/70" : "red/70"}>
                            {addFriendRes?.message}
                        </Box>
                    ) : (<></>)
                }

                <Box
                    shadow={"sm"}
                    bg={"white"}
                    p={5}
                    w={{ md: "3/4", base: "full" }}
                    mx={"auto"}
                    rounded="lg"
                    display={"flex"}
                    flexDir={{ md: "row", base: "column" }}
                    gap={2}
                >
                    <input
                        type="text"
                        className="border border-slate-600 bg-transparent w-full text-black rounded-lg px-5"
                    />
                    <button className="rounded-lg text-white bg-slate-800 md:w-1/4 sm:w-full p-2 hover:shadow-lg">
                        Find User
                    </button>
                </Box>
                {peoples && peoples!.length > 0 ? (
                    <>
                        {peoples!.map((people, index) => (
                            <Box key={index} w={"full"}>
                                <PreviewPeople
                                    userData={people}
                                    previewButtonAction={
                                        friends?.friends.some((friend) => friend.userFriendId === people.id) ? (
                                            <button
                                                className="bg-red-600 ms-auto p-3 rounded-xl text-white"
                                                onClick={() => {
                                                    removeUserFriend(people.id);
                                                }}
                                            >
                                                Remove Friend
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-slate-800 ms-auto p-3 rounded-xl text-white"
                                                onClick={() => {
                                                    addUserFriend(people.id);
                                                }}
                                            >
                                                Add Friend
                                            </button>
                                        )
                                    }
                                />
                            </Box>
                        ))}
                    </>
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
        </Box>
    );
}

// export function previewButtonAction({userId}){
//     return (
//         <Box w={"full"} display={"flex"} m={"auto"}>
//               {
//                   friends?.friends.some((friend) => friend.userFriendId === people.id) ? (
//                       <button
//                           className="bg-red-600 ms-auto p-3 rounded-xl text-white"
//                           onClick={() => {
//                               removeUserFriend(people.id);
//                           }}
//                       >
//                           Remove Friend
//                       </button>
//                   ) : (
//                       <button
//                           className="bg-slate-800 ms-auto p-3 rounded-xl text-white"
//                           onClick={() => {
//                               addUserFriend(people.id);
//                           }}
//                       >
//                           Add Friend
//                       </button>
//                   )
//               }
//         </Box>
//     )
// }
