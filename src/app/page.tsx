import { Flex, Box } from "@chakra-ui/react";

export default function Page() {
  return (
    <Flex direction={"row"}>
      <Flex flexBasis={"70%"} direction={"column"}>
        <Flex direction={"row"} bg={"white"} p="5" rounded="xl">
          <Box flexBasis={"10%"}>
            <Box bgColor={"gray.300"} rounded={"full"} w={12} h={12} textAlign={"center"} alignContent={"center"}>d</Box>
          </Box>
        </Flex>
      </Flex>
      <Flex flexBasis={"30%"}></Flex>
    </Flex>
  );
}
