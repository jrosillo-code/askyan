import { lazy, Suspense, useEffect, useRef } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePageTracking } from "@/hooks/use-analytics";
import { LanguageProvider } from "@/contexts/language-context";
import { captureAttribution } from "@/lib/attribution";

import Home from "@/pages/home";

// Route-level code splitting: the landing page loads instantly; every other
// page arrives as its own chunk on first visit. This cut the initial bundle
// dramatically (recharts alone was riding along for a chart nobody rendered).
const Stories = lazy(() => import("@/pages/stories"));
const Expeditions = lazy(() => import("@/pages/expeditions"));
const ExpeditionDetail = lazy(() => import("@/pages/expedition-detail"));
const Films = lazy(() => import("@/pages/films"));
const Contact = lazy(() => import("@/pages/contact"));
const About = lazy(() => import("@/pages/about"));
const HowWeTravel = lazy(() => import("@/pages/how-we-travel"));
const Ledger = lazy(() => import("@/pages/ledger"));
const NotFound = lazy(() => import("@/pages/not-found"));
const PrivacyPage = lazy(() => import("@/pages/legal").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("@/pages/legal").then((m) => ({ default: m.TermsPage })));
const AdminPage = lazy(() => import("@/pages/admin"));

// Quiet, on-brand loading state between chunks.
function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <span className="font-display text-xs uppercase tracking-[0.4em] text-primary/70 animate-pulse">
        ASKYAN
      </span>
    </div>
  );
}

// One scroll policy for the whole app:
// - back/forward returns you to the exact spot you left (each history entry
//   is stamped with a key; scroll is saved per entry and restored instantly
//   once the lazy chunk has rendered enough height)
// - links with a #hash land smoothly on that section, even across pages
// - ordinary forward navigation starts at the top
const scrollPositions = new Map<string, number>();

function entryKey(): string | undefined {
  return (window.history.state as { __scrollKey?: string } | null)?.__scrollKey;
}

function useScrollManager() {
  const [location] = useLocation();
  const prevKey = useRef<string | undefined>(undefined);
  const lastNav = useRef(0);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    // Two recorders cover both navigation kinds:
    // - pushState (link clicks) saves the exact offset synchronously, before
    //   the lazy route's Suspense fallback collapses the page and clamps
    //   scrollY to 0.
    // - a continuous passive scroll listener keeps each entry's last real
    //   position current, which is what back/forward restores (popstate
    //   listener order can't be relied on — wouter's runs first and flushes
    //   the route change before ours would fire).
    // The ignore-window after any navigation keeps the fallback's clamp and
    // our own restoration scrolls from polluting the saved values.
    const origPush = window.history.pushState.bind(window.history);
    window.history.pushState = ((...args: Parameters<History["pushState"]>) => {
      if (prevKey.current) scrollPositions.set(prevKey.current, window.scrollY);
      lastNav.current = Date.now();
      origPush(...args);
    }) as History["pushState"];
    const onPop = () => {
      lastNav.current = Date.now();
    };
    const onScroll = () => {
      if (Date.now() - lastNav.current < 400) return;
      if (prevKey.current) scrollPositions.set(prevKey.current, window.scrollY);
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.history.pushState = origPush;
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    lastNav.current = Date.now();
    // A key already on this history entry means we've been here before —
    // i.e. the browser is traversing (back/forward), not pushing.
    let key = entryKey();
    const isTraversal = key !== undefined;
    if (!key) {
      key = Math.random().toString(36).slice(2);
      window.history.replaceState(
        { ...((window.history.state as object | null) ?? {}), __scrollKey: key },
        ""
      );
    }
    prevKey.current = key;

    const hash = window.location.hash.slice(1);
    let cancelled = false;
    let tries = 90; // ~1.5s of frames for lazy chunks and images to land

    const attempt = (fn: () => boolean) => {
      const step = () => {
        if (cancelled) return;
        if (!fn() && tries-- > 0) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (isTraversal) {
      const y = scrollPositions.get(key) ?? 0;
      attempt(() => {
        if (y === 0 || document.documentElement.scrollHeight >= y + window.innerHeight) {
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
          return true;
        }
        return false;
      });
    } else if (hash) {
      attempt(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      });
    } else {
      window.scrollTo(0, 0);
    }
    return () => {
      cancelled = true;
    };
  }, [location]);
}

const PAGE_TITLES: Record<string, string> = {
  "/": "ASKYAN EXPEDITIONS — Where the Map Ends",
  "/expeditions": "Expeditions — ASKYAN",
  "/films": "Films — ASKYAN",
  "/chronicles": "Chronicles — ASKYAN",
  "/about": "About — ASKYAN",
  "/contact": "Request Access — ASKYAN",
  "/how-we-travel": "How We Travel — ASKYAN",
  "/ledger": "The Ledger — ASKYAN",
  "/privacy": "Privacy — ASKYAN",
  "/terms": "Terms — ASKYAN",
  "/admin": "Ops Room — ASKYAN",
};
function usePageTitle() {
  const [location] = useLocation();
  useEffect(() => {
    document.title = PAGE_TITLES[location] ?? "ASKYAN EXPEDITIONS — Where the Map Ends";
  }, [location]);
}

function Router() {
  const [location] = useLocation();
  useEffect(() => {
    captureAttribution();
  }, []);
  usePageTracking();
  useScrollManager();
  usePageTitle();


  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-foreground focus:outline focus:outline-2 focus:outline-primary"
      >
        Skip to content
      </a>
      <div id="main-content">
    <Suspense fallback={<RouteFallback />}>
    {/* Keyed per location: each page eases in over ~a quarter second
        instead of hard-swapping. */}
    <div key={location} className="route-fade">
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chronicles" component={Stories} />
      <Route path="/expeditions" component={Expeditions} />
      <Route path="/expedition/:id" component={ExpeditionDetail} />
      <Route path="/films" component={Films} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/how-we-travel" component={HowWeTravel} />
      <Route path="/ledger" component={Ledger} />
      {/* Retired pages: the three legacy commitment pages carried invented
          track records and the month guide promoted destinations we don't
          run. Old links land somewhere honest instead of a 404. */}
      <Route path="/conservation">{() => <Redirect to="/how-we-travel" />}</Route>
      <Route path="/community">{() => <Redirect to="/how-we-travel" />}</Route>
      <Route path="/sustainable">{() => <Redirect to="/how-we-travel" />}</Route>
      <Route path="/when-to-go/:month">{() => <Redirect to="/" />}</Route>
      <Route path="/admin" component={AdminPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
    </div>
    </Suspense>
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
