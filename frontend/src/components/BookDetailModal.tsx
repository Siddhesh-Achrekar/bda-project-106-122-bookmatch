import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Bookmark, Share2, Sparkles, Calendar, BookOpen, User, Check, ExternalLink } from 'lucide-react';
import { Book } from '../data/booksData';
import { AnnotatedText } from './AnnotatedText';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onRecommendSimilar?: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onRecommendSimilar
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (!book) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0c0e17] border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8"
        >
          {/* Top banner visual & Close button */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover blur-md scale-110 opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-[#0c0e17]/80 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge in banner */}
            <div className="absolute top-4 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{book.genre}</span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-6 sm:px-8 pb-8 -mt-24 sm:-mt-32 relative z-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Floating Book Cover */}
              <div className="w-36 sm:w-44 h-52 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 shrink-0 mx-auto sm:mx-0 bg-slate-950">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  fallbackUrl={book.fallbackCoverUrl}
                />
              </div>

              {/* Title & Author Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    ({book.ratingsCount.toLocaleString()} reviews)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {book.title}
                </h2>
                <p className="text-sm sm:text-base text-indigo-300 font-medium mb-3">
                  by {book.author}
                </p>

                <p className="text-xs sm:text-sm text-slate-400 italic mb-4">
                  "{book.tagline}"
                </p>

                {/* Meta chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {book.year}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" /> {book.pages} pages
                  </span>
                  {book.readersCurrent && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                      <User className="w-3.5 h-3.5" /> {book.readersCurrent.toLocaleString()} active readers
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Synopsis with Annotated Text */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Annotated Literary Synopsis (Hover highlights for insights)
              </h4>
              <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80">
                <AnnotatedText
                  text={book.synopsis}
                  annotations={book.annotatedKeywords}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Vibe Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {book.vibe.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700/60"
                >
                  #{v}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isBookmarked
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-400' : ''}`} />
                  <span>{isBookmarked ? 'Saved to Shelf' : 'Add to Shelf'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {onRecommendSimilar && (
                <button
                  onClick={() => {
                    onRecommendSimilar(book);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Run Recommendation on this Book</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
