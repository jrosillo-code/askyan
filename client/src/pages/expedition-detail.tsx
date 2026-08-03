import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, Mountain, Users, Flame, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/shared-header";
import { MEDIA } from "@/lib/media";
const kazakhstanVideo = MEDIA["kazakhstan-web.mp4"];
const kyrgyzstanVideo = MEDIA["kyrgyzstan-web.mp4"];
const mongoliaVideo = MEDIA["mongolia-web.mp4"];
const nepalVideo = MEDIA["14862479-hd_1920_1080_60fps_1765009387935.mp4"];
const indonesiaVideo = MEDIA["12004059_1920_1080_30fps_1765009552268.mp4"];

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  accommodation: string;
  meals: string;
}

interface ExpeditionDetail {
  id: string;
  country: string;
  title: string;
  tagline: string;
  heroDescription: string;
  overview: string;
  duration: string;
  season: string;
  difficulty: string;
  category: string;
  groupSize: string;
  startingFrom: string;
  imageUrl?: string;
  videoUrl?: string;
  galleryImages: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  highlights: string[];
}

const expeditionDetails: Record<string, ExpeditionDetail> = {
  "kazakhstan-steppe": {
    id: "kazakhstan-steppe",
    country: "Kazakhstan",
    title: "The Steppe Awakening",
    tagline: "Where the horizon bends to meet the sky",
    heroDescription: "Traverse the endless golden steppe on horseback with nomadic guides whose ancestors rode these same paths for millennia.",
    overview: "This expedition takes you deep into the heart of Central Asia, where the vast Kazakh steppe stretches to the horizon in every direction. You'll ride with descendants of the great nomadic warriors, camp under star-filled skies, and witness landscapes that have remained unchanged for centuries. From the dramatic Charyn Canyon to the singing dunes of Altyn Emel, this journey reveals Kazakhstan's wild soul.",
    duration: "12 Days",
    season: "May - October",
    difficulty: "Moderate",
    category: "Horseback & Wilderness",
    groupSize: "4-8 travelers",
    startingFrom: "By application",
    videoUrl: kazakhstanVideo,
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Almaty",
        description: "Welcome to Kazakhstan. Transfer from the airport to your boutique hotel in Almaty's historic district. Evening briefing and traditional welcome dinner.",
        highlights: ["Airport transfer", "Equipment check", "Welcome dinner with local delicacies"],
        accommodation: "Boutique hotel in Almaty",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Almaty to Charyn Canyon",
        description: "Drive east through the Ili River valley to the spectacular Charyn Canyon. Often compared to the Grand Canyon, this 150-million-year-old formation reveals Earth's ancient history in layers of red rock.",
        highlights: ["Charyn Canyon exploration", "Valley of Castles hike", "Sunset photography"],
        accommodation: "Eco-lodge near canyon",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Into the Steppe",
        description: "Meet your nomadic guides and their horses at the edge of the steppe. Begin your journey into the endless grasslands, learning traditional riding techniques passed down through generations.",
        highlights: ["Horse selection ceremony", "First ride into the steppe", "Traditional yurt camp"],
        accommodation: "Traditional yurt camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 4,
        title: "The Golden Grasslands",
        description: "A full day riding through the steppe, following ancient migration routes used by nomads for millennia. Your guides share stories of their ancestors and the spirits believed to inhabit these lands.",
        highlights: ["Full day horseback journey", "Nomadic stories and legends", "Kumis (fermented mare's milk) tasting"],
        accommodation: "Mobile yurt camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 5,
        title: "Eagle Hunter's Valley",
        description: "Ride to a remote valley where a master berkutchi (eagle hunter) demonstrates this ancient tradition. Watch as golden eagles soar and return to their handler's glove.",
        highlights: ["Eagle hunting demonstration", "Meet the berkutchi family", "Traditional crafts workshop"],
        accommodation: "Guest yurt with local family",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 6,
        title: "The Singing Dunes",
        description: "Journey to Altyn Emel National Park and the famous Singing Dune. This 150-meter-high crescent of sand creates an otherworldly humming sound as wind passes over its surface.",
        highlights: ["Singing Dune climb", "Desert wildlife spotting", "Sunset over the dunes"],
        accommodation: "Desert camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 7,
        title: "Ancient Petroglyphs",
        description: "Explore Tamgaly, a UNESCO World Heritage Site with over 5,000 rock carvings dating back to the Bronze Age. These sacred images offer a window into the spiritual world of ancient steppe peoples.",
        highlights: ["Tamgaly petroglyph tour", "Archaeological expert guide", "Sacred ritual sites"],
        accommodation: "Guesthouse near Tamgaly",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 8,
        title: "Kolsai Lakes",
        description: "Drive to the stunning Kolsai Lakes, known as the 'Pearls of the Tien Shan.' Trek through alpine forests to the first and second lakes, their turquoise waters reflecting snow-capped peaks.",
        highlights: ["Lake trek", "Alpine meadow picnic", "Wildlife observation"],
        accommodation: "Mountain lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 9,
        title: "Kaindy Lake",
        description: "Visit the mysterious Kaindy Lake, where a submerged forest of spruce trees stands like sentinels in the emerald water. This surreal landscape was created by an earthquake over a century ago.",
        highlights: ["Kaindy Lake exploration", "Underwater forest viewing", "Photography session"],
        accommodation: "Mountain lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 10,
        title: "Return to the Steppe",
        description: "Final horseback journey across the steppe with your nomadic companions. A farewell ceremony under the vast sky celebrates the bonds formed during your journey.",
        highlights: ["Final ride", "Farewell ceremony", "Traditional music and dance"],
        accommodation: "Yurt camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 11,
        title: "Return to Almaty",
        description: "Return to Almaty with a deeper understanding of nomadic life. Afternoon free to explore the city's Green Bazaar and modern cafes. Farewell dinner at a renowned local restaurant.",
        highlights: ["Green Bazaar visit", "City exploration", "Farewell dinner"],
        accommodation: "Boutique hotel in Almaty",
        meals: "Breakfast, Dinner",
      },
      {
        day: 12,
        title: "Departure",
        description: "Transfer to the airport for your onward journey. Depart with memories of endless horizons, ancient traditions, and the spirit of the steppe.",
        highlights: ["Airport transfer", "Departure assistance"],
        accommodation: "N/A",
        meals: "Breakfast",
      },
    ],
    included: [
      "All accommodation as described",
      "All meals as indicated in the itinerary",
      "Expert local guides and translators",
      "All ground transportation",
      "Horse and equipment for riding days",
      "National park entrance fees",
      "Cultural experiences and demonstrations",
      "Emergency satellite communication",
      "Comprehensive travel insurance assistance",
    ],
    notIncluded: [
      "International flights",
      "Kazakhstan visa (if required)",
      "Personal travel insurance",
      "Alcoholic beverages",
      "Personal expenses and gratuities",
      "Optional activities not in itinerary",
    ],
    highlights: [
      "Ride with authentic nomadic guides",
      "Witness eagle hunting traditions",
      "Camp in traditional yurts",
      "Explore Charyn Canyon",
      "Climb the Singing Dunes",
      "Trek to emerald alpine lakes",
    ],
  },
  "kyrgyzstan-heights": {
    id: "kyrgyzstan-heights",
    country: "Kyrgyzstan",
    title: "The Celestial Mountains",
    tagline: "Sleep where eagles nest",
    heroDescription: "Trek through the Tien Shan mountains to Son-Kul Lake, where summer pastures turn to mirrors reflecting infinite sky.",
    overview: "The Celestial Mountains of Kyrgyzstan offer some of Central Asia's most dramatic landscapes. This expedition takes you into the heart of the Tien Shan, staying with semi-nomadic shepherds at Son-Kul Lake, learning eagle hunting from master berkutchis, and trekking through high alpine valleys. This is a journey into a way of life that has survived unchanged for centuries.",
    duration: "10 Days",
    season: "June - September",
    difficulty: "Challenging",
    category: "Trekking & Culture",
    groupSize: "4-6 travelers",
    startingFrom: "By application",
    videoUrl: kyrgyzstanVideo,
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bishkek",
        description: "Welcome to Kyrgyzstan. Transfer to your hotel and evening orientation. Walk through the city's tree-lined boulevards before a traditional Kyrgyz dinner.",
        highlights: ["Airport pickup", "City orientation walk", "Welcome dinner"],
        accommodation: "Hotel in Bishkek",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Bishkek to Kochkor",
        description: "Drive south through the spectacular Boom Gorge to Kochkor village. Visit a women's felt-making cooperative to learn the ancient art of shyrdak creation.",
        highlights: ["Boom Gorge drive", "Felt-making workshop", "Local family dinner"],
        accommodation: "Guesthouse in Kochkor",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Trek to Son-Kul Lake",
        description: "Begin the trek to Son-Kul Lake, one of the largest alpine lakes in the world. Cross high passes with panoramic views of the Tien Shan before descending to the lake.",
        highlights: ["Mountain trekking", "Pass crossing at 3,400m", "First views of Son-Kul"],
        accommodation: "Shepherd's yurt at Son-Kul",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 4,
        title: "Life at Son-Kul",
        description: "A day with the shepherds of Son-Kul. Help with daily tasks, learn to make fermented mare's milk, and ride across the summer pastures. The lake's surface mirrors the infinite sky.",
        highlights: ["Shepherd's daily life", "Horseback riding", "Traditional food preparation"],
        accommodation: "Shepherd's yurt at Son-Kul",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 5,
        title: "To Naryn Valley",
        description: "Trek down from Son-Kul through flower-filled meadows to the Naryn Valley. Transfer to the town of Naryn, gateway to the high mountains.",
        highlights: ["Descent trek", "Alpine meadow flora", "Naryn town exploration"],
        accommodation: "Guesthouse in Naryn",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 6,
        title: "Eagle Hunter's Village",
        description: "Journey to a remote village where a master eagle hunter teaches his ancient art. Spend the day learning about the bond between hunter and eagle.",
        highlights: ["Eagle hunting demonstration", "Training techniques", "Hunting history"],
        accommodation: "Eagle hunter's home",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 7,
        title: "Tash Rabat Caravanserai",
        description: "Drive to Tash Rabat, a mysterious 15th-century stone caravanserai on the ancient Silk Road. Explore its dark chambers and camp nearby.",
        highlights: ["Silk Road history", "Caravanserai exploration", "Stargazing"],
        accommodation: "Yurt camp at Tash Rabat",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 8,
        title: "High Pasture Trek",
        description: "Trek to remote summer pastures where shepherds graze their flocks. Cross into valleys rarely visited by outsiders, with views toward the Chinese border.",
        highlights: ["Remote valley trek", "Shepherd encounters", "Mountain photography"],
        accommodation: "Wild camping",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 9,
        title: "Return to Bishkek",
        description: "Drive back to Bishkek through varied landscapes. Stop at Burana Tower, remnant of an ancient Silk Road city. Farewell dinner celebrating your journey.",
        highlights: ["Burana Tower visit", "Scenic drive", "Farewell dinner"],
        accommodation: "Hotel in Bishkek",
        meals: "Breakfast, Dinner",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to the airport for your onward journey. Carry with you the spirit of the celestial mountains and their resilient people.",
        highlights: ["Airport transfer"],
        accommodation: "N/A",
        meals: "Breakfast",
      },
    ],
    included: [
      "All accommodation as described",
      "All meals as indicated",
      "Experienced mountain guides",
      "All ground transportation",
      "Horses for riding days",
      "Camping equipment",
      "Cultural experiences",
      "Emergency support",
    ],
    notIncluded: [
      "International flights",
      "Personal travel insurance",
      "Visa fees",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips for guides",
    ],
    highlights: [
      "Trek to Son-Kul alpine lake",
      "Stay with nomadic shepherds",
      "Learn eagle hunting traditions",
      "Explore Silk Road caravanserai",
      "Cross high mountain passes",
      "Experience authentic yurt life",
    ],
  },
  "mongolia-gobi": {
    id: "mongolia-gobi",
    country: "Mongolia",
    title: "The Gobi Crossing",
    tagline: "Where silence becomes the loudest sound",
    heroDescription: "Journey deep into the Gobi Desert with camel caravans and nomadic families.",
    overview: "The Gobi Desert is not just a landscape—it's a state of mind. This expedition takes you into one of Earth's last great wildernesses, traveling with camel caravans and staying with nomadic families in their traditional gers. From the Flaming Cliffs to the singing sands of Khongoryn Els, you'll experience Mongolia at its most raw and revelatory.",
    duration: "14 Days",
    season: "April - October",
    difficulty: "Moderate",
    category: "Desert & Nomadic",
    groupSize: "4-8 travelers",
    startingFrom: "By application",
    videoUrl: mongoliaVideo,
    galleryImages: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Ulaanbaatar", description: "Welcome to Mongolia. Transfer to hotel and evening briefing on the journey ahead.", highlights: ["Airport transfer", "Equipment check", "Welcome dinner"], accommodation: "Hotel in Ulaanbaatar", meals: "Dinner" },
      { day: 2, title: "Flight to the Gobi", description: "Morning flight to Dalanzadgad, gateway to the Gobi. Drive into the desert to your first ger camp.", highlights: ["Scenic flight", "First Gobi views", "Ger camp orientation"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 3, title: "Yol Valley", description: "Explore the dramatic Yol Valley, a narrow gorge where ice persists even in summer. Look for wild argali sheep and lammergeiers.", highlights: ["Yol Valley hike", "Wildlife spotting", "Ice gorge"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 4, title: "Khongoryn Els", description: "Journey to the singing sands of Khongoryn Els, some of the largest dunes in Mongolia.", highlights: ["Dune exploration", "Sunset climb", "Star gazing"], accommodation: "Ger camp near dunes", meals: "Breakfast, Lunch, Dinner" },
      { day: 5, title: "Camel Caravan", description: "Join a traditional camel caravan for a journey through the desert. Your Bactrian camels carry supplies as you walk alongside.", highlights: ["Camel training", "Desert crossing", "Nomad stories"], accommodation: "Mobile camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 6, title: "Nomad Family", description: "Stay with a nomadic herder family. Help with daily tasks and learn about life in the Gobi.", highlights: ["Herder daily life", "Milking demonstration", "Traditional cooking"], accommodation: "Family ger", meals: "Breakfast, Lunch, Dinner" },
      { day: 7, title: "Flaming Cliffs", description: "Visit Bayanzag, the Flaming Cliffs where Roy Chapman Andrews discovered dinosaur eggs in the 1920s.", highlights: ["Paleontology site", "Sunset colors", "Fossil hunting"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 8, title: "White Stupa", description: "Explore the White Stupa rock formations and search for the rare Gobi bear.", highlights: ["Rock formations", "Wildlife search", "Photography"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 9, title: "Ongi Monastery", description: "Drive to the ruins of Ongi Monastery, once one of Mongolia's largest Buddhist centers.", highlights: ["Monastery ruins", "Buddhist history", "River valley"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 10, title: "Central Steppes", description: "Leave the Gobi and enter the central steppes. Visit nomad families along the way.", highlights: ["Landscape transition", "Nomad visits", "Horseback riding"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 11, title: "Karakorum", description: "Visit Karakorum, the ancient capital of Genghis Khan's empire, and Erdene Zuu monastery.", highlights: ["Mongol Empire history", "Monastery tour", "Museum visit"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 12, title: "Orkhon Valley", description: "Explore the Orkhon Valley, a UNESCO World Heritage site of extraordinary natural beauty.", highlights: ["Orkhon Waterfall", "Valley trek", "Hot springs"], accommodation: "Ger camp", meals: "Breakfast, Lunch, Dinner" },
      { day: 13, title: "Return to Ulaanbaatar", description: "Drive back to the capital through rolling hills. Farewell dinner celebrating your Gobi crossing.", highlights: ["Scenic drive", "City arrival", "Farewell dinner"], accommodation: "Hotel in Ulaanbaatar", meals: "Breakfast, Dinner" },
      { day: 14, title: "Departure", description: "Transfer to the airport. Depart with the silence of the Gobi etched in your memory.", highlights: ["Airport transfer"], accommodation: "N/A", meals: "Breakfast" },
    ],
    included: ["All accommodation", "All meals as indicated", "Domestic flight", "4WD vehicles", "Camels for caravan", "Expert guides", "National park fees", "Emergency support"],
    notIncluded: ["International flights", "Travel insurance", "Visa", "Alcoholic beverages", "Personal expenses", "Tips"],
    highlights: ["Cross the Gobi by camel caravan", "Stay with nomadic families", "Climb singing sand dunes", "Visit dinosaur fossil sites", "Sleep in traditional gers", "Explore ancient Karakorum"],
  },
  "nepal-mustang": {
    id: "nepal-mustang",
    country: "Nepal",
    title: "The Forbidden Kingdom",
    tagline: "Beyond the Himalayan veil",
    heroDescription: "Enter Upper Mustang, the last forbidden kingdom, where Tibetan culture survives in ancient monasteries and cave cities.",
    overview: "Until 1992, Upper Mustang was closed to the outside world. This expedition takes you into this remote Himalayan kingdom, trekking through lunar landscapes of red and ochre to the ancient walled city of Lo Manthang. You'll explore cave monasteries adorned with centuries-old paintings, stay in traditional Tibetan homes, and witness a culture that has survived virtually unchanged since medieval times.",
    duration: "16 Days",
    season: "March - November",
    difficulty: "Challenging",
    category: "Trekking & Sacred Sites",
    groupSize: "4-8 travelers",
    startingFrom: "By application",
    videoUrl: nepalVideo,
    galleryImages: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Welcome to Nepal. Transfer to your heritage hotel in the old city. Evening briefing and welcome dinner.", highlights: ["Airport transfer", "Heritage hotel", "Welcome dinner"], accommodation: "Heritage hotel", meals: "Dinner" },
      { day: 2, title: "Kathmandu Exploration", description: "Visit the sacred sites of Kathmandu Valley—Boudhanath, Pashupatinath, and Patan Durbar Square.", highlights: ["Boudhanath Stupa", "Pashupatinath Temple", "Patan Durbar Square"], accommodation: "Heritage hotel", meals: "Breakfast" },
      { day: 3, title: "Flight to Pokhara", description: "Morning flight to Pokhara with views of the Himalayan range. Afternoon free to explore this lakeside town.", highlights: ["Himalayan flight", "Phewa Lake", "Free exploration"], accommodation: "Lakeside hotel", meals: "Breakfast" },
      { day: 4, title: "Flight to Jomsom", description: "Spectacular mountain flight to Jomsom. Begin trek to Kagbeni, gateway to Upper Mustang.", highlights: ["Mountain flight", "Trek begins", "Kagbeni arrival"], accommodation: "Lodge in Kagbeni", meals: "Breakfast, Lunch, Dinner" },
      { day: 5, title: "Kagbeni to Chele", description: "Enter the restricted zone of Upper Mustang. Trek along the Kali Gandaki gorge to Chele.", highlights: ["Permit check", "Gorge trekking", "Red cliff villages"], accommodation: "Lodge in Chele", meals: "Breakfast, Lunch, Dinner" },
      { day: 6, title: "Chele to Syangboche", description: "Cross two high passes with stunning views. Descend to the village of Syangboche.", highlights: ["Pass crossings", "Panoramic views", "Traditional village"], accommodation: "Lodge in Syangboche", meals: "Breakfast, Lunch, Dinner" },
      { day: 7, title: "Syangboche to Ghami", description: "Trek through eroded canyons and lunar landscapes to the village of Ghami, Upper Mustang's second largest.", highlights: ["Canyon landscapes", "Mani walls", "Ghami exploration"], accommodation: "Lodge in Ghami", meals: "Breakfast, Lunch, Dinner" },
      { day: 8, title: "Ghami to Tsarang", description: "Visit the ancient monastery of Ghami before continuing to Tsarang with its impressive dzong fortress.", highlights: ["Ghami monastery", "Tsarang dzong", "Cave dwellings"], accommodation: "Lodge in Tsarang", meals: "Breakfast, Lunch, Dinner" },
      { day: 9, title: "Tsarang to Lo Manthang", description: "Cross the final pass to the walled city of Lo Manthang, capital of the former Kingdom of Lo.", highlights: ["High pass", "First view of Lo", "Walled city entry"], accommodation: "Traditional house in Lo Manthang", meals: "Breakfast, Lunch, Dinner" },
      { day: 10, title: "Lo Manthang Exploration", description: "Full day exploring Lo Manthang—the royal palace, ancient monasteries, and sacred caves.", highlights: ["Royal palace", "Thubchen Gompa", "Champa Lakhang"], accommodation: "Traditional house in Lo Manthang", meals: "Breakfast, Lunch, Dinner" },
      { day: 11, title: "Cave Monasteries", description: "Day trip to the cliff-side caves of Choser, adorned with ancient Buddhist paintings.", highlights: ["Jhong Cave", "Ancient paintings", "Skylight caves"], accommodation: "Traditional house in Lo Manthang", meals: "Breakfast, Lunch, Dinner" },
      { day: 12, title: "Begin Return Trek", description: "Bid farewell to Lo Manthang and begin the return journey via an alternate route.", highlights: ["Alternate route", "New perspectives", "Ghar Gompa"], accommodation: "Lodge in Drakmar", meals: "Breakfast, Lunch, Dinner" },
      { day: 13, title: "Drakmar to Samar", description: "Trek through the red cliffs of Drakmar to the village of Samar.", highlights: ["Red cliffs", "Meditation caves", "Village life"], accommodation: "Lodge in Samar", meals: "Breakfast, Lunch, Dinner" },
      { day: 14, title: "Samar to Jomsom", description: "Complete the trek back to Jomsom through the Kali Gandaki gorge.", highlights: ["Gorge views", "Trek completion", "Celebration dinner"], accommodation: "Lodge in Jomsom", meals: "Breakfast, Lunch, Dinner" },
      { day: 15, title: "Return to Kathmandu", description: "Fly from Jomsom to Pokhara, then connect to Kathmandu. Farewell dinner in the old city.", highlights: ["Mountain flights", "Return to city", "Farewell dinner"], accommodation: "Heritage hotel", meals: "Breakfast, Dinner" },
      { day: 16, title: "Departure", description: "Transfer to the airport for your onward journey. Carry the spirit of the forbidden kingdom with you.", highlights: ["Airport transfer"], accommodation: "N/A", meals: "Breakfast" },
    ],
    included: ["All accommodation", "All meals as indicated", "Domestic flights", "Upper Mustang permit", "TIMS card", "Expert guides and porters", "Emergency evacuation insurance"],
    notIncluded: ["International flights", "Nepal visa", "Personal travel insurance", "Alcoholic beverages", "Personal expenses", "Tips"],
    highlights: ["Trek to the walled city of Lo Manthang", "Explore ancient cave monasteries", "Witness preserved Tibetan culture", "Cross high Himalayan passes", "Stay in traditional homes", "Experience lunar landscapes"],
  },
  "bhutan-sacred": {
    id: "bhutan-sacred",
    country: "Bhutan",
    title: "The Thunder Dragon Path",
    tagline: "Where happiness is measured differently",
    heroDescription: "Walk the sacred trails of the Thunder Dragon Kingdom with monks and local guides.",
    overview: "Bhutan remains one of the world's most mysterious and unspoiled kingdoms. This expedition combines sacred treks with deep cultural immersion, from the iconic Tiger's Nest to remote monasteries where silence has been kept for centuries. You'll hike through rhododendron forests, attend teachings with Buddhist lamas, and experience a land where spirituality permeates every valley.",
    duration: "11 Days",
    season: "March - May, Sept - Nov",
    difficulty: "Moderate",
    category: "Sacred & Spiritual",
    groupSize: "4-8 travelers",
    startingFrom: "By application",
    imageUrl: "https://images.unsplash.com/photo-1553856622-d1b352e9a211?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Paro", description: "Fly into Paro through the Himalayan peaks. Transfer to your riverside resort. Evening blessing ceremony.", highlights: ["Himalayan flight", "Paro valley views", "Blessing ceremony"], accommodation: "Riverside resort", meals: "Dinner" },
      { day: 2, title: "Tiger's Nest", description: "Hike to Paro Taktsang, the sacred Tiger's Nest monastery clinging to a 3,000-foot cliff.", highlights: ["Tiger's Nest hike", "Monastery visit", "Clifftop meditation"], accommodation: "Riverside resort", meals: "Breakfast, Lunch, Dinner" },
      { day: 3, title: "Paro to Thimphu", description: "Drive to Thimphu, the world's only capital without traffic lights. Visit the Memorial Chorten and Buddha Dordenma.", highlights: ["Capital exploration", "Giant Buddha", "Traditional paper making"], accommodation: "Hotel in Thimphu", meals: "Breakfast, Lunch, Dinner" },
      { day: 4, title: "Thimphu Exploration", description: "Full day in Thimphu. Visit the folk heritage museum, textile museum, and participate in an archery match.", highlights: ["Museums", "Archery experience", "Evening prayers"], accommodation: "Hotel in Thimphu", meals: "Breakfast, Lunch, Dinner" },
      { day: 5, title: "Dochula Pass", description: "Cross Dochula Pass with views of the Himalayan range. Visit the 108 chortens and continue to Punakha.", highlights: ["108 chortens", "Himalayan panorama", "Punakha valley"], accommodation: "Resort in Punakha", meals: "Breakfast, Lunch, Dinner" },
      { day: 6, title: "Punakha Dzong", description: "Explore Punakha Dzong, perhaps Bhutan's most beautiful fortress-monastery. Hike to Chimi Lhakhang, the fertility temple.", highlights: ["Punakha Dzong", "Chimi Lhakhang trek", "Rice paddy walk"], accommodation: "Resort in Punakha", meals: "Breakfast, Lunch, Dinner" },
      { day: 7, title: "Trek to Khamsum", description: "Day trek through villages and forest to Khamsum Yulley Namgyal Chorten, a stunning hilltop temple.", highlights: ["Village trekking", "Temple visit", "Valley views"], accommodation: "Resort in Punakha", meals: "Breakfast, Lunch, Dinner" },
      { day: 8, title: "Gangtey Valley", description: "Drive to Gangtey, home to the black-necked cranes in winter. Stay in a traditional farmhouse.", highlights: ["Phobjikha valley", "Gangtey Gompa", "Farmhouse stay"], accommodation: "Farmhouse in Gangtey", meals: "Breakfast, Lunch, Dinner" },
      { day: 9, title: "Gangtey Nature Trails", description: "Explore the valley's nature trails. Visit the crane center and enjoy a picnic in the meadows.", highlights: ["Nature trails", "Crane center", "Valley meditation"], accommodation: "Farmhouse in Gangtey", meals: "Breakfast, Lunch, Dinner" },
      { day: 10, title: "Return to Paro", description: "Drive back to Paro. Evening hot stone bath and farewell dinner celebrating your journey.", highlights: ["Scenic drive", "Hot stone bath", "Farewell dinner"], accommodation: "Riverside resort", meals: "Breakfast, Dinner" },
      { day: 11, title: "Departure", description: "Morning at leisure before your flight out through the Himalayas. Carry the Thunder Dragon's blessings with you.", highlights: ["Final views", "Departure flight"], accommodation: "N/A", meals: "Breakfast" },
    ],
    included: ["All accommodation", "All meals as indicated", "Sustainable Development Fee", "Expert guides", "All ground transport", "Monument entry fees", "Cultural experiences"],
    notIncluded: ["International flights", "Bhutan visa fee", "Personal travel insurance", "Alcoholic beverages", "Personal expenses", "Tips"],
    highlights: ["Hike to Tiger's Nest monastery", "Explore ancient dzong fortresses", "Cross high mountain passes", "Stay in traditional farmhouse", "Witness Buddhist ceremonies", "Experience Gross National Happiness"],
  },
  "indonesia-flores": {
    id: "indonesia-flores",
    country: "Indonesia",
    title: "The Ring of Fire",
    tagline: "Where the earth still breathes",
    heroDescription: "Sail through the Indonesian archipelago from Flores to Komodo, diving volcanic reefs and walking among dragons.",
    overview: "This maritime expedition takes you through the volcanic heart of the Indonesian archipelago. From the tri-colored lakes of Kelimutu to the dragons of Komodo, from pristine coral reefs to ancient villages on Sumba, this is Indonesia at its most wild and untouched. Travel by traditional wooden sailing boat, camp on uninhabited islands, and witness the raw power of the Ring of Fire.",
    duration: "13 Days",
    season: "April - November",
    difficulty: "Moderate",
    category: "Marine & Volcanic",
    groupSize: "6-10 travelers",
    startingFrom: "By application",
    videoUrl: indonesiaVideo,
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Labuan Bajo", description: "Fly into Flores and transfer to your waterfront hotel. Evening sunset drinks overlooking the bay.", highlights: ["Flores arrival", "Harbor views", "Welcome dinner"], accommodation: "Waterfront hotel", meals: "Dinner" },
      { day: 2, title: "Komodo Dragons", description: "Sail to Komodo National Park. Trek through the island searching for Komodo dragons in their natural habitat.", highlights: ["Dragon trekking", "Wildlife observation", "Ranger-guided tour"], accommodation: "Traditional sailing boat", meals: "Breakfast, Lunch, Dinner" },
      { day: 3, title: "Rinca Island", description: "Visit Rinca for more dragon encounters. Snorkel pristine reefs in the afternoon.", highlights: ["Rinca dragons", "Coral snorkeling", "Island exploration"], accommodation: "Traditional sailing boat", meals: "Breakfast, Lunch, Dinner" },
      { day: 4, title: "Pink Beach", description: "Spend the day at Pink Beach, one of only seven pink sand beaches in the world. Snorkel vibrant coral gardens.", highlights: ["Pink sand", "Coral snorkeling", "Beach relaxation"], accommodation: "Traditional sailing boat", meals: "Breakfast, Lunch, Dinner" },
      { day: 5, title: "Manta Point", description: "Early morning dive with manta rays at the famous Manta Point. Sail to remote islands in the afternoon.", highlights: ["Manta encounter", "Diving/snorkeling", "Remote islands"], accommodation: "Traditional sailing boat", meals: "Breakfast, Lunch, Dinner" },
      { day: 6, title: "Return to Flores", description: "Sail back to Flores. Drive into the highlands to the traditional village of Bena.", highlights: ["Highland drive", "Bena village", "Traditional houses"], accommodation: "Guesthouse in Bajawa", meals: "Breakfast, Lunch, Dinner" },
      { day: 7, title: "Kelimutu Lakes", description: "Drive to Kelimutu volcano. Pre-dawn hike to watch sunrise over the three colored lakes.", highlights: ["Pre-dawn hike", "Tri-colored lakes", "Volcanic landscape"], accommodation: "Eco-lodge at Kelimutu", meals: "Breakfast, Lunch, Dinner" },
      { day: 8, title: "Traditional Villages", description: "Explore traditional Ngada villages with megalithic structures and ancestral shrines.", highlights: ["Village visits", "Cultural immersion", "Local crafts"], accommodation: "Guesthouse", meals: "Breakfast, Lunch, Dinner" },
      { day: 9, title: "Flight to Sumba", description: "Fly to Sumba, the wild island of Indonesia. Visit the hilltop village of Ratenggaro.", highlights: ["Sumba arrival", "Ratenggaro village", "Megalithic tombs"], accommodation: "Beach resort", meals: "Breakfast, Lunch, Dinner" },
      { day: 10, title: "Sumba Exploration", description: "Full day exploring Sumba's traditional villages, ikat weaving centers, and stunning beaches.", highlights: ["Ikat weaving", "Village culture", "Beach time"], accommodation: "Beach resort", meals: "Breakfast, Lunch, Dinner" },
      { day: 11, title: "Weekuri Lagoon", description: "Visit the stunning turquoise waters of Weekuri Lagoon and explore more remote villages.", highlights: ["Weekuri swimming", "Remote villages", "Cultural encounters"], accommodation: "Beach resort", meals: "Breakfast, Lunch, Dinner" },
      { day: 12, title: "Return to Flores", description: "Fly back to Flores. Farewell dinner overlooking the bay as the sun sets over the Komodo islands.", highlights: ["Return flight", "Free time", "Farewell dinner"], accommodation: "Waterfront hotel", meals: "Breakfast, Dinner" },
      { day: 13, title: "Departure", description: "Transfer to the airport for your onward journey. Carry the fire of the archipelago with you.", highlights: ["Airport transfer"], accommodation: "N/A", meals: "Breakfast" },
    ],
    included: ["All accommodation", "All meals as indicated", "Traditional sailing boat", "Domestic flights", "Komodo park fees", "Snorkeling equipment", "Expert guides", "All ground transport"],
    notIncluded: ["International flights", "Travel insurance", "Visa", "Scuba diving (available)", "Alcoholic beverages", "Personal expenses", "Tips"],
    highlights: ["Walk among Komodo dragons", "Dive with manta rays", "Watch sunrise at Kelimutu", "Sail on traditional boat", "Explore ancient villages", "Discover pink sand beaches"],
  },
};

function ItineraryDay({ day, isLast }: { day: ItineraryDay; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-8"
      data-testid={`itinerary-day-${day.day}`}
    >
      <div className="absolute left-0 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
        <span className="font-display text-xs font-bold text-primary-foreground" data-testid={`text-day-number-${day.day}`}>{day.day}</span>
      </div>
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
      )}
      
      <div className="ml-4">
        <h4 className="font-display font-bold text-lg text-foreground mb-2" data-testid={`text-day-title-${day.day}`}>
          {day.title}
        </h4>
        <p className="font-body text-muted-foreground leading-relaxed mb-4" data-testid={`text-day-description-${day.day}`}>
          {day.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {day.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary" className="font-display text-xs" data-testid={`badge-day-${day.day}-highlight-${index}`}>
              {highlight}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1" data-testid={`text-day-${day.day}-accommodation`}>
            <MapPin className="w-4 h-4" />
            <span className="font-display">{day.accommodation}</span>
          </div>
          <div className="flex items-center gap-1" data-testid={`text-day-${day.day}-meals`}>
            <Flame className="w-4 h-4" />
            <span className="font-display">{day.meals}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExpeditionDetail() {
  const { id } = useParams<{ id: string }>();
  const expedition = id ? expeditionDetails[id] : null;

  if (!expedition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Expedition Not Found</h1>
          <Link href="/expeditions">
            <Button data-testid="button-back-to-expeditions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Expeditions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" activePage="expeditions" />

      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {expedition.videoUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src={expedition.videoUrl}
              className="w-full h-full object-cover"
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
              alt={expedition.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-32"
        >
          <Link
            href="/expeditions"
            className="inline-flex items-center gap-2 font-display text-sm text-white/70 hover:text-white transition-colors mb-6"
            data-testid="link-back-to-expeditions"
          >
            <ArrowLeft className="w-4 h-4" />
            All Expeditions
          </Link>

          <Badge className="font-display tracking-wide mb-4" data-testid="badge-country">
            {expedition.country}
          </Badge>

          <h1
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight"
            data-testid="text-expedition-title"
          >
            {expedition.title}
          </h1>

          <p
            className="font-body text-xl md:text-2xl text-white/80 italic max-w-2xl mb-8"
            data-testid="text-expedition-tagline"
          >
            {expedition.tagline}
          </p>

          <div className="flex flex-wrap gap-6 text-white/90" data-testid="hero-metadata">
            <div className="flex items-center gap-2" data-testid="text-duration">
              <Calendar className="w-5 h-5" />
              <span className="font-display">{expedition.duration}</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-season">
              <Clock className="w-5 h-5" />
              <span className="font-display">{expedition.season}</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-difficulty">
              <Mountain className="w-5 h-5" />
              <span className="font-display">{expedition.difficulty}</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-group-size">
              <Users className="w-5 h-5" />
              <span className="font-display">{expedition.groupSize}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-6" data-testid="heading-journey">
                  The Journey
                </h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8" data-testid="text-overview">
                  {expedition.overview}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {expedition.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                      data-testid={`highlight-${index}`}
                    >
                      <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-body text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-4 mb-12" data-testid="gallery-section">
                {expedition.galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="aspect-square overflow-hidden rounded-md"
                    data-testid={`img-gallery-${index}`}
                  >
                    <img loading="lazy" decoding="async"
                      src={image}
                      alt={`${expedition.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" data-testid="heading-itinerary">
                  Day by Day Itinerary
                </h2>
                <div>
                  {expedition.itinerary.map((day, index) => (
                    <ItineraryDay
                      key={day.day}
                      day={day}
                      isLast={index === expedition.itinerary.length - 1}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="p-6 bg-card border-border" data-testid="card-pricing">
                  <div className="mb-6">
                    <span className="font-display text-sm text-muted-foreground uppercase tracking-wide">
                      Pricing
                    </span>
                    <div className="font-display text-3xl font-bold text-foreground">
                      {expedition.startingFrom}
                    </div>
                    <span className="font-body text-sm text-muted-foreground">Details shared with accepted applicants</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-display text-foreground">{expedition.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-display text-foreground">{expedition.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mountain className="w-4 h-4 text-muted-foreground" />
                      <span className="font-display text-foreground">{expedition.difficulty}</span>
                    </div>
                  </div>

                  <Link href="/#waitlist" data-testid="link-inquire-cta">
                    <Button className="w-full font-display tracking-wide" size="lg" data-testid="button-inquire-cta">
                      Inquire About This Journey
                    </Button>
                  </Link>
                </Card>

                <Card className="p-6 bg-card border-border" data-testid="card-included">
                  <h3 className="font-display font-bold text-lg mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {expedition.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-body text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 bg-card border-border" data-testid="card-not-included">
                  <h3 className="font-display font-bold text-lg mb-4">Not Included</h3>
                  <ul className="space-y-2">
                    {expedition.notIncluded.map((item, index) => (
                      <li key={index} className="font-body text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
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
            Ready to Begin?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our founding circle for priority access to this expedition and others being planned.
          </p>
          <Link href="/#waitlist" data-testid="link-join-founding">
            <Button size="lg" className="font-display tracking-wide" data-testid="button-join-founding">
              Join The Founding Circle
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-border" data-testid="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-display text-sm text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} ASKYAN EXPEDITIONS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
