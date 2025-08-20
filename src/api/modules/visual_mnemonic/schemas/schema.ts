import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const VisualMnemonicSchema = z
  .object({
    id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    kanji_id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    "id-ID": z
      .string()
      .openapi({ 
        example: "Bagian atas seperti tanduk atau kepala (⺧)", 
        description: "Visual mnemonic in Indonesian" 
      }),
    "en-US": z
      .string()
      .openapi({ 
        example: "⺧ = something ahead / a shape leading", 
        description: "Visual mnemonic in English" 
      }),
  })
  .openapi("VisualMnemonic");

export const VisualMnemonicListSchema = z.array(VisualMnemonicSchema);

export type VisualMnemonic = z.infer<typeof VisualMnemonicSchema>;
export type VisualMnemonicList = z.infer<typeof VisualMnemonicListSchema>;
