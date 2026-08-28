import React, { useMemo } from 'react';

export const BackgroundEffects: React.FC = () => {
  // Generate falling hearts across screen
  const fallingHearts = useMemo(() => {
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '💘', '🌹', '✨'];
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      symbol: heartSymbols[i % heartSymbols.length],
      left: `${(i * 3.1) % 96 + 2}%`,
      size: (i % 4) * 4 + 14, // 14px to 26px
      duration: (i % 6) * 1.5 + 7, // 7s to 15s
      delay: (i % 9) * 0.8, // staggered start
      drift: ((i % 5) - 2) * 15,
    }));
  }, []);

  // Floating sparkling glowing dots
  const glowDots = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 19) % 94 + 3}%`,
      top: `${(i * 27) % 92 + 4}%`,
      size: (i % 3) + 3,
      duration: (i % 4) + 3,
      delay: (i % 5) * 0.6,
      color: i % 2 === 0 ? '#ff4b6e' : '#f43f5e',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#080306]">
      {/* Deep Romantic Neon Red & Pink Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[520px] h-[520px] rounded-full bg-[#e11d48] opacity-25 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[520px] h-[520px] rounded-full bg-[#be123c] opacity-30 blur-[150px]" />
      <div className="absolute top-[35%] left-[5%] w-[380px] h-[380px] rounded-full bg-[#f43f5e] opacity-20 blur-[120px]" />
      <div className="absolute top-[65%] right-[10%] w-[340px] h-[340px] rounded-full bg-[#ff4b6e] opacity-20 blur-[110px]" />

      {/* Subtle Romantic Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 12c-2.5-4-8-3-8 1.5 0 3.5 8 9.5 8 9.5s8-6 8-9.5c0-4.5-5.5-5.5-8-1.5z' fill='%23ff4b6e' fill-opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Falling Hearts Rain */}
      {fallingHearts.map((h) => (
        <div
          key={h.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: h.left,
            top: '-20px',
            fontSize: `${h.size}px`,
            animation: `fallHeart ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.6))',
          }}
        >
          {h.symbol}
        </div>
      ))}

      {/* Floating Glowing Sparkle dots */}
      {glowDots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            boxShadow: `0 0 10px ${dot.color}, 0 0 20px ${dot.color}`,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
