import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Sotoon Tech",
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  return <BlogContent dict={dict} locale={lang} />;
}
