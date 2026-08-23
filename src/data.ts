export const siteConfig = {
  name: "Barin Debnath",
  role: "Senior Software Engineer",
  location: "India",
  email: "barindebnath@gmail.com",
  bio: "I build scalable, high-performance frontend systems with a strong focus on React, TypeScript, and user experience. Recently promoted at Xplor Technologies for driving impactful initiatives across frontend architecture, performance, and AI-powered features.",
  social: {
    github: "https://github.com/barindebnath",
    linkedin: "https://www.linkedin.com/in/barin-d",
    instagram: "https://www.instagram.com/barin.jitu",
  },
};

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Styled Components",
      "A11y",
    ],
  },
  {
    category: "Architecture & Perf",
    skills: ["Vite", "Code Splitting", "Design Systems", "Monorepos"],
  },
  {
    category: "Backend & Data",
    skills: ["Node.js", "GraphQL", "WebSockets", "Elixir"],
  },
  {
    category: "AI & Cloud",
    skills: ["AWS", "Generative AI"],
  },
  {
    category: "Observability",
    skills: ["Sentry", "Coralogix", "Unleash", "LinearB"],
  },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Waypoint",
    description:
      "Personal status tracker and external memory for developers. Tracks Jira cards from development to production through a milestone pipeline with sub-task checklists, Tempo timesheet attestation, and agent API support.",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Better Auth",
      "Tailwind",
    ],
    live: "https://waypoint-bd.vercel.app",
    github: "https://github.com/barindebnath/waypoint",
  },
  {
    title: "Torch Room",
    description:
      "Interactive 3D isometric dark room simulation built with Elixir and Phoenix LiveView, featuring dynamic radial lighting, surface reflections, and a real-time cursor-tracking flashlight.",
    tags: [
      "Elixir",
      "Phoenix LiveView",
      "Tailwind",
      "Bandit",
      "WebSockets",
    ],
    live: "https://torch-room.fly.dev",
    github: "https://github.com/barindebnath/torch_room",
  },
  {
    title: "Storybook TS",
    description:
      "Component library with Storybook — a showcase of reusable, well-documented UI components built with React and TypeScript.",
    tags: ["React", "TypeScript", "Storybook"],
    github: "https://github.com/barindebnath/storybook-ts",
  },
  {
    title: "jVocab",
    description:
      "Japanese vocabulary learning app with interactive flashcards, progress tracking, and quiz modes designed for effective retention.",
    tags: ["JavaScript", "React"],
    github: "https://github.com/barindebnath/jVocab",
  },
  {
    title: "Advanced React Hooks",
    description:
      "Deep-dive into advanced React patterns — custom hooks, compound components, render props, and performance optimization techniques.",
    tags: ["React", "TypeScript", "Hooks"],
    github: "https://github.com/barindebnath/advanced-react-hooks",
  },
  {
    title: "Portfolio",
    description:
      "A cinematic digital CV and project showcase. Blends interactive 3D graphics with fluid motion design to create a memorable browsing experience.",
    tags: [
      "React",
      "Three.js",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Framer Motion",
    ],
    live: "https://barindebnath.github.io/portfolio",
    github: "https://github.com/barindebnath/portfolio",
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Xplor Technologies",
    role: "Senior Software Engineer",
    period: "Mar 2024 – Present",
    highlights: [
      "Led React 18 migration + Vite upgrade → reduced build times ~40%",
      "Integrated AWS Bedrock (GenAI) for AI-assisted workflows",
      "Implemented feature flagging with Unleash for safe rollouts",
      "Improved observability using Coralogix + user context logging",
      "Delivered full-stack features across React + Node.js / GraphQL",
    ],
  },
  {
    company: "AdroitCoders",
    role: "Frontend Developer",
    period: "Sep 2021 – Mar 2024",
    highlights: [
      "Scaled platform to 1M+ users",
      "Drove Next.js adoption, improving SEO and load performance",
      "Optimized rendering & state management across core product flows",
    ],
  },
  {
    company: "AxelBuzz Tech Solutions",
    role: "Frontend Developer",
    period: "Dec 2020 – Sep 2021",
    highlights: [
      "Built modular UI components with React + Material UI",
      "Integrated REST APIs and improved legacy app performance",
    ],
  },
  {
    company: "Puspendu Studio",
    role: "Freelance Developer",
    period: "Sep 2019 – Aug 2020",
    highlights: [
      "Delivered responsive web apps using HTML, CSS, JS, and Bootstrap",
    ],
  },
];
