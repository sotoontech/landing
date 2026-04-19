"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";

const projectImages = [
  "/images/portfolio/project-1.jpg",
  "/images/portfolio/project-2.jpg",
  "/images/portfolio/project-3.jpg",
  "/images/portfolio/project-4.jpg",
];

type Project = Dictionary["portfolio"]["items"][number];

export default function PortfolioDetailContent({
  dict,
  locale,
  project,
  projectIndex,
}: {
  dict: Dictionary;
  locale: Locale;
  project: Project;
  projectIndex: number;
}) {
  return (
    <SmoothScroll>
      <Header dict={dict} locale={locale} />
      <PageTransition>
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Back link */}
              <motion.div variants={fadeUp} className="mb-10">
                <Link
                  href={`/${locale}/#portfolio`}
                  className="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors"
                >
                  <ArrowRight size={14} className="rtl:hidden ltr:block rotate-180" />
                  <ArrowLeft size={14} className="rtl:block ltr:hidden rotate-180" />
                  {dict.portfolio.backToPortfolio}
                </Link>
              </motion.div>

              {/* Header */}
              <motion.div variants={fadeUp} className="mb-8">
                <span className="text-xs text-accent font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mt-2">
                  {project.title}<span className="accent-dot">.</span>
                </h1>
              </motion.div>

              {/* Hero image */}
              <motion.div
                variants={fadeUp}
                className="relative w-full aspect-video rounded-lg overflow-hidden mb-12"
              >
                <Image
                  src={projectImages[projectIndex]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Description */}
                  <motion.div variants={fadeUp}>
                    <p className="text-body text-base md:text-lg leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </motion.div>

                  {/* Achievements */}
                  <motion.div variants={fadeUp}>
                    <h2 className="text-xl font-bold text-heading mb-6">
                      {dict.portfolio.achievementsTitle}
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      {project.achievements.map((ach, i) => (
                        <div
                          key={i}
                          className="text-center p-6 rounded-lg border border-themed card-bg"
                        >
                          <span className="text-2xl md:text-3xl font-bold text-accent block">
                            {ach.value}
                          </span>
                          <span className="text-xs text-body mt-2 block">
                            {ach.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Challenge & Solution */}
                  <motion.div variants={fadeUp} className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-heading mb-3">
                        {dict.portfolio.challengeTitle}
                      </h2>
                      <p className="text-body text-base leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-heading mb-3">
                        {dict.portfolio.solutionTitle}
                      </h2>
                      <p className="text-body text-base leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <motion.div variants={fadeUp}>
                  <div className="sticky top-28 space-y-8">
                    {/* Tech stack */}
                    <div className="p-6 rounded-lg border border-themed card-bg">
                      <h3 className="text-sm font-bold text-heading mb-4">
                        {dict.portfolio.techTitle}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium bg-accent/8 text-accent rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Other projects */}
                    <div className="p-6 rounded-lg border border-themed card-bg">
                      <h3 className="text-sm font-bold text-heading mb-4">
                        {dict.portfolio.viewAll}
                      </h3>
                      <div className="space-y-3">
                        {dict.portfolio.items
                          .filter((_, i) => i !== projectIndex)
                          .map((p) => (
                            <Link
                              key={p.slug}
                              href={`/${locale}/portfolio/${p.slug}`}
                              className="flex items-center justify-between group py-2 border-b border-themed last:border-0"
                            >
                              <span className="text-sm text-heading group-hover:text-accent transition-colors">
                                {p.title}
                              </span>
                              <ArrowLeft size={12} className="rtl:block ltr:hidden text-body group-hover:text-accent transition-colors" />
                              <ArrowRight size={12} className="rtl:hidden ltr:block text-body group-hover:text-accent transition-colors" />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </PageTransition>
      <Footer dict={dict} locale={locale} />
    </SmoothScroll>
  );
}
