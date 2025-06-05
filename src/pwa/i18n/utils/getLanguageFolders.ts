import fs from "fs";
import path from "path";

/**
 * Mengambil semua nama folder (bahasa) dalam folder locales
 */
export function getLanguageFolders(): string[] {
  const localeDir = path.join(process.cwd(), "src", "pwa", "i18n", "locales");

  const folders = fs
    .readdirSync(localeDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return folders;
}
