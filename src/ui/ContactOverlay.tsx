// HTML overlay for the Contact section.
//
// The 3D scene carries the headline + email; this overlay adds the
// keyboard-accessible mailto + social links so the section is usable
// without ever interacting with the canvas.

import { siteConfig } from "../data";

export default function ContactOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-24 px-6">
      <p className="text-accent text-xs font-display font-semibold tracking-[0.3em] uppercase opacity-80 mb-3">
        Contact
      </p>

      <div className="flex flex-col items-center gap-4 pointer-events-auto">
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-text text-base font-display tracking-wide opacity-80 hover:opacity-100 transition-opacity"
        >
          {siteConfig.email}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="px-7 py-3 rounded-lg bg-accent text-text-on-accent font-display font-semibold text-sm tracking-wide hover:bg-accent-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
        >
          Email me
        </a>

        <div className="flex items-center gap-6 text-sm text-muted">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            GitHub
          </a>
          <span className="opacity-30">·</span>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            LinkedIn
          </a>
          <span className="opacity-30">·</span>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
