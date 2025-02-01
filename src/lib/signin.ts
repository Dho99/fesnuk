'use server'

import { prisma } from "./prisma";
// import { AuthError } from "next-auth";
import { z } from "zod"
import type { User } from "./definition";
import { genSalt, hash } from "bcrypt-ts"
import { userValidateSchema } from "./zodSchema";


export async function getUser(formData: FormData): Promise<User | boolean | void> {
    const email = formData.get('email') as string;
    const validatePayload = z.string().email().safeParse(email)

    if (!validatePayload.success) throw 'Input Validation Error';

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if (!user) return false
    return user

}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {

    try {
        // const findUser = await getUser(formData);
        // console.log(findUser)
    } catch (error) {
        return error
    }

}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const findUser = await getUser(formData);
        if (findUser) throw "User found, Login Instead";
        registerUser(formData);

    } catch (error) {
        return "Unexpected error occured";
    }

}

const registerUser = async (formData: FormData): Promise<void | boolean> => {

    const password = formData.get("password") as string
    const userForm = {
        name: formData.get("name") as string,
        password: await genSalt(10).then((salt) => hash(password, salt)),
        email: formData.get("email") as string
    }

    try {
        const validatedData = userValidateSchema.parse(userForm);
        try {
            const { email, name, password } = validatedData
            await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: password
                }
            }).then(() => {
                console.log("successfuly created");
            }).catch((err) => {
                console.log("err : " + err)
            })
        } catch (err) {
            console.log("Failed create data : ", err)
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation errors:', error);
        } else {
            throw error;
        }
    }

}