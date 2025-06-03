import { I18nNs } from "../types/i18next";
import "../utils/i18n";
import { useTranslation as useTranslationOriginal } from "react-i18next";

export function useTranslation() {
  //   const ret = useTranslationOriginal<["common", Exclude<I18nNs, "common">]>();
  const ret = useTranslationOriginal<[I18nNs]>();
  //   const { i18n } = ret;
  //   const { lang } = useLanguage();

  //   // LanguageDetector doesn't work on server, so we need to manually change
  //   // the language if the lang cookie doesn't match initial language
  //   if (isServer && i18n.resolvedLanguage !== lang) {
  //     void i18n.changeLanguage(lang);
  //   }

  return ret;
}
