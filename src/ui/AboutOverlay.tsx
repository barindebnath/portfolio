// HTML overlay for the About section.
//
// Two-column layout: text content in the left ~40%, 3D skill ring lives
// in the right ~60% (offset in world space — see About.tsx). This keeps
// the bio readable instead of fighting the rotating badges underneath.

import { siteConfig } from "../data";

export default function AboutOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center px-6 sm:px-12 lg:px-20">
      <div className="w-full sm:max-w-[42%] text-left">
        <p className="text-accent text-xs font-display font-semibold tracking-[0.3em] uppercase opacity-80 mb-4">
          About
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-6 leading-[1.05]">
          {siteConfig.role}
        </h2>
        <p className="text-muted leading-relaxed text-base sm:text-lg">
          {siteConfig.bio}
        </p>
      </div>
    </div>
  );
}
