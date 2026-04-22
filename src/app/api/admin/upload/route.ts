import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);
const MAX_BYTES = 8 * 1024 * 1024;

function uploadDir() {
  const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
  return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  const alt = form.get("alt");

  if (!(file instanceof File))
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED.has(file.type))
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: "File too large" }, { status: 400 });

  const ext = path.extname(file.name) || "." + file.type.split("/")[1];
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "");
  const id = crypto.randomBytes(8).toString("hex");
  const basename = `${Date.now()}-${id}${safeExt}`;

  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  const fullPath = path.join(dir, basename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(fullPath, buffer);

  const publicPath = `/uploads/${basename}`;
  const record = await prisma.upload.create({
    data: {
      filename: file.name,
      path: publicPath,
      mimeType: file.type,
      size: file.size,
      alt: typeof alt === "string" ? alt : null,
    },
  });

  return NextResponse.json(record);
}
