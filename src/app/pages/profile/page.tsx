import { Text, Box, Center, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import Image from "next/image";
import { auth } from "@/auth";
import { ArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
export default async function Page() {
  const session = await auth();

  const userData = session?.user;

  if (userData) {
    return (
      <Box maxW={"96%"} justifyContent={"center"} mx={{ lg: 0, base: "auto" }}>
        <Text textStyle={"3xl"} fontWeight={"bold"} color={"black/80"}>
          Account Details
        </Text>
        <Center my={3}>
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
            gap={5}
          >
            <Box
              w={"100"}
              border={"sm"}
              borderColor={"black/30"}
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
                <Box rounded={"full"} overflow={"hidden"}>
                  {userData && userData.image ? (
                    <Image
                      src={userData!.image}
                      width={100}
                      height={100}
                      alt={"Profile Image"}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
                <Box display={"flex"} flexDir={{md: "row", base: "column"}} gap={"3"}>
                  <button
                    className={
                      "border text-sky-600 rounded-2xl text-white border-sky-600 hover:bg-sky-600 transition-all transition-duration-300 h-min py-3 px-6 hover:text-white flex items-center gap-x-3"
                    }
                  >
                    <ArrowUpIcon className="size-5 font-bold" />
                    <Text>Update Image</Text>
                  </button>

                  <button
                    className={
                      "border text-slate-600 rounded-2xl text-white border-slate-600 hover:bg-red-600 transition-all transition-duration-300 h-min py-3 px-6 hover:text-white flex items-center gap-x-3 hover:border-red-600"
                    }
                  >
                    <TrashIcon className="size-5 font-bold" />
                    <Text>Remove Image</Text>
                  </button>
                </Box>
              </Box>
            </Box>
            <Box
              w={"100"}
              border={"sm"}
              borderColor={"black/30"}
              p={5}
              rounded={"md"}
              display={"flex"}
              flexDir={"column"}
              gapY={"5"}
              borderRadius={"lg"}
            >

                <Field label="Email" required>
                  <input type="text" name={"email"} className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline" defaultValue={userData?.email ? userData?.email : ""}/>
                </Field>

                <Field label="Name" required>
                  <input type="text" name={"name"} className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline" defaultValue={userData?.name ? userData?.name : ""}/>
                </Field>

                <Field label="New Password" required>
                  <input type="password" name={"password"} className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline" defaultValue={""}/>
                </Field>

                <Field label="Validate New Password" required>
                  <input type="password" name={"passwordValidate"} className="text-slate-600 w-full bg-transparent rounded-lg p-2 border-[0.5px] border-sky-600 focus:outline-sky-500 focus:outline" defaultValue={""}/>
                </Field>

                <Box display={"flex"} flexDir={{md: "row", base: "column"}} w={"full"} gap={3}>
                  <button className={"bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-all transition-duration-400"}>Save Changes</button>
                  <button className={"border border-slate-500 text-slate-800 py-3 px-6 rounded-lg hover:bg-slate-700 transition-all transition-duration-400 hover:text-white"}>Cancel</button>
                  <button className={"border border-red-600 text-red-600 py-3 px-6 rounded-lg hover:bg-red-600 transition-all transition-duration-400 hover:text-white md:ms-auto"}>Delete Account</button>
                </Box>

            </Box>
          </Box>
        </Center>
      </Box>
    );
  }
}
