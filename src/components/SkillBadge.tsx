interface SkillBadgeProps {
  skill: string;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-block text-sm px-3 py-1.5 rounded-lg bg-[#141414] border border-[#222] text-[#ccc] font-medium hover:border-[#e8ff47]/30 hover:text-[#e8ff47] transition-all duration-200 cursor-default">
      {skill}
    </span>
  );
}
