"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const socials = [
  {
    name: "instagram",
    url: "https://instagram.com/sotoontech",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "linkedin",
    url: "https://linkedin.com/company/sotoontech",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "github",
    url: "https://github.com/sotoontech",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "telegram",
    url: "https://t.me/sotoontech",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
];

export default function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const navLinks = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.services, href: `/${locale}#services` },
    { label: dict.nav.portfolio, href: `/${locale}#portfolio` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className="border-t border-themed">
      <div className="container-custom py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <Image
              src="/images/logo.svg"
              alt={dict.site.nameEn}
              width={120}
              height={32}
              className="mb-4 light:invert"
            />
            <p className="text-body text-sm leading-relaxed">
              {dict.site.description}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-heading">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body hover:text-heading text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-heading">
              {dict.footer.services}
            </h4>
            <ul className="space-y-2.5">
              {dict.services.items.map((item, i) => (
                <li key={i}>
                  <a
                    href={`/${locale}#services`}
                    className="text-body hover:text-heading text-sm transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-heading">
              {dict.footer.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-body">
              <li>
                <a
                  href={`mailto:${dict.site.email}`}
                  className="hover:text-heading transition-colors"
                >
                  {dict.site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${dict.site.phone}`}
                  className="hover:text-heading transition-colors"
                  dir="ltr"
                >
                  {dict.site.phone}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-themed rounded-full flex items-center justify-center text-body hover:text-heading hover:border-accent transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t border-themed mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body text-xs">
            &copy; {new Date().getFullYear()} {dict.site.nameEn}.{" "}
            {dict.footer.copyright}
          </p>
          <p className="text-body text-xs">
            {dict.footer.madeWith} {dict.site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
