import { Button, Text, Box } from "@chakra-ui/react"
import { signIn } from "@/auth"
import { auth } from "@/auth"
 
export default async function Page(){
    const session = await auth();

    return (
        <>
        <form action={async() => {
            "use server"
            await signIn("github")
        }}>
            <Button type={"submit"} p="3" bgColor={"gray.500"}>Sign in with GitHub</Button>
        </form>

        <Box>
            <Text textStyle={"lg"} color="white">Auth Status : {!session ? "Not Authenticated" : "Authentication Success"}</Text>
            {session ? (<Text color="white">{JSON.stringify(session)}</Text>) : <></>}    
        </Box>
        </>
    )


}

