// app/api/openapi/route.ts
import { openApiDocument } from "@/api/utils/openapi";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(openApiDocument);
}
