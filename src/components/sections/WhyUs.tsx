"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Clock, HeadsetIcon, Cpu } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

const reasonIcons = [Code2, Clock, HeadsetIcon, Cpu];

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
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div className="text-center max-w-2xl mx-auto mb-16" variants={fadeUp}>
            <div className="divider mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4">
              {dict.whyUs.title}<span className="accent-dot">.</span>
            </h2>
            <p className="text-body text-base">{dict.whyUs.subtitle}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16"
            variants={staggerContainer}
          >
            {dict.whyUs.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-8 rounded-lg border border-themed card-bg"
                variants={fadeUp}
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-body text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dict.whyUs.reasons.map((reason, i) => {
              const Icon = reasonIcons[i];
              return (
                <motion.div
                  key={i}
                  className="group flex gap-5 p-6 md:p-8 rounded-lg border border-themed card-bg hover:border-accent/30 transition-all duration-300"
                  variants={fadeUp}
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-accent/8 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
                    <Icon size={22} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1.5 text-heading">{reason.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
