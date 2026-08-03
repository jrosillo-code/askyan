import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import logoImage from "@assets/download-Picsart-BackgroundRemover_1764993972814.png";

// The one footer, used by every page — the chrome should never change
// underneath the reader as they move around the site.
export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border px-6 pb-10 pt-16" data-testid="footer">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="" className="h-9 w-auto brightness-0 invert" />
              <span className="font-display text-xl font-bold tracking-wide text-foreground">ASKYAN</span>
            </div>
            <p className="mt-4 max-w-xs font-body text-sm italic leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.25em] text-primary">{t("footer.journeys")}</div>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-muted-foreground">
                <li><Link href="/expeditions" className="inline-block py-0.5 hover:text-foreground">{t("nav.expeditions")}</Link></li>
                <li><Link href="/films" className="inline-block py-0.5 hover:text-foreground">{t("nav.films")}</Link></li>
                <li><Link href="/chronicles" className="inline-block py-0.5 hover:text-foreground">{t("nav.chronicles")}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-display text-xs uppercase tracking-[0.25em] text-primary">{t("footer.collective")}</div>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-muted-foreground">
                <li><Link href="/about" className="inline-block py-0.5 hover:text-foreground">{t("nav.about")}</Link></li>
                <li><Link href="/how-we-travel" className="inline-block py-0.5 hover:text-foreground">{t("nav.howWeTravel")}</Link></li>
                <li><Link href="/ledger" className="inline-block py-0.5 hover:text-foreground">{t("nav.ledger")}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-display text-xs uppercase tracking-[0.25em] text-primary">{t("footer.join")}</div>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-muted-foreground">
                <li><Link href="/contact" className="inline-block py-0.5 hover:text-foreground">{t("nav.requestAccess")}</Link></li>
                <li><Link href="/#waitlist" className="inline-block py-0.5 hover:text-foreground">{t("footer.waitlist")}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 md:flex-row">
          <p className="font-display text-xs tracking-wide text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("common.copyright")}. {t("footer.rights").toUpperCase()}.
          </p>
          <p className="font-display text-xs tracking-[0.15em] text-muted-foreground/70">
            <Link href="/privacy" className="transition-colors hover:text-foreground">PRIVACY</Link>
            <span className="mx-3">&middot;</span>
            <Link href="/terms" className="transition-colors hover:text-foreground">TERMS</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
