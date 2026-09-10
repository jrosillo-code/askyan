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

export const MASTER_CHART = "/art/master-chart.jpg";
export const MASTER_CHART_MOBILE = "/art/master-chart-m.jpg";

/** The right encode of an expedition's key art for this device. */
export function artSrc(id: string): string {
  return COMPACT_MEDIA ? `/art/${id}-m.jpg` : `/art/${id}.jpg`;
}

export function hasArt(id: string): boolean {
  return (ART_IDS as readonly string[]).includes(id);
}

export const ART_LABEL = "Illustrated key art";
