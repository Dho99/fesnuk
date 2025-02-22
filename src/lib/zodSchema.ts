import { z } from "zod"

export const userValidateSchema = z.object({
    email: z.string().email("Invalid email format"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordValidate: z.string().min(6),
})