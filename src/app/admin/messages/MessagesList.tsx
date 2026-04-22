"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  budget: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      if (res.ok) setMessages(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (m: Message) => {
    await fetch(`/api/admin/messages/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    setMessages((list) =>
      list.map((x) => (x.id === m.id ? { ...x, read: !x.read } : x))
    );
  };

  const del = async (m: Message) => {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    const res = await fetch(`/api/admin/messages/${m.id}`, { method: "DELETE" });
    if (res.ok) setMessages((list) => list.filter((x) => x.id !== m.id));
  };

  return (
    <>
      <header className="admin-header">
        <h1>Contact messages</h1>
      </header>

      {loading && <p className="section-muted">Loading…</p>}
      {!loading && messages.length === 0 && (
        <p className="section-muted">No messages yet.</p>
      )}

      <ul className="msg-list">
        {messages.map((m) => (
          <li key={m.id} className={`msg-item ${m.read ? "read" : ""}`}>
            <div>
              <div className="title">
                {!m.read && <span className="unread-dot" />}
                {m.name}
                <span style={{ color: "#9ba7b4", fontWeight: 400 }}>
                  — {m.email}
                </span>
              </div>
              <div className="meta">
                {new Date(m.createdAt).toLocaleString()}
                {m.subject && <> · {m.subject}</>}
                {m.budget && <> · {m.budget}</>}
              </div>
              <div className="body">{m.message}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-end",
              }}
            >
              <button className="btn ghost" onClick={() => toggleRead(m)}>
                Mark {m.read ? "unread" : "read"}
              </button>
              <button className="btn danger" onClick={() => del(m)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
