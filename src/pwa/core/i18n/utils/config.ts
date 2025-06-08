import type { UserConfig } from "next-i18next";
import path from "path";

export const fallbackLng = "en-US";
export const languages = [fallbackLng];
export const defaultNS = "kanji_selection";

export const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: fallbackLng,
    locales: languages,
  },
  localePath: path.resolve("./generated/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
