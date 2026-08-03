import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAnalytics } from "@/hooks/use-analytics";

// Request Access as an application, not a signup form. Three quiet steps —
// who you are, which journey calls, why — ending in a boarding-pass-style
// confirmation. Deliberately more friction than an email field: this is a
// cohort you apply to, and the form should feel like it.

const EXPEDITIONS = [
  { id: "kazakhstan-steppe", code: "001", title: "The Steppe Awakening", country: "Kazakhstan", coords: "43.3510° N, 79.0794° E" },
  { id: "kyrgyzstan-heights", code: "002", title: "The Celestial Mountains", country: "Kyrgyzstan", coords: "41.8397° N, 75.1338° E" },
  { id: "mongolia-gobi", code: "003", title: "The Gobi Crossing", country: "Mongolia", coords: "43.5000° N, 103.5000° E" },
  { id: "nepal-mustang", code: "004", title: "The Forbidden Kingdom", country: "Nepal", coords: "29.1892° N, 83.9531° E" },
  { id: "bhutan-sacred", code: "005", title: "The Thunder Dragon Path", country: "Bhutan", coords: "27.4916° N, 89.3639° E" },
  { id: "indonesia-flores", code: "006", title: "The Ring of Fire", country: "Indonesia", coords: "8.5500° S, 119.4890° E" },
  { id: "undecided", code: "000", title: "Undecided — advise me", country: "The Unseen World", coords: "" },
];

interface Applied {
  name: string;
  expedition: (typeof EXPEDITIONS)[number];
}

function BoardingPass({ applied }: { applied: Applied }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="mx-auto max-w-xl"
      data-testid="boarding-pass"
    >
      <div className="rounded-md border border-primary/60 bg-card p-1">
        <div className="rounded-[4px] border border-primary/25 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-primary">ASKYAN EXPEDITIONS</p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">Application received</p>
            </div>
            <span className="rounded-sm border border-primary/50 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-primary">
              FOUNDING COHORT
            </span>
          </div>

          <div className="my-6 border-t border-dashed border-primary/30" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">APPLICANT</p>
              <p className="mt-0.5 font-display text-lg text-foreground">{applied.name}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">STATUS</p>
              <p className="mt-0.5 font-display text-lg text-primary">Under review</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">EXPEDITION</p>
              <p className="mt-0.5 font-display text-lg text-foreground">
                {applied.expedition.code !== "000" && (
                  <span className="mr-2 font-mono text-sm text-primary">{applied.expedition.code}</span>
                )}
                {applied.expedition.title}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">ANCHOR</p>
              <p className="mt-0.5 font-mono text-sm text-foreground/80">{applied.expedition.coords || "TO BE CHARTED"}</p>
            </div>
          </div>

          <div className="my-6 border-t border-dashed border-primary/30" />

          <p className="font-body text-sm italic leading-relaxed text-muted-foreground">
            Applications are read personally by the founders. If your path and ours align,
            you&apos;ll hear from one of us directly — no automated replies, no mailing blasts.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ApplicationFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [expeditionId, setExpeditionId] = useState<string | null>(null);
  const [why, setWhy] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState<Applied | null>(null);
  const { trackContactSubmission } = useAnalytics();

  const expedition = EXPEDITIONS.find((e) => e.id === expeditionId) ?? null;

  const mutation = useMutation({
    mutationFn: async () => {
      const exp = expedition!;
      const message =
        `[APPLICATION — EXPEDITION ${exp.code} · ${exp.title.toUpperCase()}]\n\n` +
        `Why: ${why.trim()}\n\n` +
        (referral.trim() ? `Heard about ASKYAN via: ${referral.trim()}` : "Referral: not given");
      const res = await apiRequest("POST", "/api/contact", {
        name: name.trim(),
        email: email.trim(),
        inquiryType: "expedition",
        message,
      });
      // Also place the applicant on the waitlist; a duplicate is fine.
      void apiRequest("POST", "/api/subscribe", { email: email.trim() }).catch(() => {});
      return res.json();
    },
    onSuccess: () => {
      trackContactSubmission("expedition");
      setApplied({ name: name.trim(), expedition: expedition! });
    },
    onError: (e: Error) => setError(e.message || "Something went wrong — try again."),
  });

  if (applied) return <BoardingPass applied={applied} />;

  const next = () => {
    setError(null);
    if (step === 0) {
      if (name.trim().length < 2) return setError("Your name, at least.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError("A real email — it's how we reply.");
      setStep(1);
    } else if (step === 1) {
      if (!expeditionId) return setError("Choose a journey — or 'Undecided'.");
      setStep(2);
    } else {
      if (why.trim().length < 10) return setError("A sentence or two — why this, why now.");
      mutation.mutate();
    }
  };

  const stepTitles = ["Who you are", "Which journey calls", "Why you"];

  return (
    <div className="mx-auto max-w-2xl" data-testid="application-flow">
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {stepTitles.map((t, i) => (
          <div key={t} className="flex-1">
            <div className={`h-0.5 rounded-full transition-colors duration-500 ${i <= step ? "bg-primary" : "bg-border"}`} />
            <p className={`mt-2 font-mono text-[10px] uppercase tracking-[0.2em] ${i === step ? "text-primary" : "text-muted-foreground"}`}>
              {String(i + 1).padStart(2, "0")} — {t}
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
        >
          {step === 0 && (
            <div className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="h-12 bg-card"
                data-testid="input-app-name"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="h-12 bg-card"
                data-testid="input-app-email"
              />
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {EXPEDITIONS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setExpeditionId(e.id)}
                  className={`rounded-md border p-4 text-left transition-colors ${
                    expeditionId === e.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
                  } ${e.id === "undecided" ? "sm:col-span-2" : ""}`}
                  data-testid={`pick-${e.id}`}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                    {e.code !== "000" ? `EXPEDITION ${e.code}` : "OPEN"} — {e.country.toUpperCase()}
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold text-foreground">{e.title}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Textarea
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                placeholder="What draws you to the unseen world? A few honest sentences beat a polished paragraph."
                rows={5}
                className="bg-card"
                data-testid="input-app-why"
              />
              <Input
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder="How did you hear about ASKYAN? (optional)"
                className="h-12 bg-card"
                data-testid="input-app-referral"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => step > 0 && setStep(step - 1)}
          className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
            step > 0 ? "text-muted-foreground hover:text-foreground" : "invisible"
          }`}
          data-testid="button-app-back"
        >
          Back
        </button>
        <Button
          onClick={next}
          disabled={mutation.isPending}
          className="px-8 font-display tracking-wide"
          data-testid="button-app-next"
        >
          {mutation.isPending ? "Sending…" : step === 2 ? "Submit application" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
