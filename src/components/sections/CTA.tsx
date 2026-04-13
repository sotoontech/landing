"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

export default function CTA({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="section-padding bg-accent text-white">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp}>
            <span className="text-xs uppercase tracking-widest text-white/50 mb-4 block">
              {dict.nav.contact}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {dict.cta.titleLine1}
              <br />
              {dict.cta.titleLine2}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-white/70 mb-8 leading-relaxed">
              {dict.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${dict.site.email}`}
                className="px-7 py-3 bg-white text-accent text-sm font-medium hover:bg-white/90 transition-colors rounded-sm text-center"
              >
                {dict.cta.email}
              </a>
              <a
                href={`tel:${dict.site.phone}`}
                className="px-7 py-3 border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors rounded-sm text-center"
              >
                {dict.cta.call}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
