// HTML overlay for the Projects section.
//
// Sits above the 3D carousel. Heading is pinned to the top quarter of the
// viewport so the cards (centred at viewport mid-height in the 3D scene)
// read as the answer to the question the heading poses.

export default function ProjectsOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center pt-[8vh] px-6">
      <p className="text-accent text-xs font-display font-semibold tracking-[0.3em] uppercase opacity-80 mb-2">
        Selected Work
      </p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight text-center leading-[1.05] max-w-2xl">
        Things I&apos;ve shipped.
      </h2>
    </div>
  );
}
