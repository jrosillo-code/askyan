import { useEffect, useRef, useState } from "react";

// The Road — the brand mark turned structural motif. A thin gold path that
// draws itself as you travel down the page, winding between sections the way
// the logo's road winds to the horizon. Pure SVG + one scroll listener;
// hidden on small screens (no room in the margin) and fully drawn for
// reduced-motion users.
export function RoadPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
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
    const path = pathRef.current;
    const el = wrapRef.current?.parentElement;
    if (!path || !el || !geometry) return;
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      path.style.strokeDashoffset = "0";
      return;
    }
    let raf = 0;
    const draw = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: how far the viewport has traveled through this container.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.4)));
      path.style.strokeDashoffset = `${L * (1 - progress)}`;
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
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-y-0 left-2 z-0 hidden w-20 lg:block">
      {geometry && (
        <svg width="80" height={geometry.h} viewBox={`0 0 80 ${geometry.h}`} fill="none" className="absolute inset-0">
          <path
            ref={pathRef}
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
