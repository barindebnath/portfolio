interface SkillBadgeProps {
  skill: string;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-block text-sm px-3 py-1.5 rounded-lg bg-surface border border-border text-muted font-medium hover:border-accent/30 hover:text-accent transition-all duration-200 cursor-default">
      {skill}
    </span>
  );
}
