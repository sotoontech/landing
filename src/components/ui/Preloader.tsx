"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-100 bg-main flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="flex gap-1.5 items-end h-8">
              <motion.div
                className="w-1.5 rounded-sm"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={{ height: ["16px", "28px", "16px"] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1.5 rounded-sm"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={{ height: ["12px", "24px", "12px"] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
              />
              <motion.div
                className="w-1.5 bg-accent rounded-sm"
                animate={{ height: ["20px", "32px", "20px"] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
