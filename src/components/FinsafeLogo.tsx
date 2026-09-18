import React from 'react';

interface FinsafeLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FinsafeLogo: React.FC<FinsafeLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Logo Mark + Wordmark */}
      <div className="relative flex flex-col justify-center">
        <div className="flex items-center gap-2">
          {/* Stylized Futuristic FINSAFE SVG Wordmark */}
          <div className="relative flex items-center">
            <svg
              className={
                size === 'sm'
                  ? 'h-6 w-auto'
                  : size === 'lg'
                  ? 'h-9 w-auto'
                  : 'h-7 sm:h-7.5 w-auto'
              }
              viewBox="0 0 240 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="FINSAFE Logo"
            >
              <defs>
                {/* Light Mode Gradient */}
                <linearGradient id="finsafe-light-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="35%" stopColor="#2563eb" />
                  <stop offset="70%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>

                {/* Dark Mode Gradient */}
                <linearGradient id="finsafe-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="40%" stopColor="#60a5fa" />
                  <stop offset="80%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>

                {/* Cyan Neon Accent Gradient */}
                <linearGradient id="finsafe-cyan-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="100%" stopColor="#4facfe" />
                </linearGradient>

                {/* Orbit Glow Gradient */}
                <linearGradient id="finsafe-orbit-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Dynamic Theme Gradient Selector via CSS variable or classes */}
              <g className="fill-[url(#finsafe-light-grad)] dark:fill-[url(#finsafe-dark-grad)]">
                {/* --- Stylized "F" (Aerodynamic Blade Shape) --- */}
                <path
                  d="M12 8C20 8 28 10 32 16C28 18 22 19 16 19C16 23 25 23 29 27C25 29 20 30 16 30V44H8V8H12Z"
                  className="fill-[url(#finsafe-cyan-accent)]"
                />
                <path
                  d="M8 8H34C35.5 8 36.5 9 36 10.5L34 16H16V22H31L29.5 28H16V44H8V8Z"
                  fill="url(#finsafe-cyan-accent)"
                />

                {/* --- "I" with glowing Spark flare --- */}
                <rect x="46" y="16" width="7.5" height="28" rx="1.5" />
                {/* Flare over I */}
                <circle cx="49.75" cy="10" r="3" fill="#00f2fe" />
                <path
                  d="M49.75 4L51 9L56 10L51 11L49.75 16L48.5 11L43.5 10L48.5 9L49.75 4Z"
                  fill="#38bdf8"
                />

                {/* --- "N" Geometric --- */}
                <path
                  d="M62 16H69.5L81 33.5V16H88V44H81L69.5 26.5V44H62V16Z"
                />

                {/* --- "S" Futuristic angled --- */}
                <path
                  d="M109 16H95C93.5 16 92.5 17 92.5 18.5V26C92.5 27.5 93.5 28.5 95 28.5H105C106 28.5 106.5 29 106.5 29.5V33.5C106.5 34 106 34.5 105 34.5H93V44H107C108.5 44 109.5 43 109.5 41.5V34C109.5 32.5 108.5 31.5 107 31.5H97C96 31.5 95.5 31 95.5 30.5V26.5C95.5 26 96 25.5 97 25.5H109V16Z"
                />

                {/* --- "A" with Cyan Triangle Delta Accent --- */}
                <path
                  d="M124 16H116L108 44H115.5L117.5 37H128.5L130.5 44H138L130 16H124ZM120 28.5L123 18.5L126 28.5H120Z"
                />
                {/* Glowing Triangle Delta inside A */}
                <polygon
                  points="123,24 120,33 126,33"
                  fill="#00f2fe"
                  className="animate-pulse"
                />

                {/* --- "F" Standard Geometric --- */}
                <path
                  d="M144 16H162V22.5H151.5V29.5H160V35.5H151.5V44H144V16Z"
                />

                {/* --- "E" Standard Geometric --- */}
                <path
                  d="M168 16H187V22.5H175.5V27H185V33H175.5V37.5H187V44H168V16Z"
                />
              </g>

              {/* Futuristic Cyber Orbit Swoosh */}
              <path
                d="M30 46C90 54 180 44 230 20C210 12 140 18 80 26"
                stroke="url(#finsafe-orbit-grad)"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
              <circle cx="230" cy="20" r="2.5" fill="#00f2fe" className="animate-ping" />
              <circle cx="230" cy="20" r="2" fill="#38bdf8" />
            </svg>
          </div>
        </div>

        {/* FINANCIAL INTEGRITY OS Tagline */}
        {showTagline && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[8.5px] sm:text-[9px] font-bold tracking-[0.2em] bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent uppercase leading-none">
              FINANCIAL INTEGRITY OS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
