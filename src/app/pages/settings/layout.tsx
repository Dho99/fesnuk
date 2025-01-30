import { Box, Flex, Link, Text } from "@chakra-ui/react";
import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Logout from "@/components/settings/logout";
import Menu from "@/components/settings/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      justifyContent={{
        xl: "start",
        lg: "start",
        md: "center",
        sm: "center",
        base: "center",
      }}
      overflow={"hidden"}
      position={"relative"}
    >
      <Box
        w={{ xl: "98%", lg: "98%", md: "95%", sm: "95%", base: "95%" }}
        h="90vh"
        bgColor={"white"}
        rounded="lg"
      >
        <Flex
          direction={{
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            base: "column",
          }}
        >
          <Flex
            minWidth={"17%"}
            flexBasis={"17%"}
            shadow={"sm"}
            py={5}
            h="90vh"
            overflowY={"auto"}
            flexDir={"column"}
            rounded={{ xl: "none", lg: "none", md: "lg", sm: "lg", base: "lg" }}
            gap={2}
          >
            <Menu />
          </Flex>
          <Box p="5" h="full" w="full">
            {children}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
