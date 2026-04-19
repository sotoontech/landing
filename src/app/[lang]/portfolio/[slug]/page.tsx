import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import PortfolioDetailContent from "./PortfolioDetailContent";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  const project = dict.portfolio.items.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectIndex = dict.portfolio.items.indexOf(project);

  return (
    <PortfolioDetailContent
      dict={dict}
      locale={lang}
      project={project}
      projectIndex={projectIndex}
    />
  );
}
