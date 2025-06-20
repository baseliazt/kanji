"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
