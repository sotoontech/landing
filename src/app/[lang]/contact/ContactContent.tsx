"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";
import Select from "@/components/ui/Select";

export default function ContactContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const d = dict.contact;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject,
          budget,
          message: formData.get("message"),
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      title: d.emailLabel,
      value: dict.site.email,
      href: `mailto:${dict.site.email}`,
      icon: Mail,
    },
    {
      title: d.phoneLabel,
      value: dict.site.phone,
      href: `tel:${dict.site.phone}`,
      icon: Phone,
    },
    {
      title: d.telegramLabel,
      value: "@sotoontech",
      href: "https://t.me/sotoontech",
      icon: Send,
    },
  ];

  return (
    <SmoothScroll>
      <Header dict={dict} locale={locale} />
      <PageTransition>
        <main className="pt-32 pb-20">
          <div className="container-custom">
            {/* Header */}
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span className="text-accent text-sm font-medium" variants={fadeUp}>
                {d.tag}
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-heading"
                variants={fadeUp}
              >
                {d.title}<span className="accent-dot">.</span>
              </motion.h1>
              <motion.p className="text-body text-lg" variants={fadeUp}>
                {d.subtitle}
              </motion.p>
            </motion.div>

            {/* Contact info cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-6 rounded-xl border border-themed card-bg hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                    variants={fadeUp}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:shadow-md group-hover:shadow-accent/20 transition-all duration-300">
                      <Icon size={22} strokeWidth={1.5} className="text-accent group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs text-body mb-0.5">{item.title}</p>
                      <p className="font-medium text-heading text-sm" dir="ltr">{item.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Form / Success */}
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-heading mb-2">
                      {d.form.successTitle}
                    </h3>
                    <p className="text-body mb-8">{d.form.successMessage}</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 border border-themed text-heading text-sm font-medium rounded-lg hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
                    >
                      {d.form.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    variants={staggerContainer}
                  >
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5" variants={fadeUp}>
                        <div>
                          <label className="block text-sm font-medium text-heading mb-2">{d.form.name}</label>
                          <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-themed card-bg text-heading text-sm placeholder:text-body/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-200"
                            placeholder={d.form.namePlaceholder}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-heading mb-2">{d.form.email}</label>
                          <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-themed card-bg text-heading text-sm placeholder:text-body/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-200"
                            placeholder={d.form.emailPlaceholder}
                            dir="ltr"
                          />
                        </div>
                      </motion.div>

                      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5" variants={fadeUp}>
                        <div>
                          <label className="block text-sm font-medium text-heading mb-2">{d.form.subject}</label>
                          <Select
                            placeholder={d.form.subjectPlaceholder}
                            options={d.form.subjectOptions}
                            onChange={setSubject}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-heading mb-2">{d.form.budget}</label>
                          <Select
                            placeholder={d.form.budgetPlaceholder}
                            options={d.form.budgetOptions}
                            onChange={setBudget}
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label className="block text-sm font-medium text-heading mb-2">{d.form.message}</label>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-themed card-bg text-heading text-sm placeholder:text-body/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-200 resize-none"
                          placeholder={d.form.messagePlaceholder}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {loading ? "..." : d.form.submit}
                        </button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer dict={dict} locale={locale} />
    </SmoothScroll>
  );
}
