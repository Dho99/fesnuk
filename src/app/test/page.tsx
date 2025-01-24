import { Button, Text } from "@chakra-ui/react"
import { signIn } from "@/auth"
 
export default function Page(){
    return (
        <form action={async() => {
            "use server"
            await signIn("github")
        }}>
            <Button type={"submit"} p="3" bgColor={"gray.500"}>Sign in with GitHub</Button>
        </form>
    )
}