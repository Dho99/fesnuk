import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

type SessionParams = {
    session: JSON|object|string|undefined
}

export const showSession = ({session}: SessionParams) :void => {
    console.log(session)
}