"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";

export default function BlogContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
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
              <motion.span
                className="text-accent text-sm font-medium"
                variants={fadeUp}
              >
                {dict.blog.tag}
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
                variants={fadeUp}
              >
                {dict.blog.title}
              </motion.h1>
              <motion.p
                className="text-muted text-lg max-w-2xl mx-auto"
                variants={fadeUp}
              >
                {dict.blog.subtitle}
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {dict.blog.posts.map((post, i) => (
                <motion.article
                  key={i}
                  className="group rounded-2xl border border-border bg-white overflow-hidden hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-16/10 bg-linear-to-br from-accent/10 to-accent-light/10 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-accent/20 group-hover:scale-105 transition-transform duration-700">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-accent bg-accent/5 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted">{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted">{post.date}</span>
                      <span className="text-accent text-sm font-medium group-hover:underline">
                        {dict.blog.readMore}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </main>
      </PageTransition>
      <Footer dict={dict} locale={locale} />
    </SmoothScroll>
  );
}
