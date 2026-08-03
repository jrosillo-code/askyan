import { useState, useEffect, useRef } from "react";
import { X, Search, MapPin, Film, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "expedition" | "destination" | "story";
  url: string;
}

const searchableContent: SearchResult[] = [
  { id: "1", title: "Kazakhstan - The Steppe Awakening", description: "Traverse the endless golden steppe on horseback", category: "expedition", url: "/expedition/kazakhstan-steppe" },
  { id: "2", title: "Kyrgyzstan - Celestial Mountains", description: "Trek through the Tien Shan mountains", category: "expedition", url: "/expedition/kyrgyzstan-heights" },
  { id: "3", title: "Mongolia - The Gobi Crossing", description: "Journey deep into the Gobi Desert", category: "expedition", url: "/expedition/mongolia-gobi" },
  { id: "4", title: "Nepal - The Forbidden Kingdom", description: "Enter Upper Mustang, the last forbidden kingdom", category: "expedition", url: "/expedition/nepal-mustang" },
  { id: "5", title: "Indonesia - Ring of Fire", description: "Sail through the Indonesian archipelago", category: "expedition", url: "/expedition/indonesia-flores" },
  { id: "6", title: "The Last Nomads of Mongolia", description: "Documentary about Gobi Desert nomads", category: "story", url: "/films?video=mongolia-nomads" },
  { id: "7", title: "The Eagle Hunters", description: "Kyrgyzstan eagle hunting traditions", category: "story", url: "/films?video=kyrgyzstan-eagles" },
  { id: "8", title: "Paths to the Sky", description: "Trekking Upper Mustang, Nepal", category: "story", url: "/films?video=nepal-trails" },
  { id: "9", title: "The Silent Monks of Bumthang", description: "Bhutan monastery chronicles", category: "story", url: "/chronicles#silent-monks-bhutan" },
  { id: "10", title: "Following the Last Salt Caravans", description: "Ethiopia salt trade traditions", category: "story", url: "/chronicles#salt-caravans-ethiopia" },
  { id: "11", title: "How We Travel", description: "Our commitments: conservation, community, sustainability", category: "destination", url: "/how-we-travel" },
  { id: "12", title: "The Ledger", description: "What we've promised, and where it stands", category: "destination", url: "/ledger" },
  { id: "13", title: "The Thunder Dragon Path", description: "Bhutan expedition through sacred valleys", category: "expedition", url: "/expedition/bhutan-sacred" },
  { id: "14", title: "Request Access", description: "Apply to the founding cohort", category: "destination", url: "/contact" },
  { id: "15", title: "Askyan — the name", description: "Kyrgyz stone, Mongolian movement: how the name was built", category: "story", url: "/about#name" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "expedition":
        return <MapPin className="w-4 h-4" />;
      case "story":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Film className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "expedition":
        return t("search.categories.expeditions");
      case "story":
        return t("search.categories.stories");
      default:
        return t("search.categories.destinations");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md"
          onClick={onClose}
          data-testid="search-modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto pt-24 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-foreground">Search</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                data-testid="button-close-search"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder={t("search.placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-card border-border"
                data-testid="input-search"
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={onClose}
                    >
                      <div
                        className="p-4 rounded-md bg-card border border-border hover-elevate cursor-pointer"
                        data-testid={`search-result-${result.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10 text-primary">
                            {getCategoryIcon(result.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-display text-sm font-bold text-foreground">
                                {result.title}
                              </span>
                              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                                {getCategoryLabel(result.category)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.trim() !== "" ? (
                <p className="text-center text-muted-foreground py-8">
                  {t("search.noResults")}
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
