import prisma from "../../../../libs/PrismaClient/prisma";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest) => {
  return NextResponse.json({ data: "Success!" })
}

interface RequestData {
  username: string,
  email: string,
  password: string,
}

interface UserData {
  id: string,
  username: string,
  email: string,
  password: string
  created_at: string,
  updated_at: string
}

export const POST = async(req: NextRequest) => {
  try {
    const { username, email, password }: RequestData = await req.json()
    
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const data: UserData = { id, username, email, password: hashedPassword, created_at: createdAt, updated_at: updatedAt }

    const newUser = await prisma.users.create({ data });

    return NextResponse.json({ status: 201, message: "Account " + newUser.username + " created successfully" });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ status: 400, message: "Email or username are already exists" })
    }
    return NextResponse.json({ status: 500, message: "Internal server error. An unexpected error occurred. Please try again" })
  }
}