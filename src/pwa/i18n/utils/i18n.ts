// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fallbackLng } from "./config";

i18n.use(initReactI18next).init({
  lng: fallbackLng,
  fallbackLng: fallbackLng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
