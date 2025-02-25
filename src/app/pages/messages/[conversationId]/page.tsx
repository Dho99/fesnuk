'use client'

import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function Messages() {
  const params = useParams<{ conversationId: string }>();
  return (
    <Box w={"full"}>{JSON.stringify(params)}</Box>

  );
}
