import { Flex, Box, Text } from "@chakra-ui/react";
import {
  FaceSmileIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Events from "@/components/parts/events";
import Post from "@/components/parts/post";

export default function Page() {
  return (
    <Flex direction={"row"} color={"black"} gapX={{lg: 8, md: 0}} position={"relative"} justifyContent={{lg: "start", md: "center"}}>
      <Flex flexBasis={{lg: "60%", md: "90%"}} direction={"column"}>
        <Flex
          direction={"row"}
          bg={"white"}
          px="5"
          py="4"
          rounded="xl"
          shadow="xs"
        >
          <Box flexBasis={"10%"}>
            <Box
              bgColor={"gray.300"}
              rounded={"full"}
              w={12}
              h={12}
              textAlign={"center"}
              alignContent={"center"}
            >
              d
            </Box>
          </Box>
          <Box flexBasis={"50%"} alignContent={"center"}>
            <Text textStyle={"lg"} color={"gray.500"}>
              What's New ?
            </Text>
          </Box>
          <Box flexBasis={"20%"} alignContent={"center"} ms={"auto"}>
            <Flex direction="row" gapX={5}>
              <FaceSmileIcon className="size-8" />
              <PhotoIcon className="size-8" />
              <EllipsisHorizontalIcon className="size-8" />
            </Flex>
          </Box>
        </Flex>
        <Flex mt="8" direction={"column"} gapY="5">
          <Post />
          <Post />
          <Post />
        </Flex>
      </Flex>
      <Box position={"relative"}>
        <Events />
      </Box>
    </Flex>
  );
}
