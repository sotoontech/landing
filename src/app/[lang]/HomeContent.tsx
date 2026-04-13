"use client";

import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import TechStack from "@/components/sections/TechStack";
import CTA from "@/components/sections/CTA";
import Preloader from "@/components/ui/Preloader";
import CursorGlow from "@/components/ui/CursorGlow";

export default function HomeContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <>
      <Preloader />
      <CursorGlow />
      <SmoothScroll>
        <Header dict={dict} locale={locale} />
        <main>
          <Hero dict={dict} locale={locale} />
          <Services dict={dict} />
          <Portfolio dict={dict} locale={locale} />
          <WhyUs dict={dict} />
          <Testimonials dict={dict} />
          <TechStack dict={dict} />
          <CTA dict={dict} />
        </main>
        <Footer dict={dict} locale={locale} />
      </SmoothScroll>
    </>
  );
}
