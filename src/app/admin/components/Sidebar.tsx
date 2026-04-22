"use client";

import { useRouter } from "next/navigation";

type Active = "dashboard" | "content" | "media" | "messages";

export default function Sidebar({
  username,
  active,
}: {
  username: string;
  active: Active;
}) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const item = (k: Active, href: string, label: string) => (
    <a href={href} className={active === k ? "active" : ""}>
      {label}
    </a>
  );

  return (
    <aside className="admin-sidebar">
      <div className="brand">Sotoon Tech CMS</div>
      {item("dashboard", "/admin", "Dashboard")}
      {item("content", "/admin/content", "Content")}
      {item("media", "/admin/media", "Media library")}
      {item("messages", "/admin/messages", "Messages")}
      <div style={{ flex: 1 }} />
      <div style={{ padding: "0 12px", color: "#9ba7b4", fontSize: 12 }}>
        Signed in as <strong style={{ color: "#fff" }}>{username}</strong>
      </div>
      <button onClick={logout}>Log out</button>
    </aside>
  );
}
