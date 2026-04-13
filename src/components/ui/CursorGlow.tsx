"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 30, stiffness: 180, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[98] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div className="w-[250px] h-[250px] rounded-full opacity-[0.07] blur-[80px] bg-accent" />
    </motion.div>
  );
}
