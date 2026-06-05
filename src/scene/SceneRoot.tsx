// Mounts the persistent R3F canvas + Lenis smooth-scroll + the scroll-driven
// section spacers that take real DOM space (so the page actually scrolls).
//
// The Canvas is fixed-positioned behind the spacers; each spacer is one
// viewport tall and serves as the scroll surface for its corresponding 3D
// "room". 2D HTML overlays (CTA buttons, etc.) live inside each spacer so
// they scroll naturally with the section.

import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LenisProvider } from "./LenisProvider";
import { useLenis } from "./useLenis";
import { CameraRig } from "./CameraRig";
import { Effects } from "./Effects";
import { sections } from "./constants";
import { updateScrollState } from "./scrollState";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";
import HeroOverlay from "../ui/HeroOverlay";
import AboutOverlay from "../ui/AboutOverlay";
import ProjectsOverlay from "../ui/ProjectsOverlay";
import ExperienceOverlay from "../ui/ExperienceOverlay";
import ContactOverlay from "../ui/ContactOverlay";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { useTheme } from "../theme";

// DPR cap pulled in from 1.6 → 1.3. The 1.6 ceiling on a 4K/Retina display
// pushes the bloom mipmap chain + multiple postprocessing render targets
// past what mid-tier GPUs will hand us, which is the most common cause of
// "WebGL context lost". 1.3 still looks crisp on Retina.
const dpr: [number, number] = [1, 1.3];

function ScrollListener({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    // Lenis emits a `scroll` event with the current scroll + dimensions
    // every animation frame the page is moving.
    const handler = (e: { scroll: number; limit: number }) => {
      const progress = e.limit > 0 ? e.scroll / e.limit : 0;
      updateScrollState(progress, sections.length);
    };
    lenis.on("scroll", handler);
    return () => {
      lenis.off("scroll", handler);
    };
  }, [lenis]);

  return <>{children}</>;
}

function SceneCanvas() {
  const theme = useTheme();
  const bgColor = "#0a0a0a";

  // Bump the key on context-loss to force a fresh Canvas mount. The browser
  // hands us a dead WebGL context after loss; trying to keep using it will
  // silently render nothing. A remount gets a new context cleanly.
  const [canvasKey, setCanvasKey] = useState(0);

  const handleCreated = useCallback(
    ({ gl }: { gl: { domElement: HTMLCanvasElement } }) => {
      const onLost = (e: Event) => {
        e.preventDefault();
        console.warn("[scene] WebGL context lost — remounting canvas");
        setCanvasKey((k) => k + 1);
      };
      gl.domElement.addEventListener("webglcontextlost", onLost, false);
    },
    [],
  );

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        key={canvasKey}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 200 }}
        onCreated={handleCreated}
      >
        {theme === "dark" && <color attach="background" args={[bgColor]} />}
        <fog attach="fog" args={[bgColor, 12, 42]} />
        <ambientLight intensity={theme === "light" ? 0.85 : 0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={theme === "light" ? 0.7 : 0.6}
        />

        <CameraRig />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />

        <Effects />
      </Canvas>
    </div>
  );
}

export default function SceneRoot() {
  return (
    <LenisProvider>
      <ScrollListener>
        <SceneCanvas />

        <Navbar />

        {/* Each spacer is one viewport tall — the scroll across them is what
            drives the camera. Overlays inside each spacer are real HTML
            (clickable, accessible, screen-reader friendly). */}
        <main>
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scene-section"
              data-section={s.id}
            >
              {s.id === "hero" && <HeroOverlay />}
              {s.id === "about" && <AboutOverlay />}
              {s.id === "projects" && <ProjectsOverlay />}
              {s.id === "experience" && <ExperienceOverlay />}
              {s.id === "contact" && <ContactOverlay />}
            </section>
          ))}
        </main>

        <Footer />
      </ScrollListener>
    </LenisProvider>
  );
}
