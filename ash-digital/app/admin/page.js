"use client";

import { useCallback, useEffect, useState } from "react";
import { CATEGORIES, ICONS, ICON_LABELS } from "@/lib/siteData";

const input =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-base text-white placeholder-white/40 outline-none transition focus:border-brand";
const btn = "rounded-full px-5 py-2.5 text-sm font-semibold transition";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-white/65">{label}</span>
      {children}
    </label>
  );
}

function Shell({ children }) {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">{children}</div>
    </main>
  );
}

function LoginForm({ onDone }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setBusy(false);
    if (res.ok) return onDone();
    const data = await res.json().catch(() => ({}));
    setError(data.error || "Login failed.");
  }

  return (
    <Shell>
      <form onSubmit={submit} className="mx-auto mt-16 max-w-sm rounded-3xl border border-white/10 bg-[#141414] p-8">
        <h1 className="font-display text-2xl font-semibold">Admin login</h1>
        <p className="mt-2 text-white/60">Sign in to update your projects, services and contact details.</p>
        <div className="mt-6 space-y-4">
          <Field label="Username">
            <input autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} className={input} autoComplete="username" />
          </Field>
          <Field label="Password">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} autoComplete="current-password" />
          </Field>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
        <button disabled={busy} className={`${btn} mt-6 w-full bg-brand py-3 hover:bg-[#7d62ff] disabled:opacity-60`}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </Shell>
  );
}

function ProjectCard({ p, index, total, onChange, onRemove, onMove, onError }) {
  const [uploading, setUploading] = useState(false);

  async function upload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) return onError(data.error || "Upload failed.");
    onChange({ image: data.url });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Project title">
          <input className={input} value={p.title} maxLength={80} onChange={(e) => onChange({ title: e.target.value })} />
        </Field>
        <Field label="Category">
          <select className={input} value={p.category} onChange={(e) => onChange({ category: e.target.value })}>
            {CATEGORIES.map((c) => (
              <option key={c} className="text-black">{c}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Short description">
            <textarea className={input} rows={3} maxLength={400} value={p.description} onChange={(e) => onChange({ description: e.target.value })} />
          </Field>
        </div>
        <Field label="Project link (optional)">
          <input className={input} placeholder="https://" value={p.link} onChange={(e) => onChange({ link: e.target.value })} />
        </Field>
        <div>
          <span className="mb-1.5 block text-sm text-white/65">Cover image (JPG, PNG or WebP, max 3 MB)</span>
          <div className="flex items-center gap-3">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
            ) : (
              <span className="grid h-14 w-20 place-items-center rounded-lg bg-white/5 text-xs text-white/40">None</span>
            )}
            <label className={`${btn} cursor-pointer border border-white/20 hover:bg-white/10`}>
              {uploading ? "Uploading…" : p.image ? "Change" : "Upload"}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => upload(e.target.files?.[0])} />
            </label>
            {p.image && (
              <button type="button" onClick={() => onChange({ image: "" })} className={`${btn} text-white/60 hover:text-white`}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex gap-2">
          <button type="button" disabled={index === 0} onClick={() => onMove(-1)} className={`${btn} border border-white/15 disabled:opacity-30`}>Move up</button>
          <button type="button" disabled={index === total - 1} onClick={() => onMove(1)} className={`${btn} border border-white/15 disabled:opacity-30`}>Move down</button>
        </div>
        <button type="button" onClick={onRemove} className={`${btn} text-red-400 hover:bg-red-500/10`}>Delete project</button>
      </div>
    </div>
  );
}

