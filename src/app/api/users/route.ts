// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CreateUserRequest, CreateUserResponse } from "@/schemas/user";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = CreateUserRequest.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const user = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  return NextResponse.json(CreateUserResponse.parse(user), { status: 201 });
}
