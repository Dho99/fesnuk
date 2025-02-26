'use server'

import { prisma } from "../prisma";
import { getUserIdSession } from "./user";

export async function getUserFriend() {
    const user = await getUserIdSession();

    if (!user) return null;

    const userFriends = await prisma.friendList.findFirst({
        where: {
            userId: user?.id as string
        },
        include: {
            friends: true
        }
    });

    return userFriends;

}

export async function addFriend(userId: string) {
    const userSessionId = await getUserIdSession();

    if (!userSessionId) return null;

    const getFriendListId = await prisma.friendList.findFirst({
        where: {
            userId: userId
        },
        select: {
            id: true
        }
    })

    try {
        await prisma.friend.create({
            data: {
                friendListId: getFriendListId?.id as string,
                userId: userSessionId?.id
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
