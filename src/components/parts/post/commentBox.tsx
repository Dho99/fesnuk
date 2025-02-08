"use client";

import { Box, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { getComments, postComments } from "@/lib/handler/post";
import { useActionState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
type CommentProps = {
  postId: string;
};

export function CommentBox({ postId }: CommentProps) {
  const [state, dispatch] = useActionState(postComments, undefined);

  return (
    <Box p="2">
      <form action={dispatch} className="flex">
        <Input type="hidden" name="postId" value={postId} />
        <InputGroup flex="1" endElement={<EmojiButton />} w="full">
          <Input
            placeholder="Add a comment..."
            variant={"outline"}
            border={"1px solid gray"}
            px="4"
            rounded="lg"
            name="description"
          />
        </InputGroup>
      </form>
    </Box>
  );
}

export function EmojiButton() {
  return (
    <Button type="submit">
      <PaperAirplaneIcon className="size-7 text-black" />
    </Button>
  );
}
