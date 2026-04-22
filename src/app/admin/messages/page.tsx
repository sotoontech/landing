import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Sidebar from "../components/Sidebar";
import MessagesList from "./MessagesList";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <Sidebar username={session.username} active="messages" />
      <main className="admin-main">
        <MessagesList />
      </main>
    </div>
  );
}
