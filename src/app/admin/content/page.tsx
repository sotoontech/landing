import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Sidebar from "../components/Sidebar";
import ContentEditor from "./ContentEditor";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <Sidebar username={session.username} active="content" />
      <main className="admin-main">
        <ContentEditor />
      </main>
    </div>
  );
}
