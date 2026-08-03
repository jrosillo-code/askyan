import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";

// One honest page in place of the three legacy "commitment" pages, which
// carried invented track records (acres protected, millions contributed).
// A brand-new collective has commitments, not achievements — so that is
// exactly what this page states.
const SECTIONS = [
  { num: "01", anchor: "conservation", titleKey: "hwt.conservation.title", p1: "hwt.conservation.p1", p2: "hwt.conservation.p2" },
  { num: "02", anchor: "community", titleKey: "hwt.community.title", p1: "hwt.community.p1", p2: "hwt.community.p2" },
  { num: "03", anchor: "sustainability", titleKey: "hwt.sustain.title", p1: "hwt.sustain.p1", p2: "hwt.sustain.p2" },
];

export default function HowWeTravel() {
  const { t } = useLanguage();

  // The home-page impact cards deep-link to #conservation/#community/
  // #sustainability. The router scrolls to top on navigation, so land on
  // the requested section just after.
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!anchor) return;
    const timer = setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">{t("hwt.kicker")}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">{t("hwt.title")}</h1>
            <p className="font-body text-lg italic leading-relaxed text-muted-foreground">{t("hwt.lede")}</p>
          </motion.div>

          <div className="space-y-16">
            {SECTIONS.map((section, i) => (
              <motion.section
                key={section.num}
                id={section.anchor}
                className="scroll-mt-28"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                data-testid={`hwt-section-${section.num}`}
              >
                <div className="mb-4 flex items-baseline gap-4">
                  <span className="font-mono text-sm text-primary">{section.num}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t(section.titleKey)}</h2>
                </div>
                <div className="border-l-2 border-primary/40 pl-6 space-y-4">
                  <p className="font-body text-base leading-relaxed text-foreground/90">{t(section.p1)}</p>
                  <p className="font-body text-base leading-relaxed text-muted-foreground">{t(section.p2)}</p>
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 border-t border-dashed border-primary/30 pt-8 text-center"
          >
            <p className="font-body text-sm italic leading-relaxed text-muted-foreground">{t("hwt.note")}</p>
            <Link
              href="/ledger"
              className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground"
              data-testid="link-ledger"
            >
              {t("hwt.ledgerCta")}
            </Link>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
