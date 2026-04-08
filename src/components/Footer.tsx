import { siteConfig } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a1a] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#555] text-sm font-display font-medium">
          {siteConfig.name}
        </p>
        <p className="text-[#333] text-sm">
          © {year} — Built with React + Vite
        </p>
      </div>
    </footer>
  );
}
