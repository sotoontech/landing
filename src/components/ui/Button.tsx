"use client";

import { motion } from "framer-motion";
import { tapScale } from "@/lib/animations";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
    secondary:
      "bg-secondary text-primary hover:bg-secondary/80",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = clsx(baseStyles, variants[variant], sizes[size], className);

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      className={classes}
      whileTap={tapScale}
      whileHover={{ y: -2 }}
    >
      {children}
    </MotionComponent>
  );
}
