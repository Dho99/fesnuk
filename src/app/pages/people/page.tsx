"use client";

import { getPeoples } from "@/lib/handler/user";
import { getUserFriend, addFriend } from "@/lib/handler/friend";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import type { User, FriendList } from "@/lib/definition";

export default function Page() {
    const [peoples, setPeoples] = useState<null | User[]>(null);
    const [friends, setFriends] = useState<null | FriendList>(null);
    const [addFriendRes, setAddFriendRes] = useState<null | { success: boolean, message: string }>(null);

    const getPeoplesData = async (limit: number, take: number) => {
        const peoplesData = await getPeoples(limit, take);

        if (!peoplesData) return;

        setPeoples((prev) => [...(prev || []), ...peoplesData]);
    };

    useEffect(() => {
        const getData = async () => {
            await getPeoplesData(0, 10);
            await getUserFriend();
        };

        getData();
    }, []);

    async function addUserFriend(id: string) {
        const userAddFriend = await addFriend(id);
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
                            <Box
                                key={index}
                                w={{ md: "3/4", base: "full" }}
                                bgColor={"white"}
                                mx={"auto"}
                                shadow={"sm"}
                                rounded={"lg"}
                                color={"black"}
                                display={"flex"}
                                flexDir={"row"}
                                py={3}
                                px={5}
                                gap={7}
                            >
                                <Box rounded={"full"} overflow={"hidden"}>
                                    {people.image ? (
                                        people.image?.startsWith("http") ? (
                                            <Image
                                                src={people.image}
                                                alt="Profile Image"
                                                width={100}
                                                height={100}
                                            />
                                        ) : (
                                            <Image
                                                src={`/uploads/profile/${people.image}`}
                                                alt="Profile Image"
                                                width={100}
                                                height={100}
                                            />
                                        )
                                    ) : (
                                        <UserCircleIcon className="text-slate-500" />
                                    )}
                                </Box>
                                <Box display={"flex"} flexDir={"column"} gapY={1}>
                                    <Text textStyle={"2xl"} fontWeight={"bold"}>
                                        {people.name}
                                    </Text>
                                    <Text textStyle={"lg"} fontWeight={""}>
                                        {people.email}
                                    </Text>
                                </Box>
                                { }
                                <Box w={"full"} display={"flex"} m={"auto"}>
                                    <button
                                        className="bg-slate-800 ms-auto p-3 rounded-xl text-white"
                                        onClick={() => {
                                            addUserFriend(people.id);
                                        }}
                                    >
                                        Add Friend
                                    </button>
                                </Box>

                                {/* {JSON.stringify(people)} */}
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
