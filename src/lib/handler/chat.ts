'use server'

import { prisma } from "../prisma";
import { getUserDataSession } from "./user";
import { pusherServer } from "./pusher";

export async function getAllChats() {

    const userSession = await getUserDataSession();

    if (!userSession) return null;

    const chats = await prisma.chat.findMany({
        where: {
            rooms: {
                some: {
                    userId: userSession?.id
                }
            }
        },
        include: {
            user: true,
            messages: {
                take: 1,
                orderBy: {
                    created_at: 'desc'
                }
            },
            rooms: {
                include: {
                    user: true
                }
            }
        },
    })

    if (!chats) return null;

    return {
        authUser: userSession,
        chats: chats
    }

}

export async function addConversation(friendId: string) {
    const userSession = await getUserDataSession();

    try {

        const findExistingChatId = await prisma.chat.findFirst({
            where: {
                userId: userSession?.id as string,
                rooms: {
                    some: {
                        userId: friendId as string
                    }
                }
            }
        })

        if (!findExistingChatId) {
            const createChatSession = await prisma.chat.create({
                data: {
                    userId: userSession?.id as string,
                    rooms: {
                        createMany: {
                            data: [
                                { userId: userSession!.id },
                                { userId: friendId as string },
                            ]
                        }
                    }
                }
            });

            if (createChatSession) {
                const getCreatedChatSession = await prisma.chat.findFirst({
                    where: {
                        id: createChatSession?.id as string
                    },
                    include: {
                        user: true,
                        messages: true,
                        rooms: {
                            include: {
                                user: true
                            }
                        }
                    },
                })
                await pusherServer.trigger('new-conversation', `newconv${friendId}`, getCreatedChatSession);

            }


            return {
                success: true,
                message: createChatSession.id
            }
        }



        return {
            success: true,
            message: findExistingChatId.id
        }

        // console.log(findExistingChatId);





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
            messages: true,
            rooms: {
                include: {
                    user: true
                }
            }
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
        });

        const savedMessage = await prisma.chat.findFirst({
            where: {
                id: convId as string
            },
            include: {
                user: true,
                messages: true,
                rooms: {
                    include: {
                        user: true
                    }
                }
            },
        });
        // console.log(data)

        await pusherServer.trigger(convId, 'new-message', saveMesage);

        // push event to user for update its last message state in chat bar at layout
        const chatReceiverId = savedMessage?.rooms
            .map(room => room.user)
            .find(user => user.id !== senderId?.id)?.id;

        if (chatReceiverId) {
            await pusherServer.trigger(`new-conversation`, `newconv${chatReceiverId}`, savedMessage);
        }
        await pusherServer.trigger(`new-conversation`, `newconv${senderId?.id}`, savedMessage);


        return true;
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
    }
}