import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { useLanguage } from "@/contexts/language-context";

function PhilosophySection({ t }: { t: (key: string) => string }) {
  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 px-6"
      data-testid="section-philosophy"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("about.philosophy.subtitle")}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            {t("about.philosophy.title")}
          </h2>
          <p className="font-display text-sm text-primary uppercase tracking-wide">
            {t("about.philosophy.protocol")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-l-2 border-primary pl-6 md:pl-8 max-w-3xl mx-auto"
        >
          <p
            className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-6"
            data-testid="text-philosophy-statement"
          >
            {t("about.philosophy.statement")}
          </p>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            {t("about.philosophy.mission1")}
          </p>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("about.philosophy.mission2")}
          </p>
        </motion.div>
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
          viewport={{ once: true, margin: "-100px" }}
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
              viewport={{ once: true, margin: "-100px" }}
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

function Footer({ t }: { t: (key: string) => string }) {
  return (
    <footer className="py-12 px-6 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-display text-sm text-muted-foreground tracking-wide">
          &copy; {new Date().getFullYear()} {t("common.copyright")}. {t("footer.rights").toUpperCase()}.
        </p>
      </div>
    </footer>
  );
}

export default function About() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" activePage="about" />
      <main className="pt-20">
        {/* The manifesto — the standard, said once, at full volume */}
        <section className="border-y border-primary/15 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">The Line We Hold</p>
            <blockquote className="mx-auto mt-8 font-display text-3xl font-semibold leading-snug text-foreground md:text-5xl md:leading-tight">
              “If a tour bus can photograph it,<br className="hidden md:block" /> it isn’t on our route.”
            </blockquote>
            <p className="mx-auto mt-10 max-w-2xl font-body text-base italic leading-relaxed text-muted-foreground md:text-lg">
              ASKYAN is new, and we would rather say so than pretend otherwise. There are no
              client stories yet, no awards, no press wall — there is a slate of six journeys,
              a network of Cultural Scribes being built one handshake at a time, and two founders
              reading every application personally. The first cohort won’t join a travel brand.
              They’ll help set its standard.
            </p>
          </div>
        </section>

        <FoundersSection t={t} />
        <div className="max-w-4xl mx-auto px-6">
          <hr className="border-t border-white/20" />
        </div>
        <PhilosophySection t={t} />
        <div className="max-w-4xl mx-auto px-6">
          <hr className="border-t border-white/20" />
        </div>
        <CTASection t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
