import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles, Eye, RotateCw } from 'lucide-react';
import { Book } from '../data/booksData';
import { BookCover } from './BookCover';

interface Spiral3DSliderProps {
  books: Book[];
  onSelectBook?: (book: Book) => void;
}

export const Spiral3DSlider: React.FC<Spiral3DSliderProps> = ({ books, onSelectBook }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const numItems = books.length;
  const anglePerItem = 360 / numItems;
  // Radius calculation for the 3D cylinder
  const radius = 340; // distance in Z-plane

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || hoveredIndex !== null) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => prev - 0.4);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotating, hoveredIndex]);

  const handlePrev = () => {
    setIsAutoRotating(false);
    setRotationAngle((prev) => prev + anglePerItem);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setRotationAngle((prev) => prev - anglePerItem);
  };

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Cylindrical 3D Showcase • Curated Masterpieces</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2 tracking-tight">
        Explore Top-Rated Dimensions
      </h2>
      <p className="text-sm text-slate-400 mb-10 text-center max-w-lg">
        Drag, rotate, or hover over any volume to inspect its literary coordinates and ML affinity score.
      </p>

      {/* 3D Scene Viewport */}
      <div
        className="relative w-full max-w-[1000px] h-[480px] flex items-center justify-center"
        style={{ perspective: '1100px' }}
      >
        {/* Carousel Rotator Ring */}
        <div
          className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(-6deg) rotateY(${rotationAngle}deg)`
          }}
        >
          {books.map((book, idx) => {
            const itemAngle = idx * anglePerItem;
            // Calculate effective angle relative to camera view
            const currentTotalAngle = (itemAngle + rotationAngle) % 360;
            const normalizedAngle = (currentTotalAngle + 360) % 360;
            const isFacingFront = normalizedAngle > 300 || normalizedAngle < 60;

            return (
              <div
                key={book.id}
                className="absolute w-[180px] sm:w-[210px] h-[290px] sm:h-[320px] cursor-pointer transition-all duration-300"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: isFacingFront ? 1 : 0.45,
                  filter: isFacingFront ? 'brightness(1)' : 'brightness(0.65)'
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectBook?.(book)}
              >
                {/* Book Card Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group hover:border-indigo-400/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300">
                  {/* Book Cover Image */}
                  <div className="w-full h-[70%] overflow-hidden bg-slate-950">
                    <BookCover
                      title={book.title}
                      author={book.author}
                      coverUrl={book.coverUrl}
                      fallbackUrl={book.fallbackCoverUrl}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/60 to-transparent" />

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>

                  {/* Genre Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] font-medium backdrop-blur-md">
                    {book.genre}
                  </div>

                  {/* Book Meta at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 flex flex-col justify-end">
                    <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-1">{book.author}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{book.year}</span>
                      <span className="flex items-center gap-1 text-indigo-400 font-medium">
                        <Eye className="w-3 h-3" /> Inspect
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3D Floor Reflection / Shadow */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-indigo-500/20 rounded-full blur-md opacity-60 pointer-events-none"
                  style={{ transform: 'rotateX(90deg)' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-4 mt-6 z-10">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-slate-900/80 hover:bg-indigo-600/30 border border-slate-700/60 hover:border-indigo-500/60 text-slate-300 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
          aria-label="Previous Book"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
          <span>{isAutoRotating ? 'Auto-Orbiting' : 'Paused'}</span>
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-slate-900/80 hover:bg-indigo-600/30 border border-slate-700/60 hover:border-indigo-500/60 text-slate-300 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
          aria-label="Next Book"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
