import React from 'react';
import { Sparkles, Heart, GitBranch, Cpu, ShieldCheck } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06070a] text-slate-400 py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📚</span>
            <span className="font-bold text-white tracking-tight text-lg">
              Book<span className="text-indigo-400">Match</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-mono border border-indigo-500/20">
              BDA Edition
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Multidimensional book recommender engineered with collaborative filtering matrix factorization and semantic embeddings.
          </p>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors cursor-pointer">Home</button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors cursor-pointer">All Books</button>
          <button onClick={() => onNavigate('discover')} className="hover:text-white transition-colors cursor-pointer">Discover</button>
          <button onClick={() => onNavigate('recommend')} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">AI Recommend</button>
          <button onClick={() => onNavigate('trends')} className="hover:text-white transition-colors cursor-pointer">Trends & Journey</button>
        </div>

        {/* Tech Badges */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>k-NN Vector Space</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Cosine Similarity</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 BookMatch Intelligence. Designed for avid bibliophiles.</p>
        <p className="flex items-center justify-center gap-1 text-[11px]">
          Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for seamless literary discovery.
        </p>
      </div>
    </footer>
  );
};
