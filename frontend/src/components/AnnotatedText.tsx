import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnotationProps {
  phrase: string;
  type: 'highlight' | 'underline' | 'circle' | 'badge';
  annotation: string;
  color?: string;
}

interface AnnotatedTextProps {
  text: string;
  annotations: AnnotationProps[];
  className?: string;
}

export const AnnotatedText: React.FC<AnnotatedTextProps> = ({
  text,
  annotations,
  className = ''
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Split text into tokens based on the annotation phrases
  const renderAnnotatedContent = () => {
    if (!annotations || annotations.length === 0) {
      return text;
    }

    // Sort annotations by their first occurrence index
    const sorted = [...annotations]
      .filter((a) => text.includes(a.phrase))
      .sort((a, b) => text.indexOf(a.phrase) - text.indexOf(b.phrase));

    if (sorted.length === 0) return text;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    sorted.forEach((ann, idx) => {
      const matchIndex = text.indexOf(ann.phrase, lastIndex);
      if (matchIndex === -1) return;

      // Add text before match
      if (matchIndex > lastIndex) {
        elements.push(
          <span key={`text-${idx}-${lastIndex}`}>
            {text.substring(lastIndex, matchIndex)}
          </span>
        );
      }

      // Render the annotated phrase
      const color = ann.color || '#8b5cf6';
      const isHovered = activeTooltip === ann.phrase;

      elements.push(
        <span
          key={`ann-${idx}`}
          className="relative inline-block mx-0.5 cursor-pointer group"
          onMouseEnter={() => setActiveTooltip(ann.phrase)}
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() => setActiveTooltip(isHovered ? null : ann.phrase)}
        >
          {/* Annotation visual styles */}
          {ann.type === 'highlight' && (
            <span
              className="px-1.5 py-0.5 rounded font-medium transition-all duration-300 relative inline-block text-white"
              style={{
                backgroundColor: `${color}33`,
                borderBottom: `2px solid ${color}`,
                boxShadow: isHovered ? `0 0 16px ${color}66` : 'none'
              }}
            >
              {ann.phrase}
            </span>
          )}

          {ann.type === 'underline' && (
            <span className="relative font-medium text-slate-100">
              {ann.phrase}
              <svg
                className="absolute left-0 -bottom-1 w-full h-2 pointer-events-none overflow-visible"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q25,1 50,7 T100,6"
                  fill="none"
                  stroke={color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
            </span>
          )}

          {ann.type === 'circle' && (
            <span className="relative px-2 py-0.5 font-medium text-indigo-200">
              {ann.phrase}
              <svg
                className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <ellipse
                  cx="50"
                  cy="50"
                  rx="48"
                  ry="42"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="animate-spin-slow opacity-80"
                />
              </svg>
            </span>
          )}

          {ann.type === 'badge' && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white shadow-sm"
              style={{
                backgroundColor: `${color}25`,
                border: `1px solid ${color}80`,
                color: color
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {ann.phrase}
            </span>
          )}

          {/* Interactive Floating Annotation Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 pointer-events-none min-w-[200px] max-w-[280px]"
              >
                <div
                  className="p-2.5 rounded-lg text-xs leading-relaxed backdrop-blur-md shadow-2xl border"
                  style={{
                    backgroundColor: 'rgba(15, 18, 30, 0.95)',
                    borderColor: `${color}60`,
                    color: '#f8fafc',
                    boxShadow: `0 10px 25px -5px ${color}40`
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1 font-semibold text-[10px] tracking-wider uppercase opacity-80" style={{ color }}>
                    <span>✦ Key Insight</span>
                  </div>
                  <p>{ann.annotation}</p>
                </div>
                <div
                  className="w-2.5 h-2.5 rotate-45 mx-auto -mt-1 border-r border-b"
                  style={{
                    backgroundColor: 'rgba(15, 18, 30, 0.95)',
                    borderColor: `${color}60`
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      );

      lastIndex = matchIndex + ann.phrase.length;
    });

    // Add trailing text
    if (lastIndex < text.length) {
      elements.push(
        <span key={`tail-${lastIndex}`}>{text.substring(lastIndex)}</span>
      );
    }

    return elements;
  };

  return (
    <div className={`leading-relaxed text-slate-300 font-normal ${className}`}>
      {renderAnnotatedContent()}
    </div>
  );
};
