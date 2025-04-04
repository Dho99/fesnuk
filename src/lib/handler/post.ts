"use server";

import { prisma } from "../prisma";
import { auth } from "@/lib/handler/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getUserDataById } from "./user";
import { CommentProps } from "../definition";
import { storeImage } from "../utils";

export async function getAllPosts() {
  const session = await auth();

  const userData = await getUserDataById(session?.user?.id as string);

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

export async function getUserPost(userId: string) {
  const getPosts = await prisma.post.findMany({
    where: {
      userId: userId as string
    },
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


  return getPosts;
}

export async function createPost(formData: FormData) {

  const session = await auth();

  if (!session)
    return {
      success: false,
      message: "Not authenticated",
    };

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
    return {
      success: false,
      message: "Failed to create Post, please re-check your input",
    };

  try {
    const getUserId = await prisma.user.findFirst({
      where: {
        email: session.user && (session.user.email as string),
      },
    });

    const post = await prisma.post.create({
      data: {
        description: validate.data!.description as string,
        userId: getUserId!.id,
      },
    });

    const postImgLen = formData.get("postImgLen");

    if (postImgLen && parseInt(postImgLen as string) > 0) {
      for (let i = 0; i < parseInt(postImgLen as string); i++) {
        const formDataImg = new FormData();
        const file = formData.get(`uploadImgs[${i}]`) as File;
        formDataImg.append("image", file as Blob);

        const test = await storeImage(formDataImg, '/post');

        if (test?.success) {
          await prisma.postImage.create({
            data: {
              postId: post?.id as string,
              imagePath: '/post/' + test?.message
            }
          })
        } else {
          return {
            success: false,
            message: test?.message
          }
        }
      }
    }


    return {
      success: true,
      message: "Post created successfuly",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message
      };

    }
    return {
      success: false,
      message: "An unknown error occurred",
    };
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
    return "Post Commented";
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

export async function getComments(
  postId: string,
  limit: number
): Promise<CommentProps[] | null> {
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

export async function likePost(postId: string, userId: string) {
  const getUser = await getUserDataById(userId);

  if (!getUser) return null;

  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!getPost) return null;

  try {
    await prisma.like.create({
      data: {
        postId: getPost.id as string,
        userId: getUser?.id as string,
      },
    });

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
          image: true,
        },
      },
    },
  });

  // console.log(likes);
  return likes;
}
