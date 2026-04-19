"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";

const techItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "React Native",
  "Figma",
  "PostgreSQL",
];

export default function TechStack({ dict }: { dict: Dictionary }) {
  return (
    <section className="section-padding border-t border-themed">
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
              {dict.techStack.title}
              <span className="accent-dot">.</span>
            </h2>
            <p className="text-body mt-4 max-w-lg">{dict.techStack.subtitle}</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            variants={staggerContainer}
          >
            {techItems.map((tech, i) => (
              <motion.div
                key={i}
                className="px-6 py-3 border border-themed text-sm text-heading hover:border-accent hover:bg-accent hover:text-white! transition-all duration-200 cursor-default rounded-sm"
                variants={fadeUp}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
