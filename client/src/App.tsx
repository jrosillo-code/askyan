import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePageTracking } from "@/hooks/use-analytics";
import { LanguageProvider } from "@/contexts/language-context";

import Home from "@/pages/home";
import Stories from "@/pages/stories";
import Expeditions from "@/pages/expeditions";
import ExpeditionDetail from "@/pages/expedition-detail";
import Films from "@/pages/films";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Conservation from "@/pages/conservation";
import Community from "@/pages/community";
import Sustainable from "@/pages/sustainable";
import NotFound from "@/pages/not-found";
import { PrivacyPage, TermsPage } from "@/pages/legal";
import MonthDetailPage from "@/pages/month-detail";

function useScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

function Router() {
  usePageTracking();
  useScrollToTop();

  return (
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
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
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
