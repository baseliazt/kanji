import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { KanjiCSVSchema } from "../schemas/csv";
import { KunyomiService } from "../../kunyomi/services";
import { OnyomiService } from "../../onyomi/services";
import { KanjiListSchema } from "../schemas/schema";
import { VocabularyService } from "../../vocabulary/services";

export class KanjiService {
  constructor() {}

  async getKanjiList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `Kanji.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<KanjiCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    const result = KanjiListSchema.safeParse(parsed.data);
    if (!result.success) {
      throw new Error("Internal server error");
    }
    const kanjiList = result.data;

    const kunyomiService = new KunyomiService();
    const kunyomiList = await kunyomiService.getList();

    const onyomiService = new OnyomiService();
    const onyomiList = await onyomiService.getList();

    const vocabularyService = new VocabularyService();
    const vocabularyList = await vocabularyService.getList();

    const data = kanjiList.map((kanji) => {
      return {
        ...kanji,
        kunyomi: kunyomiList.filter((kunyomi) => kunyomi.kanji_id === kanji.id),
        onyomi: onyomiList.filter((onyomi) => onyomi.kanji_id === kanji.id),
        vocabulary: vocabularyList.filter(
          (vocabulary) => vocabulary.kanji_id === kanji.id
        ),
      };
    });

    return data;
  }
}
