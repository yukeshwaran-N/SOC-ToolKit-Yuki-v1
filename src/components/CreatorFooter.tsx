import { Github, Linkedin, Search } from 'lucide-react';

export function CreatorFooter() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
      <span>Created by</span>
      <a
        href="https://www.google.com/search?q=Yukesh"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-semibold"
      >
        <Search className="w-3 h-3" />
        Yukesh
      </a>
      <span className="text-border">|</span>
      <a
        href="https://www.linkedin.com/in/yukeshwaran-n-4b170b247/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-cyber-blue hover:text-cyber-blue/80 transition-colors"
      >
        <Linkedin className="w-3.5 h-3.5" />
        LinkedIn
      </a>
      <a
        href="https://github.com/yukeshwaran-N"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="w-3.5 h-3.5" />
        GitHub
      </a>
    </div>
  );
}
