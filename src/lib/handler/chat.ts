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

export async function addConversation(friendId: string) {
    const userSession = await getUserDataSession();

    try {
        let findRoom = await prisma.chats.findMany({
            where: {
                userId: userSession?.id as string
            },
            include: {
                rooms: true
            },

        });


        if (!findRoom[0]) {
            const createRoom = await prisma.chats.create({
                data: {
                    userId: userSession?.id as string
                },
                include: {
                    rooms: true
                }
            })

            findRoom = new Array(createRoom);
        };


        await prisma.room.create({
            data: {
                userId: friendId as string,
                chatId: findRoom[0]?.id as string
            },
        })

        return {
            success: true,
            message: null
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


