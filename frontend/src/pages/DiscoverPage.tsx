import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnnotatedText } from '../components/AnnotatedText';
import { Book, POPULAR_BOOKS } from '../data/booksData';
import { BookCover } from '../components/BookCover';
import { Sparkles, Compass, Lightbulb, Star, ArrowRight, Bookmark, SlidersHorizontal, BookOpen, Layers } from 'lucide-react';

interface DiscoverPageProps {
  onSelectBook: (book: Book) => void;
  onRecommendSimilar: (book: Book) => void;
}

const MOODS = [
  { id: 'all', label: 'All Atmospheres', icon: '🌌' },
  { id: 'cyber', label: 'Neon & Dystopian', icon: '⚡' },
  { id: 'mind', label: 'Mind-Bending & Cosmic', icon: '🌀' },
  { id: 'poetic', label: 'Lyrical & Introspective', icon: '📜' },
  { id: 'high-stakes', label: 'High Adrenaline & Wit', icon: '🚀' }
];

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onSelectBook,
  onRecommendSimilar
}) => {
  const [selectedMood, setSelectedMood] = useState('all');
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);

  // Filter books based on mood
  const filteredBooks = POPULAR_BOOKS.filter((b) => {
    if (selectedMood === 'cyber') return b.genre === 'Cyberpunk' || b.vibe.includes('Neon Noir');
    if (selectedMood === 'mind') return b.genre === 'Hard Sci-Fi' || b.vibe.includes('Mind-Bending');
    if (selectedMood === 'poetic') return b.genre === 'Speculative Fiction' || b.genre === 'Magical Realism';
    if (selectedMood === 'high-stakes') return b.genre === 'Sci-Fi Thriller' || b.vibe.includes('High Adrenaline');
    return true;
  });

  const spotlightBook = filteredBooks[activeSpotlightIndex] || filteredBooks[0] || POPULAR_BOOKS[0];

  return (
    <div className="min-h-screen pb-24">
      {/* Page Header */}
      <div className="relative border-b border-slate-800/80 bg-gradient-to-b from-indigo-950/30 via-slate-950 to-[#08090d] py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Annotated Exploration Chamber</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Discover Through Annotated Synopses
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Move past superficial blurbs. Hover over highlighted phrases, circles, and markers
            below to unveil machine-extracted thematic insights, world-building secrets, and literary tropes.
          </p>

          {/* Mood Filter Pill Group */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMood(m.id);
                  setActiveSpotlightIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  selectedMood === m.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/50'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        {/* Main Curator's Spotlight Section (Using AnnotatedText) */}
        <div className="relative rounded-3xl bg-slate-900/50 border border-slate-700/80 p-6 sm:p-10 shadow-2xl overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="font-bold uppercase tracking-wider">
                FEATURED ANNOTATED SPOTLIGHT • VOLUME {activeSpotlightIndex + 1} OF {filteredBooks.length}
              </span>
            </div>

            {/* Quick switcher buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {filteredBooks.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setActiveSpotlightIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSpotlightIndex === i
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {b.title}
                </button>
              ))}
            </div>
          </div>

          {/* Spotlight Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Cover & Quick Specs */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div
                onClick={() => onSelectBook(spotlightBook)}
                className="relative w-56 sm:w-64 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-2 border-slate-700 cursor-pointer group"
              >
                <div className="w-full h-full">
                  <BookCover
                    title={spotlightBook.title}
                    author={spotlightBook.author}
                    coverUrl={spotlightBook.coverUrl}
                    fallbackUrl={spotlightBook.fallbackCoverUrl}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 left-3 right-3 text-center py-2 px-3 rounded-xl bg-black/75 backdrop-blur-md text-xs font-semibold text-white border border-white/10 group-hover:border-indigo-400 transition-colors">
                  Click for Full Inspection
                </div>
              </div>

              {/* Vibe Chips */}
              <div className="flex flex-wrap gap-1.5 mt-4 max-w-64">
                {spotlightBook.vibe.map((v, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700"
                  >
                    #{v}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Detailed Annotated View */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{spotlightBook.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {spotlightBook.ratingsCount.toLocaleString()} ratings
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-indigo-400 font-mono">
                    {spotlightBook.genre}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {spotlightBook.title}
                </h2>
                <p className="text-sm text-indigo-300 font-medium mb-4">
                  Written by {spotlightBook.author} ({spotlightBook.year})
                </p>

                <p className="text-sm italic text-slate-400 mb-6 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                  "{spotlightBook.tagline}"
                </p>

                {/* THE ANNOTATED TEXT COMPONENT IN ACTION */}
                <div className="bg-[#0b0d17] p-6 rounded-2xl border border-slate-800/90 shadow-inner mb-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3 pb-2 border-b border-slate-800">
                    <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Interactive Synopsis
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Hover glowing items for details
                    </span>
                  </div>

                  <AnnotatedText
                    text={spotlightBook.synopsis}
                    annotations={spotlightBook.annotatedKeywords}
                    className="text-base sm:text-lg leading-relaxed text-slate-200"
                  />
                </div>

                {/* Legend of Annotation Types */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="font-mono text-slate-500 uppercase text-[10px]">Annotation Key:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 border-b-2 border-purple-500 text-white font-medium text-[11px]">
                      Highlight
                    </span>
                    <span>= Core Archetype</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="underline decoration-wavy decoration-cyan-400 font-medium text-white text-[11px]">
                      Underline
                    </span>
                    <span>= Plot Tension</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full border border-indigo-400 text-indigo-300 text-[10px]">
                      Circle
                    </span>
                    <span>= World Lore</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onRecommendSimilar(spotlightBook)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Recommendations for this Book</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => onSelectBook(spotlightBook)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Full Chapter Index</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* More Curated Discovery Grid */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>More Explorations in this Realm</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {filteredBooks.slice(0, 3).map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group"
              >
                <div className="h-44 rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                    fallbackUrl={book.fallbackCoverUrl}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-400 mb-2">{book.author}</p>
                <div className="text-xs text-slate-500 line-clamp-2">
                  {book.synopsis}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
