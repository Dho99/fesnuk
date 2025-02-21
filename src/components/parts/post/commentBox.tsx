"use client";

import { Box, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { postComments } from "@/lib/handler/post";
import { useEffect } from "react";
import { useActionState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";


type CommentProps = {
  postId: string;
  callback: () => Promise<void>;
};

export function CommentBox({ postId, callback }: CommentProps) {
  const [state, dispatch] = useActionState(postComments, undefined);

  useEffect(() => {
    if (state === "Post Commented") {
      callback();

    }
  }, [state, callback]);

  return (
    <Box p="2">
      <form action={dispatch} className="flex">
        <Input type="hidden" name="postId" value={postId} />
        <InputGroup
          flex="1"
          endElement={
            <Button
              type="submit"
            >
              <PaperAirplaneIcon className="size-7 text-black" />
            </Button>
          }
          w="full"
        >
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
