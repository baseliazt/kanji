import { NextRequest } from "next/server";
import { getKanjiListQueryRequest } from "../dtos/list.get";

export class KanjiController {
  constructor() {}
  async getLevelList(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = {
      level: searchParams.get("level"),
      category: searchParams.get("category"),
    };

    const result = getKanjiListQueryRequest.safeParse(query);

    return result;
  }
}
