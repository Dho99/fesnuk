'use server'

import { prisma } from "../prisma";
import { getUserIdSession } from "./user";

export async function getUserFriendId() {
    const user = await getUserIdSession();

    if (!user) return null;

    const userFriends = await prisma.friendList.findFirst({
        where: {
            userId: user?.id as string
        },
        include: {
            friends: {
                select: {
                    userFriendId: true
                }
            }
        }
    });

    // console.log(userFriends);
    return userFriends;

}

export async function getUserFriend() {
    const user = await getUserIdSession();

    if (!user) return null;

    const userFriends = await prisma.friendList.findFirst({
        where: {
            userId: user?.id as string
        },
        include: {
            friends: {
                include: {
                    friendData: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            image: true
                        }
                    }
                }
            }
        }
    });

    // console.log(userFriends);
    return userFriends;

}

export async function addFriend(userId: string) {
    const userSessionId = await getUserIdSession();

    if (!userSessionId) return null;

    let getFriendListId = await prisma.friendList.findFirst({
        where: {
            userId: userSessionId?.id
        },
        select: {
            id: true
        }
    })

    if (!getFriendListId) {
        const createFriendList = await prisma.friendList.create({
            data: {
                userId: userSessionId?.id as string
            }
        });

        getFriendListId = { id: createFriendList.id };


    };



    try {
        await prisma.friend.create({
            data: {
                friendListId: getFriendListId?.id as string,
                userFriendId: userId
            }
        });

        return {
            success: true,
            message: "User added to friendlist"
        }
    } catch (err) {
        if (err instanceof Error) return { success: false, message: err.message }
    }
}


export async function removeFriend(userId: string) {
    const userSessionId = await getUserIdSession();

    if (!userSessionId) return null;

    try {
        const getFriendListId = await prisma.friendList.findFirst({
            where: {
                userId: userSessionId?.id
            }
        });

        if (!getFriendListId) return null;

        await prisma.friend.deleteMany({
            where: {
                friendListId: getFriendListId?.id as string,
                userFriendId: userId as string
            }
        })

        return {
            success: true,
            message: "Friend deleted from FriendList"
        }
    } catch (err) {
        if (err instanceof Error) return { success: false, message: err.message }
    }
}