import { Link } from "wouter";
import { SharedHeader } from "@/components/shared-header";
import { MASTER_CHART, MASTER_CHART_MOBILE } from "@/lib/art";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet={MASTER_CHART_MOBILE} />
          <img src={MASTER_CHART} alt="" className="art-drift h-full w-full object-cover opacity-60" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      <SharedHeader variant="transparent" />
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">Off the map</span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-wide text-foreground">
          This trail doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md font-serif italic text-muted-foreground">
          Even the best guides take a wrong turn. Let&apos;s get you back to camp.
        </p>
        <Link
          href="/"
          className="mt-8 border border-primary px-8 py-3 font-display text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Return home
        </Link>
      </main>
    </div>
  );
}
