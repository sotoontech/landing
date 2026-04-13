"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="section-padding border-t border-themed">
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
              {dict.whyUs.title}<span className="accent-dot">.</span>
            </h2>
            <p className="text-body mt-4 max-w-lg">{dict.whyUs.subtitle}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-t border-b border-themed py-12"
            variants={staggerContainer}
          >
            {dict.whyUs.stats.map((stat, i) => (
              <motion.div key={i} className="text-center" variants={fadeUp}>
                <div className="text-4xl md:text-5xl font-bold text-heading mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-body text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {dict.whyUs.reasons.map((reason, i) => (
              <motion.div key={i} className="flex gap-4" variants={fadeUp}>
                <span className="text-accent font-bold text-lg mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-heading">{reason.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
