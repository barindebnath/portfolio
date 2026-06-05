import { siteConfig } from "../../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-6 bg-bg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-muted text-sm font-display font-medium">
          {siteConfig.name}
        </p>
        <p className="text-muted/60 text-sm">
          © {year} — Built with React + Vite
        </p>
      </div>
    </footer>
  );
}
