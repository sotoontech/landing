"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const socials = {
  instagram: "https://instagram.com/sotoontech",
  linkedin: "https://linkedin.com/company/sotoontech",
  github: "https://github.com/sotoontech",
  telegram: "https://t.me/sotoontech",
};

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
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
              className="mb-4 dark:invert"
            />
            <p className="text-body text-sm leading-relaxed">{dict.site.description}</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-heading">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-body hover:text-heading text-sm transition-colors duration-200">
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
                  <a href={`/${locale}#services`} className="text-body hover:text-heading text-sm transition-colors duration-200">
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
                <a href={`mailto:${dict.site.email}`} className="hover:text-heading transition-colors">
                  {dict.site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${dict.site.phone}`} className="hover:text-heading transition-colors" dir="ltr">
                  {dict.site.phone}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {Object.entries(socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-themed flex items-center justify-center text-body hover:text-heading hover:border-accent transition-all duration-200"
                  aria-label={name}
                >
                  <span className="text-[10px] uppercase font-medium">{name.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t border-themed mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body text-xs">
            &copy; {new Date().getFullYear()} {dict.site.nameEn}. {dict.footer.copyright}
          </p>
          <p className="text-body text-xs">
            {dict.footer.madeWith} {dict.site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
