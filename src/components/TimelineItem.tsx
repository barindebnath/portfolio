import { motion } from "framer-motion";
import type { ExperienceItem } from "../data";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({
  item,
  index,
  isLast,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
      className="relative flex gap-6 pb-10"
    >
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[7px] top-5 w-px bg-[#222] h-full" />
      )}

      {/* Dot */}
      <div className="relative z-10 mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 border-[#e8ff47] bg-[#0a0a0a]" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <div>
            <h3 className="font-display font-semibold text-[#f0f0f0] text-base leading-tight">
              {item.role}
            </h3>
            <p className="text-[#e8ff47] text-sm font-medium mt-0.5">
              {item.company}
            </p>
          </div>
          <span className="text-xs text-[#555] font-medium bg-[#141414] border border-[#222] px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
            {item.period}
          </span>
        </div>

        <ul className="space-y-1.5">
          {item.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm text-[#777] leading-relaxed"
            >
              <span className="text-[#e8ff47]/50 mt-1 flex-shrink-0">—</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
