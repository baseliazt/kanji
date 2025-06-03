import { defaultNS } from "@/pwa/i18n/utils/config";

import type { Resources } from "./resources";

export type I18nNs = keyof Resources;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: Resources;
    contextSeparator: "-"; // https://github.com/i18next/i18next/issues/2052
  }
}
