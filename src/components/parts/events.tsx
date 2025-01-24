import { Flex, Box, Text } from "@chakra-ui/react";
import { PlusCircleIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Events() {
  return (
    <Flex position={"fixed"} gapY="3"  direction={"column"} w={{xl: "28%", lg: "30%"}} hideBelow={"lg"} >
      <Flex
        flexBasis={"100%"}
        bgColor={"white"}
        shadow={"xs"}
        rounded={"xl"}
        direction={"column"}
        p={5}
      >
        <Box
          display="flex"
          direction="row"
          borderBottom={"1px solid black"}
          pb="4"
        >
          <Text textStyle="xl" fontWeight={"bold"}>
            Upcoming Events
          </Text>
          <Box className="ms-auto">
            <PlusCircleIcon className="size-8" />
          </Box>
        </Box>
      </Flex>

      <Flex
        flexBasis={"100%"}
        bgColor={"white"}
        shadow={"xs"}
        rounded={"xl"}
        direction={"column"}
        p={5}
      >
        <Box
          display="flex"
          direction="row"
          borderBottom={"1px solid black"}
          pb="4"
        >
          <Text textStyle="xl" fontWeight={"bold"}>
            Advertising
          </Text>
          <Box className="ms-auto">
            <XMarkIcon className="size-8" />
          </Box>
        </Box>
      </Flex>

      <Flex
        flexBasis={"100%"}
        bgColor={"white"}
        shadow={"xs"}
        rounded={"xl"}
        direction={"column"}
        p={5}
      >
        <Box
          display="flex"
          direction="row"
          borderBottom={"1px solid black"}
          pb="4"
        >
          <Text textStyle="xl" fontWeight={"bold"}>
            Birthdays
          </Text>
          <Box className="ms-auto">
            <EllipsisHorizontalIcon className="size-8" />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
