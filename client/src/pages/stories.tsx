import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { useLanguage } from "@/contexts/language-context";

interface Story {
  id: string;
  title: string;
  excerpt: string;
  location: string;
  date: string;
  readTime: string;
  category: string;
}

const stories: Story[] = [
  {
    id: "silent-monks-bhutan",
    title: "The Silent Monks of Bumthang",
    excerpt:
      "At 3,100 meters in the Himalayan kingdom of Bhutan stands a monastery said to have kept a vow of silence for over 400 years. A Cultural Scribe has offered to walk us in — this is among the first stories the collective intends to tell.",
    location: "Bumthang Valley, Bhutan",
    date: "Founding seasons",
    readTime: "To be written",
    category: "Sacred Encounters",
  },
  {
    id: "salt-caravans-ethiopia",
    title: "Following the Last Salt Caravans",
    excerpt:
      "The Afar people have traded salt across the Danakil Depression for over a thousand years, carrying white gold through the hottest place on Earth. We are mapping the route to join them — a commerce older than currency, still unfilmed as it deserves.",
    location: "Danakil Depression, Ethiopia",
    date: "Founding seasons",
    readTime: "To be written",
    category: "Ancient Trade Routes",
  },
  {
    id: "night-fishermen-maldives",
    title: "The Night Fishermen of Fuvahmulah",
    excerpt:
      "On Fuvahmulah, fishermen still read the night ocean by starlight and current alone. Before the practice fades, we intend to spend a season learning — and recording — how they see a sea the rest of us only look at.",
    location: "Fuvahmulah, Maldives",
    date: "Founding seasons",
    readTime: "To be written",
    category: "Living Traditions",
  },
  {
    id: "forgotten-kingdom-mustang",
    title: "The Forgotten Kingdom",
    excerpt:
      "Upper Mustang opened to outsiders only in 1992, and its walled capital of Lo Manthang still keeps the rhythm of a Tibetan kingdom that vanished everywhere else. Gaining the right permissions is slow. That is the point.",
    location: "Upper Mustang, Nepal",
    date: "Founding seasons",
    readTime: "To be written",
    category: "Hidden Kingdoms",
  },
  {
    id: "whale-singers-tonga",
    title: "Singing with Giants",
    excerpt:
      "Every winter, humpbacks fill the waters of Vava'u with songs that carry for miles. We are working with local guides on how to witness it without disturbing it — the story is worth nothing if the whales pay for it.",
    location: "Vava'u, Kingdom of Tonga",
    date: "Founding seasons",
    readTime: "To be written",
    category: "Natural Wonders",
  },
  {
    id: "shadow-puppets-java",
    title: "Masters of Shadow and Light",
    excerpt:
      "In Java, dalang masters still perform wayang kulit until dawn — all-night epics of shadow and light passed master to apprentice for centuries. We are seeking an apprenticeship's permission to sit in the dark and learn.",
    location: "Central Java, Indonesia",
    date: "Founding seasons",
    readTime: "To be written",
    category: "Living Traditions",
  },
];

function StoryCard({ story, index, t }: { story: Story; index: number; t: (key: string) => string }) {
  return (
    <motion.div
      id={story.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="scroll-mt-24"
    >
      <Card
        className="group p-6 md:p-8 bg-card border-border hover-elevate cursor-pointer"
        data-testid={`card-story-${story.id}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span
              className="font-display text-primary tracking-wide"
              data-testid={`text-category-${story.id}`}
            >
              {story.category}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {story.location}
            </span>
          </div>

          <h2
            className="font-display font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors"
            data-testid={`text-title-${story.id}`}
          >
            {story.title}
          </h2>

          <p
            className="font-body text-muted-foreground leading-relaxed"
            data-testid={`text-excerpt-${story.id}`}
          >
            {story.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {story.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {story.readTime}
              </span>
            </div>

            <span className="font-display text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              {t("chronicles.readChronicle")}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Stories() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" activePage="chronicles" />

      <main className="pt-24 pb-16">
        <section className="px-6 mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight"
                data-testid="text-stories-headline"
              >
                {t("chronicles.headline")}
              </h1>
              <p
                className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                data-testid="text-stories-description"
              >
                {t("chronicles.description")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:gap-8">
              {stories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} t={t} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-muted-foreground mb-6">
              {t("chronicles.moreComingSoon")}
            </p>
            <Link href="/#waitlist" data-testid="link-join-waitlist">
              <Button className="font-display tracking-wide" data-testid="button-join-waitlist">
                {t("waitlist.button")}
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-border" data-testid="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-display text-sm text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} {t("common.copyright")}. {t("footer.rights").toUpperCase()}.
          </p>
        </div>
      </footer>
    </div>
  );
}
