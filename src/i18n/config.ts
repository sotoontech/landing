export const i18n = {
  defaultLocale: "fa" as const,
  locales: ["fa", "en"] as const,
};

export type Locale = (typeof i18n)["locales"][number];

export const localeNames: Record<Locale, string> = {
  fa: "فارسی",
  en: "English",
};

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};
