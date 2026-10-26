import fs from "fs/promises";
import path from "path";
import { UPLOAD_DIR } from "@/lib/content";

export const dynamic = "force-dynamic";
const TYPES = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export async function GET(_req, { params }) {
  const m = /^[a-f0-9]{16}\.(jpg|png|webp)$/.exec(params.file);
  if (!m) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, params.file));
    return new Response(data, {
      headers: { "Content-Type": TYPES[m[1]], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
