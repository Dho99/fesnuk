"use client";

import { Flex, Box, Button, Textarea, Text } from "@chakra-ui/react";
import {
  FaceSmileIcon,
  PhotoIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { createPost } from "@/lib/handler/post";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MakePostProps = {
  session: string | null | undefined;
};

export default function MakePost({ session }: MakePostProps) {
  const [postMessage, setPostMessage] = useState<{ success: boolean, message: string } | null>(null);
  const [popupImgForm, setPopupImgForm] = useState<boolean>(false);
  const [postImgs, setPostImg] = useState<File[] | null>(null);
  const router = useRouter();

  async function postHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (postImgs) {
      postImgs.forEach((file, index) => {
        formData.append(`uploadImgs[${index}]`, file);
      });
    }

    formData.append("postImgLen", String(postImgs?.length || 0));

    const newPost = await createPost(formData);

    setPostMessage({ success: newPost?.success, message: newPost?.message as string });

    if (newPost?.success) {
      setPostImg(null);
      router.refresh();
    }
    setTimeout(() => {
      setPostMessage(null);
    }, 5000)


  }

  function appendPostImg(e: FormEvent) {
    const input = e.currentTarget as HTMLInputElement;
    if (input?.files) {
      setPostImg((prev) =>
        prev ? [...prev, input.files![0]] : [input.files![0]]
      );
    }
  }

  function showFormImage() {
    setPopupImgForm(!popupImgForm);
  }

  return (
    <div className={"relative"}>
      {postMessage && (
        <Box
          w=""
          bgColor={postMessage?.success ? "green/70" : "red/70"}
          p={4}
          rounded={"lg"}
          mb={5}
          color={"white"}
        >
          {postMessage?.message}
        </Box>
      )}

      <form onSubmit={postHandler}>
        {popupImgForm ? (
          <PopupFormImg
            showFormImage={showFormImage}
            appendPostImg={appendPostImg}
            postMessage={postMessage}
          />
        ) : (
          <></>
        )}
        <Flex
          direction={"row"}
          bg={"white"}
          px="5"
          py="4"
          rounded="xl"
          shadow="xs"
          alignItems={"center"}
          gap={2}
        >
          <Box flexBasis={"10%"}>
            <Box
              bgColor={"gray.300"}
              rounded={"full"}
              w={12}
              h={12}
              textAlign={"center"}
              alignContent={"center"}
              overflow={"hidden"}
            >
              {session && session ? (
                session.startsWith("http") ? (
                  <Image
                    src={session}
                    alt="Profile Image"
                    width={60}
                    height={60}
                  />
                ) : (
                  <Image
                    src={`/uploads/profile/${session}`}
                    alt="Profile Image"
                    width={60}
                    height={60}
                  />
                )
              ) : (
                <UserCircleIcon className="text-slate-500" />
              )}
            </Box>
          </Box>

          <Box flexBasis={"70%"} alignContent={"center"} display={"flex"}>
            <Textarea
              resize={"none"}
              w="100%"
              placeholder="What's New ?"
              alignContent={"center"}
              px="2"
              textStyle={"lg"}
              name={"description"}
            />
          </Box>
          <Box flexBasis={"20%"} alignContent={"center"} ms={"auto"}>
            <Flex
              direction="row"
              gapX={5}
              display={"flex"}
              alignItems={"center"}
            >
              <FaceSmileIcon className="size-8" />
              <PhotoIcon
                className="size-8 hover:cursor-pointer"
                onClick={showFormImage}
              />
              <Button type="submit">
                <PaperAirplaneIcon className="size-8 " />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    </div>
  );
}

export function PopupFormImg({
  showFormImage,
  appendPostImg,
  postMessage
}: {
  showFormImage: () => void;
  appendPostImg: (e: FormEvent) => void;
  postMessage: { success: boolean, message: string } | null
}): React.ReactNode {
  const [previewImgs, setImg] = useState<File[] | null>(null);

  function setPreviewImg(e: FormEvent) {
    const input = e.currentTarget as HTMLInputElement;
    appendPostImg(e);
    setImg((prev) => (prev ? [...prev, input.files![0]] : [input.files![0]]));
  }

  if (typeof postMessage == "boolean") setImg(null);

  return (
    <Box
      position={"absolute"}
      h={"auto"}
      w={"full"}
      bg={"white"}
      shadow={"lg"}
      rounded={"lg"}
      p={5}
      zIndex={1}
      display={"flex"}
      flexDir={"column"}
      gap={5}
    >
      <Box display={"flex"} flexDir={"row"}>
        <Text textStyle={"lg"} fontWeight={"bold"}>
          Add Post Image
        </Text>
        <XMarkIcon
          className="size-7 ms-auto hover:cursor-pointer"
          onClick={showFormImage}
        />
      </Box>
      <Box
        p={2}
        rounded={"lg"}
        border={"sm"}
        display={"flex"}
        flexDir={"column"}
      >
        <Text textStyle={"lg"}>Preview Image</Text>
        <Box display={"flex"} flexDir={"row"}>
          {previewImgs?.map((img, idx) => (
            <Image
              src={URL.createObjectURL(img)}
              alt={`Preview image ${idx + 1}`}
              key={idx}
              width={100}
              height={100}
            />
          ))}
        </Box>
      </Box>

      <input
        type="file"
        className="w-full border p-2 rounded-lg"
        multiple
        onInput={setPreviewImg}
      />
      <div className="flex flex-row w-full">
        <button
          type={"button"}
          className="bg-slate-300 shadow-md text-black p-2 rounded-lg w-fit"
          onClick={showFormImage}
        >
          Cancel{" "}
        </button>
        {previewImgs ? (
          <button
            type={"button"}
            onClick={showFormImage}
            className="bg-slate-800 shadow-md text-white p-2 rounded-lg w-fit ms-auto disabled"
          >
            Save Image{" "}
          </button>
        ) : (
          <></>
        )}
      </div>
    </Box>
  );
}
