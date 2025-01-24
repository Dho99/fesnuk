"use client";

import { Text, Box, Center, Flex, Input, Button, Link } from "@chakra-ui/react";
import {
  ArrowRightEndOnRectangleIcon as LoginIcon,
  EnvelopeOpenIcon as Email,
  LockClosedIcon as Password,
  UserIcon,
} from "@heroicons/react/24/outline";
import { InputGroup } from "@/components/ui/input-group";
import Image from "next/image";
import GoogleIcon from "@/../public/icons/googleIcon.png";
import FacebookIcon from "@/../public/icons/facebookIcon.png";
import GithubIcon from "@/../public/icons/githubIcon.png";
import { useState } from "react";
import { signIn } from "@/auth";
import Form from "next/form";

export default function Page() {
  const [isLoginPage, setLoginPage] = useState<boolean>(true);

  return (
    <Box
      w="full"
      h="full"
      justifyContent={"center"}
      display={"flex"}
      overflow={"auto"}
      color={"black"}
      py={{ xl: 0, lg: 10, md: 10, base: 10 }}
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
        <Box
          bgColor={"white"}
          h="14"
          w="14"
          shadow={"md"}
          p="3"
          rounded={"lg"}
          mx={"auto"}
        >
          <LoginIcon className="size-8" />
        </Box>
        <Box mt="9" mb="1">
          <Text textStyle="3xl" fontWeight={"bold"} textAlign={"center"}>
            {isLoginPage ? "Sign in" : "Register"} fesnuk.
          </Text>
        </Box>
        <Box>
          <Text textStyle={"md"} color={"gray.600"} textAlign={"center"}>
            {isLoginPage ? "Sign in" : "Register"} fesnuk. for enjoying some
            amazing features, for connecting you to around the world
          </Text>
        </Box>
        <Box mt="10" mb={isLoginPage ? "4" : "0"}>
          <InputGroup
            flex="1"
            startElement={<Email className="size-7" />}
            w="full"
            rounded="xl"
          >
            <Input
              placeholder="Email"
              border="1px solid #d1d1d1"
              py="6"
              ps="4em"
              rounded={"2xl"}
              bgColor="gray.100"
              shadow="xs"
              _focus={{ bgColor: "white" }}
            />
          </InputGroup>
        </Box>

        {!isLoginPage ? (
          // Input field for register session
          <Flex gap="4" my="4" flexDir={"column"}>
            <Box w="full">
              <InputGroup
                flex="1"
                startElement={<UserIcon className="size-7" />}
                w="full"
                rounded={"2xl"}
              >
                <Input
                  placeholder="Username"
                  border="1px solid #d1d1d1"
                  py="6"
                  ps="4em"
                  rounded={"2xl"}
                  bgColor="gray.100"
                  shadow="xs"
                  _focus={{ bgColor: "white" }}
                />
              </InputGroup>
            </Box>
          </Flex>
        ) : (
          <></>
        )}

        <Box>
          <InputGroup
            flex="1"
            startElement={<Password className="size-7" />}
            w="full"
            rounded={"2xl"}
          >
            <Input
              placeholder="Password"
              border="1px solid #d1d1d1"
              py="6"
              ps="4em"
              type="password"
              rounded={"2xl"}
              bgColor="gray.100"
              shadow="xs"
              _focus={{ bgColor: "white" }}
            />
          </InputGroup>
        </Box>

        {isLoginPage ? (
          <>
            <Box my="4" ms="auto">
              <Link textStyle={"md"} fontWeight={"bold"}>
                Forgot Password ?
              </Link>
            </Box>
            <Box>
              <Button
                bgColor={"black"}
                color="white"
                w="full"
                rounded={"xl"}
                py={6}
              >
                <Text textStyle={"lg"}>Sign in</Text>
              </Button>
            </Box>

            <Box mt="4">
              <Link w="full">
                <Button
                  border={"1px solid "}
                  color="black"
                  w="full"
                  rounded={"xl"}
                  py={6}
                  onClick={() => {
                    setLoginPage(false);
                  }}
                >
                  <Text textStyle={"lg"}>Register</Text>
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <>
            <Box my="4" ms="auto">
              <Link
                textStyle={"md"}
                fontWeight={"bold"}
                onClick={() => {
                  setLoginPage(true);
                }}
              >
                Already Have an Account ?
              </Link>
            </Box>
            <Box>
              <Button
                bgColor={"black"}
                color="white"
                w="full"
                rounded={"xl"}
                py={6}
              >
                <Text textStyle={"lg"}>Register Now !</Text>
              </Button>
            </Box>
          </>
        )}
        <Box my="8" position={"relative"}>
          <Box
            borderTopWidth="2px"
            borderStyle={"dashed"}
            borderColor={"gray.400"}
          >
            <Center>
              <Box
                position="absolute"
                w="max"
                px={2}
                bgColor={"white"}
                top={-2.5}
              >
                <Text color={"gray.600"} fontWeight={"bold"}>
                  Or {isLoginPage ? "Sign in" : "Register"} with
                </Text>
              </Box>
            </Center>
          </Box>
        </Box>
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
            <Form
              action={async () => {
              await signIn("github");
              }}
            >
              <Button border={"1px solid"} type="submit" rounded="lg" py="2" px="10">
              <Image priority src={GithubIcon} alt="Github Icon" width={25} />
              </Button>
            </Form>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
