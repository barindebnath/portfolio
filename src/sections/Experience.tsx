import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import TimelineItem from "../components/TimelineItem";
import { experience } from "../data";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

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

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as never });

  return (
    <section id="experience" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionLabel>Experience</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-[#f0f0f0] mt-2 mb-12">
            Where I've worked
          </h2>
        </motion.div>

        <div className="max-w-2xl">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.company}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
