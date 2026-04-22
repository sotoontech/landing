import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Sidebar from "../components/Sidebar";
import MediaLibrary from "./MediaLibrary";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <Sidebar username={session.username} active="media" />
      <main className="admin-main">
        <MediaLibrary />
      </main>
    </div>
  );
}
