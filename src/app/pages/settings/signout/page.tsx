import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/handler/auth";

export default async function Logout() {
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
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: '/auth' })
          }}>
            <Button
              variant="solid"
              bgColor={"red.600"}
              color="white"
              px={4}
              py={2}
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
}
