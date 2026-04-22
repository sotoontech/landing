import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";
import { i18n, type Locale } from "@/i18n/config";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { locale } = await params;
  if (!i18n.locales.includes(locale as Locale))
    return NextResponse.json({ error: "Unknown locale" }, { status: 404 });

  const data = await getContent(locale as Locale);
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { locale } = await params;
  if (!i18n.locales.includes(locale as Locale))
    return NextResponse.json({ error: "Unknown locale" }, { status: 404 });

  try {
    const body = await request.json();
    if (typeof body !== "object" || body === null)
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    await saveContent(locale as Locale, body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
