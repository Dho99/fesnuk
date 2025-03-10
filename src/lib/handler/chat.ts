'use server'

import { prisma } from "../prisma";
import { getUserDataSession } from "./user";

export async function getAllChats() {

    const userSession = await getUserDataSession();

    if (!userSession) return null;

    const chats = await prisma.chat.findMany({
        where: {
            userId: userSession?.id
        },
        include: {
            rooms: {
                include: {
                    user: {
                        select: {
                            id: true,
                            image: true,
                            name: true
                        }
                    },
                    messages: {
                        orderBy: {
                            created_at: 'desc'
                        },
                        take: 1
                    }
                }
            },
            user: true
        }
    })

    if (!chats) return null;

    return chats
}

export async function addConversation(friendId: string) {
    const userSession = await getUserDataSession();

    try {

        const findRoom = await prisma.room.findFirst({
            where: {
                userId: friendId as string
            },
            include: {
                chat: true
            }
        });


        if (findRoom) {
            return {
                success: true,
                message: findRoom.chat.id
            }
        } else {

            const createChatSession = await prisma.chat.create({
                data: {
                    userId: userSession?.id as string,
                    rooms: {
                        create: [
                            { userId: friendId as string },
                            { userId: userSession?.id as string },
                        ]
                    }
                }
            });


            return {
                success: true,
                message: createChatSession.id
            }
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



export async function getConversationInfo(chatId: string) {
    const chats = await prisma.chat.findFirst({
        where: {
            id: chatId as string
        },
        include: {
            user: true,
            rooms: {
                include: {
                    user: true
                },
            },
            messages: true
        },
    });

    return chats;
}

