import realBooksRaw from './realBooks.json';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  subgenres: string[];
  rating: number;
  ratingsCount: number;
  pages: number;
  coverUrl: string;
  fallbackCoverUrl?: string;
  tagline: string;
  synopsis: string;
  annotatedKeywords: {
    phrase: string;
    type: 'highlight' | 'underline' | 'circle' | 'badge';
    annotation: string;
    color?: string;
  }[];
  vibe: string[];
  similarityScore?: number;
  matchReason?: string;
  readersCurrent?: number;
  isbn?: string;
  publisher?: string;
}

export interface RealBookItem {
  title: string;
  author: string;
  year: number;
  publisher: string;
  isbn: string;
  imageUrl: string;
  openLibraryUrl: string;
  numOfRating: number;
}

export const ALL_DATASET_BOOKS: RealBookItem[] = realBooksRaw as RealBookItem[];

// Book names list from artifacts (all 742 book titles)
export const ALL_BOOK_TITLES: string[] = ALL_DATASET_BOOKS.map((b) => b.title);

// Curated Showcase Books using REAL books from the dataset
export const POPULAR_BOOKS: Book[] = [
  {
    id: 'rb-1984',
    title: '1984',
    author: 'George Orwell',
    year: 1950,
    genre: 'Classic Dystopian',
    subgenres: ['Political Fiction', 'Totalitarianism', 'Social Science Fiction'],
    rating: 4.85,
    ratingsCount: 148,
    pages: 328,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0451524934-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/0451524934.01.LZZZZZZZ.jpg',
    isbn: '0451524934',
    publisher: 'Signet Book',
    tagline: 'Big Brother is Watching You.',
    synopsis: 'Winston Smith struggles against a totalitarian surveillance state where thoughtcrime is punished and the Party rewrites historical truth with every tick of the clock.',
    annotatedKeywords: [
      { phrase: 'totalitarian surveillance state', type: 'highlight', annotation: 'Oceania and the pervasive eye of Big Brother', color: '#8b5cf6' },
      { phrase: 'thoughtcrime', type: 'circle', annotation: 'The ultimate psychological weapon of Ingsoc', color: '#ef4444' },
      { phrase: 'rewrites historical truth', type: 'underline', annotation: 'Ministry of Truth memory holes', color: '#f59e0b' }
    ],
    vibe: ['Dystopian', 'Chilling', 'Philosophical', 'Masterpiece'],
    readersCurrent: 3420
  },
  {
    id: 'rb-davinci',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    year: 2003,
    genre: 'Mystery Thriller',
    subgenres: ['Cryptology', 'Art History', 'Conspiracy'],
    rating: 4.7,
    ratingsCount: 224,
    pages: 454,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0385504209-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/0385504209.01.LZZZZZZZ.jpg',
    isbn: '0385504209',
    publisher: 'Doubleday',
    tagline: 'The greatest conspiracy of the past 2000 years is about to be revealed.',
    synopsis: 'Symbologist Robert Langdon investigates a murder in the Louvre, unearthing ancient cyphers hidden inside the works of Leonardo da Vinci.',
    annotatedKeywords: [
      { phrase: 'murder in the Louvre', type: 'underline', annotation: 'Curator Jacques Saunière final dying message', color: '#ef4444' },
      { phrase: 'ancient cyphers', type: 'highlight', annotation: 'Fibonacci sequences and anagram cryptex', color: '#06b6d4' },
      { phrase: 'Leonardo da Vinci', type: 'circle', annotation: 'Hidden symbolism in the Last Supper', color: '#8b5cf6' }
    ],
    vibe: ['Fast-Paced', 'Conspiracy', 'Puzzles', 'High-Adrenaline'],
    readersCurrent: 4100
  },
  {
    id: 'rb-lovelybones',
    title: 'The Lovely Bones: A Novel',
    author: 'Alice Sebold',
    year: 2002,
    genre: 'Literary Drama',
    subgenres: ['Supernatural', 'Coming-of-Age', 'Grief & Healing'],
    rating: 4.6,
    ratingsCount: 270,
    pages: 328,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0316666343-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/0316666343.01.LZZZZZZZ.jpg',
    isbn: '0316666343',
    publisher: 'Little, Brown',
    tagline: 'Life was over, but her story was just beginning.',
    synopsis: 'Susie Salmon watches down from her personal heaven as her grieving family attempts to heal and unravel the mystery of her disappearance.',
    annotatedKeywords: [
      { phrase: 'personal heaven', type: 'highlight', annotation: 'Poetic ethereal afterlife perspective', color: '#3b82f6' },
      { phrase: 'grieving family', type: 'underline', annotation: 'Deep exploration of familial resilience', color: '#ec4899' },
      { phrase: 'mystery of her disappearance', type: 'circle', annotation: 'Pursuit of closure and justice', color: '#f59e0b' }
    ],
    vibe: ['Emotional', 'Haunting', 'Tender', 'Poignant'],
    readersCurrent: 2150
  },
  {
    id: 'rb-secretlife',
    title: 'The Secret Life of Bees',
    author: 'Sue Monk Kidd',
    year: 2003,
    genre: 'Southern Fiction',
    subgenres: ['Historical', 'Coming-of-Age', 'Sisterhood'],
    rating: 4.75,
    ratingsCount: 209,
    pages: 302,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0142001740-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/0142001740.01.LZZZZZZZ.jpg',
    isbn: '0142001740',
    publisher: 'Penguin Books',
    tagline: 'The story of the power of women and the solace of honey.',
    synopsis: 'Set in 1964 South Carolina, 14-year-old Lily Owens escapes to Tiburon, finding sanctuary with the eccentric beekeeping Boatwright sisters and the Black Madonna honey.',
    annotatedKeywords: [
      { phrase: 'escapes to Tiburon', type: 'underline', annotation: 'Journey of liberation and identity', color: '#f59e0b' },
      { phrase: 'beekeeping Boatwright sisters', type: 'highlight', annotation: 'August, June, and May: Matriarchal wisdom', color: '#10b981' },
      { phrase: 'Black Madonna honey', type: 'badge', annotation: 'Symbol of divine feminine guidance', color: '#8b5cf6' }
    ],
    vibe: ['Heartwarming', 'Lyrical', 'Soulful', 'Uplifting'],
    readersCurrent: 1890
  },
  {
    id: 'rb-thefirm',
    title: 'The Firm',
    author: 'John Grisham',
    year: 1992,
    genre: 'Legal Thriller',
    subgenres: ['Suspense', 'Corporate Crime', 'Espionage'],
    rating: 4.65,
    ratingsCount: 227,
    pages: 432,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/044021145X-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/044021145X.01.LZZZZZZZ.jpg',
    isbn: '044021145X',
    publisher: 'Dell',
    tagline: 'They made him an offer he should have refused.',
    synopsis: 'Mitch McDeere graduated top of his class at Harvard Law and took a dream job at a prestigious Memphis boutique firm—only to discover the firm belongs to the Mob.',
    annotatedKeywords: [
      { phrase: 'top of his class at Harvard Law', type: 'highlight', annotation: 'Ambitious young legal prodigy', color: '#06b6d4' },
      { phrase: 'dream job', type: 'underline', annotation: 'Lavish perks concealing sinister strings', color: '#f59e0b' },
      { phrase: 'belongs to the Mob', type: 'circle', annotation: 'High-stakes FBI wiretapping cat-and-mouse', color: '#ef4444' }
    ],
    vibe: ['Fast-Paced', 'Suspenseful', 'High-Stakes', 'Intrigue'],
    readersCurrent: 2780
  },
  {
    id: 'rb-pelican',
    title: 'The Pelican Brief',
    author: 'John Grisham',
    year: 1993,
    genre: 'Political Thriller',
    subgenres: ['Supreme Court', 'Investigative', 'Action'],
    rating: 4.6,
    ratingsCount: 236,
    pages: 387,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0440214041-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/0440214041.01.LZZZZZZZ.jpg',
    isbn: '0440214041',
    publisher: 'Dell',
    tagline: 'Two Supreme Court justices assassinated. One woman guessed why.',
    synopsis: 'Tulane law student Darby Shaw pens a speculative legal brief explaining the assassinations of two Supreme Court justices, which inadvertently hits the exact conspiracy truth.',
    annotatedKeywords: [
      { phrase: 'two Supreme Court justices assassinated', type: 'circle', annotation: 'Shock opening setting the national manhunt in motion', color: '#ef4444' },
      { phrase: 'speculative legal brief', type: 'highlight', annotation: 'The explosive Pelican Brief document', color: '#8b5cf6' },
      { phrase: 'exact conspiracy truth', type: 'underline', annotation: 'Oil billionaires and White House coverups', color: '#10b981' }
    ],
    vibe: ['Tense', 'Smart', 'Investigative', 'Action-Packed'],
    readersCurrent: 1980
  },
  {
    id: 'rb-bridget',
    title: "Bridget Jones's Diary",
    author: 'Helen Fielding',
    year: 1999,
    genre: 'Romantic Comedy',
    subgenres: ['Contemporary Fiction', 'Humor', 'British Literature'],
    rating: 4.5,
    ratingsCount: 277,
    pages: 288,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/014028009X-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/014028009X.01.LZZZZZZZ.jpg',
    isbn: '014028009X',
    publisher: 'Penguin Books',
    tagline: 'A chronicle of calories, cigarettes, and searching for love in London.',
    synopsis: 'Bridget Jones resolves to take control of her life in London, cataloging her misadventures with romantic interests Mark Darcy and Daniel Cleaver with uproarious wit.',
    annotatedKeywords: [
      { phrase: 'resolves to take control', type: 'highlight', annotation: 'Hilariously flawed New Year resolutions', color: '#ec4899' },
      { phrase: 'Mark Darcy and Daniel Cleaver', type: 'circle', annotation: 'Modern Pride & Prejudice dynamic', color: '#8b5cf6' },
      { phrase: 'uproarious wit', type: 'underline', annotation: 'Irresistible voice that redefined modern rom-coms', color: '#f59e0b' }
    ],
    vibe: ['Charming', 'Hilarious', 'Witty', 'Relatable'],
    readersCurrent: 2450
  },
  {
    id: 'rb-wildanimus',
    title: 'Wild Animus',
    author: 'Rich Shapero',
    year: 2004,
    genre: 'Wilderness Odyssey',
    subgenres: ['Psychological', 'Metaphysical', 'Adventure'],
    rating: 4.3,
    ratingsCount: 363,
    pages: 320,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0971880107-L.jpg',
    fallbackCoverUrl: 'https://images.amazon.com/images/P/0971880107.01.LZZZZZZZ.jpg',
    isbn: '0971880107',
    publisher: 'Too Far',
    tagline: 'A search for wildness in an untamed Alaskan wilderness.',
    synopsis: 'Sam Altman journeys into the brutal Brooks Range of Alaska, shedding societal conventions in pursuit of a mystical communion with nature and the elusive mountain sheep.',
    annotatedKeywords: [
      { phrase: 'brutal Brooks Range of Alaska', type: 'highlight', annotation: 'Fierce sub-zero survival landscape', color: '#06b6d4' },
      { phrase: 'mystical communion with nature', type: 'circle', annotation: 'Dionysian transformation into the ram', color: '#8b5cf6' },
      { phrase: 'shedding societal conventions', type: 'underline', annotation: 'Radical rejection of modern domesticity', color: '#10b981' }
    ],
    vibe: ['Wild', 'Psychological', 'Raw', 'Intense'],
    readersCurrent: 1620
  }
];

export const ALL_GENRES = [
  'All Genres',
  'Classic Dystopian',
  'Mystery Thriller',
  'Literary Drama',
  'Southern Fiction',
  'Legal Thriller',
  'Political Thriller',
  'Romantic Comedy',
  'Wilderness Odyssey'
];

export const VELOCITY_GENRES = [
  'CLASSIC DYSTOPIAN',
  'LEGAL THRILLER',
  'POLITICAL INTRIGUE',
  'LITERARY DRAMA',
  'SOUTHERN GOTHIC',
  'MYSTERY & SUSPENSE',
  'HISTORICAL FICTION',
  'ROMANTIC COMEDY',
  'COMING OF AGE'
];
