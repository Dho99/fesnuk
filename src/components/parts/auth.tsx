"use client";

import React, { useState } from "react";
import { Box, Input, Text, Center, Flex, Button, Link } from "@chakra-ui/react";
import {
  ArrowRightEndOnRectangleIcon as LoginIcon,
  EnvelopeOpenIcon as Email,
  LockClosedIcon as Password,
  UserIcon,
} from "@heroicons/react/24/outline";
import { InputGroup } from "@/components/ui/input-group";
import { authenticate, register } from "@/lib/signin";
import { useActionState } from "react";

export default function LoginForm(): React.ReactNode {
  const [isLoginPage, setLogin] = useState<boolean>(true);

  const [errorRegister, handleRegister] = useActionState(register, undefined);

  const [errorLogin, handleLogin] = useActionState(authenticate, undefined);

  const setLoginPage = (): void => {
    setLogin(!isLoginPage);
  };

  return (
    <div>
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
      {/* <Text color={"black"}>{JSON.stringify(isLoginPage)}</Text> */}
      <Box mt="9" mb="1">
        <Text textStyle="3xl" fontWeight={"bold"} textAlign={"center"}>
          {isLoginPage ? "Sign in" : "Register"} fesnuk.
        </Text>
      </Box>
      {isLoginPage ? (
        <>
          {typeof errorLogin == "string" && (
            <Text color={"red.500"} textAlign={"center"}>
              {errorLogin}
            </Text>
          )}
        </>
      ) : (
        <>
         {typeof errorRegister == "string" && (
            <Text color={"red.500"} textAlign={"center"}>
              {errorRegister}
            </Text>
          )}</>
      )}

      <Box>
        <Text textStyle={"md"} color={"gray.600"} textAlign={"center"}>
          {isLoginPage ? "Sign in" : "Register"} fesnuk. for enjoying some
          amazing features, for connecting you to around the world
        </Text>
      </Box>
      <form action={isLoginPage ? handleLogin : handleRegister}>
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
              name="email"
              required
            />
          </InputGroup>
        </Box>
        {/* {JSON.stringify(userData)} */}
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
                  name="name"
                  required
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
              name={"password"}
              required
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
                type="submit"
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
                    setLoginPage();
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
                  setLoginPage();
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
                type={"submit"}

                // onClick={() => { register({ data: userData }) }}
              >
                <Text textStyle={"lg"}>Register Now !</Text>
              </Button>
            </Box>
          </>
        )}
      </form>

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
    </div>
  );
}
