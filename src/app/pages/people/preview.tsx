import { Box, Text } from "@chakra-ui/react"
import Image from "next/image"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import React from "react";

type ComponentProps = {
    userData: {
        name: string | null;
        id: string;
        email: string;
        image: string | null
    },
    previewButtonAction: React.ReactNode
}

export default function PreviewPeople({ userData, previewButtonAction }: ComponentProps) {
    return (
        <Box
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
            alignItems={"center"}
        >
            <Box rounded={"full"} overflow={"hidden"}>
                {userData.image ? (
                    userData.image?.startsWith("http") ? (
                        <Image
                            src={userData.image}
                            alt="Profile Image"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={`/uploads/profile/${userData.image}`}
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
                    {userData.name}
                </Text>
                <Text textStyle={"lg"} fontWeight={""}>
                    {userData.email}
                </Text>
            </Box>
            {previewButtonAction}

        </Box>
    )
}