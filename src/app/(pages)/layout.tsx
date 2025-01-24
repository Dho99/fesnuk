import { Flex, Box } from "@chakra-ui/react";
import Navbar from "@/components/parts/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      direction={"row"}
      maxH={"dvh"}
      overflow={"hidden"}
      bgColor={"gray.200"}
      gapX={10}
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
        {children}
      </Box>
    </Flex>
  );
}
