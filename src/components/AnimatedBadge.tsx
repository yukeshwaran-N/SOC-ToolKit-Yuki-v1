interface AnimatedBadgeProps {
    text: string;
    className?: string;
}

export function AnimatedBadge({ text, className = '' }: AnimatedBadgeProps) {
    return (
        <span className={`px-2 py-1 text-xs font-mono bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 text-primary rounded-md border border-primary/50 animate-pulse ${className}`}>
            {text}
        </span>
    );
}