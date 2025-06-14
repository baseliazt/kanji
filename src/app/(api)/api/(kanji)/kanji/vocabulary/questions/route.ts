import { NextRequest, NextResponse } from "next/server";
import { createApiResponse } from "@/api/utils/dto";
import { VocabularyController } from "@/api/modules/vocabulary/controllers";
import { VocabularyService } from "@/api/modules/vocabulary/services";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const controller = new VocabularyController();
  const service = new VocabularyService();

  let apiRequest: { query: { vocabularies: string } } | undefined;
  try {
    apiRequest = await controller.getVocabularyQuestion(request);
  } catch (err) {
    return NextResponse.json(
      createApiResponse(
        false,
        [],
        "Validation failed",
        (
          err as ZodError<{
            vocabularies: string;
          }>
        ).flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  try {
    const data = await service.getVocabularyQuestionList(apiRequest.query);

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
