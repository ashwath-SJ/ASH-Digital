import { NextResponse } from "next/server";
import {
  COOKIE, adminConfigured, usingDefaults, checkCredentials, createToken, cookieOptions,
  isAuthed, sameOrigin, tooManyAttempts, recordFailure, clearFailures,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    configured: adminConfigured(),
    authed: isAuthed(),
    usingDefaults: usingDefaults(),
  });
}

export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!adminConfigured())
    return NextResponse.json({ error: "Set your own admin login in .env.local first." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (tooManyAttempts(ip))
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });

  let body = {};
  try { body = await req.json(); } catch {}

  if (!checkCredentials(body.username, body.password)) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 });
  }
  clearFailures(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, createToken(), cookieOptions);
  return res;
}
