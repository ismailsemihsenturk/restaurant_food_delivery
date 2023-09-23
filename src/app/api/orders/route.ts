import { NextRequest, NextResponse } from "next/server"
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {

    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(JSON.stringify({ message: "You are not authenticated!" }), { status: 401 });
    }

    try {
        if (session.user.isAdmin) {
            const orders = await prisma.order.findMany();
            console.log("orders: " + JSON.stringify(orders));
            return new NextResponse(JSON.stringify(orders), { status: 200 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userEmail: session.user.email!,
            }
        });
        return new NextResponse(JSON.stringify(orders), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }

}

export const POST = () => {
    return new NextResponse("Hello", { status: 200 });
}
