"use server"

import { prisma } from "../prisma";
import { hashPassword, storeImage } from "../utils";
import { userValidateSchema } from "../zodSchema";
import { signOut } from "@/lib/handler/auth";
import { auth } from "@/lib/handler/auth";

export async function getUserProfile(email: string | undefined | null) {
  const userProfile = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });

  if (!userProfile) return null;

  return userProfile;
}

export async function getUserDataById(userId: string) {
  const userProfile = await prisma.user.findFirst({
    where: {
      id: userId as string
    },
  });

  return userProfile;
}

export async function updateUserData(formData: FormData) {
  // Mengambil data dari FormData
  const userForm = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
    passwordValidate: formData.get("passwordValidate") as string,
  };

  // Validasi apakah password cocok
  if (userForm.password !== userForm.passwordValidate) {
    return {
      success: false,
      message: "Passwords do not match",
    };
    // return false;
  }

  // Validasi input menggunakan Zod
  const validation = userValidateSchema.safeParse(userForm);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((err) => err.message).join(", "),
    };
  }


  validation.data.password = await hashPassword(validation.data.password);
  try {
    const { email, name, password } = validation.data;


    await prisma.user.update({
      where: { email },
      data: { name, password },
    });

    return {
      success: true,
      message: "Your account has been updated successfully",
    };

  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An unexpected error occurred",
    };

  }
}


export async function deleteUser(userEmail: string) {
  await prisma.user.delete({
    where: {
      email: userEmail as string
    }
  }).then(async () => {
    await signOut();

  })
}

export async function changeProfile(formData: FormData) {
  const session = await getUserDataSession();
  const imageFile = formData.get("image") as File;

  try {

    await storeImage(formData, '/profile');

    await prisma.user.update({
      where: {
        email: session?.email as string
      },
      data: {
        image: imageFile.name
      }
    });

    return {
      success: true,
      message: "Profile Image updated succesfully"
    }

  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message
      }
    }
  }

}

export const removeProfileImage = async (userEmail: string) => {
  try {
    await prisma.user.update({
      where: {
        email: userEmail as string
      },
      data: {
        image: null
      }
    })
    return {
      success: true,
      message: "Profile Image deleted"
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message
      }
    }
  }
}

export async function getUserDataSession() {
  const session = await auth();

  if (!session) return null;

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email as string
    }
  });

  return user;
}

export async function getPeoples(skip: number, take: number) {
  const userData = await getUserDataSession();

  const peoples = await prisma.user.findMany({
    where: {
      NOT: {
        id: userData?.id
      }
    },
    skip: skip,
    take: take
  });

  return peoples;
}

