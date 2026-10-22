import React from 'react';
import { motion } from 'framer-motion';
import { Hero32 } from '../components/Hero32';
import { Spiral3DSlider } from '../components/Spiral3DSlider';
import { Book, POPULAR_BOOKS } from '../data/booksData';
import { Sparkles, Brain, Cpu, Compass, ArrowRight, Zap, Star, ShieldCheck } from 'lucide-react';
import { PageId } from '../components/Navbar';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
  onSelectBook: (book: Book) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectBook
}) => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section: OriginKit Hero 32 */}
      <Hero32
        onExploreRecommend={() => onNavigate('recommend')}
        onExploreBooks={() => onNavigate('dashboard')}
      />

      {/* 2. Componentry Spiral 3D Slider: Showcase Top-Rated Books */}
      <section className="relative border-y border-slate-800/80 bg-gradient-to-b from-[#08090d] via-[#0d101d] to-[#08090d]">
        <Spiral3DSlider books={POPULAR_BOOKS} onSelectBook={onSelectBook} />
      </section>

      {/* 3. AI Feature Highlights Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>Algorithmic Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Engineered Beyond Keyword Search
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Our recommendation pipeline combines Collaborative Filtering, k-Nearest Neighbors clustering,
            and semantic vector embeddings to understand your exact literary palate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative group p-8 rounded-3xl glass-panel border border-slate-800 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sparse Matrix Factorization</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We decompose user-item interaction matrices to capture latent features—detecting hidden thematic connections that humans rarely articulate.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-indigo-400">
              <span>Cosine Angle Optimization</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group p-8 rounded-3xl glass-panel border border-slate-800 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">k-NN Neighborhood Graph</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Find instant peer clusters in high-dimensional space. Pick any title, and our model extracts the closest 6 literary neighbors in under 50 milliseconds.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-purple-400">
              <span>Sub-50ms Inference</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group p-8 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Serendipity & Novelty Filter</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Avoid echo chambers. Our algorithm injects calibrated cross-genre vectors to surprise you with titles outside your usual comfort zone that you still adore.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-cyan-400">
              <span>Entropy Balancing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Interactive Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to find your next favorite book?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
            Select any book from the dataset, and our collaborative filtering model will recommend 5 top kindred titles.
          </p>
          <button
            onClick={() => onNavigate('recommend')}
            className="px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Show Recommendations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
