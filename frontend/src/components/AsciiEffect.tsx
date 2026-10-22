import React, { useRef, useEffect, useState } from 'react';

interface AsciiEffectProps {
  src: string;
  alt?: string;
  className?: string;
  resolution?: number; // Lower = higher density
  colorTheme?: 'green' | 'cyan' | 'amber' | 'silver';
  alwaysActive?: boolean;
}

// Density ramp from darkest to brightest
const ASCII_CHARS = ' .:-=+*#%@';

export const AsciiEffect: React.FC<AsciiEffectProps> = ({
  src,
  alt = 'Book Cover',
  className = '',
  resolution = 6,
  colorTheme = 'cyan',
  alwaysActive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [asciiLines, setAsciiLines] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Color theme mapping
  const themeColors = {
    green: {
      text: '#22c55e',
      glow: 'rgba(34, 197, 94, 0.4)',
      bg: 'rgba(5, 20, 10, 0.92)'
    },
    cyan: {
      text: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.4)',
      bg: 'rgba(5, 18, 28, 0.92)'
    },
    amber: {
      text: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.4)',
      bg: 'rgba(28, 18, 5, 0.92)'
    },
    silver: {
      text: '#e2e8f0',
      glow: 'rgba(226, 232, 240, 0.3)',
      bg: 'rgba(12, 14, 20, 0.92)'
    }
  };

  const currentTheme = themeColors[colorTheme];

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const cols = Math.floor(64 / (resolution / 5));
      const rows = Math.floor(cols * 1.35); // aspect compensation

      canvas.width = cols;
      canvas.height = rows;

      ctx.drawImage(img, 0, 0, cols, rows);
      const imgData = ctx.getImageData(0, 0, cols, rows);
      const pixels = imgData.data;

      const lines: string[] = [];
      for (let y = 0; y < rows; y++) {
        let line = '';
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          // Luminance formula
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          const charIdx = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
          line += ASCII_CHARS[charIdx];
        }
        lines.push(line);
      }
      setAsciiLines(lines);
    };

    img.onerror = () => {
      // Fallback if image CORS fails
      setIsLoaded(true);
      const mockLines: string[] = [];
      for (let i = 0; i < 40; i++) {
        let row = '';
        for (let j = 0; j < 35; j++) {
          row += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        }
        mockLines.push(row);
      }
      setAsciiLines(mockLines);
    };
  }, [src, resolution]);

  const active = alwaysActive || isHovered;

  return (
    <div
      className={`relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Original Image */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          active ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* ASCII Art Matrix Display Layer */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center p-2 font-mono text-[6px] sm:text-[7px] leading-[6px] sm:leading-[7px] tracking-tighter select-none transition-opacity duration-300 backdrop-blur-sm ${
          active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: currentTheme.bg,
          color: currentTheme.text,
          textShadow: `0 0 6px ${currentTheme.glow}`
        }}
      >
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-transparent pointer-events-none bg-[length:100%_4px]" />

        {/* Top HUD badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-current text-[8px] tracking-widest uppercase font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
          <span>NEAREST NEIGHBOR MATRIX</span>
        </div>

        {/* Character rows */}
        <div className="whitespace-pre overflow-hidden flex flex-col items-center">
          {asciiLines.slice(0, 36).map((line, i) => (
            <div key={i} className="transition-opacity">
              {line}
            </div>
          ))}
        </div>

        {/* Bottom hover prompt */}
        <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-80 bg-black/50 px-1.5 py-0.5 rounded border border-current/40">
          SIMILARITY: 99.1%
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
