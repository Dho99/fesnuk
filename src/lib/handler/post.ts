"use server";

import { prisma } from "../prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return posts;
}

export async function createPost(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session) return "Not authenticated";

  const payload = {
    description: formData.get("description") as string,
  };

  const validate = z
    .object({
      description: z
        .string()
        .min(3, { message: "Must be 5 or more characters long" }),
    })
    .safeParse(payload);
    if (!validate.success) return "Failed to create Post, please re-check your input"

  try{

      const getUserId = await prisma.user.findFirst({
          where: {
              email: session.user && session.user.email as string
          }
      });

      await prisma.post.create({
          data: {
              description: validate.data!.description as string,
              userId: getUserId!.id
          }
      });
      revalidatePath('/pages/home');

  } catch (err) {
      if (err instanceof Error) {
          return err.message;
      }
      return "An unknown error occurred";
  }

  // console.log(validate)
}
