import Pusher from "pusher-js"

export const pusherClient = new Pusher('93999d19e892daf67b95', {
    cluster: 'ap1'
});