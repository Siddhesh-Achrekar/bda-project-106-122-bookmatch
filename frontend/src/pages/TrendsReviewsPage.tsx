import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FlightStatusCard } from '../components/FlightStatusCard';
import { LiquidChromeBackground } from '../components/LiquidChromeBackground';
import { ClosingPlasmaBackground } from '../components/ClosingPlasmaBackground';
import { CURRENT_JOURNEY, READING_ANALYTICS, COMMUNITY_REVIEWS } from '../data/readingProgressData';
import { BarChart3, TrendingUp, BookOpen, Star, ThumbsUp, Sparkles, Award, Compass, Heart } from 'lucide-react';

export const TrendsReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState(COMMUNITY_REVIEWS);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const handleLike = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(likedReviews.filter((r) => r !== id));
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: r.likes - 1 } : r))
      );
    } else {
      setLikedReviews([...likedReviews, id]);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* 1. Componentry Liquid Chrome Dynamic Canvas Background Layer */}
      <LiquidChromeBackground className="z-0 opacity-30" intensity={0.5} />

      {/* 2. Componentry Closing Plasma Dynamic Ripple Layer */}
      <ClosingPlasmaBackground className="z-0 opacity-25" speed={0.8} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Passenger Log & Community Trends</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Trends & Reading Journey
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Track your real-time literary boarding pass, examine reading velocity metrics,
            and inspect community sentiment analysis on model recommendations.
          </p>
        </div>

        {/* 3. Componentry Flight Status Card (Repurposed for Reading Journey) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Active Literary Flight Pass</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Interactive Slider: Drag to log pages
            </span>
          </div>

          <FlightStatusCard initialJourney={CURRENT_JOURNEY} />
        </div>

        {/* Analytics Grid: Reading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-mono">Yearly Goal</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {READING_ANALYTICS.totalBooksReadThisYear}{' '}
              <span className="text-base font-normal text-slate-500">/ {READING_ANALYTICS.yearlyGoal}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{
                  width: `${(READING_ANALYTICS.totalBooksReadThisYear / READING_ANALYTICS.yearlyGoal) * 100}%`
                }}
              />
            </div>
            <div className="text-[11px] text-amber-300 font-mono mt-2">76% of Annual Target Reached</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-mono">Pages Cruised</span>
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {READING_ANALYTICS.totalPagesCruised.toLocaleString()}
            </div>
            <div className="text-[11px] text-indigo-300 font-mono mt-3">
              Across 38 Finished Volumes
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-mono">Avg Daily Velocity</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {READING_ANALYTICS.averageVelocityPagesDay}{' '}
              <span className="text-xs font-normal text-slate-400">pgs/day</span>
            </div>
            <div className="text-[11px] text-emerald-300 font-mono mt-3">+18% vs last month</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-mono">Model Accuracy</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {READING_ANALYTICS.modelMatchRate}
            </div>
            <div className="text-[11px] text-cyan-300 font-mono mt-3">Based on 5-Star Reviews</div>
          </div>
        </div>

        {/* Charts & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Monthly Velocity Bar Chart */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <span>Monthly Reading Velocity (Pages)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Pages logged per month throughout 2026</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded-full">
                PEAK: 2,500 pgs
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="flex items-end justify-between gap-3 h-48 pt-8 px-2 border-b border-slate-800">
              {READING_ANALYTICS.monthlyStats.map((stat, i) => {
                const max = 2500;
                const heightPercent = (stat.pages / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {stat.pages}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600/40 via-indigo-500 to-cyan-400 group-hover:brightness-125 transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                      {stat.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Genre Affinity Radar */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Aesthetic Affinity Profile
              </h3>
              <p className="text-xs text-slate-400 mb-6">Vector breakdown of books consumed</p>

              <div className="space-y-4">
                {READING_ANALYTICS.genreBreakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                      <span>{item.genre}</span>
                      <span className="font-mono" style={{ color: item.color }}>
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Primary cluster:</span>
              <span className="text-indigo-400 font-semibold font-mono">
                {READING_ANALYTICS.favoriteAesthetic}
              </span>
            </div>
          </div>
        </div>

        {/* Community Reviews Feed */}
        <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>Reader Reviews & Sentiment Insights</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time feedback on collaborative filtering recommendations from verified bibliophiles.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              Sentiment: 96% Positive
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => {
              const isLiked = likedReviews.includes(rev.id);
              return (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex flex-col justify-between hover:border-indigo-500/40 transition-all"
                >
                  <div>
                    {/* Header: User avatar + book */}
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={rev.avatar}
                        alt={rev.user}
                        className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          {rev.user}
                          {rev.verifiedReader && (
                            <span className="text-[10px] text-cyan-400 font-mono">✓ Verified</span>
                          )}
                        </h4>
                        <span className="text-[11px] text-indigo-300 font-medium line-clamp-1">
                          on "{rev.bookTitle}"
                        </span>
                      </div>
                    </div>

                    {/* Sentiment Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                        {rev.sentiment}
                      </span>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span>{rev.date}</span>
                    <button
                      onClick={() => handleLike(rev.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-red-500/20 border-red-500/40 text-red-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-400' : ''}`} />
                      <span>{rev.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
