import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest) => {
  const data = {
    secretCode: nanoid(100),
  }
  return NextResponse.json({ data })
}
