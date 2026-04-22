import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="login-shell">
      <div className="login-box">
        <h1>Sotoon Tech</h1>
        <p>Sign in to manage the landing page content.</p>
        <LoginForm />
      </div>
    </div>
  );
}
