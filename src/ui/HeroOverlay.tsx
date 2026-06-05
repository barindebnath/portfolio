// HTML overlay for the Hero section — sits on top of the canvas inside
// the hero scroll spacer. The 3D scene shows the name + accent; this
// overlay carries the bio paragraph and the CTAs, which need to be real
// accessible HTML for keyboard + screen reader users.

import { siteConfig } from "../data";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-24 px-6">
      <div className="max-w-xl text-center mb-8">
        <p className="text-muted leading-relaxed text-base">
          {siteConfig.bio}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
        <button
          onClick={() => smoothScrollTo("projects")}
          className="px-7 py-3 rounded-lg bg-accent text-text-on-accent font-display font-semibold text-sm tracking-wide hover:bg-accent-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
        >
          View Work
        </button>
        <button
          onClick={() => smoothScrollTo("contact")}
          className="px-7 py-3 rounded-lg border border-border text-muted font-display font-semibold text-sm tracking-wide hover:border-accent/40 hover:text-text transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
        >
          Contact
        </button>
      </div>

      <div className="mt-10 text-accent text-xs font-display font-semibold tracking-[0.2em] uppercase opacity-70">
        {siteConfig.location} · Available for opportunities
      </div>
    </div>
  );
}
