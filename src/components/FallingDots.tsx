import { useEffect, useState } from 'react';

interface Dot {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
}

export function FallingDots() {
    const [dots, setDots] = useState<Dot[]>([]);

    useEffect(() => {
        // Initialize dots
        const initialDots: Dot[] = [];
        for (let i = 0; i < 15; i++) {
            initialDots.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.3 + 0.1,
            });
        }
        setDots(initialDots);

        // Animation loop
        const interval = setInterval(() => {
            setDots((prevDots) =>
                prevDots.map((dot) => {
                    let newY = dot.y + dot.speed;
                    if (newY > 100) {
                        newY = 0;
                    }
                    return { ...dot, y: newY };
                })
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {dots.map((dot) => (
                <div
                    key={dot.id}
                    className="absolute rounded-full bg-primary"
                    style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        opacity: dot.opacity,
                        boxShadow: '0 0 8px rgba(var(--primary), 0.5)',
                    }}
                />
            ))}
        </div>
    );
}