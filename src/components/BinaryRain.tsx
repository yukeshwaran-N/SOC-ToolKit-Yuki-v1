import { useEffect, useState } from 'react';

interface BinaryChar {
    id: number;
    char: string;
    x: number;
    y: number;
    speed: number;
    opacity: number;
}

const binaryChars = ['.', '.', '0', '1'];

export function BinaryRain() {
    const [chars, setChars] = useState<BinaryChar[]>([]);

    useEffect(() => {
        // Create initial binary rain with very low opacity
        const initialChars: BinaryChar[] = [];
        for (let i = 0; i < 20; i++) {
            initialChars.push({
                id: i,
                char: binaryChars[Math.floor(Math.random() * binaryChars.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: Math.random() * 0.3 + 0.1, // Very slow
                opacity: Math.random() * 0.6 + 0.6, // VERY low opacity: 0.02-0.1
            });
        }
        setChars(initialChars);

        // Animation interval
        const interval = setInterval(() => {
            setChars((prevChars) =>
                prevChars.map((char) => {
                    let newY = char.y + char.speed;
                    if (newY > 100) {
                        // Reset to top with new properties
                        return {
                            ...char,
                            char: binaryChars[Math.floor(Math.random() * binaryChars.length)],
                            x: Math.random() * 100,
                            y: 0,
                            speed: Math.random() * 0.3 + 0.1,
                            opacity: Math.random() * 0.08 + 0.02,
                        };
                    }
                    return { ...char, y: newY };
                })
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {chars.map((char) => (
                <div
                    key={char.id}
                    className="absolute font-mono text-primary transition-all duration-300 ease-linear"
                    style={{
                        left: `${char.x}%`,
                        top: `${char.y}%`,
                        opacity: char.opacity, // Very low opacity here
                        fontSize: '12px',
                        filter: 'blur(0.5px)', // Subtle blur for even softer look
                    }}
                >
                    {char.char}
                </div>
            ))}
        </div>
    );
}