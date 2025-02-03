'use server'

import { prisma } from "../prisma";
import { auth } from "@/auth";

export async function getAllPosts(){
    const posts = await prisma.post.findMany()
    console.log(posts)
    return posts;
}

export async function createPost(
    prevState: unknown,
    formData: FormData
){
    const session = await auth();

    console.log({
        user: session,
        payload: formData.get("description") as string
    })
    
}