import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";

import bcrypt from "bcryptjs"

import GoogleProvider from "next-auth/providers/google"
import GitHubProvier from "next-auth/providers/github"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prisma"


export const authOptions: AuthOptions = ({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvier({
            clientId: process.env.github_id as string,
            clientSecret: process.env.github_secret as string
        }),

        CredentialProvider({
            name: ' credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                console.log(credentials)

                if (!credentials?.email || !credentials) {
                    throw new Error('Invalid Email And Password')
                }
                const user = await prisma.user.findFirst({
                    where: {
                        email: String(credentials.email),
                    }
                })
                const isMatch = bcrypt.compare(credentials.password, user?.hashedPassword as string)
                if (!isMatch) {
                    throw new Error('Email and password are not matched')
                }

                return user
            },

        })
    ],
    pages: {
        signIn: "/login"
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET as string
})

export default NextAuth(authOptions)

export { NextAuth as GET, NextAuth as POST }
