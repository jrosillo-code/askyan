import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Sun, Thermometer } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { MEDIA } from "@/lib/media";
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
const desertImage = MEDIA["stock_images/desert_dunes_morocco_5d629ce9.jpg"];
const oceanImage = MEDIA["stock_images/tropical_ocean_islan_60d51698.jpg"];
const jungleImage = MEDIA["stock_images/jungle_rainforest_ad_8a15559b.jpg"];
const mountainsImage = MEDIA["stock_images/aerial_view_mountain_771f3480.jpg"];


const monthsDetailData: Record<string, {
  name: string;
  image: string;
  highlight: string;
  description: string;
  weather: string;
  temperature: string;
  destinations: Array<{
    name: string;
    image: string;
    description: string;
    activities: string[];
  }>;
}> = {
  january: {
    name: "January",
    image: januaryImage,
    highlight: "Alpine Adventures",
    description: "January offers the perfect escape for snow enthusiasts and those seeking winter wonderlands. From pristine ski slopes to serene mountain retreats, this month delivers unforgettable alpine experiences.",
    weather: "Cold, snowy conditions ideal for winter sports",
    temperature: "-5°C to 5°C",
    destinations: [
      {
        name: "Swiss Alps",
        image: swissAlpsImage,
        description: "Experience world-class skiing in Zermatt, St. Moritz, and Verbier. Enjoy fondue by roaring fires and witness the majesty of the Matterhorn.",
        activities: ["Skiing", "Snowboarding", "Mountain dining", "Spa retreats"]
      },
      {
        name: "Japan",
        image: japanCherryImage,
        description: "Discover powder snow in Niseko and Hakuba. Combine ski adventures with traditional onsen experiences and Japanese culture.",
        activities: ["Powder skiing", "Hot springs", "Temple visits", "Sake tasting"]
      },
      {
        name: "Patagonia",
        image: patagoniaImage,
        description: "Summer in the Southern Hemisphere brings perfect trekking conditions. Explore Torres del Paine and witness massive glaciers.",
        activities: ["Trekking", "Glacier hiking", "Wildlife watching", "Photography"]
      }
    ]
  },
  february: {
    name: "February",
    image: februaryImage,
    highlight: "Romantic Escapes",
    description: "February is the month of romance. Escape to tropical paradises with pristine beaches, overwater bungalows, and unforgettable sunsets.",
    weather: "Tropical warmth, clear skies",
    temperature: "25°C to 32°C",
    destinations: [
      {
        name: "Maldives",
        image: maldivesImage,
        description: "The ultimate luxury escape with overwater villas, private beaches, and some of the world's best diving and snorkeling.",
        activities: ["Snorkeling", "Diving", "Spa treatments", "Private dining"]
      },
      {
        name: "Bora Bora",
        image: boraBoraImage,
        description: "Iconic overwater bungalows with views of Mount Otemanu. Perfect for honeymoons and romantic getaways.",
        activities: ["Lagoon tours", "Shark feeding", "Sunset cruises", "French cuisine"]
      },
      {
        name: "Seychelles",
        image: fijiImage,
        description: "Pristine beaches surrounded by granite boulders. Experience unique wildlife and Creole culture.",
        activities: ["Beach hopping", "Island tours", "Giant tortoise encounters", "Creole dining"]
      }
    ]
  },
  march: {
    name: "March",
    image: marchImage,
    highlight: "Spring Awakening",
    description: "As spring arrives in the Northern Hemisphere, witness nature's rebirth. From cherry blossoms to desert adventures, March offers diverse experiences.",
    weather: "Mild temperatures, spring blooms",
    temperature: "15°C to 22°C",
    destinations: [
      {
        name: "Japan Cherry Blossoms",
        image: japanCherryImage,
        description: "Witness the magical hanami season. Visit Kyoto's temples, Tokyo's parks, and experience Japanese spring traditions.",
        activities: ["Hanami picnics", "Temple visits", "Tea ceremonies", "Kaiseki dining"]
      },
      {
        name: "Morocco",
        image: moroccoImage,
        description: "Perfect weather for exploring medinas, Atlas Mountains, and the Sahara before summer heat arrives.",
        activities: ["Desert camping", "Medina exploring", "Cooking classes", "Hammam experiences"]
      },
      {
        name: "Jordan",
        image: desertImage,
        description: "Explore Petra, float in the Dead Sea, and camp under stars in Wadi Rum during ideal weather conditions.",
        activities: ["Petra exploration", "Dead Sea floating", "Desert camping", "Archaeological tours"]
      }
    ]
  },
  april: {
    name: "April",
    image: aprilImage,
    highlight: "Safari Season",
    description: "April marks the beginning of prime safari season in East Africa. Witness the Great Migration and encounter Africa's incredible wildlife.",
    weather: "End of rainy season, lush landscapes",
    temperature: "20°C to 28°C",
    destinations: [
      {
        name: "Tanzania",
        image: tanzaniaSafariImage,
        description: "Experience the Serengeti during calving season. Witness millions of wildebeest and their newborns.",
        activities: ["Game drives", "Balloon safaris", "Maasai visits", "Crater exploration"]
      },
      {
        name: "Kenya",
        image: novemberImage,
        description: "Explore the Masai Mara and witness predator-prey interactions during the green season.",
        activities: ["Safari drives", "Walking safaris", "Cultural experiences", "Photography"]
      },
      {
        name: "Botswana",
        image: aprilImage,
        description: "The Okavango Delta begins to flood, creating incredible waterway safari opportunities.",
        activities: ["Mokoro excursions", "Walking safaris", "Elephant encounters", "Birding"]
      }
    ]
  },
  may: {
    name: "May",
    image: mayImage,
    highlight: "Mediterranean Magic",
    description: "May brings perfect weather to the Mediterranean. Enjoy coastal charm before the summer crowds arrive.",
    weather: "Warm, sunny, perfect beach weather",
    temperature: "20°C to 28°C",
    destinations: [
      {
        name: "Amalfi Coast",
        image: amalfiImage,
        description: "Dramatic cliffs, colorful villages, and world-class cuisine. Drive the famous coastal road and explore Positano and Ravello.",
        activities: ["Coastal drives", "Limoncello tasting", "Boat tours", "Cooking classes"]
      },
      {
        name: "Greek Islands",
        image: julyImage,
        description: "Island-hop through Santorini, Mykonos, and hidden gems. Enjoy pristine beaches and ancient history.",
        activities: ["Island hopping", "Wine tasting", "Archaeological sites", "Beach clubs"]
      },
      {
        name: "Croatia",
        image: oceanImage,
        description: "Explore Dubrovnik's medieval walls, sail the Dalmatian coast, and discover hidden coves.",
        activities: ["Sailing", "Old town tours", "Wine tasting", "Oyster farms"]
      }
    ]
  },
  june: {
    name: "June",
    image: juneImage,
    highlight: "Island Paradise",
    description: "June offers the perfect conditions for South Pacific island adventures. Crystal clear waters and tropical temperatures await.",
    weather: "Tropical, dry season in many destinations",
    temperature: "25°C to 30°C",
    destinations: [
      {
        name: "Fiji",
        image: fijiImage,
        description: "Experience genuine Fijian hospitality. Private islands, world-class diving, and authentic village experiences.",
        activities: ["Diving", "Village visits", "Spa treatments", "Water sports"]
      },
      {
        name: "French Polynesia",
        image: boraBoraImage,
        description: "Beyond Bora Bora, discover Tahiti, Moorea, and remote atolls with pristine lagoons.",
        activities: ["Lagoon tours", "Pearl farms", "Polynesian dance", "Outrigger canoeing"]
      },
      {
        name: "Indonesia",
        image: jungleImage,
        description: "From Bali's temples to Komodo's dragons, experience incredible diversity and adventure.",
        activities: ["Temple visits", "Komodo tours", "Rice terrace walks", "Balinese ceremonies"]
      }
    ]
  },
  july: {
    name: "July",
    image: julyImage,
    highlight: "Summer Sojourns",
    description: "July brings 24-hour daylight to the far north. Experience midnight sun adventures in stunning Arctic landscapes.",
    weather: "Long days, mild temperatures, midnight sun",
    temperature: "10°C to 20°C",
    destinations: [
      {
        name: "Iceland",
        image: icelandAuroraImage,
        description: "Experience the midnight sun, drive the Ring Road, and witness waterfalls, geysers, and volcanic landscapes.",
        activities: ["Ring Road drives", "Glacier hikes", "Hot springs", "Whale watching"]
      },
      {
        name: "Norway",
        image: augustImage,
        description: "Cruise the fjords under the midnight sun. Hike to Trolltunga and experience Nordic culture.",
        activities: ["Fjord cruises", "Hiking", "Fishing", "Viking history"]
      },
      {
        name: "Greenland",
        image: mountainsImage,
        description: "Witness massive icebergs, Inuit culture, and some of the world's most pristine wilderness.",
        activities: ["Iceberg tours", "Dog sledding", "Inuit cultural visits", "Kayaking"]
      }
    ]
  },
  august: {
    name: "August",
    image: augustImage,
    highlight: "Northern Wonders",
    description: "August continues the Arctic summer season with optimal conditions for wildlife and wilderness adventures.",
    weather: "Cool Arctic summer, wildlife active",
    temperature: "8°C to 18°C",
    destinations: [
      {
        name: "Alaska",
        image: mountainsImage,
        description: "Peak season for bear viewing, salmon runs, and glacier expeditions. Combine with luxury lodges.",
        activities: ["Bear watching", "Salmon fishing", "Glacier cruises", "Seaplane adventures"]
      },
      {
        name: "Arctic",
        image: icelandAuroraImage,
        description: "Expedition cruises to Svalbard and the Northwest Passage. Witness polar bears and untouched wilderness.",
        activities: ["Expedition cruises", "Polar bear spotting", "Zodiac tours", "Photography"]
      },
      {
        name: "Svalbard",
        image: januaryImage,
        description: "The polar bear capital. Combine wildlife encounters with Arctic history and stunning glacial landscapes.",
        activities: ["Wildlife safaris", "Glacier walks", "Arctic history", "Kayaking"]
      }
    ]
  },
  september: {
    name: "September",
    image: septemberImage,
    highlight: "Harvest & Wine",
    description: "September brings harvest season to the world's great wine regions. Experience grape picking, wine tasting, and culinary excellence.",
    weather: "Mild autumn weather, harvest season",
    temperature: "18°C to 25°C",
    destinations: [
      {
        name: "Tuscany",
        image: tuscanyImage,
        description: "Roll through cypress-lined roads, visit historic wineries, and experience the grape harvest traditions.",
        activities: ["Wine tasting", "Truffle hunting", "Cooking classes", "Villa stays"]
      },
      {
        name: "Burgundy",
        image: septemberImage,
        description: "Experience the vendange in France's most prestigious wine region. Private tastings and Michelin dining.",
        activities: ["Vineyard tours", "Fine dining", "Hot air balloons", "Chateau visits"]
      },
      {
        name: "Napa Valley",
        image: mayImage,
        description: "California's wine country at its best. Combine with San Francisco and farm-to-table dining.",
        activities: ["Wine trains", "Hot air balloons", "Gourmet dining", "Spa treatments"]
      }
    ]
  },
  october: {
    name: "October",
    image: octoberImage,
    highlight: "Mountain Treks",
    description: "October offers optimal conditions for high-altitude trekking. Clear skies and mild temperatures make for perfect mountain adventures.",
    weather: "Clear, dry, ideal trekking conditions",
    temperature: "10°C to 20°C",
    destinations: [
      {
        name: "Nepal",
        image: nepalImage,
        description: "Trek to Everest Base Camp or the Annapurna Circuit. Experience Himalayan culture and stunning mountain vistas.",
        activities: ["Trekking", "Monastery visits", "Mountain flights", "Cultural experiences"]
      },
      {
        name: "Bhutan",
        image: octoberImage,
        description: "Visit the Tiger's Nest and experience this mystical Buddhist kingdom during festival season.",
        activities: ["Temple visits", "Festival viewing", "Hiking", "Archery"]
      },
      {
        name: "Peru",
        image: patagoniaImage,
        description: "Hike the Inca Trail to Machu Picchu. Explore the Sacred Valley and experience Andean culture.",
        activities: ["Inca Trail", "Machu Picchu", "Cultural tours", "Cusco exploration"]
      }
    ]
  },
  november: {
    name: "November",
    image: novemberImage,
    highlight: "Wildlife Season",
    description: "November marks prime wildlife viewing in Southern Africa. Witness incredible animal encounters and gorilla trekking.",
    weather: "Dry season, concentrated wildlife",
    temperature: "22°C to 32°C",
    destinations: [
      {
        name: "Rwanda Gorillas",
        image: jungleImage,
        description: "Trek through misty forests to encounter mountain gorillas. A life-changing wildlife experience.",
        activities: ["Gorilla trekking", "Golden monkey tracking", "Canopy walks", "Cultural visits"]
      },
      {
        name: "Zambia",
        image: tanzaniaSafariImage,
        description: "Walking safaris in South Luangwa and witness Victoria Falls during shoulder season.",
        activities: ["Walking safaris", "Victoria Falls", "Night drives", "Canoeing"]
      },
      {
        name: "Zimbabwe",
        image: novemberImage,
        description: "Experience Victoria Falls and Hwange National Park. Combine water activities with game viewing.",
        activities: ["Victoria Falls", "Safari drives", "Elephant encounters", "Sunset cruises"]
      }
    ]
  },
  december: {
    name: "December",
    image: decemberImage,
    highlight: "Winter Sun",
    description: "Escape the winter chill and celebrate the festive season in tropical destinations with warm waters and sunny skies.",
    weather: "Warm tropical conditions",
    temperature: "25°C to 32°C",
    destinations: [
      {
        name: "Caribbean",
        image: fijiImage,
        description: "Island hop through St. Barts, Turks & Caicos, and the British Virgin Islands. Yachting and beach luxury.",
        activities: ["Sailing", "Beach hopping", "Fine dining", "Water sports"]
      },
      {
        name: "Thailand",
        image: oceanImage,
        description: "Experience Thai hospitality in Phuket, Koh Samui, or the Andaman coast during peak season.",
        activities: ["Temple visits", "Thai cooking", "Island tours", "Spa retreats"]
      },
      {
        name: "New Zealand",
        image: mountainsImage,
        description: "Summer in the Southern Hemisphere. Combine adventure activities with wine regions and stunning landscapes.",
        activities: ["Adventure sports", "Wine tasting", "Hiking", "Maori culture"]
      }
    ]
  }
};

