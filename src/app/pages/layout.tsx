import { Flex, Box, Link } from "@chakra-ui/react";
import Navbar from "@/components/parts/navbar";
import Menu from "@/components/settings/menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      direction={"row"}
      maxH={"dvh"}
      h={"dvh"}
      overflow={"hidden"}
      bgColor={"gray.200"}
      gapX={5}
    >
      <Box
        hideBelow={"lg"}
        flexBasis={{ xl: "20%", lg: "0%" }}
        position={"relative"}
        shadow={"xs"}
        overflowY={"auto"}
        overflowX={"hidden"}
      >
        <Navbar />
      </Box>
      <Box flexBasis={"100%"} pt={10} overflowY="scroll" position={"relative"}>
            <Box maxW={"98%"} justifyContent={"center"} mx={{ lg: 0, base: "auto" }}>
        {children}

            </Box>
      </Box>
    </Flex>
  );
}
