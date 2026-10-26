import fs from "fs/promises";
import path from "path";
import { defaultContent, CATEGORIES, ICONS } from "./siteData";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const slug = (v) => String(v || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);

function checkImage(v) {
  const s = str(v, 300);
  if (!s) return "";
  if (/^\/uploads\/[a-f0-9]{16}\.(jpg|png|webp)$/.test(s)) return s;
  if (/^\/projects\/[a-z0-9-]+\.(jpg|png|webp)$/.test(s)) return s;
  if (/^https:\/\/[^\s]+$/i.test(s)) return s;
  return null;
}
function checkLink(v) {
  const s = str(v, 300);
  if (!s) return "";
  return /^https?:\/\/[^\s]+$/i.test(s) ? s : null;
}

// Validates and cleans anything coming from the admin panel. Returns { value } or { error }.
export function validateContent(input) {
  if (!input || typeof input !== "object") return { error: "Invalid data." };

  const c = input.contact || {};
  const contact = {
    email: str(c.email, 120),
    linkedin: str(c.linkedin, 300),
    instagram: str(c.instagram, 300),
    location: str(c.location, 160),
  };
  for (const key of ["linkedin", "instagram"]) {
    if (contact[key] && !/^https:\/\/[^\s]+$/i.test(contact[key])) {
      return { error: `${key === "linkedin" ? "LinkedIn" : "Instagram"} link must start with https://.` };
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) return { error: "Enter a valid email address." };

  if (!Array.isArray(input.services) || input.services.length === 0 || input.services.length > 12)
    return { error: "Services are missing." };
  const services = [];
  for (let i = 0; i < input.services.length; i++) {
    const s = input.services[i] || {};
    const title = str(s.title, 60);
    if (!title) return { error: "Every service needs a title." };
    const legacy = { dev: "code", marketing: "megaphone" };
    const icon = ICONS.includes(s.icon) ? s.icon : legacy[s.id] || "uiux";
    services.push({ id: slug(s.id) || `service-${i + 1}`, icon, title, text: str(s.text, 240) });
  }

  if (!Array.isArray(input.projects) || input.projects.length > 60) return { error: "Too many projects (max 60)." };
  const projects = [];
  const used = new Set();
  for (let i = 0; i < input.projects.length; i++) {
    const p = input.projects[i] || {};
    const title = str(p.title, 80);
    if (!title) return { error: `Project ${i + 1} needs a title.` };
    if (!CATEGORIES.includes(p.category)) return { error: `Project "${title}" needs a valid category.` };
    const image = checkImage(p.image);
    if (image === null) return { error: `Project "${title}": image must be an uploaded file or an https:// link.` };
    const link = checkLink(p.link);
    if (link === null) return { error: `Project "${title}": link must start with http:// or https://.` };
    let id = slug(p.id) || `project-${i + 1}`;
    while (used.has(id)) id += "x";
    used.add(id);
    projects.push({ id, title, category: p.category, description: str(p.description, 400), image, link });
  }

  // Offers (posters with an optional link under each). Older saved files have no "offers": treat as off.
  const o = input.offers && typeof input.offers === "object" ? input.offers : {};
  const rawPosters = o.posters === undefined ? [] : o.posters;
  if (!Array.isArray(rawPosters) || rawPosters.length > 20) return { error: "Too many offer posters (max 20)." };
  const posters = [];
  const usedPosters = new Set();
  for (let i = 0; i < rawPosters.length; i++) {
    const p = rawPosters[i] || {};
    const image = checkImage(p.image);
    if (image === null) return { error: `Offer poster ${i + 1}: image must be an uploaded file or an https:// link.` };
    if (!image) return { error: `Offer poster ${i + 1} has no image. Upload a poster or delete it.` };
    const link = checkLink(p.link);
    if (link === null) return { error: `Offer poster ${i + 1}: link must start with http:// or https://.` };
    let id = slug(p.id) || `offer-${i + 1}`;
    while (usedPosters.has(id)) id += "x";
    usedPosters.add(id);
    posters.push({ id, image, link });
  }
  const offers = { enabled: o.enabled === true, posters };

  return { value: { contact, services, projects, offers } };
}

export async function readContent() {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const { value } = validateContent(JSON.parse(raw));
    return value || defaultContent;
  } catch {
    return defaultContent;
  }
}

export async function writeContent(content) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(content, null, 2));
  await fs.rename(tmp, FILE);
}