export default function MonthDetailPage() {
  const params = useParams();
  const monthName = params.month as string;
  const monthData = monthsDetailData[monthName];
  const { t } = useLanguage();

  if (!monthData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground mb-4">{t("monthDetail.monthNotFound")}</h1>
          <Link href="/">
            <Button>{t("monthDetail.returnHome")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const translatedName = t(`month.${monthName}.title`);
  const translatedHighlight = t(`month.${monthName}.highlight`);
  const translatedDesc = t(`month.${monthName}.desc`);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={monthData.image}
          alt={monthData.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="absolute top-6 left-6 z-10">
          <Link href="/#when-to-go">
            <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("monthDetail.back")}
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12"
        >
          <p className="font-display text-sm tracking-[0.3em] text-primary uppercase mb-2">
            {translatedHighlight}
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-4">
            {translatedName}
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl">
            {translatedDesc}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="flex items-center gap-4 p-4 bg-card rounded-md">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <p className="font-display text-xs tracking-wide text-muted-foreground uppercase">{t("monthDetail.bestTime")}</p>
              <p className="font-body text-foreground">{translatedName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-card rounded-md">
            <Sun className="w-8 h-8 text-primary" />
            <div>
              <p className="font-display text-xs tracking-wide text-muted-foreground uppercase">{t("monthDetail.weather")}</p>
              <p className="font-body text-foreground">{monthData.weather}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-card rounded-md">
            <Thermometer className="w-8 h-8 text-primary" />
            <div>
              <p className="font-display text-xs tracking-wide text-muted-foreground uppercase">{t("monthDetail.temperature")}</p>
              <p className="font-body text-foreground">{monthData.temperature}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
            {t("monthDetail.featuredDestinations")}
          </h2>
          
          <div className="space-y-12">
            {monthData.destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className={`relative aspect-[4/3] rounded-md overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <img loading="lazy" decoding="async"
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <p className="font-display text-sm tracking-wide text-primary uppercase">
                      {destination.name}
                    </p>
                  </div>
                  <p className="font-body text-lg text-muted-foreground mb-6">
                    {destination.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity) => (
                      <span
                        key={activity}
                        className="px-3 py-1 bg-card text-sm font-display text-foreground rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center p-12 bg-card rounded-md"
        >
          <h3 className="font-display font-bold text-2xl text-foreground mb-4">
            {t("monthDetail.readyToExplore")} {translatedName}?
          </h3>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("monthDetail.ctaDesc")}
          </p>
          <Link href="/#waitlist">
            <Button size="lg" className="font-display">
              {t("monthDetail.requestConsultation")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
