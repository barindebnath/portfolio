// Lenis smooth-scroll bridge.
//
// Mounts a Lenis instance, drives its RAF via the GSAP ticker, and bridges
// its scroll events to ScrollTrigger so any future scroll-driven animations
// stay in sync with the smoothed scroll position rather than raw window
// scroll. The instance is stored in a module-level singleton (lenisStore)
// so consumers can read it via useSyncExternalStore without us calling
// setState inside an effect.

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "./lenisStore";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);
    // Expose for e2e/dev tooling — Lenis hijacks wheel + scroll APIs so
    // tests need a way to drive the smoothed scroll deterministically.
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: Lenis }).__lenis = instance;
    }

    return () => {
      setLenis(null);
      gsap.ticker.remove(tick);
      instance.destroy();
    };
  }, []);

  return <>{children}</>;
}
