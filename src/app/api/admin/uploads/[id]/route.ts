import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

function uploadDir() {
  const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
  return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const record = await prisma.upload.findUnique({ where: { id: numericId } });
  if (!record)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const basename = path.basename(record.path);
  const fullPath = path.join(uploadDir(), basename);

  try {
    await fs.unlink(fullPath);
  } catch {
    /* file may already be gone — ignore */
  }

  await prisma.upload.delete({ where: { id: numericId } });
  return NextResponse.json({ ok: true });
}
