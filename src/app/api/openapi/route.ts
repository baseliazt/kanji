// app/api/openapi/route.ts
import { openApiDocument } from "@/lib/openapi";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(openApiDocument);
}
