import { NextRequest, NextResponse } from "next/server";
import { getKanjiListQueryRequest } from "../dtos/list.get";
import { createApiResponse } from "@/api/utils/dto";

export class KanjiController {
  constructor() {}
  async getKanjiList(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = {
      level: searchParams.get("level"),
      id: searchParams.get("id"),
    };

    const queryValidation = getKanjiListQueryRequest.safeParse(query);

    if (!queryValidation.success) {
      NextResponse.json(
        createApiResponse(
          false,
          [],
          "Validation failed",
          queryValidation.error.flatten().fieldErrors
        ),
        { status: 400 }
      );
      return;
    }

    return {
      query: queryValidation.data,
    };
  }
}
