import path from "path";
import fs from "fs/promises";

export async function loadLocale(locale: string, namespace: string) {
  try {
    const filePath = path.resolve(
      process.cwd(),
      "src/pwa/i18n/locales",
      locale,
      `${namespace}.json`
    );
    console.log("Loading translation file:", filePath);
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load locale file:", error);
    throw error;
  }
}