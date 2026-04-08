import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "../components/BrandIcons";
import { siteConfig } from "../data";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: InstagramIcon,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="w-6 h-px bg-[#e8ff47]" />
      <span className="text-xs font-display font-semibold uppercase tracking-widest text-[#e8ff47]">
        {children}
      </span>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as never });

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionLabel>Contact</SectionLabel>

          <div className="mt-6 max-w-lg">
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-[#f0f0f0] mb-4">
              Let's build something.
            </h2>
            <p className="text-[#666] text-base leading-relaxed mb-10">
              I'm selectively open to new roles and interesting projects. Drop a
              line if you'd like to work together or just say hi.
            </p>

            {/* Email CTA */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg border border-[#2a2a2a] text-[#aaa] font-display font-semibold text-sm hover:border-[#e8ff47]/50 hover:text-[#e8ff47] transition-all duration-200 mb-12"
            >
              <Mail
                size={15}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              {siteConfig.email}
            </a>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#222] text-[#555] hover:border-[#e8ff47]/40 hover:text-[#e8ff47] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
