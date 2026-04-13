"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Lightbulb, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

const icons = [
  <Globe key="0" size={40} strokeWidth={1} />,
  <Smartphone key="1" size={40} strokeWidth={1} />,
  <Palette key="2" size={40} strokeWidth={1} />,
  <Lightbulb key="3" size={40} strokeWidth={1} />,
];

export default function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="section-padding border-t border-themed">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20" variants={fadeUp}>
            <div>
              <div className="divider mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
                {dict.services.title}<span className="accent-dot">.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-body max-w-md">{dict.services.subtitle}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {dict.services.items.map((service, i) => (
              <motion.div
                key={i}
                className="group relative p-8 lg:p-10 border-t border-themed sm:border-s first:border-s-0 sm:nth-2:border-s sm:nth-3:border-s-0 lg:nth-3:border-s hover:bg-subtle transition-colors duration-300"
                variants={fadeUp}
              >
                <span className="text-[11px] text-body/50 font-mono block mb-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="text-heading/70 mb-6 group-hover:text-accent transition-colors duration-300">
                  {icons[i]}
                </div>
                <h3 className="text-lg font-bold mb-3 text-heading">{service.title}</h3>
                <p className="text-body text-sm leading-relaxed">{service.description}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={20} className="text-accent rtl:rotate-180" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
