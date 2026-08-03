import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ChevronDown, Map, Flame, ArrowRight, Quote } from "lucide-react";
import { SharedHeader } from "@/components/shared-header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { motion, AnimatePresence } from "framer-motion";
import { Chatbot } from "@/components/chatbot";
import { useLanguage } from "@/contexts/language-context";
import { useAmbientVideos } from "@/hooks/use-ambient-videos";
import { MEDIA } from "@/lib/media";
import { RoadPath } from "@/components/road-path";
import { SiteFooter } from "@/components/site-footer";
import logoImage from "@assets/download-Picsart-BackgroundRemover_1764993972814.png";
const mountainsImage = MEDIA["stock_images/aerial_view_mountain_771f3480.jpg"];
const desertImage = MEDIA["stock_images/desert_dunes_morocco_5d629ce9.jpg"];
const oceanImage = MEDIA["stock_images/tropical_ocean_islan_60d51698.jpg"];
const jungleImage = MEDIA["stock_images/jungle_rainforest_ad_8a15559b.jpg"];
const adventureImage = MEDIA["sebastian-boring-8zD7rs8UpxU-unsplash_1764990946831.jpg"];
const adventureBackgroundImage = MEDIA["sebastian-boring-8zD7rs8UpxU-unsplash_1764996645593.jpg"];
const adventureVideo = MEDIA["adventure-web.mp4"];
const nepalImage = MEDIA["stock_images/nepal_himalayas_moun_9d8b4f66.jpg"];
const conservationImage = MEDIA["stock_images/conservation_wildlif_d0bedb1b.jpg"];
const communityImage = MEDIA["stock_images/local_community_cult_d6accc8e.jpg"];
const sustainableImage = MEDIA["stock_images/sustainable_eco-frie_cb0317fc.jpg"];
const kazakhstanVideo = MEDIA["kazakhstan-web.mp4"];
const kyrgyzstanVideo = MEDIA["kyrgyzstan-web.mp4"];
const mongoliaVideo = MEDIA["mongolia-web.mp4"];
const nepalVideo = MEDIA["14862479-hd_1920_1080_60fps_1765009387935.mp4"];
const indonesiaVideo = MEDIA["12004059_1920_1080_30fps_1765009552268.mp4"];

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;


function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={`${className} whitespace-normal md:whitespace-nowrap`}
      variants={container}
      initial="hidden"
      animate="visible"
      data-testid="text-hero-headline"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em] hero-text-glow"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// Truthful strip: where the founding expeditions actually go. (The previous
// fabricated press logos are a credibility liability for a trust-first brand —
// real features can be added here if and when they exist.)
const pressLogos: { name: string; text: string; url: string; textKey?: string }[] = [
  { name: "Kazakhstan", text: "KAZAKHSTAN", url: "/expedition/kazakhstan-steppe" },
  { name: "Kyrgyzstan", text: "KYRGYZSTAN", url: "/expedition/kyrgyzstan-heights" },
  { name: "Mongolia", text: "MONGOLIA", url: "/expedition/mongolia-gobi" },
  { name: "Bhutan", text: "BHUTAN", url: "/expedition/bhutan-sacred" },
  { name: "Founding Cohort", text: "FOUNDING COHORT — NOW FORMING", textKey: "hero.cohortForming", url: "/contact" },
];

// One clip, played forever: the Gobi dune drone glide. Two stacked players
// of the same file alternate — as the live one nears its final seconds, the
// idle one restarts from zero and the pair crossfade, so the drift across
// the desert never visibly ends.
const GOBI_VIDEO = "https://videos.pexels.com/video-files/8774553/8774553-hd_1920_1080_30fps.mp4";
const GOBI_POSTER = "https://images.pexels.com/videos/8774553/free-video-8774553.jpg?auto=compress&cs=tinysrgb&w=1920";
const LOOP_FADE_S = 1.6;

