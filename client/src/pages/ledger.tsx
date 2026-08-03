import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";

// The Ledger: promises vs. delivered, in public. For a brand whose entire
// pitch is honesty, keeping score openly is the strongest trust feature the
// site can have. Rows are updated by hand as reality moves.
const ROWS = [
  { key: "row1", kind: "progress" },
  { key: "row2", kind: "progress" },
  { key: "row3", kind: "pending" },
  { key: "row4", kind: "progress" },
  { key: "row5", kind: "pending" },
  { key: "row6", kind: "active" },
] as const;

const KIND_STYLES: Record<string, string> = {
  active: "border-primary/60 text-primary",
  progress: "border-foreground/30 text-foreground/80",
  pending: "border-muted-foreground/40 text-muted-foreground",
};

export default function Ledger() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">{t("ledger.kicker")}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">{t("ledger.title")}</h1>
            <p className="font-body text-lg italic leading-relaxed text-muted-foreground">{t("ledger.lede")}</p>
          </motion.div>

          <div className="divide-y divide-border border-y border-border">
            {ROWS.map((row, i) => (
              <motion.div
                key={row.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between md:gap-6"
                data-testid={`ledger-${row.key}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display text-base md:text-lg text-foreground">{t(`ledger.${row.key}`)}</p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${KIND_STYLES[row.kind]}`}
                >
                  {t(`ledger.${row.key}.status`)}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center font-body text-sm italic leading-relaxed text-muted-foreground">
            {t("ledger.note")}
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
