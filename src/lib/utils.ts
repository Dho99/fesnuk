import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { hash, genSalt } from "bcrypt-ts"

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


export const returnErrMsg = (err: Error) => {
  return {
    success: false,
    message: err.message
  }
}