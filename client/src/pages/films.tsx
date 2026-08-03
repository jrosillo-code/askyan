import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Film, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { useLanguage } from "@/contexts/language-context";

interface VideoItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  description: string;
  thumbnailUrl: string;
  category: string;
}

const videos: VideoItem[] = [
  {
    id: "mongolia-nomads",
    title: "The Last Nomads of Mongolia",
    location: "Gobi Desert, Mongolia",
    duration: "In production",
    description: "Follow three generations of a nomadic family as they navigate the changing seasons of the Gobi. This documentary captures the ancient rhythms of a life most have forgotten exists.",
    thumbnailUrl: "https://images.pexels.com/photos/33770617/pexels-photo-33770617.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Documentary",
  },
  {
    id: "bhutan-monastery",
    title: "Silent Dawn: A Bhutanese Monastery",
    location: "Paro Valley, Bhutan",
    duration: "In production",
    description: "Experience the meditative tranquility of life within one of Bhutan's most remote monasteries, where monks have practiced the same rituals for over 400 years.",
    thumbnailUrl: "https://images.pexels.com/photos/17898806/pexels-photo-17898806.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Sacred Journeys",
  },
  {
    id: "kyrgyzstan-eagles",
    title: "The Eagle Hunters",
    location: "Tien Shan Mountains, Kyrgyzstan",
    duration: "In production",
    description: "A cinematic portrait of the berkutchi, the last eagle hunters of Central Asia, who train golden eagles to hunt in traditions passed down for millennia.",
    thumbnailUrl: "https://images.pexels.com/photos/5275475/pexels-photo-5275475.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Cultural Heritage",
  },
  {
    id: "nepal-trails",
    title: "Paths to the Sky",
    location: "Upper Mustang, Nepal",
    duration: "In production",
    description: "Trek through the hidden kingdom of Lo, where ancient trade routes carved into impossible cliffs connect villages that time forgot.",
    thumbnailUrl: "https://images.pexels.com/photos/20839121/pexels-photo-20839121.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Expedition",
  },
  {
    id: "indonesia-komodo",
    title: "Dragons of the Ring of Fire",
    location: "Komodo National Park, Indonesia",
    duration: "In production",
    description: "Dive into the waters of Indonesia's volcanic archipelago and walk among the last dragons on Earth in this visual exploration of nature's extremes.",
    thumbnailUrl: "https://images.pexels.com/photos/29464869/pexels-photo-29464869.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Wildlife",
  },
  {
    id: "kazakhstan-steppe",
    title: "Endless Horizon",
    location: "Kazakh Steppe, Kazakhstan",
    duration: "In production",
    description: "A meditative journey across the endless grasslands of Central Asia, where the horizon bends and time moves to the rhythm of hooves.",
    thumbnailUrl: "https://images.pexels.com/photos/33433629/pexels-photo-33433629.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Documentary",
  },
];

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
      data-testid="modal-video-overlay"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-video-container"
      >
        <video
          src="/films-popup-video.mp4"
          autoPlay
          controls
          className="w-full h-full object-contain"
          data-testid="video-popup-player"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          aria-label="Close video"
          data-testid="button-close-video"
        >
          <span className="text-xl">&times;</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

function VideoCard({ video, onClick, index, t }: { video: VideoItem; onClick: () => void; index: number; t: (key: string) => string }) {
  const filmKeyMap: Record<string, string> = {
    "mongolia-nomads": "mongolia",
    "bhutan-monastery": "bhutan",
    "kyrgyzstan-eagles": "kyrgyzstan",
    "nepal-trails": "nepal",
    "indonesia-komodo": "indonesia",
    "kazakhstan-steppe": "kazakhstan",
  };
  const filmKey = filmKeyMap[video.id] || video.id;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Card
        className="overflow-visible bg-card border-border hover-elevate cursor-pointer"
        onClick={onClick}
        data-testid={`card-video-${video.id}`}
      >
        <div className="relative aspect-video overflow-hidden rounded-t-md">
          <img loading="lazy" decoding="async"
            src={video.thumbnailUrl}
            alt={t(`film.${filmKey}.title`)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
            <span className="font-display text-xs tracking-widest text-primary uppercase">
              {t(`film.${filmKey}.category`) !== `film.${filmKey}.category` ? t(`film.${filmKey}.category`) : video.category}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-primary/50 bg-black/40 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-primary font-display">
              {video.duration}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-2" data-testid={`text-video-title-${video.id}`}>
            {t(`film.${filmKey}.title`)}
          </h3>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin className="w-3 h-3" />
            <span className="font-body">{video.location}</span>
          </div>
          
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {t(`film.${filmKey}.desc`)}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Films() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const searchString = useSearch();
  const { t } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const videoId = params.get("video");
    if (videoId) {
      const video = videos.find((v) => v.id === videoId);
      if (video) {
        setSelectedVideo(video);
      }
    }
  }, [searchString]);

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" activePage="films" />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
            src="/films-hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
        >
          <Film className="w-10 h-10 text-primary mx-auto mb-6 opacity-80" />
          <h1
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight"
            data-testid="text-films-headline"
          >
            {t("films.headline")}
          </h1>
          <p
            className="font-body text-lg md:text-xl text-white/80 italic max-w-2xl mx-auto"
            data-testid="text-films-subtitle"
          >
            {t("films.subtitle")}
          </p>
        </motion.div>
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
              {t("films.collection.title")}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              {t("films.collection.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setSelectedVideo(video)}
                index={index}
                t={t}
              />
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
            {t("films.cta.title")}
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("films.cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/expeditions" data-testid="link-view-expeditions">
              <Button variant="outline" size="lg" className="font-display tracking-wide" data-testid="button-view-expeditions">
                {t("spotlight.viewAll")}
              </Button>
            </Link>
            <Link href="/#waitlist" data-testid="link-join-waitlist">
              <Button size="lg" className="font-display tracking-wide" data-testid="button-join-waitlist">
                {t("waitlist.button")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-border" data-testid="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-display text-sm text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} {t("common.copyright")}. {t("footer.rights").toUpperCase()}.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
