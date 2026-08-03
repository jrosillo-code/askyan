import { useState, useEffect } from "react";
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
import { MEDIA } from "@/lib/media";
import logoImage from "@assets/download-Picsart-BackgroundRemover_1764993972814.png";
const mountainsImage = MEDIA["stock_images/aerial_view_mountain_771f3480.jpg"];
const desertImage = MEDIA["stock_images/desert_dunes_morocco_5d629ce9.jpg"];
const oceanImage = MEDIA["stock_images/tropical_ocean_islan_60d51698.jpg"];
const jungleImage = MEDIA["stock_images/jungle_rainforest_ad_8a15559b.jpg"];
const januaryImage = MEDIA["stock_images/snowy_mountain_winte_26197a98.jpg"];
const februaryImage = MEDIA["stock_images/romantic_beach_sunse_fb4170bc.jpg"];
const marchImage = MEDIA["stock_images/cherry_blossom_sprin_ce39e7dd.jpg"];
const aprilImage = MEDIA["stock_images/safari_africa_wildli_d17fb7a3.jpg"];
const mayImage = MEDIA["stock_images/european_mediterrane_f935b582.jpg"];
const juneImage = MEDIA["stock_images/tropical_island_para_84d2ed84.jpg"];
const julyImage = MEDIA["stock_images/greek_islands_summer_22f53eea.jpg"];
const augustImage = MEDIA["stock_images/northern_lights_icel_d2b45ee2.jpg"];
const septemberImage = MEDIA["stock_images/vineyard_wine_harves_76199fdc.jpg"];
const octoberImage = MEDIA["stock_images/himalayan_mountains__62bd3e7d.jpg"];
const novemberImage = MEDIA["stock_images/botswana_safari_wild_39131197.jpg"];
const decemberImage = MEDIA["stock_images/tropical_beach_holid_19b1ca0f.jpg"];
const adventureImage = MEDIA["sebastian-boring-8zD7rs8UpxU-unsplash_1764990946831.jpg"];
const adventureBackgroundImage = MEDIA["sebastian-boring-8zD7rs8UpxU-unsplash_1764996645593.jpg"];
const adventureVideo = MEDIA["adventure-web.mp4"];
const swissAlpsImage = MEDIA["stock_images/swiss_alps_mountain__e0f0ff3f.jpg"];
const japanCherryImage = MEDIA["stock_images/japan_cherry_blossom_64792caa.jpg"];
const maldivesImage = MEDIA["stock_images/maldives_overwater_b_99c5bf07.jpg"];
const tanzaniaSafariImage = MEDIA["stock_images/tanzania_safari_elep_7d56a0d1.jpg"];
const amalfiImage = MEDIA["stock_images/amalfi_coast_italy_c_47120d19.jpg"];
const fijiImage = MEDIA["stock_images/fiji_tropical_island_eaaf756d.jpg"];
const icelandAuroraImage = MEDIA["stock_images/iceland_northern_lig_5d791936.jpg"];
const nepalImage = MEDIA["stock_images/nepal_himalayas_moun_9d8b4f66.jpg"];
const tuscanyImage = MEDIA["stock_images/tuscany_vineyard_win_ab92a196.jpg"];
const patagoniaImage = MEDIA["stock_images/patagonia_glacier_mo_1c0f2ef7.jpg"];
const boraBoraImage = MEDIA["stock_images/bora_bora_overwater__19cf39a1.jpg"];
const moroccoImage = MEDIA["stock_images/morocco_desert_camel_16c0ed18.jpg"];
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
      className={`${className} whitespace-nowrap`}
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
const pressLogos = [
  { name: "Kazakhstan", text: "KAZAKHSTAN", url: "/expeditions" },
  { name: "Kyrgyzstan", text: "KYRGYZSTAN", url: "/expeditions" },
  { name: "Mongolia", text: "MONGOLIA", url: "/expeditions" },
  { name: "Bhutan", text: "BHUTAN", url: "/expeditions" },
  { name: "Founding Cohort", text: "FOUNDING COHORT — NOW FORMING", url: "/contact" },
];

const heroVideos = [
  // Three clips, all verified HD (1920) — a quarter the bytes of the UHD
  // files, which is the difference between "loads instantly" and "loads
  // eventually" on hotel wifi. The 4K-only clips live on expedition pages.
  "https://videos.pexels.com/video-files/8761030/8761030-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/8774553/8774553-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/3121327/3121327-hd_1920_1080_24fps.mp4",
];

