import { useEffect, useRef, useState } from "react";

// The Road — the brand mark turned structural motif. A thin gold path that
// draws itself as you travel down the page, winding between sections the way
// the logo's road winds to the horizon. Pure SVG + one scroll listener;
// hidden on small screens (no room in the margin) and fully drawn for
// reduced-motion users.
export function RoadPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{ h: number; d: string } | null>(null);

  useEffect(() => {
    const el = wrapRef.current?.parentElement;
    if (!el) return;
    const build = () => {
      const h = el.scrollHeight;
      if (!h) return;
      // Alternating S-bends every ~420px between two lanes of an 80px rail.
      const seg = 420;
      const lanes = [22, 58];
      let d = `M ${lanes[0]} 0`;
      let y = 0;
      let i = 0;
      while (y < h) {
        const from = lanes[i % 2];
        const to = lanes[(i + 1) % 2];
        const next = Math.min(y + seg, h);
        const mid = y + (next - y) / 2;
        d += ` C ${from} ${mid}, ${to} ${mid}, ${to} ${next}`;
        y = next;
        i++;
      }
      setGeometry({ h, d });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = wrap?.parentElement;
    if (!wrap || !el || !geometry) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      wrap.style.clipPath = "none";
      return;
    }
    let raf = 0;
    // The reveal is a clip, not a stroke-dash animation. Animating
    // stroke-dashoffset invalidates the path's whole bounding box, and this
    // path is as tall as the page — so every scroll frame was re-rasterising
    // an 80px × several-thousand-px stroke. Because the road only ever
    // descends, cutting it off at a horizontal line is visually identical to
    // walking the dash along it, and the SVG itself never changes: the
    // browser rasterises the road once and just moves the cut.
    const draw = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: how far the viewport has traveled through this container.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.4)));
      wrap.style.clipPath = `inset(0 0 ${((1 - progress) * 100).toFixed(2)}% 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [geometry]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-2 z-0 hidden w-20 will-change-[clip-path] lg:block"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      {geometry && (
        <svg width="80" height={geometry.h} viewBox={`0 0 80 ${geometry.h}`} fill="none" className="absolute inset-0">
          <path
            d={geometry.d}
            stroke="#D4A373"
            strokeOpacity="0.4"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
