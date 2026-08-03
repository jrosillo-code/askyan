// Post-build step: emit one static HTML file per expedition with correct
// <title> and Open Graph tags baked in. Crawlers that never run JavaScript
// (most link unfurlers) otherwise see only the site-wide defaults, which
// wastes the per-expedition dossier share cards in /og.
//
// Each page is written as expedition/<id>/index.html — Vercel serves
// directory indexes from the filesystem before the SPA rewrite kicks in,
// and the file still loads the normal bundle so routing behaves as before.
// (cleanUrls was tried first and redirect-looped the SPA fallback.)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist", "public");
const BASE = "https://askyan.vercel.app";

const EXPEDITIONS = [
  { id: "kazakhstan-steppe", code: "001", title: "The Steppe Awakening", country: "Kazakhstan", desc: "Traverse the endless golden steppe on horseback with nomadic guides — Expedition 001 of the founding seasons." },
  { id: "kyrgyzstan-heights", code: "002", title: "The Celestial Mountains", country: "Kyrgyzstan", desc: "High passes of the Tien Shan and Song-Kul's brief nomad summer — Expedition 002 of the founding seasons." },
  { id: "mongolia-gobi", code: "003", title: "The Gobi Crossing", country: "Mongolia", desc: "Desert light, singing dunes and the last nomad routes — Expedition 003 of the founding seasons." },
  { id: "nepal-mustang", code: "004", title: "The Forbidden Kingdom", country: "Nepal", desc: "Upper Mustang beyond the rain shadow — Expedition 004 of the founding seasons." },
  { id: "bhutan-sacred", code: "005", title: "The Thunder Dragon Path", country: "Bhutan", desc: "Sacred treks and silent monasteries — Expedition 005 of the founding seasons." },
  { id: "indonesia-flores", code: "006", title: "The Ring of Fire", country: "Indonesia", desc: "The volcanic arc beyond Flores — Expedition 006 of the founding seasons." },
];

const template = readFileSync(join(outDir, "index.html"), "utf8");

const setMeta = (html, attr, name, content) =>
  html.replace(
    new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`),
    `$1${content}$2`
  );


for (const e of EXPEDITIONS) {
  const title = `${e.title} — Expedition ${e.code}, ${e.country} — ASKYAN`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  for (const [name, content] of [
    ["og:title", title],
    ["og:description", e.desc],
    ["og:image", `${BASE}/og/${e.id}.jpg`],
    ["og:url", `${BASE}/expedition/${e.id}`],
  ]) {
    html = setMeta(html, "property", name, content);
  }
  for (const [name, content] of [
    ["description", e.desc],
    ["twitter:title", title],
    ["twitter:description", e.desc],
    ["twitter:image", `${BASE}/og/${e.id}.jpg`],
  ]) {
    html = setMeta(html, "name", name, content);
  }
  mkdirSync(join(outDir, "expedition", e.id), { recursive: true });
  writeFileSync(join(outDir, "expedition", e.id, "index.html"), html);
  console.log(`prerendered expedition/${e.id}/index.html`);
}
