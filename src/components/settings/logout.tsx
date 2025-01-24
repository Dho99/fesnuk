import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
  return (
    <Flex flexDir="column" w="full" h="90vh" justifyContent={"center"}>
      <Box
        w="full"
        display="flex"
        flexDir={"column"}
        color="black"
        alignItems={"center"}
      >
        <Text textStyle={"lg"}>Apakah anda akan mengakhiri sesi ?</Text>
        <Flex direction={"row"} gapX={4} mt={3}>
          <Button
            variant="solid"
            bgColor={"gray.500"}
            color="white"
            px={4}
            py={2}
          >
            Tetap Disini
          </Button>
          <Button
            variant="solid"
            bgColor={"red.600"}
            color="white"
            px={4}
            py={2}
            onClick={() => {router.push('/auth')}}
          >
            Sign Out
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
