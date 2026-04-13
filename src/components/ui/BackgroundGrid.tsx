"use client";

import { motion } from "framer-motion";

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.4,
        }}
      />

      {/* Gradient blobs */}
      <motion.div
        className="absolute -top-[300px] -right-[200px] w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)" }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Fade edges so grid doesn't look cut off */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, var(--bg) 0%, transparent 15%, transparent 85%, var(--bg) 100%),
            linear-gradient(to right, var(--bg) 0%, transparent 10%, transparent 90%, var(--bg) 100%)
          `,
        }}
      />
    </div>
  );
}
