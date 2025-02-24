"use server"

import { prisma } from "../prisma";
import { hashPassword } from "../utils";
import { userValidateSchema } from "../zodSchema";
import { signOut } from "@/auth";
import fs from 'fs';
import path from "path";
import { Buffer } from "buffer";
import { auth } from "@/auth";
import z from 'zod';
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export async function getUserProfile(email: string | undefined | null) {
  const userProfile = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });

  if (!userProfile) return null;

  return userProfile;
}

export async function getUserData(email: string | undefined | null) {
  const userProfile = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });

  if (!userProfile) return null;
  return userProfile;
}

export async function updateUserData(prevState: unknown, formData: FormData) {
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


export async function deleteUser(userEmail: string){
    await prisma.user.delete({
      where: {
        email: userEmail as string
      }
    }).then(async() => {
      await signOut();

    })
}

export async function changeProfile(prevState: unknown, formData: FormData){
  const imageFile = formData.get("image") as File;

  const imageValidateSchema = z.object({
    imageFile: z
      .any()
      .refine(() => imageFile?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        () => ACCEPTED_IMAGE_TYPES.includes(imageFile?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
  })

  const validation = imageValidateSchema.safeParse({ imageFile });

  if (!validation.success) {
    return {
      success: false,
      message: JSON.stringify(validation.error.errors.map((err) => err.message).join(", ")),
    };
  }

  
  const buffer = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(buffer);

  const uploadPath: string = path.resolve(process.env.UPLOAD_DIR as string);

  if(!uploadPath) return {
    success: false,
    message: "Upload Path doesn't exist"
  }

  const session = await auth();

  if(!session) return;

  const filePath: string = path.join(uploadPath+'/profile', imageFile.name);

  try{
    fs.writeFileSync(
      filePath,
      imageBuffer
    );

    await prisma.user.update({
      where: {
        email: session?.user?.email as string
      },
      data: {
        image: imageFile.name
      }
    });

    return {
      success: true,
      message: "Image Updated Succesfully"
    }

  }catch(err){
    if(err instanceof Error){
      return {
        success: false,
        message: err.message
      }
    }
  }


}

export const removeProfileImage = async(userEmail: string) => {
  try{
    await prisma.user.update({
      where : {
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
  }catch(err){
    if(err instanceof Error){
      return {
        success: false,
        message: err.message
      }
    }
  }
}