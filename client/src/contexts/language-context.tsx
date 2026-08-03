import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.expeditions": "Expeditions",
    "nav.films": "Films",
    "nav.whenToGo": "When to Go",
    "nav.chronicles": "Chronicles",
    "nav.about": "About",
    "nav.requestAccess": "Request Access",
    
    // Hero Section
    "hero.subtitle": "A Private Media Collective",
    "hero.title": "Where the Map Ends.",
    "hero.description": "An invitation to the unseen world.",
    "hero.featuredIn": "First Expeditions",
    
    // Featured Titles
    "featured.title": "Featured Journeys",
    "featured.films": "Featured Films",
    "featured.stories": "Featured Stories",
    "featured.locations": "Featured Locations",
    
    // Spotlight
    "spotlight.subtitle": "Adventure Spotlight",
    "spotlight.title": "Featured Expeditions",
    "spotlight.viewAll": "View All Expeditions",
    
    // Impact Section
    "impact.subtitle": "Our Commitment",
    "impact.title": "Positive Impact Travel",
    "impact.conservation.title": "Conservation First",
    "impact.conservation.desc": "We partner with conservation organizations to protect the wild places we visit.",
    "impact.community.title": "Community Support",
    "impact.community.desc": "Every journey contributes directly to local communities and cultural preservation.",
    "impact.sustainable.title": "Sustainable Practices",
    "impact.sustainable.desc": "We minimize our footprint through responsible travel practices and carbon offsetting.",
    "impact.learnMore": "Learn More",
    
    // Seasonal Guide
    "seasonal.subtitle": "Seasonal Guide",
    "seasonal.kicker": "The Calendar",
    "seasonal.title": "When To Go",
    "seasonal.description": "Every month offers unique experiences. Our travel experts have curated the perfect destinations for each season.",
    
    // Adventure Section
    "adventure.subtitle": "Our Areas of Expertise",
    "adventure.kicker": "In the Field",
    "adventure.title": "What Does Adventure Mean To You?",
    "adventure.description": "From remote mountain peaks to untouched coastlines, we design journeys that push boundaries while maintaining the highest standards of luxury and safety.",
    "adventure.cta": "Find Your Adventure",
    
    // Founders
    "founders.kicker": "The Founders",
    "founders.title": "The Command Structure",
    "founders.subtitle": "Meet The Team",
    "founders.headline": "The Founders",
    
    // Waitlist
    "waitlist.subtitle": "The Founding Cohort",
    "waitlist.title": "Ask to Be Considered",
    "waitlist.description": "The first journeys will be small, slow, and unrepeatable. Leave your email and we will write back personally.",
    "waitlist.placeholder": "Enter your email",
    "waitlist.button": "Request Access",
    "waitlist.success": "Received. A founder will write to you personally.",
    
    // Footer
    "footer.rights": "All Rights Reserved",
    
    // Contact
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    
    // Search
    "search.placeholder": "Search expeditions, destinations, stories...",
    "search.noResults": "No results found",
    "search.categories.expeditions": "Expeditions",
    "search.categories.destinations": "Destinations",
    "search.categories.stories": "Stories",
    
    // Why Askyan
    "why.subtitle": "The Askyan Difference",
    "why.title": "Why Choose Us",
    "why.expertise": "Expert Knowledge",
    "why.expertise.desc": "Our team has deep, first-hand knowledge of every destination we offer, ensuring authentic and immersive experiences.",
    "why.bespoke": "Bespoke Journeys",
    "why.bespoke.desc": "Every expedition is tailored to your interests, pace, and style. No two journeys are ever the same.",
    "why.network": "Trusted Network",
    "why.network.desc": "We've cultivated relationships with the finest local guides, accommodations, and cultural custodians worldwide.",
    "why.support": "24/7 Support",
    "why.support.desc": "From planning to return, our team is available around the clock to ensure seamless experiences.",
    
    // Months
    "months.january": "January",
    "months.february": "February",
    "months.march": "March",
    "months.april": "April",
    "months.may": "May",
    "months.june": "June",
    "months.july": "July",
    "months.august": "August",
    "months.september": "September",
    "months.october": "October",
    "months.november": "November",
    "months.december": "December",
    
    // Philosophy
    "philosophy.subtitle": "Our Philosophy",
    "philosophy.protocol": "The Cultural Scribe Protocol",
    "philosophy.statement": "We are not a travel agency. We are a private media collective that grants access to the unseen world.",
    "philosophy.mission": "Our mission is to provide more than a journey; we provide an education in the art of seeing. We connect intellectually curious individuals with the authentic stories and cultures that exist beyond the reach of conventional travel.",
    
    // Destinations
    "destinations.subtitle": "Territories",
    "destinations.title": "Where We Take You",
    "destinations.description": "Each expedition unlocks access to places most travelers will never see.",
    "destinations.explore": "Explore",
    
    // Destination Cards
    "destinations.highPeaks.name": "The High Peaks",
    "destinations.highPeaks.region": "Patagonia & Himalayas",
    "destinations.highPeaks.desc": "Where thin air meets thick stories",
    "destinations.goldenSands.name": "The Golden Sands",
    "destinations.goldenSands.region": "Sahara & Arabian Desert",
    "destinations.goldenSands.desc": "Ancient routes through endless dunes",
    "destinations.hiddenShores.name": "The Hidden Shores",
    "destinations.hiddenShores.region": "Pacific Islands",
    "destinations.hiddenShores.desc": "Uncharted waters and pristine reefs",
    "destinations.greenVeil.name": "The Green Veil",
    "destinations.greenVeil.region": "Amazon & Borneo",
    "destinations.greenVeil.desc": "Into the heart of the living earth",
    
    // Expeditions Page
    "expeditions.headline": "Expeditions That Transform",
    "expeditions.subtitle": "Six journeys in development across Central Asia and the Himalayas — small parties, local Scribes, no scripts. This is where the collective begins.",
    "expeditions.heroSubtitle": "We don't sell vacations. We architect journeys that fundamentally alter how you experience the world — and yourself.",
    "expeditions.duration": "Duration",
    "expeditions.season": "Season",
    "expeditions.difficulty": "Difficulty",
    "expeditions.exploreJourney": "Explore Journey",
    "expeditions.categories.subtitle": "Expedition Types",
    "expeditions.categories.title": "Ways to Journey",
    "expeditions.currentTitle": "Current Expeditions",
    "expeditions.currentDesc": "Each journey is designed around authentic access — local guides who carry generations of knowledge, routes that exist on no tourist map, and experiences that reveal the soul of a place.",
    "expeditions.ctaTitle": "The First Expeditions Are Being Planned Now",
    "expeditions.ctaDesc": "Join our founding circle for priority access, expedition updates, and the chance to shape where we explore next.",
    "expeditions.joinCircle": "Join The Founding Circle",
    "expeditions.cta.title": "Ready to Transform?",
    "expeditions.cta.desc": "Join our founding cohort and experience travel as it was meant to be.",
    
    // Expedition Categories
    "expeditions.category.highAltitude": "High Altitude",
    "expeditions.category.highAltitude.desc": "Mountain crossings and alpine wilderness",
    "expeditions.category.nomadic": "Nomadic Routes",
    "expeditions.category.nomadic.desc": "Follow ancient trade paths with local guides",
    "expeditions.category.desert": "Desert Crossings",
    "expeditions.category.desert.desc": "Vast expanses of silence and sand",
    "expeditions.category.transformative": "Transformative",
    "expeditions.category.transformative.desc": "Journeys that change how you see",
    
    // Expedition Details
    "expedition.kazakhstan.title": "The Steppe Awakening",
    "expedition.kazakhstan.tagline": "Where the horizon bends to meet the sky",
    "expedition.kazakhstan.desc": "Traverse the endless golden steppe on horseback with nomadic guides whose ancestors rode these same paths for millennia. From Charyn Canyon's ancient walls to the singing dunes of Altyn Emel, this is a journey into the heart of Central Asian wilderness.",
    "expedition.kazakhstan.category": "Horseback & Wilderness",
    
    "expedition.kyrgyzstan.title": "The Celestial Mountains",
    "expedition.kyrgyzstan.tagline": "Sleep where eagles nest",
    "expedition.kyrgyzstan.desc": "Trek through the Tien Shan mountains to Son-Kul Lake, where summer pastures turn to mirrors reflecting infinite sky. Stay in yurt camps with shepherds who read the weather in the wind, and learn the ancient art of eagle hunting from masters who carry centuries of tradition.",
    "expedition.kyrgyzstan.category": "Trekking & Culture",
    
    "expedition.mongolia.title": "The Gobi Crossing",
    "expedition.mongolia.tagline": "Where silence becomes the loudest sound",
    "expedition.mongolia.desc": "Journey deep into the Gobi Desert with camel caravans and nomadic families. Witness the flaming cliffs at sunset, sleep under star-filled skies in traditional gers, and experience a way of life unchanged for thousands of years. This is Mongolia at its most raw and revelatory.",
    "expedition.mongolia.category": "Desert & Nomadic",
    
    "expedition.nepal.title": "The Forbidden Kingdom",
    "expedition.nepal.tagline": "Beyond the Himalayan veil",
    "expedition.nepal.desc": "Enter Upper Mustang, the last forbidden kingdom, where Tibetan culture survives in ancient monasteries and cave cities painted before Columbus sailed. Trek through lunar landscapes of red and ochre, guided by former Loba royalty who share stories carved in stone.",
    "expedition.nepal.category": "Trekking & Sacred Sites",
    
    "expedition.bhutan.title": "The Thunder Dragon Path",
    "expedition.bhutan.tagline": "Where happiness is measured differently",
    "expedition.bhutan.desc": "Walk the sacred trails of the Thunder Dragon Kingdom with monks and local guides. From Tiger's Nest to remote monasteries where silence has been kept for centuries, discover a land where spirituality permeates every valley and ancient wisdom still guides daily life.",
    "expedition.bhutan.category": "Sacred & Spiritual",
    
    "expedition.indonesia.title": "The Ring of Fire",
    "expedition.indonesia.tagline": "Where the earth still breathes",
    "expedition.indonesia.desc": "Sail through the Indonesian archipelago from Flores to Komodo, diving volcanic reefs and walking among dragons. Meet the Bajau sea nomads, witness ancient rituals on Sumba, and camp on uninhabited islands where the Milky Way reflects in bioluminescent waters.",
    "expedition.indonesia.category": "Marine & Volcanic",
    
    // Films Page
    "films.headline": "Expedition Films",
    "films.subtitle": "Cinematic journeys that bring the world's most remote places to your screen. Each film is a window into the unseen.",
    "films.collection.subtitle": "Our Collection",
    "films.collection.title": "Documentary Series",
    "films.watchTrailer": "Watch Trailer",
    
    // Film Details
    "film.mongolia.title": "The Last Nomads of Mongolia",
    "film.mongolia.desc": "Follow three generations of a nomadic family as they navigate the changing seasons of the Gobi. This documentary captures the ancient rhythms of a life most have forgotten exists.",
    "film.mongolia.category": "Documentary",
    
    "film.bhutan.title": "Silent Dawn: A Bhutanese Monastery",
    "film.bhutan.desc": "Experience the meditative tranquility of life within one of Bhutan's most remote monasteries, where monks have practiced the same rituals for over 400 years.",
    "film.bhutan.category": "Sacred Journeys",
    
    "film.kyrgyzstan.title": "The Eagle Hunters",
    "film.kyrgyzstan.desc": "A cinematic portrait of the berkutchi, the last eagle hunters of Central Asia, who train golden eagles to hunt in traditions passed down for millennia.",
    "film.kyrgyzstan.category": "Cultural Heritage",
    
    "film.nepal.title": "Paths to the Sky",
    "film.nepal.desc": "Trek through the hidden kingdom of Lo, where ancient trade routes carved into impossible cliffs connect villages that time forgot.",
    "film.nepal.category": "Expedition",
    
    "film.indonesia.title": "Dragons of the Ring of Fire",
    "film.indonesia.desc": "Dive into the waters of Indonesia's volcanic archipelago and walk among the last dragons on Earth in this visual exploration of nature's extremes.",
    "film.indonesia.category": "Wildlife",
    
    "film.kazakhstan.title": "Endless Horizon",
    "film.kazakhstan.desc": "A meditative journey across the endless grasslands of Central Asia, where the horizon bends and time moves to the rhythm of hooves.",
    "film.kazakhstan.category": "Documentary",
    
    "films.cta.title": "Experience More Than a Film",
    "films.cta.desc": "These documentaries are glimpses into the expeditions we lead. Ready to step into the frame and become part of the story?",
    
    // About Page
    "about.philosophy.subtitle": "How We Think",
    "about.philosophy.title": "Our Philosophy",
    "about.philosophy.protocol": "The Cultural Scribe Protocol",
    "about.philosophy.statement": "We are not a travel agency. We are a private media collective that grants access to the unseen world.",
    "about.philosophy.mission1": "Our mission is to provide more than a journey; we provide an education in the art of seeing. We connect intellectually curious individuals with the authentic stories and cultures that exist beyond the reach of conventional travel.",
    "about.philosophy.mission2": "Every expedition is designed to transform your understanding of the world and your place in it. We believe that true luxury is access, not opulence.",
    
    "about.founders.subtitle": "Meet The Team",
    "about.founders.title": "The Founders",
    
    "about.blaze.name": "Blaze Potratz",
    "about.blaze.title": "The Architect",
    "about.blaze.desc": "Architects the brand's soul, systems, and stories from the central hub. His domain is The Art Foundry. With a background in strategic brand development and creative direction, Blaze ensures every touchpoint of the Askyan experience resonates with our core philosophy of meaningful exploration.",
    
    "about.jacobo.name": "Jacobo Rosillo",
    "about.jacobo.title": "The Pathfinder",
    "about.jacobo.desc": "Engineers the global network, node by node. His domain is The System Forge, executed in the field. Jacobo's extensive travels and deep connections with local communities worldwide enable us to offer access that no ordinary travel company can match.",
    
    "about.cta.title": "Ready to Begin?",
    "about.cta.desc": "Join our founding cohort and experience travel as it was meant to be.",
    
    // Chronicles
    "chronicles.headline": "The Chronicles",
    "chronicles.subtitle": "The stories we are going to find. Chronicles begin with the founding expeditions.",
    
    "chronicle.bhutan.title": "The Silent Monks of Bumthang",
    "chronicle.bhutan.location": "Bhutan",
    "chronicle.ethiopia.title": "Following the Last Salt Caravans",
    "chronicle.ethiopia.location": "Ethiopia",
    "chronicle.nepal.title": "The Forgotten Kingdom",
    "chronicle.nepal.location": "Nepal",
    
    // Header Dropdown Highlights
    "header.expedition.kazakhstan": "Kazakhstan",
    "header.expedition.kazakhstan.desc": "The Steppe Awakening",
    "header.expedition.kyrgyzstan": "Kyrgyzstan",
    "header.expedition.kyrgyzstan.desc": "Celestial Mountains",
    "header.expedition.mongolia": "Mongolia",
    "header.expedition.mongolia.desc": "The Gobi Crossing",
    "header.expedition.nepal": "Nepal",
    "header.expedition.nepal.desc": "Forbidden Kingdom",
    
    "header.film.mongolia": "The Last Nomads of Mongolia",
    "header.film.mongolia.location": "Gobi Desert, Mongolia",
    "header.film.kyrgyzstan": "The Eagle Hunters",
    "header.film.kyrgyzstan.location": "Tien Shan, Kyrgyzstan",
    "header.film.nepal": "Paths to the Sky",
    "header.film.nepal.location": "Upper Mustang, Nepal",
    
    "header.chronicle.bhutan": "The Silent Monks of Bumthang",
    "header.chronicle.bhutan.location": "Bhutan",
    "header.chronicle.ethiopia": "Following the Last Salt Caravans",
    "header.chronicle.ethiopia.location": "Ethiopia",
    "header.chronicle.nepal": "The Forgotten Kingdom",
    "header.chronicle.nepal.location": "Nepal",
    
    // When to Go Page
    "whenToGo.headline": "When to Go",
    "whenToGo.subtitle": "Every month offers unique experiences. Our travel experts have curated the perfect destinations for each season.",
    "whenToGo.bestFor": "Best For",
    "whenToGo.highlights": "Highlights",
    "whenToGo.destinations": "Top Destinations",
    "whenToGo.bookNow": "Plan Your Journey",
    "whenToGo.back": "Back to Calendar",
    
    // Month Descriptions
    "month.january.title": "January",
    "month.january.tagline": "Winter's pristine beauty awaits",
    "month.january.desc": "Escape to snow-capped mountains, witness frozen landscapes, or seek warmth in tropical paradises. January offers the best of winter adventures.",
    "month.january.bestFor": "Snow sports, Northern lights, Tropical escapes",
    
    "month.february.title": "February",
    "month.february.tagline": "Romance and adventure intertwine",
    "month.february.desc": "From romantic beach getaways to exhilarating ski trips, February delivers unforgettable experiences for couples and solo adventurers alike.",
    "month.february.bestFor": "Beach escapes, Skiing, Cultural festivals",
    
    "month.march.title": "March",
    "month.march.tagline": "Spring awakens the world",
    "month.march.desc": "Cherry blossoms bloom, wildlife emerges, and perfect weather graces many destinations. March marks the transition into vibrant spring adventures.",
    "month.march.bestFor": "Cherry blossoms, Wildlife, Spring hiking",
    
    "month.april.title": "April",
    "month.april.tagline": "Nature's grand awakening",
    "month.april.desc": "Safari season peaks in Africa, Mediterranean weather perfects, and ancient festivals come alive. April offers diverse adventures across continents.",
    "month.april.bestFor": "Safari, Mediterranean, Spring festivals",
    
    "month.may.title": "May",
    "month.may.tagline": "Pre-summer perfection",
    "month.may.desc": "Enjoy destinations before the summer crowds arrive. Perfect weather, blooming landscapes, and ideal conditions for outdoor exploration.",
    "month.may.bestFor": "Europe, Hiking, Coastal adventures",
    
    "month.june.title": "June",
    "month.june.tagline": "Summer's glorious beginning",
    "month.june.desc": "Long days and warm weather unlock endless possibilities. From tropical islands to mountain retreats, June delivers peak summer experiences.",
    "month.june.bestFor": "Island hopping, Mountain trekking, Cultural immersion",
    
    "month.july.title": "July",
    "month.july.tagline": "Peak summer adventure",
    "month.july.desc": "Summer reaches its zenith with perfect conditions worldwide. Greek islands shimmer, Patagonian glaciers glisten, and festivals light up cities.",
    "month.july.bestFor": "Greek Islands, Glaciers, Summer festivals",
    
    "month.august.title": "August",
    "month.august.tagline": "Nature's spectacular shows",
    "month.august.desc": "Witness the Northern Lights begin their season, enjoy pristine summer conditions, and experience wildlife in their natural habitats.",
    "month.august.bestFor": "Northern Lights, Wildlife, Island escapes",
    
    "month.september.title": "September",
    "month.september.tagline": "Autumn's golden embrace",
    "month.september.desc": "Crowds thin, temperatures mellow, and landscapes transform. Wine harvests, cultural celebrations, and perfect hiking conditions await.",
    "month.september.bestFor": "Wine regions, Autumn colors, Trekking",
    
    "month.october.title": "October",
    "month.october.tagline": "The explorer's paradise",
    "month.october.desc": "Himalayan views clear, autumn colors peak, and shoulder season brings incredible value. October delivers serious adventures for discerning travelers.",
    "month.october.bestFor": "Himalayas, Fall foliage, Desert adventures",
    
    "month.november.title": "November",
    "month.november.tagline": "Safari season returns",
    "month.november.desc": "African wildlife congregates around water sources, weather cools in the Middle East, and Southeast Asia emerges from monsoon season.",
    "month.november.bestFor": "African safari, Middle East, Southeast Asia",
    
    "month.december.title": "December",
    "month.december.tagline": "Festive adventures await",
    "month.december.desc": "Celebrate the holidays with tropical beach escapes, winter wonderlands, or cultural immersions. December offers the best of both hemispheres.",
    "month.december.bestFor": "Tropical beaches, Winter sports, Cultural holidays",
    
    // Common Labels
    "common.days": "Days",
    "common.readMore": "Read More",
    "common.viewAll": "View All",
    "common.close": "Close",
    "common.loading": "Loading...",
    "common.submitting": "Submitting...",
    "common.clickToExplore": "Click to explore",
    "common.copyright": "ASKYAN EXPEDITIONS",
    
    // Testimonials
    "testimonials.subtitle": "The Standard",
    "testimonials.title": "What We Hold Ourselves To",
    
    // Waitlist extra
    "waitlist.review": "Applications are reviewed personally by the founding team.",
    "waitlist.received": "Application Received",
    
    // Month Detail Page UI
    "monthDetail.back": "Back",
    "monthDetail.bestTime": "Best Time",
    "monthDetail.weather": "Weather",
    "monthDetail.temperature": "Temperature",
    "monthDetail.featuredDestinations": "Featured Destinations",
    "monthDetail.readyToExplore": "Ready to explore",
    "monthDetail.ctaDesc": "Our travel experts can craft a bespoke itinerary tailored to your interests and travel style.",
    "monthDetail.requestConsultation": "Request a Consultation",
    "monthDetail.monthNotFound": "Month not found",
    "monthDetail.returnHome": "Return Home",
    
    // Chronicles/Stories Page
    "chronicles.description": "Dispatches from the edges of the map. Each chronicle is a window into the authentic stories and cultures that exist beyond the reach of conventional travel.",
    "chronicles.readChronicle": "Coming with the cohort",
    "chronicles.moreComingSoon": "More chronicles are being written. Join the expedition to receive them first.",
    
    // Month highlights
    "month.january.highlight": "Alpine Adventures",
    "month.february.highlight": "Romantic Escapes",
    "month.march.highlight": "Spring Awakening",
    "month.april.highlight": "Safari Season",
    "month.may.highlight": "Mediterranean Magic",
    "month.june.highlight": "Island Paradise",
    "month.july.highlight": "Summer Sojourns",
    "month.august.highlight": "Northern Wonders",
    "month.september.highlight": "Harvest & Wine",
    "month.october.highlight": "Mountain Treks",
    "month.november.highlight": "Wildlife Season",
    "month.december.highlight": "Winter Sun",
  },
  es: {
    // Navigation
    "nav.expeditions": "Expediciones",
    "nav.films": "Películas",
    "nav.whenToGo": "Cuándo Ir",
    "nav.chronicles": "Crónicas",
    "nav.about": "Nosotros",
    "nav.requestAccess": "Solicitar Acceso",
    
    // Hero Section
    "hero.subtitle": "Un Colectivo de Medios Privado",
    "hero.title": "Donde Termina el Mapa.",
    "hero.description": "Una invitación al mundo desconocido.",
    "hero.featuredIn": "Primeras Expediciones",
    
    // Featured Titles
    "featured.title": "Viajes Destacados",
    "featured.films": "Películas Destacadas",
    "featured.stories": "Historias Destacadas",
    "featured.locations": "Ubicaciones Destacadas",
    
    // Spotlight
    "spotlight.subtitle": "Aventura Destacada",
    "spotlight.title": "Expediciones Destacadas",
    "spotlight.viewAll": "Ver Todas las Expediciones",
    
    // Impact Section
    "impact.subtitle": "Nuestro Compromiso",
    "impact.title": "Viajes de Impacto Positivo",
    "impact.conservation.title": "Conservación Primero",
    "impact.conservation.desc": "Nos asociamos con organizaciones de conservación para proteger los lugares salvajes que visitamos.",
    "impact.community.title": "Apoyo Comunitario",
    "impact.community.desc": "Cada viaje contribuye directamente a las comunidades locales y la preservación cultural.",
    "impact.sustainable.title": "Prácticas Sostenibles",
    "impact.sustainable.desc": "Minimizamos nuestra huella a través de prácticas de viaje responsables y compensación de carbono.",
    "impact.learnMore": "Más Información",
    
    // Seasonal Guide
    "seasonal.subtitle": "Guía Estacional",
    "seasonal.kicker": "El Calendario",
    "seasonal.title": "Cuándo Ir",
    "seasonal.description": "Cada mes ofrece experiencias únicas. Nuestros expertos en viajes han seleccionado los destinos perfectos para cada temporada.",
    
    // Adventure Section
    "adventure.subtitle": "Nuestras Áreas de Especialización",
    "adventure.kicker": "En el Terreno",
    "adventure.title": "¿Qué Significa la Aventura Para Ti?",
    "adventure.description": "Desde picos de montañas remotas hasta costas vírgenes, diseñamos viajes que superan límites mientras mantenemos los más altos estándares de lujo y seguridad.",
    "adventure.cta": "Encuentra Tu Aventura",
    
    // Founders
    "founders.kicker": "Los Fundadores",
    "founders.title": "La Estructura de Comando",
    "founders.subtitle": "Conoce al Equipo",
    "founders.headline": "Los Fundadores",
    
    // Waitlist
    "waitlist.subtitle": "La Cohorte Fundadora",
    "waitlist.title": "Pide Ser Considerado",
    "waitlist.description": "Los primeros viajes serán pequeños, lentos e irrepetibles. Deja tu correo y te escribiremos personalmente.",
    "waitlist.placeholder": "Ingresa tu correo electrónico",
    "waitlist.button": "Solicitar Acceso",
    "waitlist.success": "Recibido. Un fundador te escribirá personalmente.",
    
    // Footer
    "footer.rights": "Todos los Derechos Reservados",
    
    // Contact
    "contact.address": "Dirección",
    "contact.phone": "Teléfono",
    "contact.email": "Correo",
    
    // Search
    "search.placeholder": "Buscar expediciones, destinos, historias...",
    "search.noResults": "No se encontraron resultados",
    "search.categories.expeditions": "Expediciones",
    "search.categories.destinations": "Destinos",
    "search.categories.stories": "Historias",
    
    // Why Askyan
    "why.subtitle": "La Diferencia Askyan",
    "why.title": "Por Qué Elegirnos",
    "why.expertise": "Conocimiento Experto",
    "why.expertise.desc": "Nuestro equipo tiene conocimiento profundo y de primera mano de cada destino que ofrecemos, garantizando experiencias auténticas e inmersivas.",
    "why.bespoke": "Viajes a Medida",
    "why.bespoke.desc": "Cada expedición está adaptada a tus intereses, ritmo y estilo. Ningún viaje es igual a otro.",
    "why.network": "Red de Confianza",
    "why.network.desc": "Hemos cultivado relaciones con los mejores guías locales, alojamientos y custodios culturales de todo el mundo.",
    "why.support": "Soporte 24/7",
    "why.support.desc": "Desde la planificación hasta el regreso, nuestro equipo está disponible las 24 horas para garantizar experiencias sin problemas.",
    
    // Months
    "months.january": "Enero",
    "months.february": "Febrero",
    "months.march": "Marzo",
    "months.april": "Abril",
    "months.may": "Mayo",
    "months.june": "Junio",
    "months.july": "Julio",
    "months.august": "Agosto",
    "months.september": "Septiembre",
    "months.october": "Octubre",
    "months.november": "Noviembre",
    "months.december": "Diciembre",
    
    // Philosophy
    "philosophy.subtitle": "Nuestra Filosofía",
    "philosophy.protocol": "El Protocolo del Escriba Cultural",
    "philosophy.statement": "No somos una agencia de viajes. Somos un colectivo de medios privado que otorga acceso al mundo desconocido.",
    "philosophy.mission": "Nuestra misión es proporcionar más que un viaje; proporcionamos una educación en el arte de ver. Conectamos a individuos intelectualmente curiosos con las historias y culturas auténticas que existen más allá del alcance del turismo convencional.",
    
    // Destinations
    "destinations.subtitle": "Territorios",
    "destinations.title": "A Dónde Te Llevamos",
    "destinations.description": "Cada expedición desbloquea acceso a lugares que la mayoría de viajeros nunca verán.",
    "destinations.explore": "Explorar",
    
    // Destination Cards
    "destinations.highPeaks.name": "Las Altas Cumbres",
    "destinations.highPeaks.region": "Patagonia y Himalaya",
    "destinations.highPeaks.desc": "Donde el aire delgado encuentra historias profundas",
    "destinations.goldenSands.name": "Las Arenas Doradas",
    "destinations.goldenSands.region": "Sahara y Desierto Arábigo",
    "destinations.goldenSands.desc": "Rutas antiguas a través de dunas infinitas",
    "destinations.hiddenShores.name": "Las Costas Ocultas",
    "destinations.hiddenShores.region": "Islas del Pacífico",
    "destinations.hiddenShores.desc": "Aguas inexploradas y arrecifes prístinos",
    "destinations.greenVeil.name": "El Velo Verde",
    "destinations.greenVeil.region": "Amazonas y Borneo",
    "destinations.greenVeil.desc": "Al corazón de la tierra viviente",
    
    // Expeditions Page
    "expeditions.headline": "Expediciones Que Transforman",
    "expeditions.subtitle": "Seis viajes en desarrollo por Asia Central y el Himalaya — grupos pequeños, Escribas locales, sin guiones. Aquí comienza el colectivo.",
    "expeditions.heroSubtitle": "No vendemos vacaciones. Arquitectamos viajes que alteran fundamentalmente cómo experimentas el mundo — y a ti mismo.",
    "expeditions.duration": "Duración",
    "expeditions.season": "Temporada",
    "expeditions.difficulty": "Dificultad",
    "expeditions.exploreJourney": "Explorar Viaje",
    "expeditions.categories.subtitle": "Tipos de Expedición",
    "expeditions.categories.title": "Formas de Viajar",
    "expeditions.currentTitle": "Expediciones Actuales",
    "expeditions.currentDesc": "Cada viaje está diseñado en torno al acceso auténtico — guías locales que llevan generaciones de conocimiento, rutas que no existen en ningún mapa turístico, y experiencias que revelan el alma de un lugar.",
    "expeditions.ctaTitle": "Las Primeras Expediciones Están Siendo Planificadas Ahora",
    "expeditions.ctaDesc": "Únete a nuestro círculo fundador para acceso prioritario, actualizaciones de expediciones, y la oportunidad de dar forma a dónde exploramos después.",
    "expeditions.joinCircle": "Únete al Círculo Fundador",
    "expeditions.cta.title": "¿Listo para Transformarte?",
    "expeditions.cta.desc": "Únete a nuestra cohorte fundadora y experimenta el viaje como debe ser.",
    
    // Expedition Categories
    "expeditions.category.highAltitude": "Alta Montaña",
    "expeditions.category.highAltitude.desc": "Travesías montañosas y naturaleza alpina",
    "expeditions.category.nomadic": "Rutas Nómadas",
    "expeditions.category.nomadic.desc": "Sigue antiguas rutas comerciales con guías locales",
    "expeditions.category.desert": "Travesías del Desierto",
    "expeditions.category.desert.desc": "Vastas extensiones de silencio y arena",
    "expeditions.category.transformative": "Transformador",
    "expeditions.category.transformative.desc": "Viajes que cambian tu forma de ver",
    
    // Expedition Details
    "expedition.kazakhstan.title": "El Despertar de la Estepa",
    "expedition.kazakhstan.tagline": "Donde el horizonte se curva para encontrar el cielo",
    "expedition.kazakhstan.desc": "Atraviesa la infinita estepa dorada a caballo con guías nómadas cuyos ancestros recorrieron estos mismos caminos durante milenios. Desde las antiguas paredes del Cañón Charyn hasta las dunas cantoras de Altyn Emel, este es un viaje al corazón de la naturaleza centroasiática.",
    "expedition.kazakhstan.category": "Cabalgata y Naturaleza",
    
    "expedition.kyrgyzstan.title": "Las Montañas Celestiales",
    "expedition.kyrgyzstan.tagline": "Duerme donde anidan las águilas",
    "expedition.kyrgyzstan.desc": "Camina por las montañas Tien Shan hasta el lago Son-Kul, donde los pastos de verano se convierten en espejos que reflejan el cielo infinito. Alójate en campamentos de yurtas con pastores que leen el clima en el viento, y aprende el antiguo arte de la cetrería de maestros que llevan siglos de tradición.",
    "expedition.kyrgyzstan.category": "Trekking y Cultura",
    
    "expedition.mongolia.title": "La Travesía del Gobi",
    "expedition.mongolia.tagline": "Donde el silencio se convierte en el sonido más fuerte",
    "expedition.mongolia.desc": "Viaja profundamente en el Desierto del Gobi con caravanas de camellos y familias nómadas. Contempla los acantilados en llamas al atardecer, duerme bajo cielos estrellados en gers tradicionales, y experimenta una forma de vida sin cambios durante miles de años. Esta es Mongolia en su estado más puro y revelador.",
    "expedition.mongolia.category": "Desierto y Nómada",
    
    "expedition.nepal.title": "El Reino Prohibido",
    "expedition.nepal.tagline": "Más allá del velo himalayo",
    "expedition.nepal.desc": "Entra en el Alto Mustang, el último reino prohibido, donde la cultura tibetana sobrevive en monasterios antiguos y ciudades de cuevas pintadas antes de que Colón navegara. Camina por paisajes lunares de rojo y ocre, guiado por la antigua realeza Loba que comparte historias talladas en piedra.",
    "expedition.nepal.category": "Trekking y Sitios Sagrados",
    
    "expedition.bhutan.title": "El Sendero del Dragón del Trueno",
    "expedition.bhutan.tagline": "Donde la felicidad se mide diferente",
    "expedition.bhutan.desc": "Camina los senderos sagrados del Reino del Dragón del Trueno con monjes y guías locales. Desde el Nido del Tigre hasta monasterios remotos donde el silencio se ha mantenido durante siglos, descubre una tierra donde la espiritualidad impregna cada valle y la sabiduría antigua aún guía la vida diaria.",
    "expedition.bhutan.category": "Sagrado y Espiritual",
    
    "expedition.indonesia.title": "El Anillo de Fuego",
    "expedition.indonesia.tagline": "Donde la tierra aún respira",
    "expedition.indonesia.desc": "Navega por el archipiélago indonesio desde Flores hasta Komodo, buceando en arrecifes volcánicos y caminando entre dragones. Conoce a los nómadas del mar Bajau, presencia rituales antiguos en Sumba, y acampa en islas deshabitadas donde la Vía Láctea se refleja en aguas bioluminiscentes.",
    "expedition.indonesia.category": "Marino y Volcánico",
    
    // Films Page
    "films.headline": "Películas de Expedición",
    "films.subtitle": "Viajes cinematográficos que traen los lugares más remotos del mundo a tu pantalla. Cada película es una ventana a lo desconocido.",
    "films.collection.subtitle": "Nuestra Colección",
    "films.collection.title": "Serie Documental",
    "films.watchTrailer": "Ver Tráiler",
    
    // Film Details
    "film.mongolia.title": "Los Últimos Nómadas de Mongolia",
    "film.mongolia.desc": "Sigue a tres generaciones de una familia nómada mientras navegan las estaciones cambiantes del Gobi. Este documental captura los ritmos antiguos de una vida que la mayoría ha olvidado que existe.",
    "film.mongolia.category": "Documental",
    
    "film.bhutan.title": "Amanecer Silencioso: Un Monasterio Butanés",
    "film.bhutan.desc": "Experimenta la tranquilidad meditativa de la vida dentro de uno de los monasterios más remotos de Bután, donde los monjes han practicado los mismos rituales durante más de 400 años.",
    "film.bhutan.category": "Viajes Sagrados",
    
    "film.kyrgyzstan.title": "Los Cazadores de Águilas",
    "film.kyrgyzstan.desc": "Un retrato cinematográfico de los berkutchi, los últimos cazadores de águilas de Asia Central, que entrenan águilas doradas para cazar en tradiciones transmitidas durante milenios.",
    "film.kyrgyzstan.category": "Patrimonio Cultural",
    
    "film.nepal.title": "Senderos al Cielo",
    "film.nepal.desc": "Camina por el reino oculto de Lo, donde antiguas rutas comerciales talladas en acantilados imposibles conectan pueblos que el tiempo olvidó.",
    "film.nepal.category": "Expedición",
    
    "film.indonesia.title": "Dragones del Anillo de Fuego",
    "film.indonesia.desc": "Sumérgete en las aguas del archipiélago volcánico de Indonesia y camina entre los últimos dragones de la Tierra en esta exploración visual de los extremos de la naturaleza.",
    "film.indonesia.category": "Vida Silvestre",
    
    "film.kazakhstan.title": "Horizonte Infinito",
    "film.kazakhstan.desc": "Un viaje meditativo a través de las interminables praderas de Asia Central, donde el horizonte se curva y el tiempo se mueve al ritmo de los cascos.",
    "film.kazakhstan.category": "Documental",
    
    "films.cta.title": "Experimenta Más Que Una Película",
    "films.cta.desc": "Estos documentales son vistazos a las expediciones que lideramos. ¿Listo para entrar en el cuadro y ser parte de la historia?",
    
    // About Page
    "about.philosophy.subtitle": "Cómo Pensamos",
    "about.philosophy.title": "Nuestra Filosofía",
    "about.philosophy.protocol": "El Protocolo del Escriba Cultural",
    "about.philosophy.statement": "No somos una agencia de viajes. Somos un colectivo de medios privado que otorga acceso al mundo desconocido.",
    "about.philosophy.mission1": "Nuestra misión es proporcionar más que un viaje; proporcionamos una educación en el arte de ver. Conectamos a individuos intelectualmente curiosos con las historias y culturas auténticas que existen más allá del alcance del turismo convencional.",
    "about.philosophy.mission2": "Cada expedición está diseñada para transformar tu comprensión del mundo y tu lugar en él. Creemos que el verdadero lujo es el acceso, no la opulencia.",
    
    "about.founders.subtitle": "Conoce al Equipo",
    "about.founders.title": "Los Fundadores",
    
    "about.blaze.name": "Blaze Potratz",
    "about.blaze.title": "El Arquitecto",
    "about.blaze.desc": "Arquitecta el alma, los sistemas y las historias de la marca desde el centro de operaciones. Su dominio es La Fundición de Arte. Con experiencia en desarrollo estratégico de marca y dirección creativa, Blaze asegura que cada punto de contacto de la experiencia Askyan resuene con nuestra filosofía central de exploración significativa.",
    
    "about.jacobo.name": "Jacobo Rosillo",
    "about.jacobo.title": "El Explorador",
    "about.jacobo.desc": "Diseña la red global, nodo por nodo. Su dominio es La Forja del Sistema, ejecutado en el campo. Los extensos viajes de Jacobo y sus profundas conexiones con comunidades locales en todo el mundo nos permiten ofrecer acceso que ninguna empresa de viajes ordinaria puede igualar.",
    
    "about.cta.title": "¿Listo para Comenzar?",
    "about.cta.desc": "Únete a nuestra cohorte fundadora y experimenta el viaje como debe ser.",
    
    // Chronicles
    "chronicles.headline": "Las Crónicas",
    "chronicles.subtitle": "Las historias que vamos a encontrar. Las crónicas comienzan con las expediciones fundadoras.",
    
    "chronicle.bhutan.title": "Los Monjes Silenciosos de Bumthang",
    "chronicle.bhutan.location": "Bután",
    "chronicle.ethiopia.title": "Siguiendo las Últimas Caravanas de Sal",
    "chronicle.ethiopia.location": "Etiopía",
    "chronicle.nepal.title": "El Reino Olvidado",
    "chronicle.nepal.location": "Nepal",
    
    // Header Dropdown Highlights
    "header.expedition.kazakhstan": "Kazajistán",
    "header.expedition.kazakhstan.desc": "El Despertar de la Estepa",
    "header.expedition.kyrgyzstan": "Kirguistán",
    "header.expedition.kyrgyzstan.desc": "Montañas Celestiales",
    "header.expedition.mongolia": "Mongolia",
    "header.expedition.mongolia.desc": "La Travesía del Gobi",
    "header.expedition.nepal": "Nepal",
    "header.expedition.nepal.desc": "Reino Prohibido",
    
    "header.film.mongolia": "Los Últimos Nómadas de Mongolia",
    "header.film.mongolia.location": "Desierto del Gobi, Mongolia",
    "header.film.kyrgyzstan": "Los Cazadores de Águilas",
    "header.film.kyrgyzstan.location": "Tien Shan, Kirguistán",
    "header.film.nepal": "Senderos al Cielo",
    "header.film.nepal.location": "Alto Mustang, Nepal",
    
    "header.chronicle.bhutan": "Los Monjes Silenciosos de Bumthang",
    "header.chronicle.bhutan.location": "Bután",
    "header.chronicle.ethiopia": "Siguiendo las Últimas Caravanas de Sal",
    "header.chronicle.ethiopia.location": "Etiopía",
    "header.chronicle.nepal": "El Reino Olvidado",
    "header.chronicle.nepal.location": "Nepal",
    
    // When to Go Page
    "whenToGo.headline": "Cuándo Ir",
    "whenToGo.subtitle": "Cada mes ofrece experiencias únicas. Nuestros expertos en viajes han seleccionado los destinos perfectos para cada temporada.",
    "whenToGo.bestFor": "Ideal Para",
    "whenToGo.highlights": "Destacados",
    "whenToGo.destinations": "Destinos Principales",
    "whenToGo.bookNow": "Planifica Tu Viaje",
    "whenToGo.back": "Volver al Calendario",
    
    // Month Descriptions
    "month.january.title": "Enero",
    "month.january.tagline": "La belleza prístina del invierno te espera",
    "month.january.desc": "Escapa a montañas nevadas, contempla paisajes congelados, o busca calor en paraísos tropicales. Enero ofrece lo mejor de las aventuras invernales.",
    "month.january.bestFor": "Deportes de nieve, Auroras boreales, Escapes tropicales",
    
    "month.february.title": "Febrero",
    "month.february.tagline": "Romance y aventura se entrelazan",
    "month.february.desc": "Desde escapadas románticas a la playa hasta emocionantes viajes de esquí, febrero ofrece experiencias inolvidables para parejas y aventureros solitarios.",
    "month.february.bestFor": "Escapadas a la playa, Esquí, Festivales culturales",
    
    "month.march.title": "Marzo",
    "month.march.tagline": "La primavera despierta al mundo",
    "month.march.desc": "Los cerezos florecen, la vida silvestre emerge, y el clima perfecto bendice muchos destinos. Marzo marca la transición hacia vibrantes aventuras primaverales.",
    "month.march.bestFor": "Cerezos en flor, Vida silvestre, Senderismo de primavera",
    
    "month.april.title": "Abril",
    "month.april.tagline": "El gran despertar de la naturaleza",
    "month.april.desc": "La temporada de safari alcanza su punto máximo en África, el clima mediterráneo se perfecciona, y los festivales antiguos cobran vida. Abril ofrece diversas aventuras en todos los continentes.",
    "month.april.bestFor": "Safari, Mediterráneo, Festivales de primavera",
    
    "month.may.title": "Mayo",
    "month.may.tagline": "Perfección pre-veraniega",
    "month.may.desc": "Disfruta de destinos antes de que lleguen las multitudes de verano. Clima perfecto, paisajes en flor, y condiciones ideales para la exploración al aire libre.",
    "month.may.bestFor": "Europa, Senderismo, Aventuras costeras",
    
    "month.june.title": "Junio",
    "month.june.tagline": "El glorioso inicio del verano",
    "month.june.desc": "Días largos y clima cálido desbloquean posibilidades infinitas. Desde islas tropicales hasta refugios de montaña, junio ofrece experiencias veraniegas de primera.",
    "month.june.bestFor": "Islas, Trekking de montaña, Inmersión cultural",
    
    "month.july.title": "Julio",
    "month.july.tagline": "Aventura de verano en su apogeo",
    "month.july.desc": "El verano alcanza su cenit con condiciones perfectas en todo el mundo. Las islas griegas brillan, los glaciares patagónicos relucen, y los festivales iluminan las ciudades.",
    "month.july.bestFor": "Islas Griegas, Glaciares, Festivales de verano",
    
    "month.august.title": "Agosto",
    "month.august.tagline": "Espectáculos naturales impresionantes",
    "month.august.desc": "Contempla el inicio de la temporada de auroras boreales, disfruta de condiciones veraniegas prístinas, y experimenta la vida silvestre en sus hábitats naturales.",
    "month.august.bestFor": "Auroras Boreales, Vida silvestre, Escapes a islas",
    
    "month.september.title": "Septiembre",
    "month.september.tagline": "El abrazo dorado del otoño",
    "month.september.desc": "Las multitudes disminuyen, las temperaturas se suavizan, y los paisajes se transforman. Cosechas de vino, celebraciones culturales, y condiciones perfectas para senderismo te esperan.",
    "month.september.bestFor": "Regiones vinícolas, Colores de otoño, Trekking",
    
    "month.october.title": "Octubre",
    "month.october.tagline": "El paraíso del explorador",
    "month.october.desc": "Las vistas del Himalaya se despejan, los colores de otoño alcanzan su máximo, y la temporada baja ofrece un valor increíble. Octubre ofrece aventuras serias para viajeros exigentes.",
    "month.october.bestFor": "Himalaya, Follaje de otoño, Aventuras en el desierto",
    
    "month.november.title": "Noviembre",
    "month.november.tagline": "La temporada de safari regresa",
    "month.november.desc": "La vida silvestre africana se congrega alrededor de fuentes de agua, el clima se enfría en Oriente Medio, y el Sudeste Asiático emerge de la temporada de monzones.",
    "month.november.bestFor": "Safari africano, Oriente Medio, Sudeste Asiático",
    
    "month.december.title": "Diciembre",
    "month.december.tagline": "Aventuras festivas te esperan",
    "month.december.desc": "Celebra las fiestas con escapadas a playas tropicales, países de las maravillas invernales, o inmersiones culturales. Diciembre ofrece lo mejor de ambos hemisferios.",
    "month.december.bestFor": "Playas tropicales, Deportes de invierno, Fiestas culturales",
    
    // Common Labels
    "common.days": "Días",
    "common.readMore": "Leer Más",
    "common.viewAll": "Ver Todo",
    "common.close": "Cerrar",
    "common.loading": "Cargando...",
    "common.submitting": "Enviando...",
    "common.clickToExplore": "Haz clic para explorar",
    "common.copyright": "ASKYAN EXPEDICIONES",
    
    // Testimonials
    "testimonials.subtitle": "El Estándar",
    "testimonials.title": "Lo Que Nos Exigimos",
    
    // Waitlist extra
    "waitlist.review": "Las solicitudes son revisadas personalmente por el equipo fundador.",
    "waitlist.received": "Solicitud Recibida",
    
    // Month Detail Page UI
    "monthDetail.back": "Volver",
    "monthDetail.bestTime": "Mejor Época",
    "monthDetail.weather": "Clima",
    "monthDetail.temperature": "Temperatura",
    "monthDetail.featuredDestinations": "Destinos Destacados",
    "monthDetail.readyToExplore": "¿Listo para explorar",
    "monthDetail.ctaDesc": "Nuestros expertos en viajes pueden crear un itinerario personalizado adaptado a tus intereses y estilo de viaje.",
    "monthDetail.requestConsultation": "Solicitar una Consulta",
    "monthDetail.monthNotFound": "Mes no encontrado",
    "monthDetail.returnHome": "Volver al Inicio",
    
    // Chronicles/Stories Page
    "chronicles.description": "Despachos desde los confines del mapa. Cada crónica es una ventana a las historias y culturas auténticas que existen más allá del alcance del turismo convencional.",
    "chronicles.readChronicle": "Llega con la cohorte",
    "chronicles.moreComingSoon": "Se están escribiendo más crónicas. Únete a la expedición para recibirlas primero.",
    
    // Month highlights
    "month.january.highlight": "Aventuras Alpinas",
    "month.february.highlight": "Escapadas Románticas",
    "month.march.highlight": "Despertar de Primavera",
    "month.april.highlight": "Temporada de Safari",
    "month.may.highlight": "Magia Mediterránea",
    "month.june.highlight": "Paraíso Isleño",
    "month.july.highlight": "Viajes de Verano",
    "month.august.highlight": "Maravillas del Norte",
    "month.september.highlight": "Cosecha y Vino",
    "month.october.highlight": "Trekking de Montaña",
    "month.november.highlight": "Temporada de Vida Silvestre",
    "month.december.highlight": "Sol de Invierno",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("askyan-language");
      return (saved as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("askyan-language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
