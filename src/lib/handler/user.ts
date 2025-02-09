import { prisma } from "../prisma"

export async function getUserPhoto(email: string|undefined|null){
    const userProfile = await prisma.user.findFirst({
        where: {
            email: email as string
        }
    });

    if(!userProfile) return null;

    return userProfile.image;
}

export async function getUserData(email: string|undefined|null){
    const userProfile = await prisma.user.findFirst({
        where: {
            email: email as string
        }
    });

    if(!userProfile) return null;

    return userProfile;
}