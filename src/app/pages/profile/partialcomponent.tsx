'use client'
import { useRouter } from "next/navigation";

export function EditProfileButton(): React.ReactNode {
    const router = useRouter();
    return (
        <button
            className="bg-blue-700 shadow-lg text-white px-5 py-2 rounded-xl ms-auto h-fit"
            onClick={() => {
                router.push('/pages/settings/account');
            }}
        >
            Edit Profile
        </button>
    );
}
