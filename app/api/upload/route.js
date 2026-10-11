import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { isAuthed, sameOrigin } from "@/lib/auth";
import { UPLOAD_DIR } from "@/lib/content";

export const dynamic = "force-dynamic";
const MAX = 3 * 1024 * 1024; // 3 MB

function detect(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") return "webp";
  return null;
}

export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!isAuthed()) return NextResponse.json({ error: "Please log in again." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file received." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Image is larger than 3 MB." }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = detect(buf);
  if (!ext) return NextResponse.json({ error: "Use a JPG, PNG or WebP image." }, { status: 400 });

  const name = `${crypto.randomBytes(8).toString("hex")}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return NextResponse.json({ url: `/uploads/${name}` });
}
