"use server";

import { prisma } from "../prisma";
import { auth } from "@/lib/handler/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getUserData } from "./user";
import { CommentProps } from "../definition";

export async function getAllPosts() {
  const session = await auth();

  const userData = await getUserData(session?.user?.email);

  if (!userData) return null;

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    relationLoadStrategy: "join",
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      images: true,
      likes: true,
      comments: true,
    },
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
  if (!validate.success)
    return "Failed to create Post, please re-check your input";

  try {
    const getUserId = await prisma.user.findFirst({
      where: {
        email: session.user && (session.user.email as string),
      },
    });

    await prisma.post.create({
      data: {
        description: validate.data!.description as string,
        userId: getUserId!.id,
      },
    });
    revalidatePath("/pages/home");
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return "An unknown error occurred";
  }
}

export async function postComments(prevState: unknown, formData: FormData) {
  const postId = await findPost(formData.get("postId") as string);
  if (!postId!.success) return "Post not found";

  const comment = formData.get("description") as string;

  const validate = z.string().min(1).safeParse(comment);
  if (!validate.success) return "Unable to post comments";

  const session = await auth();
  if (!session) return "Not authenticated";

  const getUserId = await prisma.user.findFirst({
    where: {
      email: session.user && (session.user.email as string),
    },
  });

  try {
    await prisma.comment.create({
      data: {
        description: validate.data as string,
        postId: postId!.data!.id as string,
        authorId: getUserId!.id,
      },
    });
    return "Post Commented"
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return err;
  }
}

export async function findPost(id: string) {
  const argId = id as string;

  try {
    const postData = await prisma.post.findFirst({
      where: {
        id: argId as string,
      },
    });
    return {
      success: true,
      data: postData,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export async function getComments(postId: string, limit: number): Promise<CommentProps[] | null> {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      relationLoadStrategy: "join",
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });


    return comments;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return null;
    }
    return null;
  }
}

export async function likePost(postId: string, userEmail: string) {


  const getUser = await getUserData(userEmail);

  if (!getUser) return null;

  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!getPost) return null;

  try {
    const cteLike = await prisma.like.create({
      data: {
        postId: getPost.id as string,
        userId: getUser?.id as string
      },
    });

    if (cteLike) {
      console.log("Posted")
    }



    revalidatePath("/pages/home");
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export async function showLikes(postIdArg: string) {
  const likes = await prisma.like.findMany({
    relationLoadStrategy: "join",
    where: {
      postId: postIdArg,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });



  // console.log(likes);
  return likes;
}

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};


