import { Box, Flex } from "@chakra-ui/react";
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
        w={"full"}
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
            maxH="90vh"
            flexDir={"column"}
            rounded={{ xl: "none", lg: "none", md: "lg", sm: "lg", base: "lg" }}
            gap={2}
          >
            <Menu />
          </Flex>
          <Box p="5" overflow={"auto"} h="90vh" w={"full"}>
            {children}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
