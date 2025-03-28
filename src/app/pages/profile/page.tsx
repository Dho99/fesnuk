import { Box, Text } from "@chakra-ui/react";
import { getUserPost } from "@/lib/handler/post";
import { getUserDataSession } from "@/lib/handler/user";
import Post from "@/components/parts/post/post";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function Page() {
    const authUserData = await getUserDataSession();
    const posts = await getUserPost(authUserData?.id as string);

    return (
        <Box w={"full"} h={"full"} color={"black"} display={"flex"} mb={20}>
            <Box w={"full"} h={"full"} rounded={"lg"} display={"flex"} flexDir={"column"} overflow={"hidden"} gapY={5}>
                <Box>

                    <Box bg={"black/10"} h={"10%"} w={"full"} p={"70px"} />

                    <Box h={"full"} bg={"white"} p={5} position={"relative"} top={0} display={"flex"} justifyContent={"center"}>
                        <Box w={"11/12"} flexDir={"row"} display={"flex"} gap={5}>
                            <Box bg={"black/20"} shadow={"lg"} h={48} w={48} rounded={"full"} marginTop={-20} overflow={"hidden"}>
                                <Image src={authUserData?.image as string} alt={`${authUserData?.name} Profile`} width={500} height={500} /></Box>
                            <Box p={2} display={"flex"} flexDir={"row"} gap={5} minW={"1/3"}>
                                <Box flexDir={"column"} display={'flex'}>
                                    <Text textStyle={"2xl"} fontWeight={"bold"}>{authUserData?.name}</Text>
                                    <Text>{`@${authUserData?.username}`}</Text>
                                    <Text>{authUserData?.biography}</Text>
                                </Box>
                                <button className="bg-blue-700 shadow-lg text-white px-5 py-2 rounded-xl ms-auto h-fit ">Edit Profile</button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box w={"full"} display={"flex"} flexDir={"row"} gap={4}>
                    <Box w={"3/4"} display={"flex"} flexDir={"column"} gap={4}>
                        {
                            posts.length > 0 ? (
                                <Post pageProps={authUserData} posts={posts} />
                            ) : (
                                <Box bg={"white"} rounded={"lg"} p={10} display={"flex"} justifyContent={"center"}>
                                    <Box flexDir={"column"} display={"flex"}>
                                        <QuestionMarkCircleIcon className="size-12 text-black/80 m-auto" />
                                        <Text textStyle={"xl"} fontWeight={"bold"} color={"black/80"}>No Post were Created</Text>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                    <Box w={"1/2"} bg={"white"} rounded={"lg"} p={4}>Posts</Box>
                </Box>
            </Box>
        </Box>
    )
}