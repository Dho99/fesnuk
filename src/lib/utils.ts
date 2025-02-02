import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { hash, genSalt } from "bcrypt-ts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPassword = async (raw: string): Promise<string | null> => {
  const hashRawPswd = await genSalt(10).then((salt) => hash(raw, salt));
  return hashRawPswd;
}
