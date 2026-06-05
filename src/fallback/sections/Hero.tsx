import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "../../data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16"
    >
      {/* Subtle radial gradient behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,255,71,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-6 font-display">
            {siteConfig.location} · Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display font-extrabold text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-tight text-text mb-6"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-display font-semibold text-[clamp(1.1rem,3vw,1.6rem)] text-muted mb-5"
        >
          {siteConfig.role}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="max-w-xl mx-auto text-muted/90 leading-relaxed text-base mb-10"
        >
          {siteConfig.bio}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => scrollToSection("#projects")}
            className="px-7 py-3 rounded-lg bg-accent text-text-on-accent font-display font-semibold text-sm tracking-wide hover:bg-accent-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
          >
            View Work
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="px-7 py-3 rounded-lg border border-border text-muted font-display font-semibold text-sm tracking-wide hover:border-accent/40 hover:text-text transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
          >
            Contact
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted/60 animate-bounce"
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
