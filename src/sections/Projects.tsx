import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
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

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as never });

  return (
    <section id="projects" ref={ref} className="py-28 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionLabel>Projects</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-[#f0f0f0] mt-2 mb-10">
            Selected work
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
