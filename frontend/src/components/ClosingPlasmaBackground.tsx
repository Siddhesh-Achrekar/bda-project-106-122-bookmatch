import React, { useRef, useEffect } from 'react';

interface ClosingPlasmaProps {
  className?: string;
  speed?: number;
}

export const ClosingPlasmaBackground: React.FC<ClosingPlasmaProps> = ({
  className = '',
  speed = 1.0
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.008 * speed;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw plasma rings closing in & pulsing
      const ringCount = 6;
      for (let r = 0; r < ringCount; r++) {
        const radius =
          ((r * 80 + time * 60) % (Math.max(width, height) * 0.75)) + 30;
        const alpha = Math.max(
          0,
          Math.min(0.2, (1 - radius / (Math.max(width, height) * 0.75)) * 0.25)
        );

        ctx.beginPath();
        ctx.arc(
          cx + Math.sin(time + r) * 40,
          cy + Math.cos(time * 0.7 + r) * 30,
          radius,
          0,
          Math.PI * 2
        );

        const colors = [
          `rgba(99, 102, 241, ${alpha})`,
          `rgba(168, 85, 247, ${alpha * 0.9})`,
          `rgba(6, 182, 212, ${alpha * 0.8})`
        ];

        ctx.strokeStyle = colors[r % colors.length];
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full opacity-60 ${className}`}
    />
  );
};
