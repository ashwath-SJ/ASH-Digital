import { NextResponse } from "next/server";
import { isAuthed, sameOrigin } from "@/lib/auth";
import { readContent, writeContent, validateContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await readContent());
}

export async function PUT(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!isAuthed()) return NextResponse.json({ error: "Please log in again." }, { status: 401 });

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const { value, error } = validateContent(body);
  if (error) return NextResponse.json({ error }, { status: 400 });
  await writeContent(value);
  return NextResponse.json({ ok: true, content: value });
}
