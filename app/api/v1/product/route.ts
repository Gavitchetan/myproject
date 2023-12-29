// import { getCurrentUser } from "@/actions/getcurrentuser"
// import { NextRequest, NextResponse } from "next/server"
// import prisma from "@/libs/prisma";

// export const POST = async (request: Request) => {
//     try {
//         const user = await getCurrentUser();
//         if (!user || user.role !== "admin") {
//             return NextResponse.error()
//         }


//         const body = await request.json();
//         // console.log(body, 'body data ')
//         const { name, price, brand, description, inStock, images, category } = body;
//         console.log({ name: name }, { price: price }, { brand: brand }, { description: description }, { inStock: inStock }, { category: category })
//         const product = await prisma.product.create({
//             data: {
//                 name: name,
//                 images: images,
//                 price: Number(price),
//                 // userId: user.id,
//                 inStock: inStock,
//                 category: category,
//                 description: description,
//                 brand: brand,

//             }
//         })
//         // const CheckProductExistWithSameName =  
//         return NextResponse.json({
//             product: product
//         })
//     } catch (error) {
//         return NextResponse.error();
//     }
// }


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
