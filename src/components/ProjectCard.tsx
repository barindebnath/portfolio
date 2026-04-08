import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col bg-[#111] border border-[#1e1e1e] rounded-xl p-6 h-full hover:border-[#2a2a2a] transition-colors duration-300"
      style={{
        boxShadow: "0 0 0 0 rgba(232,255,71,0)",
        transition:
          "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 40px -8px rgba(232,255,71,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0 0 rgba(232,255,71,0)";
      }}
    >
      <div className="flex-1">
        <h3 className="font-display font-semibold text-lg text-[#f0f0f0] mb-2 group-hover:text-[#e8ff47] transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-[#777] text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-[#1a1a1a] text-[#999] border border-[#252525] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#1a1a1a]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repository for ${project.title}`}
            className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#f0f0f0] transition-colors duration-200"
          >
            <GithubIcon size={14} />
            <span>Code</span>
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo for ${project.title}`}
            className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#e8ff47] transition-colors duration-200"
          >
            <ExternalLink size={14} />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}
