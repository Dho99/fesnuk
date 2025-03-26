import { Box, Text } from "@chakra-ui/react";

export default function Page() {
    return (
        <Box w={"full"} h={"full"} color={"black"} p={3} display={"flex"} flexDir={"column"}>
            <Text textStyle={"3xl"} fontWeight={"bold"} color={"black/80"}>
                Account Details
            </Text>
            <Box w={"full"} h={"full"} my={3} shadow={"sm"} rounded={"lg"} display={"flex"} flexDir={"column"} overflow={"hidden"}>
                <Box bg={"black/10"} h={"10%"} minW={"full"} p={"70px"}></Box>
                <Box h={"full"} w={"full"} bg={"white"} p={5}>Profile</Box>
            </Box>
        </Box>
    )
}