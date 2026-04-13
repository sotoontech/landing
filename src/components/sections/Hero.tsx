"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="min-h-screen flex items-center pt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="divider mb-8" variants={fadeUp} />

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight mb-8 text-heading"
              variants={fadeUp}
            >
              {dict.hero.titleLine1}
              <br />
              <span className="text-accent">{dict.hero.titleHighlight}</span>
              {dict.hero.titleLine2 && (
                <>
                  <br />
                  {dict.hero.titleLine2}
                </>
              )}
              <span className="accent-dot">.</span>
            </motion.h1>

            <motion.p
              className="text-body text-base md:text-lg max-w-md leading-relaxed mb-10"
              variants={fadeUp}
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-themed text-heading text-sm hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 rounded-sm"
              >
                {dict.hero.cta2}
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative aspect-[4/5] lg:aspect-auto lg:h-[75vh] rounded-sm overflow-hidden bg-subtle"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-body/20">
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
