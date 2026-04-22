import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { i18n, type Locale } from "@/i18n/config";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  if (!i18n.locales.includes(locale as Locale))
    return NextResponse.json({ error: "Unknown locale" }, { status: 404 });
  const data = await getContent(locale as Locale);
  return NextResponse.json(data);
}
