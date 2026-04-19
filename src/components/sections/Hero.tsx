"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container-custom">
        {/* Top: Text content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-wide border border-accent/30 text-accent bg-accent/5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {dict.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight mb-6 text-heading"
            variants={fadeUp}
          >
            {dict.hero.titleLine1}{" "}
            <span className="relative inline-block">
              <span className="text-accent">{dict.hero.titleHighlight}</span>
              <motion.span
                className="absolute -bottom-1 inset-s-0 inset-e-0 h-0.75 bg-accent/40 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />
            </span>
            {dict.hero.titleLine2 && (
              <>
                {" "}
                {dict.hero.titleLine2}
              </>
            )}
            <span className="accent-dot">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-body text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
            variants={fadeUp}
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-light transition-all duration-300"
            >
              {dict.hero.cta1}
              <ArrowLeft className="w-4 h-4 rtl:block ltr:hidden group-hover:-translate-x-1 transition-transform" />
              <ArrowRight className="w-4 h-4 rtl:hidden ltr:block group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-themed text-heading text-sm font-medium hover:border-accent hover:text-accent transition-all duration-300 rounded-sm"
            >
              {dict.hero.cta2}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-themed flex justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-accent"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
