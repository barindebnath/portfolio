// HTML overlay for the Experience section.
//
// Eyebrow + heading pinned to the top; the 3D timeline occupies the
// vertical center. Kept terse so it doesn't fight the scrolling orb column.

export default function ExperienceOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center pt-20 px-6">
      <p className="text-accent text-xs font-display font-semibold tracking-[0.3em] uppercase opacity-80 mb-3">
        Experience
      </p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight text-center leading-[1.05] max-w-2xl">
        Where I&apos;ve shipped.
      </h2>
    </div>
  );
}
