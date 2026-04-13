"use client";

import { motion } from "framer-motion";
import { fadeUp, lineReveal } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  return (
    <motion.div
      className={`flex flex-col gap-4 mb-16 ${alignClass[align]}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="w-12 h-[2px] bg-accent rounded-full"
        variants={lineReveal}
      />
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        variants={fadeUp}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-muted text-lg max-w-2xl"
          variants={fadeUp}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
