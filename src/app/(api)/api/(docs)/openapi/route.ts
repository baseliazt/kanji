// app/api/openapi/route.ts
import { openApiDocument } from "@/api/docs/openapi/documents";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(openApiDocument);
}
