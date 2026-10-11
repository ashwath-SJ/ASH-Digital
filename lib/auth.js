import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "ash_admin";
const TTL_SECONDS = 60 * 60 * 8; // stay logged in for 8 hours

// Default login (used until you set your own in .env.local)
export const DEFAULT_USERNAME = "admin";
export const DEFAULT_PASSWORD = "Ash@Admin#2026";

const username = () => process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
const password = () => process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

const sha = (v) => crypto.createHash("sha256").update(String(v)).digest();
const secret = () => process.env.AUTH_SECRET || `ash:${username()}:${password()}`;
const sign = (v) => crypto.createHmac("sha256", secret()).update(v).digest("hex");

export function usingDefaults() {
  return !process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME;
}

// Safety: once NEXT_PUBLIC_SITE_URL points to a real public website, the default
// login is switched off, so nobody on the internet can use the published default.
function siteIsPublic() {
  try {
    const host = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").hostname;
    return !(host === "localhost" || host.startsWith("127.") || host.startsWith("192.168.") || host.startsWith("10."));
  } catch {
    return false;
  }
}

export function adminConfigured() {
  if (usingDefaults() && siteIsPublic()) return false;
  return true;
}

export function checkCredentials(u, p) {
  if (!adminConfigured() || typeof u !== "string" || typeof p !== "string") return false;
  const okUser = crypto.timingSafeEqual(sha(u), sha(username()));
  const okPass = crypto.timingSafeEqual(sha(p), sha(password()));
  return okUser && okPass;
}

export function createToken() {
  const exp = String(Date.now() + TTL_SECONDS * 1000);
  return `${exp}.${sign(exp)}`;
}

function verifyToken(token) {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export function isAuthed() {
  return verifyToken(cookies().get(COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: (process.env.NEXT_PUBLIC_SITE_URL || "").startsWith("https"),
  path: "/",
  maxAge: TTL_SECONDS,
};

// Blocks requests coming from other websites
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// Very small login rate limit: 5 wrong tries per 15 minutes per IP
const attempts = new Map();
export function tooManyAttempts(ip) {
  const rec = attempts.get(ip);
  if (!rec || rec.reset < Date.now()) return false;
  return rec.count >= 5;
}
export function recordFailure(ip) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.reset < now) attempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
  else rec.count += 1;
}
export function clearFailures(ip) {
  attempts.delete(ip);
}
