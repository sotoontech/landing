"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const [current, setCurrent] = useState(0);
  const items = dict.testimonials.items;

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="section-padding border-t border-themed">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="mb-16" variants={fadeUp}>
            <div className="divider mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
              {dict.testimonials.title}<span className="accent-dot">.</span>
            </h2>
          </motion.div>

          <motion.div className="max-w-2xl" variants={fadeUp}>
            <div className="min-h-45">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xl md:text-2xl leading-relaxed mb-8 text-heading">
                    &ldquo;{items[current].content}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-heading">{items[current].name}</p>
                    <p className="text-body text-sm">{items[current].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 border border-themed hover:border-accent text-heading flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-themed hover:border-accent text-heading flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
              <span className="text-sm text-body ms-2">
                {String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
