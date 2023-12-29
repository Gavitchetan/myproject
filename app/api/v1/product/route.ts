

import { getCurrentUser } from "@/actions/getcurrentuser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const POST = async (request: Request) => {
    try {
        // console.log(prisma,'prisma')
        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.error();
        }

        const body = await request.json();
        const { name, price, brand, description, inStock, images, category } = body;

        console.log(body)
        console.log('Received product data:', { name, price, brand, description, inStock, category });
        const product = await prisma.product.create({
            data: {
                name,
                images,
                price: Number(price),
                inStock,
                category,
                description,
                brand,
            },
        });


        return NextResponse.json({ product });
    } catch (error) {
        console.error('Error while processing request:', error);
        return NextResponse.error();
    }
};
