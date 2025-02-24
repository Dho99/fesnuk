import { Text, Box } from "@chakra-ui/react";

export default function Messages() {
  return (
    <>
      <Text textStyle={"3xl"} fontWeight={"bold"} mb={3} color={"black/80"}>
        Messages
      </Text>
      <Box
        bg={"white"}
        rounded={"md"}
        shadow={"sm"}
        color={"black"}
        display={"flex"}
        flexDir={"row"}
        minH={"80vh"}
        maxH={"80vh"}
        overflow={"hidden"}
      >
        <Box maxW={"24%"} borderRight={"md"} maxH={"80vh"}>
          <Box overflowY={"auto"} maxH={"80vh"} p={3} gapY={2}>
            <Box display={"flex"} flexDir={"column"}></Box>
            {Array.from({ length: 10 }, (_, index) => (
              <Box
                py={"3"}
                borderY={"sm"}
                maxH={"100px"}
                overflow={"hidden"}
                borderColor={"black/50"}
              >
                <Text textStyle={"md"} fontWeight={"bold"} mb={2}>
                  Nigga
                </Text>
                <Text truncate>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Maxime dignissimos blanditiis atque nihil a vel libero esse id
                  distinctio doloremque?
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box w={"full"}></Box>
      </Box>
    </>
  );
}
