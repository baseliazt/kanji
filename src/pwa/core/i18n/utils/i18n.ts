// "use client"; // wajib karena ini client side init

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nextI18NextConfig } from "./config";
import resources from "@/pwa/core/i18n/generated/constants/resources";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    ...nextI18NextConfig.i18n,
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    resources,

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
