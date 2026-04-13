"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";
import Button from "@/components/ui/Button";

export default function ContactContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const d = dict.contact;

  const contactInfo = [
    {
      title: d.emailLabel,
      value: dict.site.email,
      href: `mailto:${dict.site.email}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      title: d.phoneLabel,
      value: dict.site.phone,
      href: `tel:${dict.site.phone}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      ),
    },
    {
      title: d.telegramLabel,
      value: "@sotoontech",
      href: "https://t.me/sotoontech",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      ),
    },
  ];

  return (
    <SmoothScroll>
      <Header dict={dict} locale={locale} />
      <PageTransition>
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span className="text-accent text-sm font-medium" variants={fadeUp}>
                {d.tag}
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
                variants={fadeUp}
              >
                {d.title}
              </motion.h1>
              <motion.p className="text-muted text-lg max-w-2xl mx-auto" variants={fadeUp}>
                {d.subtitle}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div initial="hidden" animate="visible" variants={slideInRight}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{d.form.name}</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 text-sm"
                        placeholder={d.form.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{d.form.email}</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 text-sm"
                        placeholder={d.form.emailPlaceholder}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{d.form.subject}</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 text-sm text-muted">
                      <option value="">{d.form.subjectPlaceholder}</option>
                      {d.form.subjectOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{d.form.budget}</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 text-sm text-muted">
                      <option value="">{d.form.budgetPlaceholder}</option>
                      {d.form.budgetOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{d.form.message}</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 text-sm resize-none"
                      placeholder={d.form.messagePlaceholder}
                    />
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    {d.form.submit}
                  </Button>
                </form>
              </motion.div>

              {/* Info */}
              <motion.div className="space-y-8" initial="hidden" animate="visible" variants={slideInLeft}>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{d.infoTitle}</h3>
                  <p className="text-muted">{d.infoSubtitle}</p>
                </div>
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-5 rounded-2xl border border-border hover:border-accent/20 hover:bg-accent/2 transition-all duration-500 group"
                      whileHover={{ x: locale === "fa" ? -5 : 5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/5 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted">{item.title}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="aspect-4/3 rounded-2xl border border-border bg-secondary/50 flex items-center justify-center">
                  <div className="text-center text-muted">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p className="text-sm">{d.mapPlaceholder}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer dict={dict} locale={locale} />
    </SmoothScroll>
  );
}
