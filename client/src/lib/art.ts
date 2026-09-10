import { COMPACT_MEDIA } from "@/lib/media";

// Expedition key art: one illustrated chart per territory, generated in a
// single painted style and self-hosted by the key-art CI workflow (see
// scripts/art-manifest.json). This is deliberately not photography — the
// founding seasons haven't been filmed yet, and stock footage standing in for
// places we haven't been is exactly what the site's honesty rule forbids. The
// art is labelled as illustration wherever it appears.
export const ART_IDS = [
  "kazakhstan-steppe",
  "kyrgyzstan-heights",
  "mongolia-gobi",
  "nepal-mustang",
  "bhutan-sacred",
  "indonesia-flores",
] as const;

// Films and Chronicles carry the same painted series: concept art for work
// that is still in production, never a frame passed off as footage.
export const FILM_ART_IDS = [
  "mongolia-nomads",
  "bhutan-monastery",
  "kyrgyzstan-eagles",
  "nepal-trails",
  "indonesia-komodo",
  "kazakhstan-steppe",
] as const;

export const CHRONICLE_ART_IDS = [
  "silent-monks-bhutan",
  "salt-caravans-ethiopia",
  "night-fishermen-maldives",
  "forgotten-kingdom-mustang",
  "whale-singers-tonga",
  "shadow-puppets-java",
] as const;

export const MASTER_CHART = "/art/master-chart.jpg";
export const MASTER_CHART_MOBILE = "/art/master-chart-m.jpg";

/** The right encode of an expedition's key art for this device. */
export function artSrc(id: string): string {
  return COMPACT_MEDIA ? `/art/${id}-m.jpg` : `/art/${id}.jpg`;
}

export function hasArt(id: string): boolean {
  return (ART_IDS as readonly string[]).includes(id);
}

export function filmArtSrc(id: string): string | null {
  return (FILM_ART_IDS as readonly string[]).includes(id) ? artSrc(`film-${id}`) : null;
}

export function chronicleArtSrc(id: string): string | null {
  return (CHRONICLE_ART_IDS as readonly string[]).includes(id) ? artSrc(`chronicle-${id}`) : null;
}

/** Where each territory sits, for the chart's waypoints. */
export const ART_COORDS: Record<(typeof ART_IDS)[number], string> = {
  "kazakhstan-steppe": "43.3510° N, 79.0794° E",
  "kyrgyzstan-heights": "41.8397° N, 75.1338° E",
  "mongolia-gobi": "43.5000° N, 103.5000° E",
  "nepal-mustang": "29.1892° N, 83.9531° E",
  "bhutan-sacred": "27.4916° N, 89.3639° E",
  "indonesia-flores": "8.5500° S, 119.4890° E",
};

export const ART_LABEL = "Illustrated key art";
export const CONCEPT_LABEL = "Concept art · in production";
