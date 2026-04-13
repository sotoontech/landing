"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function Portfolio({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="portfolio" className="section-padding border-t border-themed">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div className="mb-16" variants={fadeUp}>
            <div className="divider mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
              {dict.portfolio.title}<span className="accent-dot">.</span>
            </h2>
            <p className="text-body mt-4 max-w-lg">{dict.portfolio.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.portfolio.items.map((item, i) => (
              <motion.div key={i} className="group cursor-pointer" variants={fadeUp}>
                <div className="aspect-16/10 bg-subtle overflow-hidden mb-5">
                  <div className="w-full h-full flex items-center justify-center text-body/15 group-hover:scale-[1.02] transition-transform duration-500">
                    <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-body uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-bold mt-1 text-heading group-hover:text-accent transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-body text-sm mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-14" variants={fadeUp}>
            <a
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2 text-sm font-medium text-heading hover:text-accent transition-colors duration-200"
            >
              {dict.portfolio.viewAll}
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
