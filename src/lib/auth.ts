import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "sotoon_admin";
const ALG = "HS256";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  sub: string;
  username: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub === "string" && typeof payload.username === "string")
      return { sub: payload.sub, username: payload.username };
    return null;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    // Opt-in: only set Secure when deployed behind HTTPS (set COOKIE_SECURE=true in env).
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
