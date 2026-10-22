import React, { useRef, useEffect } from 'react';

interface LiquidChromeProps {
  className?: string;
  intensity?: number;
}

export const LiquidChromeBackground: React.FC<LiquidChromeProps> = ({
  className = '',
  intensity = 0.6
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      t += 0.015;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Create multi-layer liquid chrome gradient ripples
      const grad = ctx.createRadialGradient(
        width / 2 + Math.sin(t * 0.7) * (width * 0.25),
        height / 2 + Math.cos(t * 0.5) * (height * 0.2),
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );

      grad.addColorStop(0, `rgba(168, 85, 247, ${0.18 * intensity})`);
      grad.addColorStop(0.35, `rgba(59, 130, 246, ${0.14 * intensity})`);
      grad.addColorStop(0.7, `rgba(6, 182, 212, ${0.08 * intensity})`);
      grad.addColorStop(1, 'rgba(8, 9, 13, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw metallic chrome contour waves
      ctx.lineWidth = 1.5;
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const yOffset = (height / (waveCount + 1)) * (i + 1);
        ctx.strokeStyle = `rgba(192, 132, 252, ${0.12 * intensity * (1 - i / waveCount)})`;

        for (let x = 0; x <= width; x += 15) {
          const y =
            yOffset +
            Math.sin(x * 0.005 + t + i) * 35 +
            Math.cos(x * 0.002 - t * 0.8) * 25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
};
