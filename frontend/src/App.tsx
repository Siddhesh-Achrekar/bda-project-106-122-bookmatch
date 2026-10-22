import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { RecommendPage } from './pages/RecommendPage';
import { TrendsReviewsPage } from './pages/TrendsReviewsPage';
import { BookDetailModal } from './components/BookDetailModal';
import { Book } from './data/booksData';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [selectedBookForModal, setSelectedBookForModal] = useState<Book | null>(null);
  const [seedBookForRecommend, setSeedBookForRecommend] = useState<Book | null>(null);

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleRecommendSimilar = (book: Book) => {
    setSeedBookForRecommend(book);
    setCurrentPage('recommend');
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectBook={(book) => setSelectedBookForModal(book)}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onSelectBook={(book) => setSelectedBookForModal(book)}
            onRecommendSimilar={handleRecommendSimilar}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {currentPage === 'discover' && (
          <DiscoverPage
            onSelectBook={(book) => setSelectedBookForModal(book)}
            onRecommendSimilar={handleRecommendSimilar}
          />
        )}

        {currentPage === 'recommend' && (
          <RecommendPage
            initialBook={seedBookForRecommend}
            onSelectBook={(book) => setSelectedBookForModal(book)}
          />
        )}

        {currentPage === 'trends' && <TrendsReviewsPage />}
      </main>

      {/* Book Inspection Modal */}
      <BookDetailModal
        book={selectedBookForModal}
        onClose={() => setSelectedBookForModal(null)}
        onRecommendSimilar={handleRecommendSimilar}
      />

      {/* Dark Sleek Footer */}
      <Footer onNavigate={(page) => setCurrentPage(page)} />
    </div>
  );
}

export default App;
