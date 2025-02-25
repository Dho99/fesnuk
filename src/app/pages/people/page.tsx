'use client'

import { getPeoples } from "@/lib/handler/user";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react"
import type { User } from "@/lib/definition";


export default function Page() {
    const [peoples, setPeoples] = useState<null | User[]>(null)

    const getPeoplesData = async (limit: number, take: number) => {
        const peoplesData = await getPeoples(limit, take);

        if (!peoplesData) return;

        setPeoples(prev => ([
            ...(prev || []),
            ...peoplesData
        ]));

    }

    useEffect(() => {
        const getData = async () => {
            await getPeoplesData(0, 10);
        }

        getData();
    }, [])


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
                        className="border border-slate-600 p-2 bg-transparent w-full text-black rounded-lg"
                    />
                    <button className="rounded-lg text-white bg-slate-800 md:w-1/4 sm:w-full p-3 hover:shadow-lg">
                        Find User
                    </button>
                </Box>

                {peoples && peoples!.length > 0 ? (
                    <>
                        {peoples!.map((people, index) => (
                            <Box
                                key={index}
                                w={"3/4"}
                                h={"10vh"}
                                bgColor={"white"}
                                mx={"auto"}
                                shadow={"sm"}
                                rounded={"lg"}
                                color={"black"}
                                display={"flex"}
                                flexDir={"row"}

                            >
                                {people.image ? (
                                    people.image?.startsWith('http') ? (
                                        <Image src={people.image} alt="Profile Image" width={60} height={60} />
                                    ) : (
                                        <Image src={`/uploads/profile/${people.image}`} alt="Profile Image" width={60} height={60} />
                                    )
                                ) : (
                                    <UserCircleIcon className="text-slate-500" />
                                )}
                                {JSON.stringify(people)}
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
