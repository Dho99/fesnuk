
import { Box, Text } from "@chakra-ui/react";
import { getUserPost } from "@/lib/handler/post";
import { getUserDataSession } from "@/lib/handler/user";
import Post from "@/components/parts/post/post";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getUserFriend } from "@/lib/handler/friend";
import type { Friend, Post as PostType, User } from "@/lib/definition";
import { EditProfileButton } from "./partialcomponent";

type ProfilePage = {
    authUser: User | null;
    posts: PostType[];
    friends: Friend[];

}

export default async function Page() {
    const authUserData: ProfilePage["authUser"] = await getUserDataSession();
    const posts: ProfilePage["posts"] = await getUserPost(authUserData?.id as string);
    const friends: ProfilePage["friends"] = (await getUserFriend())?.friends || [];

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
                                <EditProfileButton />
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
                    <Box w={"1/3"} display={"flex"} flexDir={"column"} gap={5}>
                        {
                            friends.length > 0 ? (
                                friends.map((friend: Friend, index: number) => (
                                    <Box p={5} rounded={"lg"} bg={"white"} display={"flex"} flexDir={"row"} gap={5} key={index}>
                                        <Box bg={"black/20"} rounded={"full"} w={"14"} h={"14"}></Box>
                                        <Box>
                                            <Text textStyle={"lg"} fontWeight={"bold"}>{friend.friendData.name}</Text>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box p={5} rounded={"lg"} bg={"white"} display={"flex"} flexDir={"row"} gap={5} justifyContent={"center"}>
                                    <Text textStyle={"lg"} fontWeight={"bold"}>Not have any Friend</Text>
                                </Box>
                            )
                        }

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}