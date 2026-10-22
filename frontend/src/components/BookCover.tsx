import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  title: string;
  author?: string;
  coverUrl: string;
  fallbackUrl?: string;
  className?: string;
  imgClassName?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  coverUrl,
  fallbackUrl,
  className = '',
  imgClassName = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState(coverUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackUrl && currentSrc !== fallbackUrl) {
      setCurrentSrc(fallbackUrl);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4 flex flex-col justify-between border border-slate-800 ${className}`}
      >
        <div className="flex items-center justify-between text-indigo-400">
          <BookOpen className="w-5 h-5 opacity-70" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
            BookMatch
          </span>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs sm:text-sm line-clamp-3 leading-snug">
            {title}
          </h4>
          {author && (
            <p className="text-[11px] text-indigo-300 mt-1 line-clamp-1">{author}</p>
          )}
        </div>
        <div className="h-1 w-12 bg-indigo-500/40 rounded-full" />
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={title}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={`w-full h-full object-cover ${imgClassName} ${className}`}
    />
  );
};
