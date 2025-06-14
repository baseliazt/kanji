import { NextRequest, NextResponse } from "next/server";
import { getVocabularyQuestionListQueryRequest } from "../dtos/question_list.get";
import { createApiResponse } from "@/api/utils/dto";

export class VocabularyController {
  constructor() {}
  async getVocabularyQuestion(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = {
      vocabularies: searchParams.get("vocabularies"),
    };

    const queryValidation =
      getVocabularyQuestionListQueryRequest.safeParse(query);

    if (!queryValidation.success) {
      throw queryValidation.error;
    }

    return {
      query: queryValidation.data,
    };
  }
}
