import { defaultNS } from "@/pwa/core/i18n/utils/config";

import type { Resources } from "@/pwa/core/i18n/generated/types/resources";

export type I18nNs = keyof Resources;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: Resources;
    contextSeparator: "-"; // https://github.com/i18next/i18next/issues/2052
  }
}
