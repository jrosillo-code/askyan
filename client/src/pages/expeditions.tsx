import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Flame, Mountain, Compass, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";
import { MEDIA } from "@/lib/media";
const expeditionsHeroVideo = MEDIA["expeditions-hero-web.mp4"];
const kazakhstanVideo = MEDIA["kazakhstan-web.mp4"];
const kyrgyzstanVideo = MEDIA["kyrgyzstan-web.mp4"];
const mongoliaVideo = MEDIA["mongolia-web.mp4"];
const nepalVideo = MEDIA["14862479-hd_1920_1080_60fps_1765009387935.mp4"];
const indonesiaVideo = MEDIA["12004059_1920_1080_30fps_1765009552268.mp4"];

interface Expedition {
  id: string;
  country: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  season: string;
  difficulty: string;
  category: string;
  imageUrl?: string;
  videoUrl?: string;
}

// Anchor coordinates per expedition — cartography details for a brand about
// where maps end.
const COORDS: Record<string, string> = {
  "kazakhstan-steppe": "43.3510\u00B0 N, 79.0794\u00B0 E",
  "kyrgyzstan-heights": "41.8397\u00B0 N, 75.1338\u00B0 E",
  "mongolia-gobi": "43.5000\u00B0 N, 103.5000\u00B0 E",
  "nepal-mustang": "29.1892\u00B0 N, 83.9531\u00B0 E",
  "bhutan-sacred": "27.4916\u00B0 N, 89.3639\u00B0 E",
  "indonesia-flores": "8.5500\u00B0 S, 119.4890\u00B0 E",
};

const expeditions: Expedition[] = [
  {
    id: "kazakhstan-steppe",
    country: "Kazakhstan",
    title: "The Steppe Awakening",
    tagline: "Where the horizon bends to meet the sky",
    description:
      "Traverse the endless golden steppe on horseback with nomadic guides whose ancestors rode these same paths for millennia. From Charyn Canyon's ancient walls to the singing dunes of Altyn Emel, this is a journey into the heart of Central Asian wilderness.",
    duration: "12 Days",
    season: "May - October",
    difficulty: "Moderate",
    category: "Horseback & Wilderness",
    videoUrl: kazakhstanVideo,
  },
  {
    id: "kyrgyzstan-heights",
    country: "Kyrgyzstan",
    title: "The Celestial Mountains",
    tagline: "Sleep where eagles nest",
    description:
      "Trek through the Tien Shan mountains to Son-Kul Lake, where summer pastures turn to mirrors reflecting infinite sky. Stay in yurt camps with shepherds who read the weather in the wind, and learn the ancient art of eagle hunting from masters who carry centuries of tradition.",
    duration: "10 Days",
    season: "June - September",
    difficulty: "Challenging",
    category: "Trekking & Culture",
    videoUrl: kyrgyzstanVideo,
  },
  {
    id: "mongolia-gobi",
    country: "Mongolia",
    title: "The Gobi Crossing",
    tagline: "Where silence becomes the loudest sound",
    description:
      "Journey deep into the Gobi Desert with camel caravans and nomadic families. Witness the flaming cliffs at sunset, sleep under star-filled skies in traditional gers, and experience a way of life unchanged for thousands of years. This is Mongolia at its most raw and revelatory.",
    duration: "14 Days",
    season: "April - October",
    difficulty: "Moderate",
    category: "Desert & Nomadic",
    videoUrl: mongoliaVideo,
  },
  {
    id: "nepal-mustang",
    country: "Nepal",
    title: "The Forbidden Kingdom",
    tagline: "Beyond the Himalayan veil",
    description:
      "Enter Upper Mustang, the last forbidden kingdom, where Tibetan culture survives in ancient monasteries and cave cities painted before Columbus sailed. Trek through lunar landscapes of red and ochre, guided by former Loba royalty who share stories carved in stone.",
    duration: "16 Days",
    season: "March - November",
    difficulty: "Challenging",
    category: "Trekking & Sacred Sites",
    videoUrl: nepalVideo,
  },
  {
    id: "bhutan-sacred",
    country: "Bhutan",
    title: "The Thunder Dragon Path",
    tagline: "Where happiness is measured differently",
    description:
      "Walk the sacred trails of the Thunder Dragon Kingdom with monks and local guides. From Tiger's Nest to remote monasteries where silence has been kept for centuries, discover a land where spirituality permeates every valley and ancient wisdom still guides daily life.",
    duration: "11 Days",
    season: "March - May, Sept - Nov",
    difficulty: "Moderate",
    category: "Sacred & Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1553856622-d1b352e9a211?w=1200&q=80",
  },
  {
    id: "indonesia-flores",
    country: "Indonesia",
    title: "The Ring of Fire",
    tagline: "Where the earth still breathes",
    description:
      "Sail through the Indonesian archipelago from Flores to Komodo, diving volcanic reefs and walking among dragons. Meet the Bajau sea nomads, witness ancient rituals on Sumba, and camp on uninhabited islands where the Milky Way reflects in bioluminescent waters.",
    duration: "13 Days",
    season: "April - November",
    difficulty: "Moderate",
    category: "Marine & Volcanic",
    videoUrl: indonesiaVideo,
  },
];


