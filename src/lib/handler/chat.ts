'use server'

import { prisma } from "../prisma";
import { getUserDataSession } from "./user";

export async function getAllChats() {

    const userSession = await getUserDataSession();

    if (!userSession) return null;

    const chats = await prisma.room.findMany({
        where: {
            userId: userSession?.id
        },
        include: {
            messages: true
        }
    })

    if (!chats) return null;

    return chats
}



