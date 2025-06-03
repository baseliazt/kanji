import type { UserConfig } from "next-i18next";
import path from "path";

export const fallbackLng = "en-GB";
export const languages = [fallbackLng];
export const defaultNS = "common";

export const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: fallbackLng,
    locales: languages,
  },
  localePath: path.resolve("./locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
