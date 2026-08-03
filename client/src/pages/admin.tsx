import { useEffect, useState } from "react";
import { SharedHeader } from "@/components/shared-header";

// Private ops room (/admin — unlisted): the site has been collecting
// subscribers, contact messages, and its own analytics since day one, but
// there was no way to see any of it without curling API URLs. Enter the
// ADMIN_SECRET once; it stays in sessionStorage for the tab's lifetime.

interface Subscriber { id: string; email: string }
interface Contact { id: string; name: string; email: string; inquiryType: string; message: string }
interface Summary {
  totalPageViews: number;
  uniquePaths: number;
  totalSubscribers: number;
  totalContacts: number;
  topPages: { path: string; count: number }[];
  recentEvents: { id: string; eventType: string; eventData: string | null; timestamp: string }[];
}

const KEY_STORAGE = "askyan-admin-key";

async function fetchJson<T>(path: string, key: string): Promise<T> {
  const res = await fetch(path, { headers: { "x-admin-key": key } });
  if (!res.ok) throw new Error(res.status === 401 ? "Wrong key" : `Failed (${res.status})`);
  return res.json();
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="font-display text-3xl text-foreground tabular-nums">{value}</div>
      <div className="mt-1 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

export default function AdminPage() {
  const [key, setKey] = useState<string>(() => sessionStorage.getItem(KEY_STORAGE) ?? "");
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subs, setSubs] = useState<Subscriber[] | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!key) return;
    setError(null);
    Promise.all([
      fetchJson<{ subscribers: Subscriber[] }>("/api/subscribers", key),
      fetchJson<{ contacts: Contact[] }>("/api/contacts", key),
      fetchJson<Summary>("/api/analytics/summary", key),
    ])
      .then(([s, c, a]) => {
        setSubs(s.subscribers);
        setContacts(c.contacts);
        setSummary(a);
        sessionStorage.setItem(KEY_STORAGE, key);
      })
      .catch((e: Error) => {
        setError(e.message);
        if (e.message === "Wrong key") {
          sessionStorage.removeItem(KEY_STORAGE);
          setKey("");
        }
      });
  }, [key]);

  if (!key) {
    return (
      <div className="min-h-screen bg-background">
        <SharedHeader variant="solid" />
        <main className="flex min-h-screen flex-col items-center justify-center px-6">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">Founders only</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground">The Ops Room</h1>
          <form
            className="mt-8 flex w-full max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) setKey(input.trim());
            }}
          >
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin key"
              className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <button type="submit" className="rounded-md bg-primary px-5 py-3 font-display text-xs uppercase tracking-widest text-primary-foreground">
              Enter
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-28">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">The Ops Room</span>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground">Askyan, by the numbers</h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem(KEY_STORAGE);
              setKey("");
              setSubs(null);
              setContacts(null);
              setSummary(null);
            }}
            className="font-display text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Lock
          </button>
        </div>

        {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

        {summary && (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat label="Waitlist" value={summary.totalSubscribers} />
            <Stat label="Messages" value={summary.totalContacts} />
            <Stat label="Page views" value={summary.totalPageViews} />
            <Stat label="Pages seen" value={summary.uniquePaths} />
          </div>
        )}

        {subs && (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">Waitlist ({subs.length})</h2>
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(subs.map((s) => s.email).join("\n"));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="rounded-md border border-border px-3 py-1.5 font-display text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
              >
                {copied ? "Copied" : "Copy all"}
              </button>
            </div>
            <div className="mt-4 max-h-72 overflow-y-auto rounded-md border border-border bg-card">
              {subs.length === 0 && <p className="p-6 text-sm text-muted-foreground">No signups yet — go share the link.</p>}
              {subs.map((s) => (
                <div key={s.id} className="border-b border-border/50 px-5 py-2.5 font-body text-sm text-foreground/90 last:border-0">
                  {s.email}
                </div>
              ))}
            </div>
          </section>
        )}

        {contacts && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground">Messages ({contacts.length})</h2>
            <div className="mt-4 space-y-3">
              {contacts.length === 0 && (
                <p className="rounded-md border border-border bg-card p-6 text-sm text-muted-foreground">Nothing yet.</p>
              )}
              {contacts.map((c) => (
                <div key={c.id} className="rounded-md border border-border bg-card p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display font-bold text-foreground">{c.name}</span>
                    <a href={`mailto:${c.email}`} className="font-body text-sm text-primary">{c.email}</a>
                    <span className="rounded-full border border-border px-2 py-0.5 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                      {c.inquiryType}
                    </span>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-foreground/85">{c.message}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {summary && summary.topPages.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground">Most-visited pages</h2>
            <div className="mt-4 rounded-md border border-border bg-card">
              {summary.topPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between border-b border-border/50 px-5 py-2.5 last:border-0">
                  <span className="font-body text-sm text-foreground/90">{p.path}</span>
                  <span className="font-display text-sm tabular-nums text-muted-foreground">{p.count}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
