import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Compass, Clock, CheckCircle2, Bookmark, BarChart2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ReadingFlightStatus } from '../data/readingProgressData';

interface FlightStatusCardProps {
  initialJourney: ReadingFlightStatus;
  className?: string;
}

export const FlightStatusCard: React.FC<FlightStatusCardProps> = ({
  initialJourney,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(initialJourney.currentPage);
  const totalPages = initialJourney.totalPages;
  const progressPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));

  // Dynamic remaining reading time calculation
  const remainingPages = Math.max(0, totalPages - currentPage);
  const hoursLeft = (remainingPages / initialJourney.readingSpeedPagesPerHour).toFixed(1);

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-75" />

      {/* Main Boarding Pass Ticket Container */}
      <div className="relative rounded-3xl bg-[#0c0e17] border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-slate-200">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                Reading Journey Boarding Pass
              </span>
              <h4 className="text-sm font-bold text-white tracking-wide">
                BOOKMATCH EXPEDITION • PASSENGER LOG
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              {progressPercent === 100 ? 'ARRIVED' : initialJourney.boardingStatus}
            </span>
          </div>
        </div>

        {/* Departure & Arrival Sector */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {/* Origin */}
            <div className="text-center sm:text-left flex-1">
              <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wider">
                CH. 01
              </div>
              <div className="text-xs text-indigo-400 font-semibold uppercase mt-0.5">
                Departure Chapter
              </div>
              <div className="text-xs text-slate-400 line-clamp-1 mt-1">
                {initialJourney.originChapter}
              </div>
            </div>

            {/* Flight Path Graphic */}
            <div className="flex flex-col items-center justify-center px-4 w-full sm:w-auto">
              <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{hoursLeft}h remaining</span>
              </div>

              <div className="relative w-48 sm:w-56 flex items-center">
                {/* Track Line */}
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Animated Flight Icon */}
                <div
                  className="absolute -top-3 transform -translate-x-1/2 transition-all duration-300 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  style={{ left: `${progressPercent}%` }}
                >
                  <Plane className="w-6 h-6 rotate-90" />
                </div>
              </div>

              <div className="text-[10px] font-mono text-emerald-400 mt-2 font-bold tracking-wider">
                {progressPercent}% CRUISED ({currentPage} / {totalPages} PAGES)
              </div>
            </div>

            {/* Destination */}
            <div className="text-center sm:text-right flex-1">
              <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wider">
                FINIS
              </div>
              <div className="text-xs text-indigo-400 font-semibold uppercase mt-0.5">
                Target Horizon
              </div>
              <div className="text-xs text-slate-400 line-clamp-1 mt-1">
                {initialJourney.destinationChapter}
              </div>
            </div>
          </div>

          {/* Book Title Highlight */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Currently Navigating
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {initialJourney.bookTitle}
                <Bookmark className="w-4 h-4 text-indigo-400 fill-indigo-400/30" />
              </h3>
              <p className="text-xs text-slate-400">by {initialJourney.author}</p>
            </div>

            {/* Interactive Progress Slider */}
            <div className="w-full sm:w-64">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                <span>Update Current Page</span>
                <span className="text-cyan-400 font-bold">{currentPage} p.</span>
              </div>
              <input
                type="range"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Boarding Pass Flight Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Flight / Book ID</span>
              <span className="text-sm font-mono font-bold text-white">{initialJourney.flightCode}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Gate / Shelf</span>
              <span className="text-sm font-mono font-bold text-white">{initialJourney.gate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Seat / Edition</span>
              <span className="text-sm font-mono font-bold text-white">{initialJourney.seatClass}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Velocity</span>
              <span className="text-sm font-mono font-bold text-emerald-400">
                {initialJourney.readingSpeedPagesPerHour} pgs/hr
              </span>
            </div>
          </div>

          {/* Route Milestones */}
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider block mb-3">
              Journey Waypoints
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {initialJourney.routeStops.map((stop, i) => {
                const reached = currentPage >= stop.page;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-all ${
                      reached
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${reached ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="truncate">{stop.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Perforated Ticket Notches & Tear Line */}
        <div className="relative w-full h-6 flex items-center justify-between">
          {/* Left cutout notch */}
          <div className="w-6 h-6 -ml-3 rounded-full bg-[#08090d] border-r border-slate-800" />
          {/* Dashed perforation */}
          <div className="w-full border-b-2 border-dashed border-slate-800" />
          {/* Right cutout notch */}
          <div className="w-6 h-6 -mr-3 rounded-full bg-[#08090d] border-l border-slate-800" />
        </div>

        {/* Bottom Barcode Section */}
        <div className="px-8 py-5 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <div className="text-xs text-slate-400">
              <span className="font-mono font-bold text-slate-200">TICKET #{initialJourney.ticketNumber}</span>
              <span className="block text-[10px] text-slate-500">Neural Sync Verified • Daily Streak {initialJourney.currentStreakDays} Days</span>
            </div>
          </div>

          {/* Authentic Stylized Barcode Graphic */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 h-8 px-2 py-1 bg-white/10 rounded">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 2, 1, 2, 3, 1, 4, 2].map((w, idx) => (
                <div
                  key={idx}
                  className="h-full bg-slate-200 rounded-xs"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">SCAN-ID: 7899-44-BOOKMATCH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
