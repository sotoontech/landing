"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
          <motion.div className="text-center max-w-2xl mx-auto mb-16" variants={fadeUp}>
            <div className="divider mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4">
              {dict.portfolio.title}<span className="accent-dot">.</span>
            </h2>
            <p className="text-body text-base">{dict.portfolio.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.portfolio.items.map((item, i) => (
              <motion.div key={i} className="group" variants={fadeUp}>
                <Link href={`/${locale}/portfolio/${item.slug}`}>
                  {/* Image */}
                  <div className="relative aspect-16/10 overflow-hidden rounded-lg mb-5">
                    <Image
                      src={projectImages[i]}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Info */}
                  <span className="text-xs text-accent font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-heading group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm mb-4">{item.description}</p>

                  {/* Achievements */}
                  <div className="flex items-center gap-6 mb-4">
                    {item.achievements.map((ach, j) => (
                      <div key={j}>
                        <span className="text-lg font-bold text-accent">{ach.value}</span>
                        <span className="block text-xs text-body mt-0.5">{ach.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* View link */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent transition-colors duration-200">
                    {dict.portfolio.viewProject}
                    <ArrowLeft size={14} className="rtl:block ltr:hidden group-hover:-translate-x-1 transition-transform" />
                    <ArrowRight size={14} className="rtl:hidden ltr:block group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
