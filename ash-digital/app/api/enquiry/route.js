import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readContent } from "@/lib/content";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please submit the form again." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const service = typeof body.service === "string" ? body.service.trim().slice(0, 100) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !service || message.length < 5) {
    return NextResponse.json({ error: "Please complete every field with valid details." }, { status: 400 });
  }

  const content = await readContent();
  const allowedServices = content.services.map((item) => item.title);
  if (!allowedServices.includes(service)) {
    return NextResponse.json({ error: "Please select a valid service." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({
      error: "Email delivery is not configured yet. Please ask the website administrator to add SMTP settings in .env.local.",
    }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: ENQUIRY_FROM_EMAIL || SMTP_USER,
      to: content.contact.email,
      replyTo: email,
      subject: `ASH Digital enquiry: ${service}`,
      text: `New project enquiry for ASH Digital\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry email delivery failed:", error);
    return NextResponse.json({ error: "The email could not be sent right now. Please try again later or contact us by email." }, { status: 502 });
  }
}
