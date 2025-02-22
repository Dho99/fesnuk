"use server"

import { prisma } from "../prisma";
import { hashPassword } from "../utils";
import z from "zod";
import { userValidateSchema } from "../zodSchema";
import { signOut } from "@/auth";

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


export async function deleteUser(email: string){
  try{
    await prisma.user.delete({
      where: {
        email: email
      }
    });
    await signOut();
  }catch(err){
    if(err instanceof Error){
      return {
        success: false,
        message: err.message
      }
    }
  }
}