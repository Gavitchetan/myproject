import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import prisma from "@/libs/prisma"

export const getsesion = async () => {
    return await getServerSession(authOptions)
}



export const getCurrentUser = async () => {
    try {
        const sesion = await getsesion();
        if (!sesion?.user?.email) {
            return null
        }
        const user = await prisma.user.findFirst({
            where: {
                email: sesion.user.email
            },

        })
        if (!user) {
            return null
        }

        return {
            ...user,
            createdAt: user.createdAt.toString(),
            updatedAt: user.updateAt.toString(),
            emailVerified: user.emailVerified ? user.emailVerified.toString() : '',

        }
    } catch (error) {
        console.log('error while loging in')
        return null
    }
}