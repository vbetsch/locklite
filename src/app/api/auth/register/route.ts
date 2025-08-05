import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import type { User } from '@prisma/generated';

export async function POST(
  req: NextRequest
): Promise<
  | NextResponse<{ message: string }>
  | NextResponse<{ id: string; email: string }>
> {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    const exists: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (exists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: StatusCodes.CONFLICT }
      );
    }
    const salt: number = 10;
    const hashed: string = await hash(password, salt);
    const user: User = await prisma.user.create({
      data: { email, password: hashed },
    });
    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: StatusCodes.CREATED }
    );
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
