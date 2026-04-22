"use client";

import { useEffect, useState } from "react";
import ImagePicker from "../components/ImagePicker";
import Repeater from "../components/Repeater";

type ContentDoc = Record<string, unknown>;
type Locale = "fa" | "en";

const TABS = [
  "site",
  "nav",
  "hero",
  "services",
  "portfolio",
  "whyUs",
  "testimonials",
  "techStack",
  "cta",
  "footer",
  "about",
  "contact",
  "blog",
  "raw",
] as const;

type Tab = (typeof TABS)[number];

function get<T = unknown>(obj: Record<string, unknown>, path: string): T | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>))
      cur = (cur as Record<string, unknown>)[p];
    else return undefined;
  }
  return cur as T;
}

function set(obj: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split(".");
  const copy: Record<string, unknown> = { ...obj };
  let cur: Record<string, unknown> = copy;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = cur[p];
    cur[p] =
      next && typeof next === "object" && !Array.isArray(next)
        ? { ...(next as Record<string, unknown>) }
        : {};
    cur = cur[p] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
  return copy;
}

export default function ContentEditor() {
  const [locale, setLocale] = useState<Locale>("fa");
  const [doc, setDoc] = useState<ContentDoc | null>(null);
  const [tab, setTab] = useState<Tab>("site");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch(`/api/admin/content/${locale}`, { cache: "no-store" });
      if (!active) return;
      if (res.ok) setDoc(await res.json());
      else setToast({ msg: "Could not load content", err: true });
    })();
    return () => {
      active = false;
    };
  }, [locale]);

  const update = (path: string, value: unknown) =>
    setDoc((d) => (d ? set(d, path, value) : d));

  const save = async () => {
    if (!doc) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      if (res.ok) setToast({ msg: "Saved" });
      else setToast({ msg: "Save failed", err: true });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2500);
    }
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <>
      <header className="admin-header">
        <h1>Content</h1>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
              <option value="fa">فارسی (fa)</option>
              <option value="en">English (en)</option>
            </select>
          </div>
          <button className="btn" onClick={save} disabled={saving || !doc}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </header>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={tab === t ? "active" : ""}
          >
            {t}
          </button>
        ))}
      </div>

      {!doc && <p className="section-muted">Loading…</p>}

      {doc && tab === "site" && <SiteTab doc={doc} update={update} />}
      {doc && tab === "nav" && <NavTab doc={doc} update={update} />}
      {doc && tab === "hero" && <HeroTab doc={doc} update={update} />}
      {doc && tab === "services" && <ServicesTab doc={doc} update={update} />}
      {doc && tab === "portfolio" && <PortfolioTab doc={doc} update={update} />}
      {doc && tab === "whyUs" && <WhyUsTab doc={doc} update={update} />}
      {doc && tab === "testimonials" && <TestimonialsTab doc={doc} update={update} />}
      {doc && tab === "techStack" && <TechStackTab doc={doc} update={update} />}
      {doc && tab === "cta" && <CTATab doc={doc} update={update} />}
      {doc && tab === "footer" && <FooterTab doc={doc} update={update} />}
      {doc && tab === "about" && <AboutTab doc={doc} update={update} />}
      {doc && tab === "contact" && <ContactTab doc={doc} update={update} />}
      {doc && tab === "blog" && <BlogTab doc={doc} update={update} />}
      {doc && tab === "raw" && <RawTab doc={doc} setDoc={setDoc} />}

      {toast && <div className={`toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
    </>
  );
}

type TabProps = {
  doc: ContentDoc;
  update: (path: string, value: unknown) => void;
};

function TextField({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? (
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function SiteTab({ doc, update }: TabProps) {
  return (
    <div className="admin-card">
      <h2>Site information</h2>
      <div className="grid-2">
        <TextField label="Name" value={get<string>(doc, "site.name") || ""} onChange={(v) => update("site.name", v)} />
        <TextField label="Name (English)" value={get<string>(doc, "site.nameEn") || ""} onChange={(v) => update("site.nameEn", v)} />
      </div>
      <TextField
        label="Description"
        value={get<string>(doc, "site.description") || ""}
        onChange={(v) => update("site.description", v)}
        textarea
      />
      <div className="grid-2">
        <TextField label="Email" value={get<string>(doc, "site.email") || ""} onChange={(v) => update("site.email", v)} />
        <TextField label="Phone" value={get<string>(doc, "site.phone") || ""} onChange={(v) => update("site.phone", v)} />
      </div>
      <div className="field">
        <label>Logo</label>
        <ImagePicker value={get<string>(doc, "site.logo") || ""} onChange={(v) => update("site.logo", v)} />
      </div>
    </div>
  );
}

function NavTab({ doc, update }: TabProps) {
  const keys: [string, string][] = [
    ["nav.home", "Home"],
    ["nav.services", "Services"],
    ["nav.portfolio", "Portfolio"],
    ["nav.about", "About"],
    ["nav.blog", "Blog"],
    ["nav.contact", "Contact"],
    ["nav.startProject", "Start Project CTA"],
  ];
  return (
    <div className="admin-card">
      <h2>Navigation labels</h2>
      <div className="grid-2">
        {keys.map(([path, label]) => (
          <TextField
            key={path}
            label={label}
            value={get<string>(doc, path) || ""}
            onChange={(v) => update(path, v)}
          />
        ))}
      </div>
    </div>
  );
}

function HeroTab({ doc, update }: TabProps) {
  return (
    <div className="admin-card">
      <h2>Hero section</h2>
      <TextField label="Badge" value={get<string>(doc, "hero.badge") || ""} onChange={(v) => update("hero.badge", v)} />
      <div className="grid-2">
        <TextField label="Title line 1" value={get<string>(doc, "hero.titleLine1") || ""} onChange={(v) => update("hero.titleLine1", v)} />
        <TextField label="Highlight" value={get<string>(doc, "hero.titleHighlight") || ""} onChange={(v) => update("hero.titleHighlight", v)} />
      </div>
      <TextField label="Title line 2" value={get<string>(doc, "hero.titleLine2") || ""} onChange={(v) => update("hero.titleLine2", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "hero.subtitle") || ""} onChange={(v) => update("hero.subtitle", v)} textarea />
      <div className="grid-2">
        <TextField label="CTA 1" value={get<string>(doc, "hero.cta1") || ""} onChange={(v) => update("hero.cta1", v)} />
        <TextField label="CTA 2" value={get<string>(doc, "hero.cta2") || ""} onChange={(v) => update("hero.cta2", v)} />
      </div>
    </div>
  );
}

function ServicesTab({ doc, update }: TabProps) {
  const items = (get<Array<Record<string, unknown>>>(doc, "services.items") || []) as Array<Record<string, unknown>>;
  return (
    <div className="admin-card">
      <h2>Services</h2>
      <TextField label="Title" value={get<string>(doc, "services.title") || ""} onChange={(v) => update("services.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "services.subtitle") || ""} onChange={(v) => update("services.subtitle", v)} textarea />
      <Repeater
        items={items}
        onChange={(next) => update("services.items", next)}
        render={(item, setItem) => (
          <>
            <TextField label="Title" value={String(item.title || "")} onChange={(v) => setItem({ ...item, title: v })} />
            <TextField label="Description" value={String(item.description || "")} onChange={(v) => setItem({ ...item, description: v })} textarea />
          </>
        )}
        emptyItem={{ title: "", description: "" }}
      />
    </div>
  );
}

function PortfolioTab({ doc, update }: TabProps) {
  const items = (get<Array<Record<string, unknown>>>(doc, "portfolio.items") || []) as Array<Record<string, unknown>>;
  return (
    <div className="admin-card">
      <h2>Portfolio</h2>
      <TextField label="Title" value={get<string>(doc, "portfolio.title") || ""} onChange={(v) => update("portfolio.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "portfolio.subtitle") || ""} onChange={(v) => update("portfolio.subtitle", v)} />
      <div className="grid-2">
        <TextField label="View all" value={get<string>(doc, "portfolio.viewAll") || ""} onChange={(v) => update("portfolio.viewAll", v)} />
        <TextField label="View project" value={get<string>(doc, "portfolio.viewProject") || ""} onChange={(v) => update("portfolio.viewProject", v)} />
      </div>
      <div className="grid-2">
        <TextField label="Back to portfolio" value={get<string>(doc, "portfolio.backToPortfolio") || ""} onChange={(v) => update("portfolio.backToPortfolio", v)} />
        <TextField label="Achievements title" value={get<string>(doc, "portfolio.achievementsTitle") || ""} onChange={(v) => update("portfolio.achievementsTitle", v)} />
      </div>
      <div className="grid-2">
        <TextField label="Tech title" value={get<string>(doc, "portfolio.techTitle") || ""} onChange={(v) => update("portfolio.techTitle", v)} />
        <TextField label="Challenge title" value={get<string>(doc, "portfolio.challengeTitle") || ""} onChange={(v) => update("portfolio.challengeTitle", v)} />
      </div>
      <TextField label="Solution title" value={get<string>(doc, "portfolio.solutionTitle") || ""} onChange={(v) => update("portfolio.solutionTitle", v)} />

      <h2 style={{ marginTop: 24 }}>Projects</h2>
      <Repeater
        items={items}
        onChange={(next) => update("portfolio.items", next)}
        render={(item, setItem) => (
          <>
            <div className="grid-2">
              <TextField label="Slug" value={String(item.slug || "")} onChange={(v) => setItem({ ...item, slug: v })} />
              <TextField label="Category" value={String(item.category || "")} onChange={(v) => setItem({ ...item, category: v })} />
            </div>
            <TextField label="Title" value={String(item.title || "")} onChange={(v) => setItem({ ...item, title: v })} />
            <TextField label="Description" value={String(item.description || "")} onChange={(v) => setItem({ ...item, description: v })} />
            <TextField label="Full description" value={String(item.fullDescription || "")} onChange={(v) => setItem({ ...item, fullDescription: v })} textarea />
            <div className="field">
              <label>Image</label>
              <ImagePicker value={String(item.image || "")} onChange={(v) => setItem({ ...item, image: v })} />
            </div>
            <TextField label="Challenge" value={String(item.challenge || "")} onChange={(v) => setItem({ ...item, challenge: v })} textarea />
            <TextField label="Solution" value={String(item.solution || "")} onChange={(v) => setItem({ ...item, solution: v })} textarea />
            <div className="field">
              <label>Technologies (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(item.tech) ? (item.tech as string[]).join(", ") : ""}
                onChange={(e) =>
                  setItem({
                    ...item,
                    tech: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div className="field">
              <label>Achievements</label>
              <Repeater
                items={(item.achievements as Array<Record<string, unknown>>) || []}
                onChange={(next) => setItem({ ...item, achievements: next })}
                render={(a, setA) => (
                  <div className="grid-2">
                    <TextField label="Value" value={String(a.value || "")} onChange={(v) => setA({ ...a, value: v })} />
                    <TextField label="Label" value={String(a.label || "")} onChange={(v) => setA({ ...a, label: v })} />
                  </div>
                )}
                emptyItem={{ value: "", label: "" }}
              />
            </div>
          </>
        )}
        emptyItem={{
          slug: "",
          title: "",
          category: "",
          description: "",
          fullDescription: "",
          image: "",
          achievements: [],
          tech: [],
          challenge: "",
          solution: "",
        }}
      />
    </div>
  );
}

function WhyUsTab({ doc, update }: TabProps) {
  const stats = (get<Array<Record<string, unknown>>>(doc, "whyUs.stats") || []) as Array<Record<string, unknown>>;
  const reasons = (get<Array<Record<string, unknown>>>(doc, "whyUs.reasons") || []) as Array<Record<string, unknown>>;
  return (
    <div className="admin-card">
      <h2>Why Us</h2>
      <TextField label="Title" value={get<string>(doc, "whyUs.title") || ""} onChange={(v) => update("whyUs.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "whyUs.subtitle") || ""} onChange={(v) => update("whyUs.subtitle", v)} />

      <h2 style={{ marginTop: 24 }}>Stats</h2>
      <Repeater
        items={stats}
        onChange={(next) => update("whyUs.stats", next)}
        render={(item, setItem) => (
          <div className="grid-2">
            <NumField label="Value" value={Number(item.value) || 0} onChange={(v) => setItem({ ...item, value: v })} />
            <TextField label="Suffix" value={String(item.suffix || "")} onChange={(v) => setItem({ ...item, suffix: v })} />
            <TextField label="Label" value={String(item.label || "")} onChange={(v) => setItem({ ...item, label: v })} />
          </div>
        )}
        emptyItem={{ value: 0, suffix: "", label: "" }}
      />

      <h2 style={{ marginTop: 24 }}>Reasons</h2>
      <Repeater
        items={reasons}
        onChange={(next) => update("whyUs.reasons", next)}
        render={(item, setItem) => (
          <>
            <TextField label="Title" value={String(item.title || "")} onChange={(v) => setItem({ ...item, title: v })} />
            <TextField label="Description" value={String(item.description || "")} onChange={(v) => setItem({ ...item, description: v })} textarea />
          </>
        )}
        emptyItem={{ title: "", description: "" }}
      />
    </div>
  );
}

function TestimonialsTab({ doc, update }: TabProps) {
  const items = (get<Array<Record<string, unknown>>>(doc, "testimonials.items") || []) as Array<Record<string, unknown>>;
  return (
    <div className="admin-card">
      <h2>Testimonials</h2>
      <TextField label="Title" value={get<string>(doc, "testimonials.title") || ""} onChange={(v) => update("testimonials.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "testimonials.subtitle") || ""} onChange={(v) => update("testimonials.subtitle", v)} />
      <Repeater
        items={items}
        onChange={(next) => update("testimonials.items", next)}
        render={(item, setItem) => (
          <>
            <div className="grid-2">
              <TextField label="Name" value={String(item.name || "")} onChange={(v) => setItem({ ...item, name: v })} />
              <TextField label="Role" value={String(item.role || "")} onChange={(v) => setItem({ ...item, role: v })} />
            </div>
            <TextField label="Content" value={String(item.content || "")} onChange={(v) => setItem({ ...item, content: v })} textarea />
          </>
        )}
        emptyItem={{ name: "", role: "", content: "" }}
      />
    </div>
  );
}

function TechStackTab({ doc, update }: TabProps) {
  return (
    <div className="admin-card">
      <h2>Tech stack</h2>
      <TextField label="Title" value={get<string>(doc, "techStack.title") || ""} onChange={(v) => update("techStack.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "techStack.subtitle") || ""} onChange={(v) => update("techStack.subtitle", v)} textarea />
    </div>
  );
}

function CTATab({ doc, update }: TabProps) {
  return (
    <div className="admin-card">
      <h2>Call-to-action</h2>
      <div className="grid-2">
        <TextField label="Title line 1" value={get<string>(doc, "cta.titleLine1") || ""} onChange={(v) => update("cta.titleLine1", v)} />
        <TextField label="Title line 2" value={get<string>(doc, "cta.titleLine2") || ""} onChange={(v) => update("cta.titleLine2", v)} />
      </div>
      <TextField label="Subtitle" value={get<string>(doc, "cta.subtitle") || ""} onChange={(v) => update("cta.subtitle", v)} textarea />
      <div className="grid-2">
        <TextField label="Email button" value={get<string>(doc, "cta.email") || ""} onChange={(v) => update("cta.email", v)} />
        <TextField label="Call button" value={get<string>(doc, "cta.call") || ""} onChange={(v) => update("cta.call", v)} />
      </div>
    </div>
  );
}

function FooterTab({ doc, update }: TabProps) {
  return (
    <div className="admin-card">
      <h2>Footer</h2>
      <div className="grid-2">
        <TextField label="Quick links" value={get<string>(doc, "footer.quickLinks") || ""} onChange={(v) => update("footer.quickLinks", v)} />
        <TextField label="Services" value={get<string>(doc, "footer.services") || ""} onChange={(v) => update("footer.services", v)} />
        <TextField label="Contact title" value={get<string>(doc, "footer.contactTitle") || ""} onChange={(v) => update("footer.contactTitle", v)} />
        <TextField label="Copyright" value={get<string>(doc, "footer.copyright") || ""} onChange={(v) => update("footer.copyright", v)} />
      </div>
      <TextField label="Made with" value={get<string>(doc, "footer.madeWith") || ""} onChange={(v) => update("footer.madeWith", v)} />
    </div>
  );
}

function AboutTab({ doc, update }: TabProps) {
  const values = (get<Array<Record<string, unknown>>>(doc, "about.values") || []) as Array<Record<string, unknown>>;
  const timeline = (get<Array<Record<string, unknown>>>(doc, "about.timeline") || []) as Array<Record<string, unknown>>;
  const team = (get<Array<Record<string, unknown>>>(doc, "about.team") || []) as Array<Record<string, unknown>>;

  return (
    <div className="admin-card">
      <h2>About page</h2>
      <TextField label="Tag" value={get<string>(doc, "about.tag") || ""} onChange={(v) => update("about.tag", v)} />
      <div className="grid-2">
        <TextField label="Title line 1" value={get<string>(doc, "about.titleLine1") || ""} onChange={(v) => update("about.titleLine1", v)} />
        <TextField label="Highlight" value={get<string>(doc, "about.titleHighlight") || ""} onChange={(v) => update("about.titleHighlight", v)} />
      </div>
      <TextField label="Title line 2" value={get<string>(doc, "about.titleLine2") || ""} onChange={(v) => update("about.titleLine2", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "about.subtitle") || ""} onChange={(v) => update("about.subtitle", v)} textarea />

      <h2 style={{ marginTop: 24 }}>Story</h2>
      <TextField label="Story tag" value={get<string>(doc, "about.storyTag") || ""} onChange={(v) => update("about.storyTag", v)} />
      <TextField label="Story title" value={get<string>(doc, "about.storyTitle") || ""} onChange={(v) => update("about.storyTitle", v)} />
      <TextField label="Paragraph 1" value={get<string>(doc, "about.storyP1") || ""} onChange={(v) => update("about.storyP1", v)} textarea />
      <TextField label="Paragraph 2" value={get<string>(doc, "about.storyP2") || ""} onChange={(v) => update("about.storyP2", v)} textarea />
      <div className="field">
        <label>Story image</label>
        <ImagePicker value={get<string>(doc, "about.storyImage") || ""} onChange={(v) => update("about.storyImage", v)} />
      </div>

      <h2 style={{ marginTop: 24 }}>Values</h2>
      <TextField label="Values title" value={get<string>(doc, "about.valuesTitle") || ""} onChange={(v) => update("about.valuesTitle", v)} />
      <Repeater
        items={values}
        onChange={(next) => update("about.values", next)}
        render={(item, setItem) => (
          <>
            <div className="grid-2">
              <TextField label="Title" value={String(item.title || "")} onChange={(v) => setItem({ ...item, title: v })} />
              <TextField label="Icon" value={String(item.icon || "")} onChange={(v) => setItem({ ...item, icon: v })} />
            </div>
            <TextField label="Description" value={String(item.description || "")} onChange={(v) => setItem({ ...item, description: v })} textarea />
          </>
        )}
        emptyItem={{ title: "", description: "", icon: "✦" }}
      />

      <h2 style={{ marginTop: 24 }}>Timeline</h2>
      <TextField label="Timeline title" value={get<string>(doc, "about.timelineTitle") || ""} onChange={(v) => update("about.timelineTitle", v)} />
      <Repeater
        items={timeline}
        onChange={(next) => update("about.timeline", next)}
        render={(item, setItem) => (
          <>
            <div className="grid-2">
              <TextField label="Year" value={String(item.year || "")} onChange={(v) => setItem({ ...item, year: v })} />
              <TextField label="Title" value={String(item.title || "")} onChange={(v) => setItem({ ...item, title: v })} />
            </div>
            <TextField label="Description" value={String(item.description || "")} onChange={(v) => setItem({ ...item, description: v })} textarea />
          </>
        )}
        emptyItem={{ year: "", title: "", description: "" }}
      />

      <h2 style={{ marginTop: 24 }}>Team</h2>
      <TextField label="Team title" value={get<string>(doc, "about.teamTitle") || ""} onChange={(v) => update("about.teamTitle", v)} />
      <TextField label="Team subtitle" value={get<string>(doc, "about.teamSubtitle") || ""} onChange={(v) => update("about.teamSubtitle", v)} />
      <Repeater
        items={team}
        onChange={(next) => update("about.team", next)}
        render={(item, setItem) => (
          <>
            <div className="grid-2">
              <TextField label="Name" value={String(item.name || "")} onChange={(v) => setItem({ ...item, name: v })} />
              <TextField label="Role" value={String(item.role || "")} onChange={(v) => setItem({ ...item, role: v })} />
            </div>
            <div className="field">
              <label>Photo</label>
              <ImagePicker value={String(item.image || "")} onChange={(v) => setItem({ ...item, image: v })} />
            </div>
          </>
        )}
        emptyItem={{ name: "", role: "", image: "" }}
      />
    </div>
  );
}

function ContactTab({ doc, update }: TabProps) {
  return (
    <div className="admin-card">
      <h2>Contact page</h2>
      <TextField label="Tag" value={get<string>(doc, "contact.tag") || ""} onChange={(v) => update("contact.tag", v)} />
      <TextField label="Title" value={get<string>(doc, "contact.title") || ""} onChange={(v) => update("contact.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "contact.subtitle") || ""} onChange={(v) => update("contact.subtitle", v)} textarea />
      <div className="grid-2">
        <TextField label="Info title" value={get<string>(doc, "contact.infoTitle") || ""} onChange={(v) => update("contact.infoTitle", v)} />
        <TextField label="Info subtitle" value={get<string>(doc, "contact.infoSubtitle") || ""} onChange={(v) => update("contact.infoSubtitle", v)} />
        <TextField label="Email label" value={get<string>(doc, "contact.emailLabel") || ""} onChange={(v) => update("contact.emailLabel", v)} />
        <TextField label="Phone label" value={get<string>(doc, "contact.phoneLabel") || ""} onChange={(v) => update("contact.phoneLabel", v)} />
        <TextField label="Telegram label" value={get<string>(doc, "contact.telegramLabel") || ""} onChange={(v) => update("contact.telegramLabel", v)} />
        <TextField label="Map placeholder" value={get<string>(doc, "contact.mapPlaceholder") || ""} onChange={(v) => update("contact.mapPlaceholder", v)} />
      </div>

      <h2 style={{ marginTop: 24 }}>Form labels</h2>
      <div className="grid-2">
        <TextField label="Name" value={get<string>(doc, "contact.form.name") || ""} onChange={(v) => update("contact.form.name", v)} />
        <TextField label="Name placeholder" value={get<string>(doc, "contact.form.namePlaceholder") || ""} onChange={(v) => update("contact.form.namePlaceholder", v)} />
        <TextField label="Email" value={get<string>(doc, "contact.form.email") || ""} onChange={(v) => update("contact.form.email", v)} />
        <TextField label="Email placeholder" value={get<string>(doc, "contact.form.emailPlaceholder") || ""} onChange={(v) => update("contact.form.emailPlaceholder", v)} />
        <TextField label="Subject" value={get<string>(doc, "contact.form.subject") || ""} onChange={(v) => update("contact.form.subject", v)} />
        <TextField label="Subject placeholder" value={get<string>(doc, "contact.form.subjectPlaceholder") || ""} onChange={(v) => update("contact.form.subjectPlaceholder", v)} />
        <TextField label="Budget" value={get<string>(doc, "contact.form.budget") || ""} onChange={(v) => update("contact.form.budget", v)} />
        <TextField label="Budget placeholder" value={get<string>(doc, "contact.form.budgetPlaceholder") || ""} onChange={(v) => update("contact.form.budgetPlaceholder", v)} />
        <TextField label="Message" value={get<string>(doc, "contact.form.message") || ""} onChange={(v) => update("contact.form.message", v)} />
        <TextField label="Message placeholder" value={get<string>(doc, "contact.form.messagePlaceholder") || ""} onChange={(v) => update("contact.form.messagePlaceholder", v)} />
        <TextField label="Submit" value={get<string>(doc, "contact.form.submit") || ""} onChange={(v) => update("contact.form.submit", v)} />
        <TextField label="Success title" value={get<string>(doc, "contact.form.successTitle") || ""} onChange={(v) => update("contact.form.successTitle", v)} />
        <TextField label="Success message" value={get<string>(doc, "contact.form.successMessage") || ""} onChange={(v) => update("contact.form.successMessage", v)} />
        <TextField label="Send another" value={get<string>(doc, "contact.form.sendAnother") || ""} onChange={(v) => update("contact.form.sendAnother", v)} />
      </div>

      <div className="field">
        <label>Subject options (comma separated)</label>
        <input
          type="text"
          value={(get<string[]>(doc, "contact.form.subjectOptions") || []).join(", ")}
          onChange={(e) =>
            update(
              "contact.form.subjectOptions",
              e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </div>
      <div className="field">
        <label>Budget options (comma separated)</label>
        <input
          type="text"
          value={(get<string[]>(doc, "contact.form.budgetOptions") || []).join(", ")}
          onChange={(e) =>
            update(
              "contact.form.budgetOptions",
              e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </div>
    </div>
  );
}

function BlogTab({ doc, update }: TabProps) {
  const posts = (get<Array<Record<string, unknown>>>(doc, "blog.posts") || []) as Array<Record<string, unknown>>;
  return (
    <div className="admin-card">
      <h2>Blog</h2>
      <TextField label="Tag" value={get<string>(doc, "blog.tag") || ""} onChange={(v) => update("blog.tag", v)} />
      <TextField label="Title" value={get<string>(doc, "blog.title") || ""} onChange={(v) => update("blog.title", v)} />
      <TextField label="Subtitle" value={get<string>(doc, "blog.subtitle") || ""} onChange={(v) => update("blog.subtitle", v)} />
      <TextField label="Read more" value={get<string>(doc, "blog.readMore") || ""} onChange={(v) => update("blog.readMore", v)} />

      <h2 style={{ marginTop: 24 }}>Posts</h2>
      <Repeater
        items={posts}
        onChange={(next) => update("blog.posts", next)}
        render={(item, setItem) => (
          <>
            <TextField label="Title" value={String(item.title || "")} onChange={(v) => setItem({ ...item, title: v })} />
            <TextField label="Excerpt" value={String(item.excerpt || "")} onChange={(v) => setItem({ ...item, excerpt: v })} textarea />
            <div className="grid-2">
              <TextField label="Date" value={String(item.date || "")} onChange={(v) => setItem({ ...item, date: v })} />
              <TextField label="Category" value={String(item.category || "")} onChange={(v) => setItem({ ...item, category: v })} />
            </div>
            <TextField label="Read time" value={String(item.readTime || "")} onChange={(v) => setItem({ ...item, readTime: v })} />
          </>
        )}
        emptyItem={{ title: "", excerpt: "", date: "", category: "", readTime: "" }}
      />
    </div>
  );
}

function RawTab({
  doc,
  setDoc,
}: {
  doc: ContentDoc;
  setDoc: (d: ContentDoc) => void;
}) {
  const [text, setText] = useState(JSON.stringify(doc, null, 2));
  const [err, setErr] = useState<string | null>(null);

  const apply = () => {
    try {
      const parsed = JSON.parse(text);
      setDoc(parsed);
      setErr(null);
    } catch (e) {
      setErr(String(e));
    }
  };

  return (
    <div className="admin-card">
      <h2>Raw JSON</h2>
      <p className="section-muted">
        Advanced: edit the whole document. &quot;Apply to editor&quot; loads it back into the tabbed forms. Then click Save changes at the top.
      </p>
      <textarea className="raw-json" value={text} onChange={(e) => setText(e.target.value)} />
      {err && (
        <div style={{ color: "#fca5a5", fontSize: 13, marginTop: 8 }}>{err}</div>
      )}
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={apply}>
          Apply to editor
        </button>
      </div>
    </div>
  );
}
