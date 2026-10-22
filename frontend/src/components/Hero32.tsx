import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Zap, BookOpen, Layers } from 'lucide-react';

interface Hero32Props {
  onExploreRecommend: () => void;
  onExploreBooks: () => void;
}

export const Hero32: React.FC<Hero32Props> = ({
  onExploreRecommend,
  onExploreBooks
}) => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Floating Announcement Pill (Hero-32 style) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-200 text-xs sm:text-sm font-medium mb-8 backdrop-blur-xl shadow-[0_0_25px_rgba(99,102,241,0.25)] hover:border-indigo-400/50 transition-all cursor-pointer"
          onClick={onExploreRecommend}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="text-slate-300">Powered by Collaborative Filtering & k-NN Vectors</span>
          <span className="text-indigo-400 font-semibold flex items-center gap-1">
            Explore Recommendations <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]"
        >
          Discover Your Next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
            Literary Obsession
          </span>{' '}
          With Mathematical Precision
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Move beyond generic bestseller lists. Our collaborative filtering algorithm measures
          reader affinities, rating vectors, and thematic resonance across 742+ literary volumes.
        </motion.p>

        {/* Call to Actions (Hero 32 style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onExploreRecommend}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-indigo-400/30 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Show Recommendations</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onExploreBooks}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Browse Library Index</span>
          </button>
        </motion.div>

        {/* Social Proof / Stats Ticker (Hero-32 element) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80"
        >
          <div className="p-4 rounded-2xl glass-panel">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.4%</div>
            <div className="text-xs text-indigo-400 font-medium mt-1">Cosine Precision</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">10,000+</div>
            <div className="text-xs text-purple-400 font-medium mt-1">Volumes Analyzed</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">48ms</div>
            <div className="text-xs text-cyan-400 font-medium mt-1">k-NN Query Latency</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">50,000+</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Active Readers</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