function HeroSection() {
  const { t } = useLanguage();
  const [currentVideo, setCurrentVideo] = useState(0);
  // Respect accessibility + metered connections: skip video streams entirely
  // and let the poster carry the hero.
  const [staticHero] = useState(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as { connection?: { saveData?: boolean } }).connection?.saveData === true
  );
  const [previousVideo, setPreviousVideo] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // First video plays for 12 seconds, others for 8 seconds
  const getVideoDuration = (index: number) => index === 0 ? 12000 : 8000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPreviousVideo(currentVideo);
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, getVideoDuration(currentVideo));

    return () => clearTimeout(timeout);
  }, [currentVideo]);

  useEffect(() => {
    if (previousVideo !== null) {
      const timeout = setTimeout(() => {
        setPreviousVideo(null);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [previousVideo]);

  // Swipe handling for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      // Swipe left = next video
      setPreviousVideo(currentVideo);
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    } else if (isRightSwipe) {
      // Swipe right = previous video
      setPreviousVideo(currentVideo);
      setCurrentVideo((prev) => (prev === 0 ? heroVideos.length - 1 : prev - 1));
    }
  };

  // The upcoming clip is mounted invisibly (buffering AND playing) so the
  // switch is a genuine crossfade between two live streams — mounting it at
  // switch time produced a loading stutter instead of a fade.
  const nextVideo = (currentVideo + 1) % heroVideos.length;
  const getVideoOpacity = (index: number) => {
    if (index === currentVideo) return "opacity-100";
    if (index === previousVideo) return "opacity-100";
    return "opacity-0";
  };

  const getVideoZIndex = (index: number) => {
    if (index === currentVideo) return "z-10";
    if (index === previousVideo) return "z-0";
    return "z-0";
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden" 
      data-testid="section-hero"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 z-0">
        {/* Instant paint while the first stream buffers — no black flash */}
        <img
          src="https://images.pexels.com/videos/8761030/free-video-8761030.jpg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {!staticHero && heroVideos.map((video, index) => {
          // Mount the live clip, its fade-out partner, and the upcoming clip
          // (invisible, pre-buffering) — never all five at once.
          if (index !== currentVideo && index !== previousVideo && index !== nextVideo) return null;
          return (
          <video
            key={video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src={video}
            className={`hero-drift absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${getVideoOpacity(index)} ${getVideoZIndex(index)}`}
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              if (video.currentTime >= 10) {
                video.currentTime = 0;
              }
            }}
          />
          );
        })}
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
          className="font-display font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 tracking-tight leading-[1.1]"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 w-full px-6"
      >
        <span className="font-display text-xs tracking-[0.3em] text-white/40 uppercase">{t("hero.featuredIn")}</span>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {pressLogos.map((logo) => (
            <a
              key={logo.name}
              href={logo.url}
              className="font-display text-[10px] md:text-xs tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors"
              data-testid={`link-press-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {logo.text}
            </a>
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
      className="py-16 md:py-20 px-6"
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
      link: "/conservation",
    },
    {
      id: "community",
      titleKey: "impact.community.title",
      descKey: "impact.community.desc",
      image: communityImage,
      link: "/community",
    },
    {
      id: "sustainable",
      titleKey: "impact.sustainable.title",
      descKey: "impact.sustainable.desc",
      image: sustainableImage,
      link: "/sustainable",
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
      className="py-20 md:py-24 px-6 bg-card"
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
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
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
                className="bg-background p-6 rounded-md border border-border"
                data-testid={`testimonial-${currentIndex * testimonialsPerPage + index}`}
              >
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <blockquote className="font-body text-sm text-foreground leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-display font-bold text-sm text-foreground">
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

const monthsData = [
  { name: "January", key: "january", image: januaryImage, destinationsList: [
    { name: "Swiss Alps", image: swissAlpsImage },
    { name: "Japan", image: japanCherryImage },
    { name: "Patagonia", image: patagoniaImage }
  ]},
  { name: "February", key: "february", image: februaryImage, destinationsList: [
    { name: "Maldives", image: maldivesImage },
    { name: "Bora Bora", image: boraBoraImage },
    { name: "Seychelles", image: fijiImage }
  ]},
  { name: "March", key: "march", image: marchImage, destinationsList: [
    { name: "Japan", image: japanCherryImage },
    { name: "Morocco", image: moroccoImage },
    { name: "Jordan", image: desertImage }
  ]},
  { name: "April", key: "april", image: aprilImage, destinationsList: [
    { name: "Tanzania", image: tanzaniaSafariImage },
    { name: "Kenya", image: novemberImage },
    { name: "Botswana", image: aprilImage }
  ]},
  { name: "May", key: "may", image: mayImage, destinationsList: [
    { name: "Amalfi Coast", image: amalfiImage },
    { name: "Greek Islands", image: julyImage },
    { name: "Croatia", image: oceanImage }
  ]},
  { name: "June", key: "june", image: juneImage, destinationsList: [
    { name: "Fiji", image: fijiImage },
    { name: "French Polynesia", image: boraBoraImage },
    { name: "Indonesia", image: jungleImage }
  ]},
  { name: "July", key: "july", image: julyImage, destinationsList: [
    { name: "Iceland", image: icelandAuroraImage },
    { name: "Norway", image: augustImage },
    { name: "Greenland", image: mountainsImage }
  ]},
  { name: "August", key: "august", image: augustImage, destinationsList: [
    { name: "Alaska", image: mountainsImage },
    { name: "Arctic", image: icelandAuroraImage },
    { name: "Svalbard", image: januaryImage }
  ]},
  { name: "September", key: "september", image: septemberImage, destinationsList: [
    { name: "Tuscany", image: tuscanyImage },
    { name: "Burgundy", image: septemberImage },
    { name: "Napa Valley", image: mayImage }
  ]},
  { name: "October", key: "october", image: octoberImage, destinationsList: [
    { name: "Nepal", image: nepalImage },
    { name: "Bhutan", image: octoberImage },
    { name: "Peru", image: patagoniaImage }
  ]},
  { name: "November", key: "november", image: novemberImage, destinationsList: [
    { name: "Rwanda", image: jungleImage },
    { name: "Zambia", image: tanzaniaSafariImage },
    { name: "Zimbabwe", image: novemberImage }
  ]},
  { name: "December", key: "december", image: decemberImage, destinationsList: [
    { name: "Caribbean", image: fijiImage },
    { name: "Thailand", image: oceanImage },
    { name: "New Zealand", image: mountainsImage }
  ]},
];

function MonthFlipCard({ month, index }: { month: typeof monthsData[0]; index: number }) {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const monthName = t(`months.${month.key}`);
  const highlight = t(`month.${month.key}.highlight`);

  return (
    <motion.div
      id={`month-${month.name.toLowerCase()}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative aspect-[4/5] cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-testid={`card-month-${month.name.toLowerCase()}`}
    >
      <Link href={`/when-to-go/${month.name.toLowerCase()}`}>
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="absolute inset-0 rounded-md overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img loading="lazy" decoding="async"
              src={month.image}
              alt={month.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <h3 className="font-display font-bold text-lg md:text-xl text-white mb-1">
                {monthName}
              </h3>
              <p className="font-body text-xs md:text-sm text-white/70">
                {highlight}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-md overflow-hidden bg-card"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-0 p-3 flex flex-col">
              <h3 className="font-display font-bold text-sm md:text-base text-foreground mb-2 text-center">
                {monthName}
              </h3>
              <div className="flex-1 grid grid-rows-3 gap-2">
                {month.destinationsList.map((dest) => (
                  <div key={dest.name} className="relative rounded overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src={dest.image}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-xs md:text-sm text-white font-bold tracking-wide">
                        {dest.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-display text-xs text-primary text-center mt-2">
                {t("common.clickToExplore")}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

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
          <p className="font-display text-sm tracking-[0.3em] text-primary uppercase mb-4">
            {t("seasonal.subtitle")}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
            {t("seasonal.title")}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("seasonal.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {monthsData.map((month, index) => (
            <MonthFlipCard key={month.name} month={month} index={index} />
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
          className="font-display font-bold text-3xl md:text-4xl text-center mb-16 md:mb-20"
          data-testid="text-founders-headline"
        >
          {t("founders.title")}
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

function Footer() {
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
              A private media collective. Curated access to the unseen world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.25em] text-primary">Journeys</div>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-muted-foreground">
                <li><a href="/expeditions" className="hover:text-foreground">Expeditions</a></li>
                <li><a href="/films" className="hover:text-foreground">Films</a></li>
                <li><a href="/chronicles" className="hover:text-foreground">Chronicles</a></li>
              </ul>
            </div>
            <div>
              <div className="font-display text-xs uppercase tracking-[0.25em] text-primary">Collective</div>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground">About</a></li>
                <li><a href="/conservation" className="hover:text-foreground">Conservation</a></li>
                <li><a href="/community" className="hover:text-foreground">Community</a></li>
              </ul>
            </div>
            <div>
              <div className="font-display text-xs uppercase tracking-[0.25em] text-primary">Join</div>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-muted-foreground">
                <li><a href="/contact" className="hover:text-foreground">Request access</a></li>
                <li><a href="/#waitlist" className="hover:text-foreground">Waitlist</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 md:flex-row">
          <p className="font-display text-xs tracking-wide text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("common.copyright")}. {t("footer.rights").toUpperCase()}.
          </p>
          <p className="font-display text-xs tracking-[0.15em] text-muted-foreground/70">
            <a href="/privacy" className="transition-colors hover:text-foreground">PRIVACY</a>
            <span className="mx-3">&middot;</span>
            <a href="/terms" className="transition-colors hover:text-foreground">TERMS</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMonth = (month: string) => {
    const element = document.getElementById(`month-${month.toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader 
        variant="transparent"
        onScrollToSection={scrollToSection}
        onScrollToMonth={scrollToMonth}
      />
      <main>
        <HeroSection />
        <SpotlightSection />
        <AdventureFeatureSection />
        <PositiveImpactSection />
        <WhenToGoSection />
        <TestimonialsSection />
        <WaitlistSection />
        <ContactInfoSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
