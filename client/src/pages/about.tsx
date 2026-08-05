import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";

// The creed. This was two sections — a hardcoded manifesto ("The Line We
// Hold") and a separate "Our Philosophy" — making the same argument twice at
// different volumes: one said a tour bus can't photograph our route, the other
// that we sit beyond the reach of conventional travel. Same claim, weaker the
// second time. Merged here, keeping the sharpest sentence from each and
// dropping the flattery ("intellectually curious individuals") and the vague
// promise to transform your understanding of your place in the world.
//
// It also runs through i18n now. The manifesto never did — it was English
// hardcoded into the page while every other word on the site had a Spanish
// twin, so a Spanish reader hit a wall of English at the loudest moment.
function CreedSection({ t }: { t: (key: string) => string }) {
  return (
    <section
      id="creed"
      className="scroll-mt-28 border-y border-primary/15 px-6 py-24 md:py-32"
      data-testid="section-creed"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            {t("about.creed.kicker")}
          </p>
          <blockquote
            className="mx-auto mt-8 max-w-3xl font-display text-3xl font-semibold leading-snug text-foreground md:text-5xl md:leading-tight"
            data-testid="text-creed-quote"
          >
            {t("about.creed.quote")}
          </blockquote>
          <p className="mx-auto mt-10 max-w-2xl font-body text-lg leading-relaxed text-foreground md:text-xl">
            {t("about.creed.statement")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="mt-14 font-display text-xs uppercase tracking-[0.3em] text-primary">
            {t("about.creed.protocol")}
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("about.creed.seeing")}
          </p>
          {/* The most valuable paragraph on the page: what we don't have yet. */}
          <p className="mx-auto mt-14 max-w-2xl border-t border-primary/15 pt-10 font-body text-base italic leading-relaxed text-muted-foreground md:text-lg">
            {t("about.creed.honesty")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// The name, laid out like the dictionary entry it almost is: Kyrgyz stone,
// Mongolian movement, welded at the shared vowel. Framed honestly as a name
// the founders built — chosen, not inherited.
function NameSection({ t }: { t: (key: string) => string }) {
  return (
    <section id="name" className="scroll-mt-28 px-6 pb-20 pt-16 md:pb-28 md:pt-24" data-testid="section-name">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-primary">{t("name.kicker")}</p>
          {/* Opening the page, so this is its h1 — the About page had none at
              all before, which left it headless to a screen reader and to a
              crawler. */}
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">ASKYAN</h1>
          <p className="mt-2 font-mono text-xs tracking-[0.3em] text-muted-foreground">{t("name.pron")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-primary/25 bg-card p-6" data-testid="name-aska">
            <p className="font-display text-2xl font-bold text-foreground">
              aska <span className="font-body text-base font-normal text-muted-foreground">(аска)</span>
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{t("name.aska.lang")}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{t("name.aska.def")}</p>
          </div>
          <div className="rounded-md border border-primary/25 bg-card p-6" data-testid="name-ayan">
            <p className="font-display text-2xl font-bold text-foreground">
              ayan <span className="font-body text-base font-normal text-muted-foreground">(аян)</span>
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{t("name.ayan.lang")}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{t("name.ayan.def")}</p>
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-xs tracking-[0.2em] text-foreground/70 sm:text-sm">
          aska + ayan&ensp;&rarr;&ensp;ask(a)yan&ensp;&rarr;&ensp;<span className="text-primary">ASKYAN</span>
        </p>
        <p className="mx-auto mt-3 max-w-xl text-center font-body text-sm leading-relaxed text-muted-foreground">
          {t("name.join")}
        </p>

        <p className="mx-auto mt-10 max-w-2xl text-center font-body text-lg italic leading-relaxed text-foreground md:text-xl">
          {t("name.meaning")}
        </p>
        <p className="mx-auto mt-8 max-w-xl text-center font-body text-xs italic leading-relaxed text-muted-foreground">
          {t("name.note")}
        </p>
      </div>
    </section>
  );
}


function FoundersSection({ t }: { t: (key: string) => string }) {
  const founders = [
    {
      key: "blaze",
      name: t("about.blaze.name"),
      title: t("about.blaze.title"),
      description: t("about.blaze.desc"),
    },
    {
      key: "jacobo",
      name: t("about.jacobo.name"),
      title: t("about.jacobo.title"),
      description: t("about.jacobo.desc"),
    },
  ];

  return (
    <section
      id="founders"
      className="py-24 md:py-32 px-6"
      data-testid="section-founders"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("about.founders.subtitle")}
          </p>
          <h2
            className="font-display font-bold text-2xl md:text-3xl text-foreground"
            data-testid="text-founders-headline"
          >
            {t("about.founders.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className="p-8 md:p-10 bg-card border-border"
                data-testid={`card-founder-${founder.key}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                    <span className="font-display text-3xl text-primary">
                      {founder.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl" data-testid={`text-founder-name-${founder.key}`}>
                      {founder.name}
                    </h3>
                    <p className="font-display text-sm text-primary tracking-wide" data-testid={`text-founder-title-${founder.key}`}>
                      {founder.title}
                    </p>
                  </div>
                </div>
                <p
                  className="font-body text-muted-foreground leading-relaxed"
                  data-testid={`text-founder-description-${founder.key}`}
                >
                  {founder.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function CTASection({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-24 md:py-32 px-6" data-testid="section-cta">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
            {t("about.cta.title")}
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            {t("about.cta.desc")}
          </p>
          <Link href="/#waitlist">
            <Button className="font-display tracking-wide" data-testid="button-request-access">
              {t("nav.requestAccess")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" activePage="about" />
      <main className="pt-20">
        {/* The name opens the page. It is the most particular thing here —
            two languages welded at a shared vowel — and it earns attention in
            a way a mission statement cannot. The creed follows, then the
            people, then the ask. */}
        <NameSection t={t} />
        <CreedSection t={t} />
        <FoundersSection t={t} />
        <div className="max-w-4xl mx-auto px-6">
          <hr className="border-t border-white/20" />
        </div>
        <CTASection t={t} />
      </main>
      <SiteFooter />
    </div>
  );
}
