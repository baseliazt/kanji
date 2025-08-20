import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const MnemonicSchema = z
  .object({
    id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    kanji_id: z
      .string()
      .openapi({ type: "string", example: "1", description: "Reference to Kanji ID" }),
    "id-ID": z
      .string()
      .openapi({ 
        example: "Anak itu lari ke depan lebih dulu—dia mau jadi yang paling dahulu (先)!", 
        description: "Mnemonic in Indonesian" 
      }),
    "en-US": z
      .string()
      .openapi({ 
        example: "The kid with horns runs ahead — he wants to go first (先)!", 
        description: "Mnemonic in English" 
      }),
  })
  .openapi("Mnemonic");

export const MnemonicListSchema = z.array(MnemonicSchema);

export type Mnemonic = z.infer<typeof MnemonicSchema>;
export type MnemonicList = z.infer<typeof MnemonicListSchema>;
