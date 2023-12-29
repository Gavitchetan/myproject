import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export const POST = async (request: Request) => {
    try {

        const body = await request.json()
        const { email, password, name, avatar } = body.data

        console.log(body, 'body data')
  
        if (!email || !password || !name || !avatar) {
            return NextResponse.error()
        }

        const HashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: HashedPassword,
                role: 'user',
                avatar: avatar
            }
        })

        return NextResponse.json({
            message: "user is creted Succesfully",
            user: user
        })

    } catch (error) {
        NextResponse.error()
    }
}