function HeroSection() {
  const { t } = useLanguage();
  // Respect accessibility + metered connections: skip video streams entirely
  // and let the poster carry the hero.
  const [staticHero] = useState(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as { connection?: { saveData?: boolean } }).connection?.saveData === true
  );
  const [active, setActive] = useState(0);
  const playersRef = useRef<(HTMLVideoElement | null)[]>([null, null]);

  const handleTimeUpdate = (i: number) => {
    if (i !== active) return;
    const el = playersRef.current[i];
    if (!el || !el.duration || !isFinite(el.duration)) return;
    const remaining = el.duration - el.currentTime;
    const other = playersRef.current[1 - i];
    // The partner starts as preload="none" so its download never competes
    // with the visible stream (double-buffering both from t=0 dropped frames
    // on slower connections). Warm it up shortly before the seam.
    if (remaining <= 10 && other && other.readyState === 0) {
      other.preload = "auto";
      other.load();
    }
    if (remaining <= LOOP_FADE_S) {
      if (other) {
        try {
          other.currentTime = 0;
        } catch {
          // metadata not ready yet; it will start from 0 anyway
        }
        void other.play()?.catch(() => {});
      }
      setActive(1 - i);
    }
  };

  // Once the crossfade has finished, park the hidden player.
  useEffect(() => {
    const timer = setTimeout(() => playersRef.current[1 - active]?.pause(), 1700);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 z-0">
        {/* Instant paint while the stream buffers — no black flash */}
        <img
          src={GOBI_POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {!staticHero &&
          [0, 1].map((i) => (
            <video
              key={i}
              ref={(el) => {
                playersRef.current[i] = el;
              }}
              autoPlay={i === 0}
              muted
              playsInline
              preload={i === 0 ? "auto" : "none"}
              src={GOBI_VIDEO}
              onTimeUpdate={() => handleTimeUpdate(i)}
              className={`hero-video absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
                i === active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 z-20" />
      </div>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-30 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-sm md:text-base tracking-[0.4em] text-white/60 uppercase mb-6"
        >
          {t("hero.subtitle")}
        </motion.p>
        
        <AnimatedText 
          text={t("hero.title")}
          className="font-display font-bold text-4xl md:text-7xl lg:text-8xl text-white mb-8 tracking-[-0.02em] leading-[1.05]"
          delay={0.6}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="font-body text-lg md:text-xl lg:text-2xl text-white/80 italic max-w-2xl mx-auto hero-subtitle-glow"
          data-testid="text-hero-subtitle"
        >
          {t("hero.description")}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 w-full pl-6 pr-24 md:px-6"
      >
        <span className="font-display text-xs tracking-[0.3em] text-white/40 uppercase">{t("hero.featuredIn")}</span>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {pressLogos.map((logo) => (
            <Link
              key={logo.name}
              href={logo.url}
              className="font-display text-[10px] md:text-xs tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors"
              data-testid={`link-press-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {logo.textKey ? t(logo.textKey) : logo.text}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function PhilosophySection() {
  const { t } = useLanguage();
  return (
    <section
      id="philosophy"
      className="py-16 md:py-20 lg:py-24 px-6"
      data-testid="section-philosophy"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("philosophy.subtitle")}
          </p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
            {t("philosophy.protocol")}
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-l-2 border-primary pl-6 md:pl-8 max-w-3xl mx-auto"
        >
          <p
            className="font-body text-base md:text-lg text-foreground leading-relaxed mb-4"
            data-testid="text-philosophy-statement"
          >
            {t("philosophy.statement")}
          </p>
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            {t("philosophy.mission")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const destinationImages = [mountainsImage, desertImage, oceanImage, jungleImage];
const destinationKeys = ["highPeaks", "goldenSands", "hiddenShores", "greenVeil"];

function DestinationsSection() {
  const { t } = useLanguage();
  
  const destinations = destinationKeys.map((key, index) => ({
    nameKey: `destinations.${key}.name`,
    regionKey: `destinations.${key}.region`,
    descKey: `destinations.${key}.desc`,
    image: destinationImages[index],
  }));

  return (
    <section
      id="destinations"
      className="py-24 md:py-32 lg:py-40 px-6"
      data-testid="section-destinations"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-display text-sm tracking-[0.3em] text-primary uppercase mb-4">
            {t("destinations.subtitle")}
          </p>
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("destinations.subtitle")}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
            {t("destinations.title")}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("destinations.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destinationKeys[index]}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[3/4] rounded-md overflow-hidden cursor-pointer"
              data-testid={`card-destination-${index}`}
            >
              <img loading="lazy" decoding="async"
                src={destination.image}
                alt={t(destination.nameKey)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-xs tracking-[0.2em] text-primary uppercase mb-2">
                  {t(destination.regionKey)}
                </p>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {t(destination.nameKey)}
                </h3>
                <p className="font-body text-sm text-white/70 italic">
                  {t(destination.descKey)}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-display text-xs tracking-wide uppercase">{t("destinations.explore")}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyAskyanKeys = ["expertise", "bespoke", "network", "support"];

function WhyAskyanSection() {
  const { t } = useLanguage();
  
  const whyAskyanReasons = whyAskyanKeys.map(key => ({
    titleKey: `why.${key}`,
    descKey: `why.${key}.desc`,
  }));

  return (
    <section
      id="why-askyan"
      className="py-16 md:py-20 px-6 border-t border-primary/10"
      data-testid="section-why-askyan"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("why.subtitle")}
          </p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
            {t("why.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyAskyanReasons.map((reason, index) => (
            <motion.div
              key={whyAskyanKeys[index]}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
              data-testid={`card-why-${index}`}
            >
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {t(reason.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t(reason.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PositiveImpactSection() {
  const { t } = useLanguage();
  const impactItems = [
    {
      id: "conservation",
      titleKey: "impact.conservation.title",
      descKey: "impact.conservation.desc",
      image: conservationImage,
      link: "/how-we-travel#conservation",
    },
    {
      id: "community",
      titleKey: "impact.community.title",
      descKey: "impact.community.desc",
      image: communityImage,
      link: "/how-we-travel#community",
    },
    {
      id: "sustainable",
      titleKey: "impact.sustainable.title",
      descKey: "impact.sustainable.desc",
      image: sustainableImage,
      link: "/how-we-travel#sustainability",
    },
  ];

  return (
    <section
      id="positive-impact"
      className="py-16 md:py-24 px-6 bg-card"
      data-testid="section-positive-impact"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("impact.subtitle")}
          </p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-4">
            {t("impact.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {impactItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
              data-testid={`impact-${item.id}`}
            >
              <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {t(item.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4">
                {t(item.descKey)}
              </p>
              <Link href={item.link}>
                <Button variant="outline" size="sm" className="font-display tracking-wide" data-testid={`button-impact-${item.id}`}>
                  {t("impact.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const spotlightAdventureKeys = ["kazakhstan", "kyrgyzstan", "mongolia", "nepal", "indonesia"];
const spotlightAdventuresData = [
  {
    id: "kazakhstan-steppe",
    key: "kazakhstan",
    video: kazakhstanVideo,
    poster: desertImage,
    durationDays: 12,
  },
  {
    id: "kyrgyzstan-heights",
    key: "kyrgyzstan",
    video: kyrgyzstanVideo,
    poster: mountainsImage,
    durationDays: 10,
  },
  {
    id: "mongolia-gobi",
    key: "mongolia",
    video: mongoliaVideo,
    poster: desertImage,
    durationDays: 14,
  },
  {
    id: "nepal-mustang",
    key: "nepal",
    video: nepalVideo,
    poster: nepalImage,
    durationDays: 16,
  },
  {
    id: "indonesia-flores",
    key: "indonesia",
    video: indonesiaVideo,
    poster: oceanImage,
    durationDays: 13,
  },
];

function SpotlightSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? spotlightAdventuresData.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === spotlightAdventuresData.length - 1 ? 0 : prev + 1));
  };

  const currentAdventure = spotlightAdventuresData[currentIndex];
  const title = t(`expedition.${currentAdventure.key}.title`);
  const location = t(`header.expedition.${currentAdventure.key}`);
  const description = t(`expedition.${currentAdventure.key}.desc`);

  return (
    <section
      id="spotlight"
      className="py-16 md:py-24 pb-24 md:pb-32 px-6"
      data-testid="section-spotlight"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("spotlight.subtitle")}
          </p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
            {t("spotlight.title")}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="shrink-0"
              data-testid="button-spotlight-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <AnimatePresence mode="wait">
              <Link key={currentAdventure.id} href={`/expedition/${currentAdventure.id}`} className="block flex-1 max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                <Card className="overflow-visible bg-card border-border hover-elevate cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-80 overflow-hidden rounded-t-md md:rounded-l-md md:rounded-tr-none">
                      {'video' in currentAdventure && currentAdventure.video ? (
                        <video
                          data-ambient=""
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          src={currentAdventure.video}
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
                          src={'image' in currentAdventure ? currentAdventure.image as string : ''}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/40" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <span className="font-display text-xs tracking-widest text-primary uppercase mb-2">
                        {location}
                      </span>
                      <h3
                        className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors"
                        data-testid={`text-spotlight-title-${currentAdventure.id}`}
                      >
                        {title}
                      </h3>
                      <p className="font-body text-muted-foreground leading-relaxed mb-4">
                        {description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm text-muted-foreground">
                          {currentAdventure.durationDays} {t("common.days")}
                        </span>
                        <span className="font-display text-sm text-foreground flex items-center gap-1 group-hover:gap-2 transition-all">
                          {t("expeditions.exploreJourney")}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
                </motion.div>
              </Link>
            </AnimatePresence>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="shrink-0"
              data-testid="button-spotlight-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {spotlightAdventuresData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                data-testid={`button-spotlight-dot-${index}`}
                aria-label={`Go to adventure ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// A brand-new collective has no client stories yet — inventing them would
// poison the one thing this brand sells: trust. Until the first cohort
// returns, this section states the standard we hold ourselves to.
const testimonials = [
  {
    quote: "Twelve travelers, never more. Below a certain number, a journey stops being logistics and becomes a story.",
    trip: "On party size",
    client: "The Askyan Standard",
  },
  {
    quote: "Every expedition is built with Cultural Scribes — local storytellers who open doors no itinerary can.",
    trip: "On access",
    client: "The Askyan Standard",
  },
  {
    quote: "No scripts, no staged moments. If a tour bus can photograph it, it isn't on our route.",
    trip: "On authenticity",
    client: "The Askyan Standard",
  },
  {
    quote: "We film everything and promise nothing — the story is written by the land, not the brochure.",
    trip: "On the films",
    client: "The Askyan Standard",
  },
  {
    quote: "A portion of every expedition funds the communities and landscapes that host us.",
    trip: "On reciprocity",
    client: "The Askyan Standard",
  },
  {
    quote: "The founding cohort shapes the collective — the first members set the culture, the destinations, the bar.",
    trip: "On the beginning",
    client: "The Askyan Standard",
  },
];

function TestimonialsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    (currentIndex + 1) * testimonialsPerPage
  );

  return (
    <section
      id="testimonials"
      className="bone-section py-20 md:py-24 px-6"
      data-testid="section-testimonials"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("testimonials.subtitle")}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={currentIndex * testimonialsPerPage + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bone-card p-6 rounded-md"
                data-testid={`testimonial-${currentIndex * testimonialsPerPage + index}`}
              >
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <blockquote className="font-body text-sm leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-display font-bold text-sm">
                    {testimonial.client}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {testimonial.trip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
              data-testid="button-testimonials-prev"
              aria-label="Previous testimonials"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-primary w-6" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  data-testid={`button-testimonial-page-${index}`}
                  aria-label={`View testimonial page ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
              data-testid="button-testimonials-next"
              aria-label="Next testimonials"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// The founding seasons: when each of the six landscapes is most itself.
const FOUNDING_SEASONS = [
  { id: "kazakhstan-steppe", code: "001", country: "Kazakhstan", title: "The Steppe Awakening", window: "MAY — OCT", note: "The steppe greens and Charyn Canyon glows at dusk." },
  { id: "kyrgyzstan-heights", code: "002", country: "Kyrgyzstan", title: "The Celestial Mountains", window: "JUN — SEP", note: "High passes open; Song-Kul lives its brief nomad summer." },
  { id: "mongolia-gobi", code: "003", country: "Mongolia", title: "The Gobi Crossing", window: "MAY — SEP", note: "Desert light before the winter winds arrive." },
  { id: "nepal-mustang", code: "004", country: "Nepal", title: "The Forbidden Kingdom", window: "MAR — NOV", note: "Mustang's rain shadow keeps Lo dry through monsoon." },
  { id: "bhutan-sacred", code: "005", country: "Bhutan", title: "The Thunder Dragon Path", window: "MAR—MAY · SEP—NOV", note: "Rhododendron spring; crystal-air autumn." },
  { id: "indonesia-flores", code: "006", country: "Indonesia", title: "The Ring of Fire", window: "APR — NOV", note: "Dry season across the volcanic arc." },
];

function WhenToGoSection() {
  const { t } = useLanguage();
  return (
    <section
      id="when-to-go"
      className="py-16 md:py-20 px-6"
      data-testid="section-when-to-go"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("seasonal.kicker")}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
            {t("seasonal.title")}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("seasonal.description")}
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {FOUNDING_SEASONS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={`/expedition/${s.id}`}
                className="group flex flex-col gap-2 border-b border-primary/15 py-6 transition-colors hover:bg-card/60 md:flex-row md:items-baseline md:gap-8 md:px-4"
                data-testid={`season-${s.id}`}
              >
                <span className="w-40 shrink-0 font-mono text-[11px] tracking-[0.2em] text-primary">
                  {s.code} — {s.country.toUpperCase()}
                </span>
                <span className="flex-1">
                  <span className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
                    {s.title}
                  </span>
                  <span className="mt-1 block font-body text-sm italic text-muted-foreground">{s.note}</span>
                </span>
                <span className="shrink-0 font-mono text-xs tracking-[0.15em] text-primary/90">{s.window}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdventureFeatureSection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-0" data-testid="section-adventure-feature">
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <video
          data-ambient=""
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={adventureVideo}
          className="absolute inset-0 w-full h-full object-cover"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20"
        >
          <div className="max-w-xl">
            <p className="font-display text-sm tracking-[0.3em] text-primary uppercase mb-4">
              {t("adventure.subtitle")}
            </p>
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
              {t("adventure.kicker")}
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {t("adventure.title")}
            </h2>
            <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
              {t("adventure.description")}
            </p>
            <Link href="/expeditions">
              <Button 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-display tracking-wide"
                data-testid="button-find-adventure"
              >
                {t("adventure.cta")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FoundersSection() {
  const { t } = useLanguage();
  const founders = [
    {
      name: "Blaze Potratz",
      title: "The Architect",
      description:
        "Architects the brand's soul, systems, and stories from the central hub. His domain is The Art Foundry.",
    },
    {
      name: "Jacobo Rosillo",
      title: "The Pathfinder",
      description:
        "Engineers the global network, node by node. His domain is The System Forge, executed in the field.",
    },
  ];

  return (
    <section
      id="founders"
      className="py-24 md:py-32 lg:py-40 px-6 bg-card"
      data-testid="section-founders"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
          data-testid="text-founders-headline"
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3">
            {t("founders.kicker")}
          </p>
          <span className="font-display font-bold text-3xl md:text-4xl block">{t("founders.title")}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className="p-8 md:p-10 bg-background border-border"
                data-testid={`card-founder-${founder.name.split(' ')[0].toLowerCase()}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  {/* Monogram until real portraits are supplied — a branded
                      initial beats a placeholder tile on a founders card. */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                    <span className="font-display text-2xl text-primary">
                      {founder.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl" data-testid={`text-founder-name-${founder.name.split(' ')[0].toLowerCase()}`}>
                      {founder.name}
                    </h3>
                    <p className="font-display text-sm text-primary tracking-wide" data-testid={`text-founder-title-${founder.name.split(' ')[0].toLowerCase()}`}>
                      {founder.title}
                    </p>
                  </div>
                </div>
                <p
                  className="font-body text-muted-foreground leading-relaxed"
                  data-testid={`text-founder-description-${founder.name.split(' ')[0].toLowerCase()}`}
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

function WaitlistSection() {
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { trackSubscription } = useAnalytics();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return await response.json();
    },
    onSuccess: (_, variables) => {
      setIsSuccess(true);
      trackSubscription(variables.email);
      form.reset();
    },
    onError: (error: Error) => {
      const errorMessage = error.message.includes("400") 
        ? "You've already submitted an application."
        : error.message || "Please try again later.";
      toast({
        title: "Application not submitted",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailFormData) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section
      id="waitlist"
      className="py-24 md:py-32 lg:py-40 px-6"
      data-testid="section-waitlist"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-sm text-primary tracking-[0.3em] uppercase mb-4">
            {t("waitlist.subtitle")}
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
            data-testid="text-waitlist-headline"
          >
            {t("waitlist.title")}
          </h2>
          <p
            className="font-body text-muted-foreground text-lg md:text-xl mb-4 max-w-xl mx-auto leading-relaxed"
            data-testid="text-waitlist-description"
          >
            {t("waitlist.description")}
          </p>
          <p className="font-body text-muted-foreground/70 text-sm mb-10 max-w-md mx-auto italic">
            {t("waitlist.review")}
          </p>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-10 bg-primary/10 border border-primary/20 rounded-md"
              data-testid="text-waitlist-success"
            >
              <Flame className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="font-display font-bold text-xl md:text-2xl text-primary mb-3">
                {t("waitlist.received")}
              </p>
              <p className="font-body text-muted-foreground">
                {t("waitlist.success")}
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder={t("waitlist.placeholder")}
                          className="h-12 bg-card border-border font-body text-base"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage className="text-left mt-2" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="h-12 px-8 font-display tracking-wide"
                  disabled={subscribeMutation.isPending}
                  data-testid="button-submit-email"
                >
                  {subscribeMutation.isPending ? t("common.submitting") : t("waitlist.button")}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ContactInfoSection() {
  const { t } = useLanguage();
  return (
    <section id="contact-info" className="py-8 md:py-10 px-6 border-t border-border/50" data-testid="section-contact-info">
      <div className="max-w-4xl mx-auto">
        <p className="text-center font-body text-sm text-muted-foreground">
          Every message goes to a founder —{" "}
          <a href="/contact" className="text-primary transition-colors hover:underline">request access</a>{" "}
          and we&apos;ll reply personally.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  useAmbientVideos();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader 
        variant="transparent"
        onScrollToSection={scrollToSection}
      />
      <main>
        <HeroSection />
        {/* The Road: the mark's winding path, drawn by your scroll */}
        <div className="relative">
          <RoadPath />
          <SpotlightSection />
          <AdventureFeatureSection />
          <PositiveImpactSection />
          <WhenToGoSection />
          <TestimonialsSection />
          <WaitlistSection />
          <ContactInfoSection />
        </div>
      </main>
      <SiteFooter />
      <Chatbot />
    </div>
  );
}
