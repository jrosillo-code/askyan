import { useEffect } from "react";

// Ambient background/card videos decode continuously even when scrolled far
// out of view — on long pages that decode load is what makes scrolling feel
// ragged. Any <video data-ambient> on the page gets paused offscreen and
// resumed as it approaches the viewport. Reduced-motion users get stills.
export function useAmbientVideos() {
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-ambient]"));
    if (videos.length === 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && !reduced) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "160px" }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
}
