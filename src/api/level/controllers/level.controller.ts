import { NextRequest } from "next/server";
import { getLevelListRequestDTO } from "../dto/level_list.get";

export class LevelController {
  constructor() {}
  async getLevelList(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = {
      level: searchParams.get("level"),
      category: searchParams.get("category"),
    };

    const result = getLevelListRequestDTO.safeParse(query);

    return result;
  }
}
