import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password)
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

    const user = await prisma.adminUser.findUnique({ where: { username } });
    if (!user)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = await signSession({
      sub: String(user.id),
      username: user.username,
    });
    await setSessionCookie(token);

    return NextResponse.json({ ok: true, username: user.username });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
