import { IOCType } from '@/lib/ioc-detection';
import { cn } from '@/lib/utils';
import { Globe, Server, Link, Mail, Hash, FileText, Shield } from 'lucide-react';

interface IOCTypeBadgeProps {
  type: IOCType;
  hashType?: 'md5' | 'sha1' | 'sha256';
  className?: string;
}

const typeConfig: Record<IOCType, { label: string; icon: React.ElementType; colorClass: string }> = {
  domain: {
    label: 'DOMAIN',
    icon: Globe,
    colorClass: 'bg-cyber-green/20 text-primary border-primary/50',
  },
  ip: {
    label: 'IPv4',
    icon: Server,
    colorClass: 'bg-cyber-blue/20 text-secondary border-secondary/50',
  },
  url: {
    label: 'URL',
    icon: Link,
    colorClass: 'bg-cyber-purple/20 text-accent border-accent/50',
  },
  email: {
    label: 'EMAIL',
    icon: Mail,
    colorClass: 'bg-cyber-orange/20 text-cyber-orange border-cyber-orange/50',
  },
  hash: {
    label: 'HASH',
    icon: Hash,
    colorClass: 'bg-cyber-red/20 text-cyber-red border-cyber-red/50',
  },
  text: {
    label: 'TEXT',
    icon: FileText,
    colorClass: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
};

export function IOCTypeBadge({ type, hashType, className }: IOCTypeBadgeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const label = type === 'hash' && hashType ? `${hashType.toUpperCase()}` : config.label;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-xs font-semibold uppercase tracking-wider',
        config.colorClass,
        className
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
}

export function IOCTypeBadgeLarge({ type, hashType, className }: IOCTypeBadgeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const label = type === 'hash' && hashType ? `${hashType.toUpperCase()} HASH` : config.label;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 px-4 py-2 rounded-lg border font-mono text-sm font-bold uppercase tracking-wider',
        config.colorClass,
        'shadow-lg',
        className
      )}
    >
      <Shield className="w-5 h-5" />
      <Icon className="w-5 h-5" />
      <span>{label} DETECTED</span>
    </div>
  );
}
