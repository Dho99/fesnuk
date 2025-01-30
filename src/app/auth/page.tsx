import { Box, Flex, Button } from "@chakra-ui/react";

import Image from "next/image";
import GoogleIcon from "@/../public/icons/googleIcon.png";
import FacebookIcon from "@/../public/icons/facebookIcon.png";
import GithubIcon from "@/../public/icons/githubIcon.png";
import LoginForm from "@/components/parts/auth";
import { auth } from "@/auth";

import { signIn } from "@/auth";

export default async function Page() {
  const session = await auth()

  return (
    <Box
      w="full"
      h="full"
      justifyContent={"center"}
      display={"flex"}
      overflow={"auto"}
      color={"black"}
      alignItems={"center"}
      py={{ xl: 10, lg: 10, md: 10, base: 10 }}
      px={{ xl: 10, lg: 20, md: 20, base: 5 }}
    >
      <Flex
        bgColor={"white"}
        rounded="4xl"
        w="max"
        minH="80vh"
        my="auto"
        flexDir={"column"}
        py={10}
        px={"3em"}
        shadow="md"
        
        >
        {JSON.stringify(session)}

        <LoginForm />
       
        <Flex
          flexDir={{ lg: "row", md: "column", base: "column" }}
          gap="4"
          justifyContent={"center"}
        >
          {/* <ProviderSignIn /> */}
          <Button border={"1px solid"} rounded="lg" py="2" px="10">
            <Image priority src={GoogleIcon} alt="Google Icon" width={25} />
          </Button>
          <Button border={"1px solid"} rounded="lg" py="2" px="10">
            <Image priority src={FacebookIcon} alt="Facebook Icon" width={25} />
          </Button>
          <Box>
            <form
              onSubmit={async () => {
                "use server"
                await signIn("github");
              }}
            >
              <Button border={"1px solid"} type="submit" w="full" rounded="lg" py="2" px="10">
              <Image priority src={GithubIcon} alt="Github Icon" width={25} />
              </Button>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
