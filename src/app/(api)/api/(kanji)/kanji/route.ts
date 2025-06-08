import { NextRequest, NextResponse } from "next/server";
import { KanjiController } from "@/api/modules/kanji/controllers";
import { createApiResponse } from "@/api/utils/dto";
import { KanjiService } from "@/api/modules/kanji/services";

export async function GET(request: NextRequest) {
  const controller = new KanjiController();
  const service = new KanjiService();

  const apiRequest = await controller.getKanjiList(request);

  try {
    const data = await service.getKanjiList(apiRequest?.query);

    return NextResponse.json(
      createApiResponse(true, data, "Data fetched successfully")
    );
  } catch (error) {
    return NextResponse.json(
      createApiResponse(
        false,
        [],
        "Failed to fetch data",
        error instanceof Error ? error.message : "Unknown error"
      ),
      {
        status: 500,
      }
    );
  }
}
