import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SkillBadge from "../components/SkillBadge";
import { siteConfig, skillGroups } from "../data";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as never });

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionLabel>About</SectionLabel>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 mt-10">
            {/* Bio */}
            <div>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-[#f0f0f0] mb-6">
                Building things that{" "}
                <span className="text-[#e8ff47]">perform</span>.
              </h2>
              <p className="text-[#777] text-base leading-relaxed">
                {siteConfig.bio}
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              {skillGroups.map(({ category, skills }) => (
                <div key={category}>
                  <p className="text-xs font-display font-semibold uppercase tracking-widest text-[#444] mb-3">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
