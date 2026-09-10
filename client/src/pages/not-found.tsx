import { Link } from "wouter";
import { SharedHeader } from "@/components/shared-header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
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
