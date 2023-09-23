import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions, User, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";


// Those are kinda extension for the types.To we are able to use the "isAdmin" field in the User table.
declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: Boolean;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: Boolean;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        async jwt({ token }) {
            const userInDb = await prisma.user.findUnique({
                where: {
                    email: token.email!
                }
            })
            token.isAdmin = userInDb?.isAdmin!;
            return token;
        }
    }
}

// To be able to use in server-side (api)
export const getAuthSession = () => getServerSession(authOptions)
