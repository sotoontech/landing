"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { i18n, localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const otherLocale = i18n.locales.find((l) => l !== locale)!;

  return (
    <motion.a
      href={switchLocale(otherLocale)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] text-sm font-medium text-body hover:border-accent hover:text-accent transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xs">
        {otherLocale === "en" ? "EN" : "فا"}
      </span>
      <span className="hidden sm:inline text-xs">
        {localeNames[otherLocale]}
      </span>
    </motion.a>
  );
}
