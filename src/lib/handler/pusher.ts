import Pusher from 'pusher';

export const pusherServer = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET as string,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    useTLS: true
});


