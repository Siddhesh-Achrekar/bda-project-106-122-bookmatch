export interface ReadingFlightStatus {
  ticketNumber: string;
  bookTitle: string;
  author: string;
  currentPage: number;
  totalPages: number;
  originChapter: string;
  currentMilestone: string;
  destinationChapter: string;
  currentStreakDays: number;
  readingSpeedPagesPerHour: number;
  estimatedArrivalMinutes: number;
  boardingStatus: 'ON SCHEDULE' | 'CRUISING' | 'EXPEDITED' | 'FINAL APPROACH';
  seatClass: string;
  gate: string;
  flightCode: string;
  routeStops: { name: string; completed: boolean; page: number }[];
}

export const CURRENT_JOURNEY: ReadingFlightStatus = {
  ticketNumber: 'BM-88904-BK',
  bookTitle: 'Dune: The Arrakis Odyssey',
  author: 'Frank Herbert',
  currentPage: 468,
  totalPages: 688,
  originChapter: 'Ch 01 • Departure from Caladan',
  currentMilestone: 'Ch 24 • The Trial of the Sandworm',
  destinationChapter: 'Ch 36 • Reign of Muad\'Dib',
  currentStreakDays: 19,
  readingSpeedPagesPerHour: 52,
  estimatedArrivalMinutes: 254, // ~4.2 hrs
  boardingStatus: 'ON SCHEDULE',
  seatClass: 'PREMIUM HARDCOVER',
  gate: 'TERMINAL 3 • SHELF-B',
  flightCode: 'ARRAKIS-774',
  routeStops: [
    { name: 'Caladan Departure', completed: true, page: 40 },
    { name: 'Arrakeen Arrival', completed: true, page: 180 },
    { name: 'The Betrayal Night', completed: true, page: 320 },
    { name: 'Deep Desert Fremen Sietch', completed: true, page: 440 },
    { name: 'Riding the Maker', completed: false, page: 560 },
    { name: 'The Imperial Summit', completed: false, page: 688 }
  ]
};

export const READING_ANALYTICS = {
  totalBooksReadThisYear: 38,
  yearlyGoal: 50,
  totalPagesCruised: 14280,
  averageVelocityPagesDay: 64,
  favoriteAesthetic: 'Dark Academia & Cyberpunk',
  modelMatchRate: '98.8%',
  monthlyStats: [
    { month: 'Jan', books: 4, pages: 1420 },
    { month: 'Feb', books: 3, pages: 1100 },
    { month: 'Mar', books: 5, pages: 1890 },
    { month: 'Apr', books: 4, pages: 1540 },
    { month: 'May', books: 6, pages: 2300 },
    { month: 'Jun', books: 5, pages: 1920 },
    { month: 'Jul', books: 4, pages: 1610 },
    { month: 'Aug', books: 7, pages: 2500 }
  ],
  genreBreakdown: [
    { genre: 'Sci-Fi / Cyberpunk', percentage: 42, color: '#6366f1' },
    { genre: 'Dark Academia', percentage: 24, color: '#8b5cf6' },
    { genre: 'Magical Realism', percentage: 18, color: '#ec4899' },
    { genre: 'Philosophical Speculative', percentage: 16, color: '#06b6d4' }
  ]
};

export interface ReviewItem {
  id: string;
  user: string;
  avatar: string;
  bookTitle: string;
  rating: number;
  sentiment: 'Extremely Bullish' | 'Masterpiece' | 'Thought-Provoking' | 'Mesmerizing';
  date: string;
  comment: string;
  likes: number;
  verifiedReader: boolean;
}

export const COMMUNITY_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    user: 'Elena Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Project Hail Mary',
    rating: 5,
    sentiment: 'Masterpiece',
    date: '2 hours ago',
    comment: 'The AI vector recommendation suggested this after I rated The Martian 5/5. Spot-on prediction. The cosmic camaraderie between Grace and Rocky is pure serotonin!',
    likes: 142,
    verifiedReader: true
  },
  {
    id: 'r2',
    user: 'Julian Croft',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Neuromancer',
    rating: 5,
    sentiment: 'Extremely Bullish',
    date: '5 hours ago',
    comment: 'Gibson predicted generative AI and virtual sprawl back in 1984 with staggering accuracy. The aesthetic prose feels like drinking high-voltage neon coffee.',
    likes: 98,
    verifiedReader: true
  },
  {
    id: 'r3',
    user: 'Mira Thorne',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Piranesi',
    rating: 4.8,
    sentiment: 'Mesmerizing',
    date: 'Yesterday',
    comment: 'Unlike anything else in modern fantasy. The annotated synopsis here made me finally pick it up, and I finished all 245 pages in a single enchanted rainy afternoon.',
    likes: 215,
    verifiedReader: true
  }
];
