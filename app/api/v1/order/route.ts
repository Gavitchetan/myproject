import { NextResponse } from "next/server"

export const POST = async (params: Request) => {

    try {
        return NextResponse.json({ message: "hello" })
    } catch (error) {
        return NextResponse.error()
    }
}