import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { getUserData } from "./lib/handler/user";

export const providerConfigs: Provider[] = [
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,

  }),
  Credentials({
    authorize: async(credentials) => {
      return credentials
    }
  })
];

export const config = {
  providers: providerConfigs,
};

export const authConfig = {
  ...config,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPages = nextUrl.pathname.startsWith("/pages");
      if (isOnPages) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/pages/home", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
  },
} satisfies NextAuthConfig;

export const { signIn, signOut, handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
