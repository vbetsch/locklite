import {NextResponse} from 'next/server'
import prisma from "../../../../lib/prisma";

export async function GET() {
    try {
        const users = await prisma.credential.findMany()
        return NextResponse.json(users)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {message: 'An error has occurred.'},
            {status: 500}
        )
    }
}
