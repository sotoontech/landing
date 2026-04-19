"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Lightbulb, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

const icons = [Globe, Smartphone, Palette, Lightbulb];

export default function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="section-padding">
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
              {dict.services.title}<span className="accent-dot">.</span>
            </h2>
            <p className="text-body text-base">{dict.services.subtitle}</p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dict.services.items.map((service, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  className="group relative p-8 md:p-10 rounded-xl border border-themed card-bg hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-400 overflow-hidden"
                  variants={fadeUp}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Number */}
                  <span className="absolute top-6 inset-e-6 text-xs text-body/20 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Arrow */}
                  <div className="absolute bottom-6 inset-e-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={20} className="text-accent" />
                  </div>

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-md group-hover:shadow-accent/20 transition-all duration-400">
                      <Icon size={26} strokeWidth={1.5} className="text-accent group-hover:text-white transition-colors duration-400" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-heading">{service.title}</h3>
                    <p className="text-body text-sm leading-relaxed max-w-sm">{service.description}</p>
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
