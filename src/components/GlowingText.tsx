interface GlowingTextProps {
    text: string;
    className?: string;
}

export function GlowingText({ text, className = '' }: GlowingTextProps) {
    return (
        <span className={`relative ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 blur-lg opacity-50 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
                {text}
            </span>
        </span>
    );
}