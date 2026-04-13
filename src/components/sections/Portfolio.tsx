"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const projectImages = [
  "/images/portfolio/project-1.jpg",
  "/images/portfolio/project-2.jpg",
  "/images/portfolio/project-3.jpg",
  "/images/portfolio/project-4.jpg",
];

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
                <div className="relative aspect-16/10 overflow-hidden mb-5">
                  <Image
                    src={projectImages[i]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
              <ArrowRight size={16} className="rtl:rotate-180" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
