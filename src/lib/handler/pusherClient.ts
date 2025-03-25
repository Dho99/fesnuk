import Pusher from "pusher-js"

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string
});