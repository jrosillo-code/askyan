import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePageTracking } from "@/hooks/use-analytics";
import { LanguageProvider } from "@/contexts/language-context";

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
const Conservation = lazy(() => import("@/pages/conservation"));
const Community = lazy(() => import("@/pages/community"));
const Sustainable = lazy(() => import("@/pages/sustainable"));
const NotFound = lazy(() => import("@/pages/not-found"));
const PrivacyPage = lazy(() => import("@/pages/legal").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("@/pages/legal").then((m) => ({ default: m.TermsPage })));
const MonthDetailPage = lazy(() => import("@/pages/month-detail"));
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

function useScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

const PAGE_TITLES: Record<string, string> = {
  "/": "ASKYAN EXPEDITIONS — Where the Map Ends",
  "/expeditions": "Expeditions — ASKYAN",
  "/films": "Films — ASKYAN",
  "/chronicles": "Chronicles — ASKYAN",
  "/about": "About — ASKYAN",
  "/contact": "Request Access — ASKYAN",
  "/conservation": "Conservation — ASKYAN",
  "/community": "Community — ASKYAN",
  "/sustainable": "Sustainable Travel — ASKYAN",
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
  usePageTracking();
  useScrollToTop();
  usePageTitle();


  return (
    <Suspense fallback={<RouteFallback />}>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chronicles" component={Stories} />
      <Route path="/expeditions" component={Expeditions} />
      <Route path="/expedition/:id" component={ExpeditionDetail} />
      <Route path="/films" component={Films} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/conservation" component={Conservation} />
      <Route path="/community" component={Community} />
      <Route path="/sustainable" component={Sustainable} />
      <Route path="/when-to-go/:month" component={MonthDetailPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
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
