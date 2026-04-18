"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function BackgroundGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Top-right glow */}
      <motion.div
        className="absolute -top-[250px] -right-[150px] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          opacity: isDark ? 0.15 : 0.09,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-left glow */}
      <motion.div
        className="absolute -bottom-[200px] -left-[150px] w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          opacity: isDark ? 0.12 : 0.07,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
          opacity: isDark ? 0.08 : 0.05,
        }}
      />
    </div>
  );
}
