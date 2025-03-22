import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"

export default function Page() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-2">
                <ChatBubbleBottomCenterTextIcon className="size-14 text-slate-700 m-auto" />
                <p className="text-md">Start new Chat by Add Conversation or choose chat session on the left side</p>
            </div>
        </div>
    )
}