function PosterCard({ p, index, total, onChange, onRemove, onMove, onError }) {
  const [uploading, setUploading] = useState(false);

  async function upload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) return onError(data.error || "Upload failed.");
    onChange({ image: data.url });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
        <div>
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="" className="max-h-64 w-full rounded-xl bg-black/30 object-contain" />
          ) : (
            <span className="grid h-40 w-full place-items-center rounded-xl bg-white/5 text-xs text-white/40">No poster yet</span>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <span className="mb-1.5 block text-sm text-white/65">Offer poster (JPG, PNG or WebP, max 3 MB)</span>
            <label className={`${btn} inline-block cursor-pointer border border-white/20 hover:bg-white/10`}>
              {uploading ? "Uploading…" : p.image ? "Change poster" : "Upload poster"}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => upload(e.target.files?.[0])} />
            </label>
          </div>
          <Field label="Link under the poster (Instagram or any website, optional)">
            <input className={input} placeholder="https://www.instagram.com/..." value={p.link} onChange={(e) => onChange({ link: e.target.value })} />
          </Field>
          {p.link && (
            <button type="button" onClick={() => onChange({ link: "" })} className={`${btn} border border-white/15 text-white/75 hover:text-white`}>
              Remove link
            </button>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex gap-2">
          <button type="button" disabled={index === 0} onClick={() => onMove(-1)} className={`${btn} border border-white/15 disabled:opacity-30`}>Move up</button>
          <button type="button" disabled={index === total - 1} onClick={() => onMove(1)} className={`${btn} border border-white/15 disabled:opacity-30`}>Move down</button>
        </div>
        <button type="button" onClick={onRemove} className={`${btn} text-red-400 hover:bg-red-500/10`}>Delete poster</button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [status, setStatus] = useState("loading"); // loading | setup | login | ready
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState("projects");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [defaults, setDefaults] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/content", { cache: "no-store" });
    setContent(await res.json());
    setStatus("ready");
  }, []);

  useEffect(() => {
    (async () => {
      const s = await fetch("/api/login", { cache: "no-store" }).then((r) => r.json());
      setDefaults(Boolean(s.usingDefaults));
      if (!s.configured) return setStatus("setup");
      if (!s.authed) return setStatus("login");
      load();
    })();
  }, [load]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const edit = (fn) => { setContent((c) => fn(structuredClone(c))); setDirty(true); setMsg(null); };

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (res.status === 401) return setStatus("login");
    if (!res.ok) return setMsg({ type: "error", text: data.error || "Could not save." });
    setContent(data.content);
    setDirty(false);
    setMsg({ type: "ok", text: "Saved. Your website is updated." });
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setStatus("login");
  }

  if (status === "loading") return <Shell><p className="text-white/60">Loading…</p></Shell>;

  if (status === "setup")
    return (
      <Shell>
        <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-white/10 bg-[#141414] p-8">
          <h1 className="font-display text-2xl font-semibold">Set your own admin login first</h1>
          <p className="mt-3 text-white/70">
            Your website address is public, so the default login is switched off for safety. In the project folder, copy{" "}
            <code className="rounded bg-white/10 px-1.5">.env.local.example</code> to{" "}
            <code className="rounded bg-white/10 px-1.5">.env.local</code>, fill in{" "}
            <code className="rounded bg-white/10 px-1.5">ADMIN_USERNAME</code> and{" "}
            <code className="rounded bg-white/10 px-1.5">ADMIN_PASSWORD</code>, then restart the site.
          </p>
        </div>
      </Shell>
    );

  if (status === "login") return <LoginForm onDone={load} />;

  const tabs = [["projects", "Projects"], ["offers", "Offers"], ["services", "Services"], ["contact", "Contact info"]];

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">ASH Digital admin</h1>
        <div className="flex gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className={`${btn} border border-white/20 hover:bg-white/10`}>View website</a>
          <button onClick={logout} className={`${btn} border border-white/20 hover:bg-white/10`}>Log out</button>
        </div>
      </header>

      {defaults && (
        <p role="alert" className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          You are using the default admin login. Before you publish the website, set your own{" "}
          <code className="rounded bg-white/10 px-1">ADMIN_USERNAME</code> and{" "}
          <code className="rounded bg-white/10 px-1">ADMIN_PASSWORD</code> in <code className="rounded bg-white/10 px-1">.env.local</code>.
        </p>
      )}

      <div role="tablist" className="mt-8 flex gap-2 overflow-x-auto">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`${btn} shrink-0 ${tab === id ? "bg-brand" : "border border-white/15 text-white/75 hover:text-white"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5 pb-32">
        {tab === "projects" && (
          <>
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
              {content.projects.length === 0
                ? "No projects yet. When you add your first project, an \"Our Projects\" section (with category filters) appears on your website automatically."
                : "Your projects are shown on the website in this order, with category filters."}
            </p>
            {content.projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                p={p}
                index={i}
                total={content.projects.length}
                onChange={(patch) => edit((c) => { Object.assign(c.projects[i], patch); return c; })}
                onRemove={() => confirm(`Delete "${p.title || "this project"}"?`) && edit((c) => { c.projects.splice(i, 1); return c; })}
                onMove={(d) => edit((c) => { const [x] = c.projects.splice(i, 1); c.projects.splice(i + d, 0, x); return c; })}
                onError={(text) => setMsg({ type: "error", text })}
              />
            ))}
            <button
              type="button"
              onClick={() => edit((c) => { c.projects.unshift({ id: `p${Date.now().toString(36)}`, title: "", category: CATEGORIES[0], description: "", image: "", link: "" }); return c; })}
              className={`${btn} border border-dashed border-white/30 py-4 hover:bg-white/5`}
            >
              + Add a project
            </button>
          </>
        )}

        {tab === "offers" && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-6">
              <div>
                <p className="font-semibold">Show the Offers section on the website</p>
                <p className="mt-1 text-sm text-white/65">
                  {content.offers.enabled
                    ? content.offers.posters.length === 0
                      ? "Switched ON, but the section stays hidden until you add a poster."
                      : "Switched ON. The Offers section is visible on your website."
                    : "Switched OFF. The Offers section and its menu link are hidden."}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={content.offers.enabled}
                aria-label="Show Offers section on the website"
                onClick={() => edit((c) => { c.offers.enabled = !c.offers.enabled; return c; })}
                className={`relative h-8 w-14 shrink-0 rounded-full transition ${content.offers.enabled ? "bg-brand" : "bg-white/20"}`}
              >
                <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${content.offers.enabled ? "left-7" : "left-1"}`} />
              </button>
            </div>
            {content.offers.posters.map((p, i) => (
              <PosterCard
                key={p.id}
                p={p}
                index={i}
                total={content.offers.posters.length}
                onChange={(patch) => edit((c) => { Object.assign(c.offers.posters[i], patch); return c; })}
                onRemove={() => confirm("Delete this poster?") && edit((c) => { c.offers.posters.splice(i, 1); return c; })}
                onMove={(d) => edit((c) => { const [x] = c.offers.posters.splice(i, 1); c.offers.posters.splice(i + d, 0, x); return c; })}
                onError={(text) => setMsg({ type: "error", text })}
              />
            ))}
            {content.offers.posters.length < 20 && (
              <button
                type="button"
                onClick={() => edit((c) => { c.offers.posters.unshift({ id: `o${Date.now().toString(36)}`, image: "", link: "" }); return c; })}
                className={`${btn} border border-dashed border-white/30 py-4 hover:bg-white/5`}
              >
                + Add a new poster
              </button>
            )}
          </>
        )}

        {tab === "services" && (
          <>
            {content.services.map((s, i) => (
              <div key={s.id} className="rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Service name">
                    <input className={input} maxLength={60} value={s.title} onChange={(e) => edit((c) => { c.services[i].title = e.target.value; return c; })} />
                  </Field>
                  <Field label="Icon">
                    <select className={input} value={s.icon || "uiux"} onChange={(e) => edit((c) => { c.services[i].icon = e.target.value; return c; })}>
                      {ICONS.map((k) => (
                        <option key={k} value={k} className="text-black">{ICON_LABELS[k]}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Short description">
                      <textarea className={input} rows={3} maxLength={240} value={s.text} onChange={(e) => edit((c) => { c.services[i].text = e.target.value; return c; })} />
                    </Field>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex gap-2">
                    <button type="button" disabled={i === 0} onClick={() => edit((c) => { const [x] = c.services.splice(i, 1); c.services.splice(i - 1, 0, x); return c; })} className={`${btn} border border-white/15 disabled:opacity-30`}>Move up</button>
                    <button type="button" disabled={i === content.services.length - 1} onClick={() => edit((c) => { const [x] = c.services.splice(i, 1); c.services.splice(i + 1, 0, x); return c; })} className={`${btn} border border-white/15 disabled:opacity-30`}>Move down</button>
                  </div>
                  <button
                    type="button"
                    disabled={content.services.length === 1}
                    onClick={() => confirm(`Delete "${s.title || "this service"}"?`) && edit((c) => { c.services.splice(i, 1); return c; })}
                    className={`${btn} text-red-400 hover:bg-red-500/10 disabled:opacity-30`}
                  >
                    Delete service
                  </button>
                </div>
              </div>
            ))}
            {content.services.length < 12 && (
              <button
                type="button"
                onClick={() => edit((c) => { c.services.push({ id: `s${Date.now().toString(36)}`, icon: "uiux", title: "", text: "" }); return c; })}
                className={`${btn} border border-dashed border-white/30 py-4 hover:bg-white/5`}
              >
                + Add a service
              </button>
            )}
          </>
        )}

        {tab === "contact" && (
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-6">
            <Field label="Enquiry recipient email">
              <input type="email" className={input} value={content.contact.email} onChange={(e) => edit((c) => { c.contact.email = e.target.value; return c; })} />
            </Field>
            <Field label="LinkedIn profile URL (optional)">
              <input type="url" className={input} placeholder="https://www.linkedin.com/in/your-profile" value={content.contact.linkedin || ""} onChange={(e) => edit((c) => { c.contact.linkedin = e.target.value; return c; })} />
            </Field>
            <Field label="Instagram profile URL (optional)">
              <input type="url" className={input} placeholder="https://www.instagram.com/your-id/" value={content.contact.instagram || ""} onChange={(e) => edit((c) => { c.contact.instagram = e.target.value; return c; })} />
            </Field>
            <Field label="Location">
              <input className={input} value={content.contact.location} onChange={(e) => edit((c) => { c.contact.location = e.target.value; return c; })} />
            </Field>
          </div>
        )}
      </div>

      {/* sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <p role="status" className={`text-sm ${msg?.type === "error" ? "text-red-400" : "text-white/70"}`}>
            {msg ? msg.text : dirty ? "You have unsaved changes." : "All changes saved."}
          </p>
          <button onClick={save} disabled={!dirty || saving} className={`${btn} bg-brand px-7 py-3 hover:bg-[#7d62ff] disabled:opacity-40`}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </Shell>
  );
}
