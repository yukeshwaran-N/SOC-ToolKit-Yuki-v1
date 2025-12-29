import { useEffect, useState } from 'react';
import { Shield, Terminal, Cpu, Radar, Lock, Database, Network, Fingerprint } from 'lucide-react';

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('Initializing SOC Toolkit...');
    const [dots, setDots] = useState('');
    const [currentIcon, setCurrentIcon] = useState(0);

    const icons = [Shield, Database, Network, Fingerprint, Cpu, Terminal];

    useEffect(() => {
        // Animate progress bar - SLOWER
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 0.5; // Slower increment
            });
        }, 50); // Longer interval

        // Animate loading text dots - SLOWER
        const textInterval = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 800); // Slower dot animation

        // Rotate icons - SLOWER
        const iconInterval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % icons.length);
        }, 1500); // Slower icon rotation

        // Update loading text based on progress - SLOWER
        const textChangeInterval = setInterval(() => {
            if (progress < 20) setText('Initializing Security Framework...');
            else if (progress < 40) setText('Loading Threat Intelligence Database...');
            else if (progress < 60) setText('Establishing Secure Connections...');
            else if (progress < 80) setText('Calibrating IOC Detection Modules...');
            else if (progress < 95) setText('Finalizing Security Protocols...');
            else setText('Environment Ready for Investigation');
        }, 2000); // Slower text updates

        return () => {
            clearInterval(interval);
            clearInterval(textInterval);
            clearInterval(iconInterval);
            clearInterval(textChangeInterval);
        };
    }, [progress]);

    const CurrentIcon = icons[currentIcon];

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, hsl(var(--primary)/0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, hsl(var(--primary)/0.03) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* Slow floating particles */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-primary/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            animation: `float-ultra-slow ${Math.random() * 30 + 20}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Central loading animation */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-10">
                {/* Large animated icon container */}
                <div className="relative">
                    {/* Outer glow pulse - SLOWER */}
                    <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-full animate-pulse"
                        style={{ animationDuration: '4s' }} />

                    {/* Concentric rings - SLOWER */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Ring 3 - Slowest */}
                        <div className="absolute w-40 h-40 border border-primary/10 rounded-full animate-spin-slowest" />

                        {/* Ring 2 */}
                        <div className="absolute w-36 h-36 border border-primary/20 rounded-full animate-spin-slower"
                            style={{ animationDirection: 'reverse' }} />

                        {/* Ring 1 */}
                        <div className="absolute w-32 h-32 border border-primary/30 rounded-full animate-spin-slow" />

                        {/* Central icon */}
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20">
                            <CurrentIcon className="w-12 h-12 text-primary animate-pulse"
                                style={{ animationDuration: '2s' }} />

                            {/* Small rotating accent */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyber-blue/30 border border-cyber-blue/50 animate-spin"
                                style={{ animationDuration: '8s' }} />
                        </div>
                    </div>
                </div>

                {/* Loading text section */}
                <div className="text-center space-y-6">
                    {/* Title with slow gradient */}
                    <div className="flex items-center justify-center gap-4">
                        <Terminal className="w-7 h-7 text-primary animate-pulse"
                            style={{ animationDuration: '3s' }} />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-cyber-blue to-primary bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient-x-slow">
                            SOC Analyst Toolkit
                        </h1>
                        <Cpu className="w-7 h-7 text-cyber-blue animate-pulse"
                            style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                    </div>

                    {/* Dynamic loading text */}
                    <div className="h-10 flex items-center justify-center">
                        <p className="text-xl font-mono text-foreground font-medium">
                            {text}
                            <span className="inline-block w-12 text-primary">{dots}</span>
                        </p>
                    </div>
                </div>

                {/* Progress bar section */}
                <div className="w-96 max-w-full space-y-4">
                    {/* Progress bar */}
                    <div className="relative h-3 bg-terminal-bg/50 rounded-full overflow-hidden border border-border/30">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shine-slow" />

                        {/* Progress fill with gradient */}
                        <div
                            className="h-full bg-gradient-to-r from-primary via-cyber-blue to-primary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Scanning effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"
                                style={{ animationDuration: '3s' }} />

                            {/* Glimmer effect */}
                            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                        </div>

                        {/* Progress markers */}
                        <div className="absolute inset-0 flex justify-between px-2">
                            {[0, 25, 50, 75, 100].map((mark) => (
                                <div key={mark} className="relative">
                                    <div className={`w-1 h-3 ${progress >= mark ? 'bg-primary' : 'bg-border'}`} />
                                    {progress >= mark && (
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-primary">
                                            {mark}%
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress info */}
                    <div className="flex justify-between items-center px-1">
                        <div className="text-left">
                            <p className="text-xs font-mono text-muted-foreground">STATUS</p>
                            <p className="text-sm font-mono text-primary font-medium">
                                {progress < 30 ? 'INITIALIZING' :
                                    progress < 60 ? 'LOADING' :
                                        progress < 90 ? 'CALIBRATING' :
                                            'READY'}
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-2xl font-mono font-bold text-primary animate-pulse-subtle">
                                {Math.round(progress)}%
                            </p>
                            <p className="text-[10px] font-mono text-muted-foreground mt-1">COMPLETE</p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-mono text-muted-foreground">MODE</p>
                            <p className="text-sm font-mono text-cyber-green font-medium">PASSIVE OSINT</p>
                        </div>
                    </div>
                </div>

                {/* Module loading indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[
                        { label: 'IOC DETECT', color: 'primary', icon: Fingerprint },
                        { label: 'THREAT DB', color: 'cyber-blue', icon: Database },
                        { label: 'NETWORK', color: 'cyber-purple', icon: Network },
                        { label: 'SECURITY', color: 'cyber-green', icon: Shield }
                    ].map((module, index) => {
                        const Icon = module.icon;
                        const isLoaded = progress > (index + 1) * 20;

                        return (
                            <div
                                key={module.label}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-1000 ${isLoaded
                                    ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/10'
                                    : 'bg-card/30 border-border/30'
                                    }`}
                            >
                                <div className={`relative ${isLoaded ? 'animate-pulse-subtle' : ''}`}>
                                    <Icon className={`w-5 h-5 ${isLoaded
                                        ? `text-${module.color}`
                                        : 'text-muted-foreground'
                                        }`} />
                                    {isLoaded && (
                                        <div className="absolute -inset-1 bg-primary/10 rounded-full animate-ping"
                                            style={{ animationDuration: '2s' }} />
                                    )}
                                </div>
                                <div>
                                    <p className={`text-sm font-mono font-medium ${isLoaded ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                        {module.label}
                                    </p>
                                    <p className="text-xs font-mono text-muted-foreground">
                                        {isLoaded ? 'ACTIVE' : 'LOADING'}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Status messages - SLOWER */}

            </div>

            {/* Bottom info */}
            {/* Bottom info - Removed duplicate footer */}
            <div className="absolute bottom-8 text-center space-y-2">
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
                    <span>v1.0</span>
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    <span>SECURE CONNECTION</span>
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    <span>ENCRYPTED</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">
                    Developed by <span className="text-primary font-bold">yukesh</span> • SOC Investigation Toolkit
                </p>
                <p className="text-[10px] font-mono text-muted-foreground mt-2 opacity-70">
                    Loading time: {Math.round((progress / 100) * 8)}s / ~8s
                </p>
            </div>
        </div>
    );
}
