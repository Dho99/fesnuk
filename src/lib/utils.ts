import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { hash, genSalt } from "bcrypt-ts"
import path from "path";
import { Buffer } from "buffer";
import z from 'zod';
import fs from 'fs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPassword = async (raw: string) => {
  const hashRawPswd = await genSalt(10).then((salt) => hash(raw, salt));
  return hashRawPswd;
}

export const daysFromToday = (date: Date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const differenceInTime = now.getTime() - targetDate.getTime();

  const differenceInMinutes = Math.ceil(differenceInTime / (1000 * 60));
  const differenceInHours = Math.ceil(differenceInTime / (1000 * 3600));
  const differenceInSec = Math.ceil(differenceInTime / (100 * 60));


  if (differenceInSec < 60) {
    return `${differenceInSec} Seconds`
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} Minutes`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} Hours`;
  } else {
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return `${differenceInDays} Days`;
  }
};

export const formatDate = (date: Date) => {
  const format = new Date(date).toLocaleTimeString();
  return format;
}

export async function storeImage(formData: FormData, storeDir: string | null) {

  const imageFile = formData.get("image") as File;
  const timestamp = Date.now();
  const fileExtension = path.extname(imageFile.name);
  const fileName = `${timestamp}${fileExtension}`;
  const newFileName = fileName;
  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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

  if (!uploadPath) return {
    success: false,
    message: "Upload Path doesn't exist"
  }

  const filePath: string = path.join(uploadPath + storeDir, newFileName);

  try {
    fs.writeFileSync(
      filePath,
      imageBuffer
    );

    if (storeDir) {
      return {
        success: true,
        message: newFileName
      }
    }
    return {
      success: true,
      message: "Image Stored Succesfully"
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