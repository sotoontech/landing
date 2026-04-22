import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function loadJson(file: string) {
  const p = path.join(process.cwd(), "src", "i18n", "dictionaries", file);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function withImages(dict: Record<string, unknown>): Record<string, unknown> {
  const copy = JSON.parse(JSON.stringify(dict));

  copy.hero = { ...copy.hero, image: "" };

  if (copy.portfolio?.items) {
    copy.portfolio.items = copy.portfolio.items.map(
      (item: Record<string, unknown>, i: number) => ({
        ...item,
        image: `/images/portfolio/project-${i + 1}.jpg`,
      })
    );
  }

  if (copy.about) {
    copy.about.storyImage = "/images/about/team.jpg";
    if (copy.about.team) {
      copy.about.team = copy.about.team.map(
        (m: Record<string, unknown>, i: number) => ({
          ...m,
          image: `/images/team/member-${i + 1}.jpg`,
        })
      );
    }
  }

  copy.site = { ...copy.site, logo: "/images/logo.svg" };
  return copy;
}

async function main() {
  console.log("Seeding database...");

  const locales = [
    { locale: "fa", file: "fa.json" },
    { locale: "en", file: "en.json" },
  ];

  for (const { locale, file } of locales) {
    const dict = withImages(loadJson(file));
    await prisma.content.upsert({
      where: { locale },
      create: { locale, data: JSON.stringify(dict) },
      update: { data: JSON.stringify(dict) },
    });
    console.log(`  ✓ seeded content for ${locale}`);
  }

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    create: { username, passwordHash },
    update: { passwordHash },
  });
  console.log(`  ✓ admin user: ${username}`);

  const messagesFile = path.join(process.cwd(), "data", "messages.json");
  if (fs.existsSync(messagesFile)) {
    try {
      const raw = fs.readFileSync(messagesFile, "utf-8");
      const existing = JSON.parse(raw) as Array<Record<string, unknown>>;
      for (const m of existing) {
        await prisma.contactMessage.create({
          data: {
            name: String(m.name || ""),
            email: String(m.email || ""),
            subject: m.subject ? String(m.subject) : null,
            budget: m.budget ? String(m.budget) : null,
            message: String(m.message || ""),
            createdAt: m.createdAt
              ? new Date(String(m.createdAt))
              : new Date(),
          },
        });
      }
      if (existing.length > 0)
        console.log(`  ✓ imported ${existing.length} message(s)`);
    } catch {
      /* ignore */
    }
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
