import type { Metadata } from "next";
import { i18n, localeDirection, type Locale } from "@/i18n/config";
import ThemeProvider from "@/components/providers/ThemeProvider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Sotoon Tech | ستون تک",
  description:
    "طراحی و توسعه وب‌سایت و اپلیکیشن از صفر تا صد | Website & App Development",
  keywords: [
    "طراحی سایت",
    "طراحی اپلیکیشن",
    "توسعه وب",
    "ستون تک",
    "sotoontech",
    "web design",
    "app development",
  ],
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dir = localeDirection[lang] || "rtl";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Fonts — loaded via CDN, works on Vercel and locally */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${lang === "fa" ? "font-vazirmatn" : "font-inter"} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
