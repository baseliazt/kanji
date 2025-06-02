import { NextRequest, NextResponse } from "next/server";
import { createApiResponse } from "@/api/utils/dto";
import { LevelService } from "@/api/modules/level/services";
import { LevelController } from "@/api/modules/level/controllers";

export async function GET(request: NextRequest) {
  const controller = new LevelController();
  const service = new LevelService();

  const validation = await controller.getLevelList(request);
  if (!validation.success) {
    return NextResponse.json(
      createApiResponse(
        false,
        [],
        "Validation failed",
        validation.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  try {
    const data = await service.getLevelList();

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
