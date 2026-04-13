"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface AnimatedElementProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "span";
}

export default function AnimatedElement({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = "div",
}: AnimatedElementProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
