import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";
import type { NextAuthConfig } from "next-auth";
// import { showSession } from "./lib/signin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const providerConfigs: Provider[] = [
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
    // async profile(profile) {
    //   // showSession({ session: profile })
    //   return { ...profile, id: profile.id.toString() };
    // },
  }),
  // Credentials({

  // })
];

export const config = {
  providers: providerConfigs,
};

export const authConfig = {
  ...config,
  pages: {
    signIn: "/auth",
    signOut: "/auth",
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
  },
} satisfies NextAuthConfig;

export const { signIn, signOut, handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
