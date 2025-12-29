import { LookupSource } from '@/lib/lookup-sources';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LookupCardProps {
  source: LookupSource;
  value: string;
  index: number;
}

export function LookupCard({ source, value, index }: LookupCardProps) {
  const url = source.getUrl(value);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50',
        'hover:bg-card hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--cyber-green)/0.2)]',
        'transition-all duration-300 animate-fade-in'
      )}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-muted-foreground font-mono text-xs font-bold">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {source.name}
          </h3>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            {source.category}
          </p>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  );
}

interface LookupGridProps {
  sources: LookupSource[];
  value: string;
}

export function LookupGrid({ sources, value }: LookupGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {sources.map((source, index) => (
        <LookupCard key={source.name} source={source} value={value} index={index} />
      ))}
    </div>
  );
}
