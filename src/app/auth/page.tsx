import { Box, Flex, Button } from "@chakra-ui/react";

import Image from "next/image";
import GoogleIcon from "@/../public/icons/googleIcon.png";
import GithubIcon from "@/../public/icons/githubIcon.png";
import LoginForm from "@/components/parts/auth";
import { signIn, providerMap } from "@/lib/handler/auth";

export default function Page() {

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
        {/* {JSON.stringify(session)} */}

        <LoginForm />

        <Flex
          flexDir={{ lg: "row", md: "column", base: "column" }}
          gap="4"
          justifyContent={"center"}
        >
          {/* {JSON.stringify(providerMap)} */}


          {Object.values(providerMap).map((provider, index) => (
            <form
              key={index}
              action={async () => {
                "use server";

                await signIn(provider.id);

              }}>

              <Button
                border={"1px solid"}
                type="submit"
                w="full"
                rounded="lg"
                py="2"
                px="10"
              >
                <Image
                  priority
                  src={provider.name == "GitHub" ? GithubIcon : provider.name == "Google" ? GoogleIcon : ""}
                  alt="Github Icon"
                  width={25}
                  height={25}
                />
              </Button>
            </form>
          ))}

        </Flex>
      </Flex>
    </Box>
  );
}
