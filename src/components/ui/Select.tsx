"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

interface SelectProps {
  placeholder: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Select({
  placeholder,
  options,
  value,
  onChange,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border text-sm transition-all duration-200 cursor-pointer text-start",
          open
            ? "border-accent ring-1 ring-accent"
            : "border-themed hover:border-accent/50",
          selected ? "text-heading" : "text-body"
        )}
      >
        <span className="truncate">{selected || placeholder}</span>
        <ChevronDown
          size={16}
          className={clsx(
            "shrink-0 text-body transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1.5 py-1 rounded-lg border border-themed card-bg shadow-lg max-h-60 overflow-auto"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={clsx(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer text-start",
                  selected === opt
                    ? "text-accent bg-accent/5"
                    : "text-heading hover:bg-subtle"
                )}
              >
                <span>{opt}</span>
                {selected === opt && <Check size={14} className="text-accent shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
