import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { KanjiCSVSchema } from "../schemas/csv";
import { KunyomiService } from "../../kunyomi/services";
import { OnyomiService } from "../../onyomi/services";
import { KanjiListSchema } from "../schemas/schema";
import { VocabularyService } from "../../vocabulary/services";
import { MnemonicService } from "../../mnemonic/services";
import { VisualMnemonicService } from "../../visual_mnemonic/services";
import { GetKanjiListQueryRequest } from "../dtos/list.get";

export class KanjiService {
  constructor() {}

  async getKanjiList(query?: GetKanjiListQueryRequest) {
    const idQuery = query?.id;
    const levelQuery = query?.level;
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
    let kanjiList = result.data;

    const kunyomiService = new KunyomiService();
    const kunyomiList = await kunyomiService.getList();

    const onyomiService = new OnyomiService();
    const onyomiList = await onyomiService.getList();

    const vocabularyService = new VocabularyService();
    const vocabularyList = await vocabularyService.getList();

    const mnemonicService = new MnemonicService();
    const mnemonicList = await mnemonicService.getList();

    const visualMnemonicService = new VisualMnemonicService();
    const visualMnemonicList = await visualMnemonicService.getList();

    if (!!idQuery) {
      kanjiList = kanjiList.filter((kanji) =>
        idQuery
          .split(",")
          .map((id) => id)
          .includes(kanji.id)
      );
    }

    if (!!levelQuery) {
      kanjiList = kanjiList.filter((kanji) => kanji.level === levelQuery);
    }

    const data = kanjiList.map((kanji) => {
      // Use original id (before encoding) for matching with related data
      const originalId = (parsed.data.find(k => k.kanji === kanji.kanji)?.id || kanji.id);
      
      return {
        ...kanji,
        kunyomi: kunyomiList.filter((kunyomi) => kunyomi.kanji_id === originalId),
        onyomi: onyomiList.filter((onyomi) => onyomi.kanji_id === originalId),
        vocabulary: vocabularyList.filter(
          (vocabulary) => vocabulary.kanji_id === originalId
        ),
        mnemonic: mnemonicList.filter(
          (mnemonic) => mnemonic.kanji_id === originalId
        ),
        visualMnemonic: visualMnemonicList.filter(
          (visualMnemonic) => visualMnemonic.kanji_id === originalId
        ),
      };
    });

    return data;
  }
}
