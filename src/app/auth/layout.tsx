import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box bgColor={"gray.300"} h="dvh" w="dvw">
      {children}
    </Box>
  );
}
