"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.services, href: `/${locale}#services` },
    { label: dict.nav.portfolio, href: `/${locale}#portfolio` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-themed py-4"
            : "py-5"
        }`}
        style={{ backgroundColor: isScrolled ? undefined : "var(--bg)" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt={dict.site.nameEn}
              width={140}
              height={36}
              priority
              className="dark:invert"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-body hover:text-heading transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
            <a
              href={`/${locale}/contact`}
              className="px-5 py-2.5 bg-accent text-white text-sm rounded-full hover:bg-accent-light transition-colors duration-200"
            >
              {dict.nav.startProject}
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
            <button
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-[2px] block"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-[2px] block"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-[2px] block"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-main flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href={`/${locale}/contact`}
              className="px-7 py-3 bg-accent text-white rounded-full text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.startProject}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
