"use client"

import { createContext, useState, useEffect } from "react";
import { auth } from "@/lib/handler/auth";
import { Session } from "next-auth";

export const UserContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<Session | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await auth();
            setAuthUser(user);
        };
        fetchUser();
    }, []);

    return (
        { children }
    );
}