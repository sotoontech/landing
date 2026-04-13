"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";

export default function AboutContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const d = dict.about;

  return (
    <SmoothScroll>
      <Header dict={dict} locale={locale} />
      <PageTransition>
        <main className="pt-32 pb-20">
          {/* Hero */}
          <div className="container-custom">
            <motion.div
              className="text-center mb-20"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span className="text-accent text-sm font-medium" variants={fadeUp}>
                {d.tag}
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-heading"
                variants={fadeUp}
              >
                {d.titleLine1}{" "}
                <span className="text-accent">{d.titleHighlight}</span>
                {d.titleLine2 && (
                  <>
                    <br />
                    {d.titleLine2}
                  </>
                )}
                <span className="accent-dot">.</span>
              </motion.h1>
              <motion.p className="text-body text-lg max-w-2xl mx-auto" variants={fadeUp}>
                {d.subtitle}
              </motion.p>
            </motion.div>
          </div>

          {/* Story */}
          <section className="section-padding border-t border-themed">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                >
                  <div className="divider mb-6" />
                  <span className="text-accent text-sm font-medium">{d.storyTag}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-heading">
                    {d.storyTitle}<span className="accent-dot">.</span>
                  </h2>
                  <div className="space-y-4 text-body leading-relaxed">
                    <p>{d.storyP1}</p>
                    <p>{d.storyP2}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="relative aspect-square rounded-sm overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                >
                  <Image
                    src="/images/about/team.jpg"
                    alt="Sotoon Tech Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding border-t border-themed">
            <div className="container-custom">
              <motion.div
                className="mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp}>
                  <div className="divider mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-heading">
                    {d.valuesTitle}<span className="accent-dot">.</span>
                  </h2>
                </motion.div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {d.values.map((value, i) => (
                  <motion.div
                    key={i}
                    className="p-8 border-t border-themed sm:border-s first:border-s-0 sm:nth-2:border-s sm:nth-3:border-s-0 lg:nth-3:border-s"
                    variants={fadeUp}
                  >
                    <div className="text-2xl mb-4 text-accent">{value.icon}</div>
                    <h3 className="font-bold text-lg mb-2 text-heading">{value.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Timeline */}
          <section className="section-padding border-t border-themed">
            <div className="container-custom">
              <motion.div
                className="mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp}>
                  <div className="divider mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-heading">
                    {d.timelineTitle}<span className="accent-dot">.</span>
                  </h2>
                </motion.div>
              </motion.div>
              <motion.div
                className="max-w-2xl"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {d.timeline.map((item, i) => (
                  <motion.div key={i} className="flex gap-6 mb-8 last:mb-0" variants={fadeUp}>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                        {item.year}
                      </div>
                      {i < d.timeline.length - 1 && (
                        <div className="w-[2px] h-full mt-2" style={{ backgroundColor: "var(--border-color)" }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="font-bold text-lg text-heading">{item.title}</h3>
                      <p className="text-body text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Team */}
          <section className="section-padding border-t border-themed">
            <div className="container-custom">
              <motion.div
                className="mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp}>
                  <div className="divider mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-heading">
                    {d.teamTitle}<span className="accent-dot">.</span>
                  </h2>
                  <p className="text-body text-lg mt-4">{d.teamSubtitle}</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {d.team.map((member, i) => (
                  <motion.div key={i} className="text-center group" variants={fadeUp}>
                    <div className="w-28 h-28 mx-auto rounded-full bg-subtle mb-4 flex items-center justify-center text-accent text-2xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-heading">{member.name}</h3>
                    <p className="text-body text-sm mt-1">{member.role}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer dict={dict} locale={locale} />
    </SmoothScroll>
  );
}
