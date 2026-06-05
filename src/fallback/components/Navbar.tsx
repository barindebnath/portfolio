import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setRenderMode } from "../../renderMode";
import ThemeToggle from "../../ui/ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-display font-bold text-lg text-text tracking-tight hover:text-accent transition-colors duration-200"
        >
          BD
        </a>

        <ul className="flex items-center gap-6 md:gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} className="hidden sm:block">
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-sm font-medium text-muted hover:text-text transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="hidden lg:block">
            <button
              type="button"
              onClick={() => setRenderMode("rich")}
              className="text-xs font-medium text-muted hover:text-accent hover:border-accent border border-border rounded-full px-3 py-1 tracking-wide transition-colors duration-200 cursor-pointer"
              title="Render the immersive 3D version"
            >
              Switch to 3D
            </button>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
