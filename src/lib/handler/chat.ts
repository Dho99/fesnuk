'use server'

import { prisma } from "../prisma";
import { getUserDataSession } from "./user";
import { pusherServer } from "./pusher";

export async function getAllChats() {

    const userSession = await getUserDataSession();

    if (!userSession) return null;

    const chats = await prisma.chat.findMany({
        where: {
            OR: [
                {
                    userId1: userSession?.id
                },
                {
                    userId2: userSession?.id
                }

            ]
        },
        include: {
            messages: true,
            user1: true,
            user2: true
        }
    })

    if (!chats) return null;

    console.log(chats);

    return {
        authUser: userSession,
        chats: chats
    }
}

export async function addConversation(friendId: string) {
    const userSession = await getUserDataSession();

    try {


        const createChatSession = await prisma.chat.create({
            data: {
                userId1: userSession?.id as string,
                userId2: friendId as string,
            }
        });

        return {
            success: true,
            message: createChatSession.id
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
            user1: true,
            user2: true,
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