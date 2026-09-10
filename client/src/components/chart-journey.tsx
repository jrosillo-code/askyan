import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MASTER_CHART, MASTER_CHART_MOBILE, artSrc, ART_COORDS, ART_LABEL } from "@/lib/art";
import { useLanguage } from "@/contexts/language-context";

// The Route — the master chart pinned to the viewport, panning as you scroll,
// with the six founding territories surfacing one after another as waypoints.
// It is the site's thesis in one gesture: a chart of places not yet travelled,
// read the way an expedition is planned. On phones, short viewports and for
// reduced-motion users it flattens to the chart plus a swipeable strip — the
// same waypoints, no pinning.

export interface JourneyStop {
  id: string;
  code: string;
  country: string;
  title: string;
  window: string;
  note: string;
}

export function ChartJourney({ stops }: { stops: readonly JourneyStop[] }) {
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return pinned && !reduced ? <PinnedJourney stops={stops} /> : <StaticJourney stops={stops} />;
}

function PinnedJourney({ stops }: { stops: readonly JourneyStop[] }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const [active, setActive] = useState(0);
  const n = stops.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.5) / n), behavior: "smooth" });
  };

  const stop = stops[active];

  return (
    <section
      ref={ref}
      id="route"
      className="relative"
      style={{ height: `${(n + 1) * 100}vh` }}
      data-testid="section-route"
      data-route-mode="pinned"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* The chart itself: wider than the viewport, dragged west as you read east. */}
        <motion.img
          src={MASTER_CHART}
          alt=""
          decoding="async"
          style={{ x, scale, transformOrigin: "50% 50%" }}
          className="absolute left-0 top-0 h-full w-[135%] max-w-none object-cover"
          data-testid="route-chart"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-8 py-12 lg:px-12">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">{t("route.kicker")}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">{t("route.scrollHint")}</p>
          </div>

          <div className="grid grid-cols-12 items-center gap-10">
            {/* Waypoint text: the dossier's first line. */}
            <div className="col-span-5">
              <p className="font-mono text-xs tracking-[0.3em] text-primary" data-testid="route-index">
                {stop.code} / {String(n).padStart(3, "0")}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">{stop.country}</p>
              <div className="relative mt-3 h-[6.5rem]">
                {stops.map((s, i) => (
                  <motion.h2
                    key={s.id}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 14 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0 font-display text-4xl font-black leading-[1.05] tracking-tight text-white xl:text-5xl"
                    style={{ textWrap: "balance" }}
                    data-testid={i === active ? "route-title" : undefined}
                  >
                    {s.title}
                  </motion.h2>
                ))}
              </div>
              <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-primary/80">{ART_COORDS[stop.id as keyof typeof ART_COORDS]}</p>
              <p className="mt-4 max-w-md font-body text-base italic text-white/75">{stop.note}</p>
              <p className="mt-3 font-mono text-xs tracking-[0.2em] text-white/60">{stop.window}</p>
              <Link
                href={`/expedition/${stop.id}`}
                className="mt-8 inline-flex items-center gap-2 border border-primary px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                data-testid="route-open"
              >
                {t("route.open")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* The territory's key art, framed like a plate in an atlas. */}
            <div className="col-span-7">
              <div className="relative ml-auto aspect-video w-full max-w-2xl overflow-hidden border border-primary/40 bg-black/40 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                {stops.map((s, i) => (
                  <motion.img
                    key={s.id}
                    src={artSrc(s.id)}
                    alt={i === active ? `${s.title} — ${ART_LABEL}` : ""}
                    decoding="async"
                    loading={i === 0 ? "eager" : "lazy"}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.05 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    data-testid={i === active ? "route-art" : undefined}
                  />
                ))}
                <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {ART_LABEL}
                </span>
              </div>
            </div>
          </div>

          {/* The rail: six ticks, one lit, a thin gold line travelling between
              them. Right padding keeps the last tick clear of the chat button. */}
          <div className="relative pr-24">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-white/15" />
            <motion.div
              className="absolute left-0 top-1/2 h-px w-full origin-left bg-primary"
              style={{ scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
            />
            <div className="relative flex justify-between">
              {stops.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={s.title}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex flex-col items-center gap-2 bg-transparent"
                  data-testid={`route-tick-${s.id}`}
                >
                  <span
                    className={`block h-3 w-3 rotate-45 border transition-colors ${
                      i <= active ? "border-primary bg-primary" : "border-white/40 bg-black"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                      i === active ? "text-primary" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {s.code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticJourney({ stops }: { stops: readonly JourneyStop[] }) {
  const { t } = useLanguage();
  return (
    <section id="route" className="relative py-16 md:py-20" data-testid="section-route" data-route-mode="static">
      <div className="px-6">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">{t("route.kicker")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl" style={{ textWrap: "balance" }}>
            {t("route.title")}
          </h2>
          <p className="mt-3 max-w-2xl font-body text-muted-foreground">{t("route.description")}</p>
        </div>
      </div>

      <div className="mt-8 px-6">
        <div className="relative mx-auto aspect-[21/9] max-w-7xl overflow-hidden border border-primary/30">
          <picture>
            <source media="(max-width: 700px)" srcSet={MASTER_CHART_MOBILE} />
            <img src={MASTER_CHART} alt="" decoding="async" className="h-full w-full object-cover" data-testid="route-chart" />
          </picture>
          <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{ART_LABEL}</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]" style={{ scrollSnapType: "x mandatory" }}>
        <div className="mx-auto flex w-max gap-4 lg:max-w-7xl">
          {stops.map((s) => (
            <Link
              key={s.id}
              href={`/expedition/${s.id}`}
              className="group w-[78vw] max-w-[22rem] shrink-0 border border-border bg-card"
              style={{ scrollSnapAlign: "start" }}
              data-testid={`route-stop-${s.id}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={artSrc(s.id)} alt={`${s.title} — ${ART_LABEL}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] tracking-[0.25em] text-primary">
                  {s.code} — {s.country.toUpperCase()}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">{s.title}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">{s.window}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
