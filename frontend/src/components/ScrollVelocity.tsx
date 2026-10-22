import React, { useEffect, useState } from 'react';

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts,
  velocity = 20,
  className = ''
}) => {
  const [scrollSpeedMultiplier, setScrollSpeedMultiplier] = useState(1);

  // Speed up marquee dynamically on user scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      const boost = Math.min(Math.max(delta / 12, 1), 3.5);
      setScrollSpeedMultiplier(boost);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollSpeedMultiplier(1);
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const durationRow1 = Math.max(velocity / scrollSpeedMultiplier, 8);
  const durationRow2 = Math.max((velocity * 1.2) / scrollSpeedMultiplier, 10);

  // Repeat texts to ensure seamless infinite loops
  const repeatedText1 = Array(4).fill(texts).flat();
  const repeatedText2 = Array(4).fill([...texts].reverse()).flat();

  return (
    <div className={`relative w-full overflow-hidden py-8 select-none ${className}`}>
      {/* Edge gradient masks for seamless bleed */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#08090d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#08090d] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Leftward Scroll */}
      <div className="overflow-hidden whitespace-nowrap mb-3 flex">
        <div
          className="flex gap-8 items-center"
          style={{
            animation: `marquee-scroll ${durationRow1}s linear infinite`,
            display: 'flex',
            width: 'max-content'
          }}
        >
          {repeatedText1.map((item, idx) => (
            <div key={`r1-${idx}`} className="flex items-center gap-6">
              <span className="text-3xl sm:text-5xl font-extrabold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-400 hover:text-indigo-400 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-indigo-500/50 text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Rightward Scroll (Outlined Sleek Typography) */}
      <div className="overflow-hidden whitespace-nowrap flex">
        <div
          className="flex gap-8 items-center"
          style={{
            animation: `marquee-scroll-reverse ${durationRow2}s linear infinite`,
            display: 'flex',
            width: 'max-content'
          }}
        >
          {repeatedText2.map((item, idx) => (
            <div key={`r2-${idx}`} className="flex items-center gap-6">
              <span
                className="text-2xl sm:text-4xl font-black tracking-wider uppercase text-transparent hover:text-cyan-400 transition-all cursor-default"
                style={{
                  WebkitTextStroke: '1px rgba(148, 163, 184, 0.35)',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {item}
              </span>
              <span className="text-cyan-500/40 text-lg">⬩</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
