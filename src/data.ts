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
    skills: [
      "React 18",
      "Vite",
      "Code Splitting",
      "Design Systems",
      "Monorepos",
    ],
  },
  {
    category: "Backend & Data",
    skills: ["Node.js", "GraphQL", "WebSockets", "Elixir"],
  },
  {
    category: "AI & Cloud",
    skills: ["AWS Bedrock", "Generative AI"],
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
    title: "Portfolio",
    description:
      "Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Deployed to GitHub Pages.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion"],
    live: "https://barindebnath.github.io/portfolio",
    github: "https://github.com/barindebnath/portfolio",
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
