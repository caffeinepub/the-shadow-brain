import { BrainCircuit } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer className="mt-auto border-t border-border/40 py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
          <BrainCircuit className="h-3.5 w-3.5 text-primary/50" />
          <span>The Shadow Brain — Privacy-First Context Engine</span>
        </div>
        <p className="text-muted-foreground text-xs font-mono">
          © {year}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
