"use server";

import { prisma } from "./prisma";
import { z } from "zod";
import type { User } from "./definition";
import { userValidateSchema } from "./zodSchema";
import { signIn } from "@/auth";
import { hashPassword } from "./utils";
import { compare } from "bcrypt-ts";

export async function getUser(formData: FormData) {
  const email = formData.get("email") as string;
  const validatePayload = z.string().email().safeParse(email);

  if (!validatePayload.success) throw "Input Validation Error";

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) return false;
  return user;
}

export async function authenticate(prevState: unknown, formData: FormData) {
  try {
    const findUser = await getUser(formData);
    const passwordInput = formData.get("password") as string;
    const hashPasswordInput = await hashPassword(passwordInput);
    if (!findUser) return "User not found";

    const userFound = {
      email: findUser.email,
      password: findUser.password,
    };

    if (!userFound.password)
      return "User registered, choose another Authentication Method";

    const comparePassword = await compare(passwordInput, userFound.password);
    if (!comparePassword) return "Password mismatch";
    await signIn("credentials", userFound);
    return undefined;
  } catch (error) {
    throw error;
  }
}

export async function register(prevState: unknown, formData: FormData) {
  try {
    const findUser = await getUser(formData);
    if (findUser) return "User found, Login Instead";

    const register = await registerUser(formData);
    if (!register) return "Register failed";

    return "Register Completed, please login";
  } catch (error) {
    throw error;
  }
}

const registerUser = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const userForm = {
    name: formData.get("name") as string,
    password: await hashPassword(password),
    email: formData.get("email") as string,
  };

  try {
    const validatedData = userValidateSchema.parse(userForm);
    try {
      const { email, name, password } = validatedData;

      const createUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });

      if (!createUser) return "Register Failed";
      return true;
    } catch (err) {
      return JSON.stringify(err);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error);
    } else {
      throw error;
    }
  }
};
