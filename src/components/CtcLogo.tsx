import React from 'react';

interface CtcLogoProps {
  className?: string;
  color?: string; // e.g. "text-slate-900", "text-white", "text-amber-800"
  showText?: boolean;
  subText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CtcLogo: React.FC<CtcLogoProps> = ({
  className = '',
  color = 'text-slate-900',
  showText = true,
  subText = '心誠不動産',
  size = 'md'
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Vector reproduction of user-provided CTC emblem */}
      <div className={`relative shrink-0 ${iconDimensions} flex items-center justify-center`}>
        <svg 
          viewBox="0 0 220 160" 
          className={`w-full h-full ${color} fill-current transition-colors duration-200`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* T: Centered & Elevated Roman Serif */}
          <g transform="translate(110, 48)">
            {/* Top Bar with Serif */}
            <rect x="-30" y="-24" width="60" height="7.5" rx="0.5" />
            <path d="M -30 -24 L -30 -16 L -24 -24 Z" />
            <path d="M 30 -24 L 30 -16 L 24 -24 Z" />
            {/* Vertical Stem */}
            <rect x="-7" y="-20" width="14" height="46" />
            {/* Bottom Serifs */}
            <rect x="-18" y="21" width="36" height="5" rx="0.5" />
          </g>

          {/* Left C: Classic Serif Roman */}
          <g transform="translate(56, 50)">
            <path 
              d="M 20 -18 
                 C 10 -27, -12 -27, -22 -14 
                 C -32 -1, -32 23, -22 36 
                 C -11 50, 12 49, 21 40 
                 L 17 33 
                 C 10 40, -6 41, -14 31 
                 C -22 21, -22 0, -14 -10 
                 C -6 -20, 10 -19, 16 -12 
                 Z" 
            />
            {/* Top teardrop/serif ball */}
            <circle cx="19" cy="-15" r="4.5" />
            {/* Bottom serif spur */}
            <path d="M 21 38 L 22 43 L 14 43 Z" />
          </g>

          {/* Right C: Classic Serif Roman */}
          <g transform="translate(164, 50)">
            <path 
              d="M 20 -18 
                 C 10 -27, -12 -27, -22 -14 
                 C -32 -1, -32 23, -22 36 
                 C -11 50, 12 49, 21 40 
                 L 17 33 
                 C 10 40, -6 41, -14 31 
                 C -22 21, -22 0, -14 -10 
                 C -6 -20, 10 -19, 16 -12 
                 Z" 
            />
            <circle cx="19" cy="-15" r="4.5" />
            <path d="M 21 38 L 22 43 L 14 43 Z" />
          </g>

          {/* House Roof: Sharp triangular gable roof (家の三角屋根) */}
          {/* Main Gable Triangular Roof */}
          <path 
            d="M 16 104 
               L 110 72 
               L 204 104 
               L 201 111 
               L 110 80 
               L 19 111 
               Z" 
          />

          {/* Sub-eaves / Triangular Pediment Detail (切妻破風・三角小屋根ライン) */}
          <path 
            d="M 42 107 
               L 110 85 
               L 178 107 
               L 175 111 
               L 110 90 
               L 45 111 
               Z" 
            opacity="0.85"
          />

          {/* House Crest Structure (三角屋根の下の家・柱・土台) */}
          <g transform="translate(110, 126)">
            {/* Outer house wall frame */}
            <path 
              d="M -12 -10 L 12 -10 L 12 13 L -12 13 Z M -9 -7 L -9 10 L 9 10 L 9 -7 Z" 
              fillRule="evenodd" 
            />
            {/* Center vertical beam / Main Pillar */}
            <rect x="-1.5" y="-10" width="3" height="23" />
            {/* Horizontal beam / Cross lattice */}
            <line x1="-9" y1="1" x2="9" y2="1" stroke="currentColor" strokeWidth="2" />
            {/* Solid foundation ground base line */}
            <rect x="-24" y="13" width="48" height="3" rx="0.5" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif tracking-widest text-[13px] sm:text-[14px] font-bold uppercase opacity-90">
              株式会社 CTC
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/10 text-amber-800 font-semibold border border-amber-800/20">
              埼玉・鶴ヶ島
            </span>
          </div>
          <span className="font-mincho text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-800">
            {subText}
          </span>
        </div>
      )}
    </div>
  );
};
