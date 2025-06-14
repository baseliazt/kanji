import { NextRequest } from "next/server";
import { getVocabularyExercisesQueryRequest } from "../dtos/exercises.get";

export class VocabularyController {
  constructor() {}
  async getVocabularyExercises(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = {
      vocabularies: searchParams.get("vocabularies"),
    };

    const queryValidation = getVocabularyExercisesQueryRequest.safeParse(query);

    if (!queryValidation.success) {
      throw queryValidation.error;
    }

    return {
      query: queryValidation.data,
    };
  }
}
