import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, budget, message } = body;

    if (!name || !email || !message)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    await prisma.contactMessage.create({
      data: {
        name: String(name),
        email: String(email),
        subject: subject ? String(subject) : null,
        budget: budget ? String(budget) : null,
        message: String(message),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
