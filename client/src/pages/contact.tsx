import { lazy, Suspense, useState } from "react";
import { SharedHeader } from "@/components/shared-header";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import { ApplicationFlow } from "@/components/application-flow";
import { useLanguage } from "@/contexts/language-context";

const GeneralContactForm = lazy(() => import("@/components/general-contact-form"));

const FAQ_ITEMS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
];

function FaqSection() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto mt-24 max-w-2xl" data-testid="section-faq">
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">{t("faq.title")}</h2>
      <div className="divide-y divide-border border-y border-border">
        {FAQ_ITEMS.map((item, i) => (
          <details key={item.q} className="group py-4" data-testid={`faq-${i + 1}`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-foreground [&::-webkit-details-marker]:hidden">
              {t(item.q)}
              <span className="shrink-0 font-mono text-primary transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{t(item.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Contact() {
  const [showGeneral, setShowGeneral] = useState(false);
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
              {t("waitlist.subtitle")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("waitlist.button")}
            </h1>
            <p className="font-body text-lg italic text-muted-foreground max-w-xl mx-auto">
              {t("app.page.lede")}
            </p>
          </motion.div>

          <ApplicationFlow />

          <FaqSection />

          <div className="mt-20 text-center">
            <button
              onClick={() => setShowGeneral((s) => !s)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              data-testid="button-toggle-general"
            >
              {showGeneral ? t("app.page.hideGeneral") : t("app.page.general")}
            </button>
            {showGeneral && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-8 max-w-xl rounded-md border border-border bg-card p-6 text-left md:p-8"
              >
                <Suspense
                  fallback={
                    <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-primary/70 animate-pulse">
                      ASKYAN
                    </p>
                  }
                >
                  <GeneralContactForm />
                </Suspense>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
