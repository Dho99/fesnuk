'use server'

import { prisma } from "../prisma";
import { getUserDataSession } from "./user";
import { pusherServer } from "./pusher";

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
                    user: true,
                },
            },
            messages: true,
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
                    user: true,
                },
            },
            messages: true
        },
    });

    const authUser = await getUserDataSession();


    return {
        authUser: authUser,
        chatData: chats
    }


}

export async function serverSendMessage(formData: FormData, convId: string) {
    const senderId = await getUserDataSession();

    const message = formData.get('messageBody') as string;

    try {

        const saveMesage = await prisma.message.create({
            data: {
                message: message as string,
                senderId: senderId?.id as string,
                chatId: convId as string,
            }
        })
        // console.log(data)

        await pusherServer.trigger(convId, 'new-message', saveMesage);


        return true;
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
    }
}