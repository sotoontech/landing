import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "messages.json");

function readMessages() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeMessages(messages: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const entry = {
      id: Date.now(),
      name,
      email,
      subject: subject || "",
      budget: budget || "",
      message,
      createdAt: new Date().toISOString(),
    };

    const messages = readMessages();
    messages.push(entry);
    writeMessages(messages);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
