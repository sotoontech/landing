import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Sidebar from "./components/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [messages, uploads, unread] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.upload.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return (
    <div className="admin-shell">
      <Sidebar username={session.username} active="dashboard" />
      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard</h1>
        </header>

        <div className="dash-grid">
          <a className="dash-tile" href="/admin/content">
            <div className="num">2</div>
            <div className="lbl">Locales (fa, en)</div>
          </a>
          <a className="dash-tile" href="/admin/media">
            <div className="num">{uploads}</div>
            <div className="lbl">Uploaded files</div>
          </a>
          <a className="dash-tile" href="/admin/messages">
            <div className="num">{messages}</div>
            <div className="lbl">Contact messages ({unread} unread)</div>
          </a>
          <a className="dash-tile" href="/" target="_blank" rel="noreferrer">
            <div className="num" style={{ fontSize: 18, fontWeight: 600 }}>
              View site →
            </div>
            <div className="lbl">Open landing page in new tab</div>
          </a>
        </div>
      </main>
    </div>
  );
}
