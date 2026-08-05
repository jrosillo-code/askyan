import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { SearchModal } from "@/components/search-modal";
import logoImage from "@assets/download-Picsart-BackgroundRemover_1764993972814.png";

// The nav's "When to Go" now points at the six real founding seasons —
// the old 12-month world guide promoted places we don't run.
const foundingSeasons = [
  { id: "kazakhstan-steppe", code: "001", title: "The Steppe Awakening", window: "MAY — OCT" },
  { id: "kyrgyzstan-heights", code: "002", title: "The Celestial Mountains", window: "JUN — SEP" },
  { id: "mongolia-gobi", code: "003", title: "The Gobi Crossing", window: "MAY — SEP" },
  { id: "nepal-mustang", code: "004", title: "The Forbidden Kingdom", window: "MAR — NOV" },
  { id: "bhutan-sacred", code: "005", title: "The Thunder Dragon Path", window: "MAR—MAY · SEP—NOV" },
  { id: "indonesia-flores", code: "006", title: "The Ring of Fire", window: "APR — NOV" },
];

interface SharedHeaderProps {
  variant?: "transparent" | "solid";
  onScrollToSection?: (id: string) => void;
  activePage?: "expeditions" | "films" | "chronicles" | "about";
}

export function SharedHeader({ 
  variant = "transparent",
  onScrollToSection,
  activePage
}: SharedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhenToGoOpen, setIsWhenToGoOpen] = useState(false);
  const [isExpeditionsOpen, setIsExpeditionsOpen] = useState(false);
  const [isFilmsOpen, setIsFilmsOpen] = useState(false);
  const [isChroniclesOpen, setIsChroniclesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const expeditionHighlights = [
    { titleKey: "header.expedition.kazakhstan", descKey: "header.expedition.kazakhstan.desc", id: "kazakhstan-steppe" },
    { titleKey: "header.expedition.kyrgyzstan", descKey: "header.expedition.kyrgyzstan.desc", id: "kyrgyzstan-heights" },
    { titleKey: "header.expedition.mongolia", descKey: "header.expedition.mongolia.desc", id: "mongolia-gobi" },
    { titleKey: "header.expedition.nepal", descKey: "header.expedition.nepal.desc", id: "nepal-mustang" },
  ];

  const filmHighlights = [
    { titleKey: "header.film.mongolia", descKey: "header.film.mongolia.location", id: "mongolia-nomads" },
    { titleKey: "header.film.kyrgyzstan", descKey: "header.film.kyrgyzstan.location", id: "kyrgyzstan-eagles" },
    { titleKey: "header.film.nepal", descKey: "header.film.nepal.location", id: "nepal-trails" },
  ];

  const chroniclesHighlights = [
    { titleKey: "header.chronicle.bhutan", descKey: "header.chronicle.bhutan.location", id: "silent-monks-bhutan" },
    { titleKey: "header.chronicle.ethiopia", descKey: "header.chronicle.ethiopia.location", id: "salt-caravans-ethiopia" },
    { titleKey: "header.chronicle.nepal", descKey: "header.chronicle.nepal.location", id: "forgotten-kingdom-mustang" },
  ];

  const isHome = location === "/";

  useEffect(() => {
    // Passive: without it the browser must wait for this handler to return
    // before it can scroll, since a non-passive listener is allowed to call
    // preventDefault. The header mounts on every page, so that put a
    // main-thread hop in front of every scroll event on the site.
    // rAF-coalesced too, so a burst of events costs one read rather than thirty.
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const getBackgroundClass = () => {
    if (isScrolled) {
      return "bg-background/95 backdrop-blur-md max-md:backdrop-blur-none max-md:bg-background border-b border-border";
    }
    return variant === "transparent" 
      ? "bg-transparent" 
      : "bg-background/80 backdrop-blur-sm max-md:backdrop-blur-none max-md:bg-background/95";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getBackgroundClass()}`}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2"
              data-testid="link-logo"
            >
              <img 
                src={logoImage} 
                alt="ASKYAN Logo" 
                className="h-8 md:h-10 w-auto brightness-0 invert"
              />
              <span className="font-display font-bold text-lg md:text-xl text-foreground tracking-wide">
                ASKYAN
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-2 ml-4 border-l border-border pl-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="px-2 font-display text-xs tracking-wider" 
                data-testid="button-region" 
                aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
                onClick={toggleLanguage}
              >
                <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
                <span className="mx-1 text-muted-foreground/50">/</span>
                <span className={language === "es" ? "text-foreground" : "text-muted-foreground"}>ES</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground" 
                data-testid="button-search" 
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 flex-wrap">
            <div 
              className="relative"
              onMouseEnter={() => setIsExpeditionsOpen(true)}
              onMouseLeave={() => setIsExpeditionsOpen(false)}
              onFocus={() => setIsExpeditionsOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsExpeditionsOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsExpeditionsOpen(false);
              }}
            >
              {activePage === "expeditions" ? (
                <button
                  className="font-display text-sm tracking-wide text-foreground font-bold flex items-center gap-1"
                  data-testid="link-expeditions-active"
                  aria-current="page"
                  aria-expanded={isExpeditionsOpen}
                  aria-haspopup="true"
                >
                  {t("nav.expeditions")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExpeditionsOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href="/expeditions"
                  className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  data-testid="link-expeditions"
                  aria-expanded={isExpeditionsOpen}
                  aria-haspopup="true"
                >
                  {t("nav.expeditions")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExpeditionsOpen ? "rotate-180" : ""}`} />
                </Link>
              )}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg py-3 px-4 min-w-[220px] transition-all duration-200 ${
                  isExpeditionsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                role="menu"
                aria-label="Expeditions submenu"
              >
                <p className="font-display text-xs tracking-wider text-primary uppercase mb-2">{t("featured.title")}</p>
                {expeditionHighlights.map((item) => (
                  <Link
                    key={item.id}
                    href={`/expedition/${item.id}`}
                    className="block py-2 group"
                    data-testid={`link-expedition-${item.id}`}
                    role="menuitem"
                    tabIndex={isExpeditionsOpen ? 0 : -1}
                  >
                    <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors">{t(item.titleKey)}</span>
                    <span className="block text-xs text-muted-foreground">{t(item.descKey)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setIsFilmsOpen(true)}
              onMouseLeave={() => setIsFilmsOpen(false)}
              onFocus={() => setIsFilmsOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsFilmsOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsFilmsOpen(false);
              }}
            >
              {activePage === "films" ? (
                <button
                  className="font-display text-sm tracking-wide text-foreground font-bold flex items-center gap-1"
                  data-testid="link-films-active"
                  aria-current="page"
                  aria-expanded={isFilmsOpen}
                  aria-haspopup="true"
                >
                  {t("nav.films")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isFilmsOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href="/films"
                  className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  data-testid="link-films"
                  aria-expanded={isFilmsOpen}
                  aria-haspopup="true"
                >
                  {t("nav.films")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isFilmsOpen ? "rotate-180" : ""}`} />
                </Link>
              )}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg py-3 px-4 min-w-[220px] transition-all duration-200 ${
                  isFilmsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                role="menu"
                aria-label="Films submenu"
              >
                <p className="font-display text-xs tracking-wider text-primary uppercase mb-2">{t("featured.films")}</p>
                {filmHighlights.map((item) => (
                  <Link
                    key={item.id}
                    href={`/films?video=${item.id}`}
                    className="block py-2 group"
                    data-testid={`link-film-${item.id}`}
                    role="menuitem"
                    tabIndex={isFilmsOpen ? 0 : -1}
                  >
                    <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors">{t(item.titleKey)}</span>
                    <span className="block text-xs text-muted-foreground">{t(item.descKey)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setIsWhenToGoOpen(true)}
              onMouseLeave={() => setIsWhenToGoOpen(false)}
              onFocus={() => setIsWhenToGoOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsWhenToGoOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsWhenToGoOpen(false);
              }}
            >
              {isHome && onScrollToSection ? (
                <button
                  onClick={() => handleScrollToSection("when-to-go")}
                  className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  data-testid="link-when-to-go"
                  aria-expanded={isWhenToGoOpen}
                  aria-haspopup="true"
                >
                  {t("nav.whenToGo")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isWhenToGoOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href="/#when-to-go"
                  className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  data-testid="link-when-to-go"
                  aria-expanded={isWhenToGoOpen}
                  aria-haspopup="true"
                >
                  {t("nav.whenToGo")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isWhenToGoOpen ? "rotate-180" : ""}`} />
                </Link>
              )}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg py-3 px-4 min-w-[240px] transition-all duration-200 ${
                  isWhenToGoOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                role="menu"
                aria-label="When to go months"
              >
                <p className="font-display text-xs tracking-wider text-primary uppercase mb-2">{t("seasonal.kicker")}</p>
                {foundingSeasons.map((season) => (
                  <Link
                    key={season.id}
                    href={`/expedition/${season.id}`}
                    className="block py-2 group"
                    data-testid={`link-season-${season.id}`}
                    role="menuitem"
                    tabIndex={isWhenToGoOpen ? 0 : -1}
                  >
                    <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors">
                      <span className="mr-2 font-mono text-[10px] text-primary">{season.code}</span>
                      {season.title}
                    </span>
                    <span className="block font-mono text-[10px] tracking-[0.15em] text-muted-foreground">{season.window}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setIsChroniclesOpen(true)}
              onMouseLeave={() => setIsChroniclesOpen(false)}
              onFocus={() => setIsChroniclesOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsChroniclesOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsChroniclesOpen(false);
              }}
            >
              {activePage === "chronicles" ? (
                <button
                  className="font-display text-sm tracking-wide text-foreground font-bold flex items-center gap-1"
                  data-testid="link-chronicles-active"
                  aria-current="page"
                  aria-expanded={isChroniclesOpen}
                  aria-haspopup="true"
                >
                  {t("nav.chronicles")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isChroniclesOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href="/chronicles"
                  className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  data-testid="link-chronicles"
                  aria-expanded={isChroniclesOpen}
                  aria-haspopup="true"
                >
                  {t("nav.chronicles")}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isChroniclesOpen ? "rotate-180" : ""}`} />
                </Link>
              )}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg py-3 px-4 min-w-[240px] transition-all duration-200 ${
                  isChroniclesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                role="menu"
                aria-label="Chronicles submenu"
              >
                <p className="font-display text-xs tracking-wider text-primary uppercase mb-2">{t("featured.stories")}</p>
                {chroniclesHighlights.map((item) => (
                  <Link
                    key={item.id}
                    href={`/chronicles#${item.id}`}
                    className="block py-2 group"
                    data-testid={`link-chronicle-${item.id}`}
                    role="menuitem"
                    tabIndex={isChroniclesOpen ? 0 : -1}
                  >
                    <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors">{t(item.titleKey)}</span>
                    <span className="block text-xs text-muted-foreground">{t(item.descKey)}</span>
                  </Link>
                ))}
              </div>
            </div>
            {activePage === "about" ? (
              <button
                className="font-display text-sm tracking-wide text-foreground font-bold"
                data-testid="link-about-active"
                aria-current="page"
              >
                {t("nav.about")}
              </button>
            ) : (
              <Link
                href="/about"
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-about"
              >
                {t("nav.about")}
              </Link>
            )}
            {isHome && onScrollToSection ? (
              <Button
                onClick={() => handleScrollToSection("waitlist")}
                className="font-display text-sm tracking-wide"
                data-testid="button-join-cta"
              >
                {t("nav.requestAccess")}
              </Button>
            ) : (
              <Link href="/#waitlist">
                <Button
                  className="font-display text-sm tracking-wide"
                  data-testid="button-join-cta"
                >
                  {t("nav.requestAccess")}
                </Button>
              </Link>
            )}
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          data-testid="mobile-menu"
        >
          <nav className="flex flex-col p-6 gap-4">
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <Button 
                variant="ghost" 
                size="sm"
                className="px-2 font-display text-xs tracking-wider" 
                aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
                onClick={toggleLanguage}
              >
                <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
                <span className="mx-1 text-muted-foreground/50">/</span>
                <span className={language === "es" ? "text-foreground" : "text-muted-foreground"}>ES</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground" 
                aria-label="Search"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            {activePage === "expeditions" ? (
              <button className="font-display text-sm tracking-wide text-foreground font-bold text-left py-2" data-testid="link-expeditions-mobile-active" aria-current="page">
                {t("nav.expeditions")}
              </button>
            ) : (
              <Link
                href="/expeditions"
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                data-testid="link-expeditions-mobile"
              >
                {t("nav.expeditions")}
              </Link>
            )}
            {activePage === "films" ? (
              <button className="font-display text-sm tracking-wide text-foreground font-bold text-left py-2" data-testid="link-films-mobile-active" aria-current="page">
                {t("nav.films")}
              </button>
            ) : (
              <Link
                href="/films"
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                data-testid="link-films-mobile"
              >
                {t("nav.films")}
              </Link>
            )}
            {isHome && onScrollToSection ? (
              <button
                onClick={() => handleScrollToSection("when-to-go")}
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                data-testid="link-when-to-go-mobile"
              >
                {t("nav.whenToGo")}
              </button>
            ) : (
              <Link
                href="/#when-to-go"
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                data-testid="link-when-to-go-mobile"
              >
                {t("nav.whenToGo")}
              </Link>
            )}
            {activePage === "chronicles" ? (
              <button className="font-display text-sm tracking-wide text-foreground font-bold text-left py-2" data-testid="link-chronicles-mobile-active" aria-current="page">
                {t("nav.chronicles")}
              </button>
            ) : (
              <Link
                href="/chronicles"
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                data-testid="link-chronicles-mobile"
              >
                {t("nav.chronicles")}
              </Link>
            )}
            {activePage === "about" ? (
              <button className="font-display text-sm tracking-wide text-foreground font-bold text-left py-2" data-testid="link-about-mobile-active" aria-current="page">
                {t("nav.about")}
              </button>
            ) : (
              <Link
                href="/about"
                className="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                data-testid="link-about-mobile"
              >
                {t("nav.about")}
              </Link>
            )}
            {isHome && onScrollToSection ? (
              <Button
                onClick={() => handleScrollToSection("waitlist")}
                className="font-display text-sm tracking-wide w-full mt-2"
                data-testid="button-join-cta-mobile"
              >
                {t("nav.requestAccess")}
              </Button>
            ) : (
              <Link href="/#waitlist" className="w-full mt-2">
                <Button
                  className="font-display text-sm tracking-wide w-full"
                  data-testid="button-join-cta-mobile"
                >
                  {t("nav.requestAccess")}
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
