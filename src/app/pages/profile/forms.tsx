"use client";

import { Text, Box, Alert } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import Image from "next/image";
import { ArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { updateUserData, deleteUser } from "@/lib/handler/user";
import { CloseButton } from "@/components/ui/close-button";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import ImageForm from "./imageForm";

type ProfileFormProps = {
  userData: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
};

export default function ProfileForms({ userData }: ProfileFormProps) {
  const router = useRouter();
  const [state, submitHandler] = useActionState(updateUserData, undefined);

  const deleteAccount = async (email: string) => {
    if (confirm("Apakah anda ingin menghapus akun ? ")) {
      await deleteUser(email);
    }
  };

  const [isEditImage, setEditImage] = useState<boolean>(false);

  function editImage() {
    setEditImage(!isEditImage);
  }

  function closeState() {
    setEditImage(false);
  }

  const [imgState, setImgState] = useState<string | null>(null);

  function imagePreview(filename: FileList|null) {
    if(!filename) return;
    const fileURL = URL.createObjectURL(filename[0]);
    setImgState(fileURL);
  }

  const [uploadStatus, setUploadStatus] = useState<{success: boolean|null, message: string|null}>({
    success: null,
    message: null
  });

  return (
    <Box
      placeContent={"center"}
      justifySelf={"center"}
      bgColor={"white"}
      shadow={"md"}
      color={"black"}
      w={"full"}
      p={4}
      rounded={"lg"}
      display={"flex"}
      flexDir={"column"}
      gapY={5}
    >
         {uploadStatus.success ? (
         <Alert.Root
            status={uploadStatus.success ? "success" : "error"}
            variant={"solid"}
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{uploadStatus.success ? "Success" : "Error"}</Alert.Title>
              <Alert.Description>{uploadStatus.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <></>
        )}
      <Box
        w={"100%"}
        borderWidth={"1px"}
        borderColor={"blackAlpha.300"}
        p={3}
        rounded={"md"}
      >
        
        <Box
          display={"inline-flex"}
          flexDir={{ lg: "row", base: "column" }}
          color={"black"}
          gapX={8}
          gapY={6}
          w={"full"}
          justifyContent={{ lg: "start", base: "center" }}
          alignItems={"center"}
        >
          
          <Box rounded={"full"} overflow={"hidden"} maxW={"100px"} maxH={"100px"}>
            {imgState ? (
              <>
              <img src={imgState} alt="Preview Image" width={"100px"} height={"100px"}/></>
            ) : (
              <>
                {userData && userData.image ? (
                  <Image
                    src={userData.image}
                    width={100}
                    height={100}
                    alt={"Profile Image"}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
          </Box>
       
          <Box
            display={"flex"}
            flexDir={{ md: "row", base: "column" }}
            gap={"3"}
            position={"relative"}
            w={"full"}
          >
            {isEditImage ? (
              <ImageForm closeState={closeState} imagePreview={imagePreview} setUploadStatus={setUploadStatus}/>
            ) : (
              <>
                <button
                  className={
                    "border text-sky-600 rounded-2xl text-sky-600 border-sky-600 hover:bg-sky-600 transition-all transition-duration-300 h-min py-3 px-6 hover:text-white flex items-center gap-x-3"
                  }
                  onClick={editImage}
                >
                  <ArrowUpIcon className="size-5 font-bold" />
                  <Text>Update Image</Text>
                </button>
                <button
                  className={
                    "border text-slate-600 rounded-2xl border-slate-600 hover:bg-red-600 transition-all transition-duration-300 h-min py-3 px-6 hover:text-white flex items-center gap-x-3 hover:border-red-600"
                  }
                >
                  <TrashIcon className="size-5 font-bold" />
                  <Text>Remove Image</Text>
                </button>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        w={"100%"}
        borderWidth={"1px"}
        borderColor={"blackAlpha.300"}
        p={5}
        rounded={"md"}
        display={"flex"}
        flexDir={"column"}
        gapY={"5"}
        borderRadius={"lg"}
      >

        {state ? (
          <Alert.Root
            status={state.success ? "success" : "error"}
            variant={"solid"}
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{state.success ? "Success" : "Error"}</Alert.Title>
              <Alert.Description>{state.message}</Alert.Description>
            </Alert.Content>
            {/* <CloseButton pos="relative" ms={"auto"} top="-2" insetEnd="-2"/> */}
          </Alert.Root>
        ) : (
          <></>
        )}

        <form action={submitHandler} className="w-full">
          <Box display={"flex"} flexDir={"column"} gapY={5}>
            <Field label="Email" required>
              <input
                required
                readOnly
                type="text"
                name={"email"}
                className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline "
                defaultValue={userData?.email ? userData?.email : ""}
              />
            </Field>

            <Field label="Name" required>
              <input
                required
                type="text"
                name={"name"}
                className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline"
                defaultValue={userData?.name ? userData?.name : ""}
              />
            </Field>

            <Field label="New Password" required>
              <input
                required
                type="password"
                name={"password"}
                className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline"
                defaultValue={""}
              />
            </Field>

            <Field label="Validate New Password" required>
              <input
                required
                type="password"
                name={"passwordValidate"}
                className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline"
                defaultValue={""}
              />
            </Field>

            <Box
              display={"flex"}
              flexDir={{ md: "row", base: "column" }}
              w={"full"}
              gap={3}
            >
              <button
                className={
                  "bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-all transition-duration-400"
                }
                type={"submit"}
              >
                Save Changes
              </button>
              <button
                className={
                  "border border-slate-500 text-slate-800 py-3 px-6 rounded-lg hover:bg-slate-700 transition-all transition-duration-400 hover:text-white"
                }
                type="button"
              >
                Cancel
              </button>
              <button
                className={
                  "border border-red-600 text-red-600 py-3 px-6 rounded-lg hover:bg-red-600 transition-all transition-duration-400 hover:text-white md:ms-auto"
                }
                type="button"
                onClick={async () => {
                  await deleteAccount(userData.email as string);
                }}
              >
                Delete Account
              </button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
