import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | Sotoon Tech",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  return <ContactContent dict={dict} locale={lang} />;
}
