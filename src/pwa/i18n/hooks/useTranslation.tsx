import { I18nNs } from "../types/i18next";
import { useTranslation as useTranslationOriginal } from "next-i18next";

export function useTranslation() {
  const ret = useTranslationOriginal<[I18nNs]>();

  return ret;
}