function ExpeditionCard({ expedition, index, t }: { expedition: Expedition; index: number; t: (key: string) => string }) {
  const countryKey = expedition.id.split("-")[0];
  const translatedTitle = t(`expedition.${countryKey}.title`);
  const translatedTagline = t(`expedition.${countryKey}.tagline`);
  const translatedDesc = t(`expedition.${countryKey}.desc`);
  const translatedCategory = t(`expedition.${countryKey}.category`);
  
  return (
    <Link href={`/expedition/${expedition.id}`} data-testid={`link-expedition-${expedition.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="group"
      >
        <Card
          className="overflow-visible bg-card border-border hover-elevate cursor-pointer"
          data-testid={`card-expedition-${expedition.id}`}
        >
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-md">
          {expedition.videoUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src={expedition.videoUrl}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onCanPlay={(e) => {
                const video = e.currentTarget;
                video.play().catch(() => {});
              }}
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                if (video.currentTime >= 10) {
                  video.currentTime = 0;
                }
              }}
            />
          ) : (
            <img loading="lazy" decoding="async"
              src={expedition.imageUrl}
              alt={translatedTitle}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              {`EXPEDITION ${String(index + 1).padStart(3, "0")} — ${expedition.country}`}
            </span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">
              {translatedTitle}
            </h3>
            <p className="font-body text-white/70 italic mt-1">{translatedTagline}</p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-primary/70 mt-2">{COORDS[expedition.id]}</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            {translatedDesc}
          </p>

          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">{t("expeditions.duration")}</span>
              <span className="font-display text-foreground">{expedition.duration}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">{t("expeditions.season")}</span>
              <span className="font-display text-foreground">{expedition.season}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">{t("expeditions.difficulty")}</span>
              <span className="font-display text-foreground">{expedition.difficulty}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="font-display text-xs tracking-wide text-primary uppercase">
              {translatedCategory}
            </span>
            <span className="font-display text-sm text-foreground flex items-center gap-1 group-hover:gap-2 transition-all">
              {t("expeditions.exploreJourney")}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Card>
      </motion.div>
    </Link>
  );
}

export default function Expeditions() {
  const { t } = useLanguage();
  
  const translatedCategories = [
    {
      icon: Mountain,
      title: t("expeditions.category.highAltitude"),
      description: t("expeditions.category.highAltitude.desc"),
    },
    {
      icon: Compass,
      title: t("expeditions.category.nomadic"),
      description: t("expeditions.category.nomadic.desc"),
    },
    {
      icon: Wind,
      title: t("expeditions.category.desert"),
      description: t("expeditions.category.desert.desc"),
    },
    {
      icon: Flame,
      title: t("expeditions.category.transformative"),
      description: t("expeditions.category.transformative.desc"),
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="transparent" activePage="expeditions" />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              if (video.currentTime >= 10) {
                video.currentTime = 0;
              }
            }}
          >
            <source src={expeditionsHeroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
        >
          <Flame className="w-10 h-10 text-primary mx-auto mb-6 opacity-80" />
          <h1
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight"
            data-testid="text-expeditions-headline"
          >
            {t("expeditions.headline")}
          </h1>
          <p
            className="font-body text-lg md:text-xl text-white/80 italic max-w-2xl mx-auto"
            data-testid="text-expeditions-subtitle"
          >
            {t("expeditions.heroSubtitle")}
          </p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {translatedCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                data-testid={`category-${index}`}
              >
                <category.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-sm md:text-base mb-1" data-testid={`text-category-title-${index}`}>{category.title}</h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground" data-testid={`text-category-desc-${index}`}>{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              {t("expeditions.currentTitle")}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              {t("expeditions.currentDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {expeditions.map((expedition, index) => (
              <ExpeditionCard key={expedition.id} expedition={expedition} index={index} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-card">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
            {t("expeditions.ctaTitle")}
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("expeditions.ctaDesc")}
          </p>
          <Link href="/#waitlist" data-testid="link-join-circle">
            <Button size="lg" className="font-display tracking-wide" data-testid="button-join-circle">
              {t("expeditions.joinCircle")}
            </Button>
          </Link>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
