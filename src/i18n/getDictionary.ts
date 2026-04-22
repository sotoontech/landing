import type { Locale } from "./config";
import { getContent } from "@/lib/content";
import fa from "./dictionaries/fa.json";

export type Dictionary = typeof fa;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const content = await getContent(locale);
  return content as Dictionary;
};
