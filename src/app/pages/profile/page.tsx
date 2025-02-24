import { auth } from "@/auth";
import ProfileForms from "./forms";
import { Box, Center, Text } from "@chakra-ui/react";

export default async function Page() {
  const session = await auth();

  const userData = session?.user;

  return (
    <Box>
      <Text textStyle={"3xl"} fontWeight={"bold"} color={"black/80"}>
        Account Details
      </Text>
      <Center my={3}>
        {userData ? <ProfileForms userData={userData} /> : <></>}
      </Center>
    </Box>
  );
}
