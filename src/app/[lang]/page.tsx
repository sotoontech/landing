import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  return <HomeContent dict={dict} locale={lang} />;
}
