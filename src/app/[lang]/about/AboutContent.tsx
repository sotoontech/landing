"use client";

import { motion } from "framer-motion";
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
                variants={fadeUp}
              >
                {d.titleLine1}{" "}
                <span className="text-gradient">{d.titleHighlight}</span>
                {d.titleLine2 && (
                  <>
                    <br />
                    {d.titleLine2}
                  </>
                )}
              </motion.h1>
              <motion.p className="text-muted text-lg max-w-2xl mx-auto" variants={fadeUp}>
                {d.subtitle}
              </motion.p>
            </motion.div>
          </div>

          {/* Story */}
          <section className="section-padding bg-secondary/50">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                >
                  <span className="text-accent text-sm font-medium">{d.storyTag}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">{d.storyTitle}</h2>
                  <div className="space-y-4 text-muted leading-relaxed">
                    <p>{d.storyP1}</p>
                    <p>{d.storyP2}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="aspect-square rounded-3xl bg-linear-to-br from-accent/10 to-accent-light/10 flex items-center justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                >
                  <div className="text-accent/20">
                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
                  {d.valuesTitle}
                </motion.h2>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {d.values.map((value, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-8 rounded-2xl border border-border hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500"
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-3xl mb-4 text-accent">{value.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Timeline */}
          <section className="section-padding bg-secondary/50">
            <div className="container-custom">
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
                  {d.timelineTitle}
                </motion.h2>
              </motion.div>
              <motion.div
                className="max-w-2xl mx-auto"
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
                        <div className="w-[2px] h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-muted text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Team */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
                  {d.teamTitle}
                </motion.h2>
                <motion.p className="text-muted text-lg mt-4" variants={fadeUp}>
                  {d.teamSubtitle}
                </motion.p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {d.team.map((member, i) => (
                  <motion.div key={i} className="text-center group" variants={fadeUp} whileHover={{ y: -5 }}>
                    <div className="w-32 h-32 mx-auto rounded-full bg-linear-to-br from-accent/10 to-accent-light/10 mb-4 flex items-center justify-center text-accent text-2xl font-bold group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-500">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-muted text-sm mt-1">{member.role}</p>
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
