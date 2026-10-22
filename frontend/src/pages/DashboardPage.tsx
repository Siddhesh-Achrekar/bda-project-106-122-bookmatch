import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollVelocity } from '../components/ScrollVelocity';
import { Book, POPULAR_BOOKS, ALL_DATASET_BOOKS, VELOCITY_GENRES } from '../data/booksData';
import { BookCover } from '../components/BookCover';
import { Search, Star, ArrowUpDown, Sparkles, Bookmark, BookOpen } from 'lucide-react';
import { PageId } from '../components/Navbar';

interface DashboardPageProps {
  onSelectBook: (book: Book) => void;
  onRecommendSimilar: (book: Book) => void;
  onNavigate: (page: PageId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSelectBook,
  onRecommendSimilar
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'year' | 'title'>('reviews');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(24);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Convert dataset books into unified Book format
  const allFormattedBooks = useMemo<Book[]>(() => {
    return ALL_DATASET_BOOKS.map((raw, idx) => {
      // Check if it's already in curated POPULAR_BOOKS
      const curated = POPULAR_BOOKS.find((p) => p.title.toLowerCase() === raw.title.toLowerCase());
      if (curated) return curated;

      return {
        id: `db-${raw.isbn || idx}`,
        title: raw.title,
        author: raw.author,
        year: raw.year,
        genre: 'Literature & Fiction',
        subgenres: ['Best-Seller', 'Popular Fiction'],
        rating: 4.5,
        ratingsCount: raw.numOfRating || 50,
        pages: 320,
        coverUrl: raw.openLibraryUrl,
        fallbackCoverUrl: raw.imageUrl,
        tagline: `Published by ${raw.publisher || 'Acclaimed Press'} in ${raw.year}.`,
        synopsis: `${raw.title} is an acclaimed work by ${raw.author}, featured in the collaborative filtering benchmark dataset with ${raw.numOfRating} verified reader ratings.`,
        annotatedKeywords: [
          { phrase: raw.author, type: 'highlight', annotation: 'Author Profile', color: '#8b5cf6' },
          { phrase: 'reader ratings', type: 'circle', annotation: `${raw.numOfRating} Collaborative Ratings`, color: '#06b6d4' }
        ],
        vibe: ['Recommended', 'Bestseller'],
        isbn: raw.isbn,
        publisher: raw.publisher
      };
    });
  }, []);

  const filteredBooks = useMemo(() => {
    return allFormattedBooks
      .filter((book) => {
        const query = searchQuery.toLowerCase();
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          (book.publisher && book.publisher.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'reviews') return b.ratingsCount - a.ratingsCount;
        if (sortBy === 'year') return b.year - a.year;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return b.rating - a.rating;
      });
  }, [allFormattedBooks, searchQuery, sortBy]);

  const displayedBooks = filteredBooks.slice(0, visibleCount);

  return (
    <div className="min-h-screen pb-24">
      {/* 1. Velocity Genre Streamer */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
            ✦ Velocity Genre Streamer
          </span>
        </div>
        <ScrollVelocity texts={VELOCITY_GENRES} velocity={28} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real Books Dataset • 742 Volumes</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              All Books in Dataset
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Browse through the authentic 742 books from the ML dataset. Search by title, author, or publisher, and click to view nearest neighbor recommendations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 742 real books or authors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters and Sort Controls */}
        <div className="flex items-center justify-between gap-4 py-4 mb-8 border-y border-slate-800/80">
          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-bold">{Math.min(visibleCount, filteredBooks.length)}</span> of{' '}
            <span className="text-indigo-400 font-bold">{filteredBooks.length}</span> titles
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="reviews">Most Rated in Dataset</option>
              <option value="year">Publication Year</option>
              <option value="title">Title (A-Z)</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedBooks.map((book) => {
              const isSaved = bookmarkedIds.includes(book.id);
              return (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectBook(book)}
                  className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_15px_35px_-10px_rgba(99,102,241,0.25)] transition-all overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Book Cover Container with Fallback */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                    <BookCover
                      title={book.title}
                      author={book.author}
                      coverUrl={book.coverUrl}
                      fallbackUrl={book.fallbackCoverUrl}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Bookmark button */}
                    <button
                      onClick={(e) => toggleBookmark(book.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                        isSaved
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-black/60 border-white/10 text-slate-300 hover:text-white hover:bg-black/80'
                      }`}
                      aria-label="Bookmark"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                    {/* Ratings in dataset */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold backdrop-blur-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{book.ratingsCount} ratings</span>
                    </div>

                    {/* Year Tag */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-[10px] font-mono backdrop-blur-md">
                      {book.year > 0 ? book.year : 'Classic'}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-indigo-300/80 mb-2 font-medium line-clamp-1">by {book.author}</p>
                      {book.publisher && (
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {book.publisher}
                        </p>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        ISBN: {book.isbn || 'N/A'}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRecommendSimilar(book);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold flex items-center gap-1 transition-all"
                        title="Get recommendations based on this book"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>Recommend</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredBooks.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
            >
              Load More Books ({filteredBooks.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-base mb-2">No volumes found matching "{searchQuery}".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
