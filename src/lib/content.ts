import { prisma } from "./db";
import type { Locale } from "@/i18n/config";
import fs from "fs";
import path from "path";

const dictionaryPath = (file: string) =>
  path.join(process.cwd(), "src", "i18n", "dictionaries", file);

function loadFallback(locale: Locale): Record<string, unknown> {
  const file = locale === "fa" ? "fa.json" : "en.json";
  const p = dictionaryPath(file);
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export async function getContent(locale: Locale): Promise<Record<string, unknown>> {
  try {
    const row = await prisma.content.findUnique({ where: { locale } });
    if (row) return JSON.parse(row.data);
  } catch {
    /* fall through to file fallback */
  }
  return loadFallback(locale);
}

export async function saveContent(
  locale: Locale,
  data: Record<string, unknown>
): Promise<void> {
  await prisma.content.upsert({
    where: { locale },
    create: { locale, data: JSON.stringify(data) },
    update: { data: JSON.stringify(data) },
  });
}
