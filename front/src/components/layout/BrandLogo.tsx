import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showBadge?: boolean;
}

export function BrandLogo({ className = "", showBadge = true }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group select-none transition-opacity hover:opacity-95 ${className}`}
      aria-label="AdReverse Home"
    >
      {/* Custom Graphic Symbol SVG: Two precise intersecting trajectory vectors (deconstruction & counter-attack) */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#181b24] border border-[#9e93d7]/30 group-hover:border-[#9e93d7]/70 shadow-sm shrink-0 transition-colors">
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="adreverseGrad" x1="4" y1="22" x2="24" y2="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9e93d7" />
              <stop offset="50%" stopColor="#99d3df" />
              <stop offset="100%" stopColor="#6cbb7a" />
            </linearGradient>
            <linearGradient id="counterGrad" x1="22" y1="22" x2="6" y2="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e9b0ce" />
              <stop offset="50%" stopColor="#e8b98d" />
              <stop offset="100%" stopColor="#9e93d7" />
            </linearGradient>
          </defs>

          {/* Trajectory 1: Deconstruction curve */}
          <path
            d="M 5 21 C 9 20, 12 14, 18 10 L 23 7"
            stroke="url(#adreverseGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead 1 */}
          <path
            d="M 18 7 L 23 7 L 23 12"
            stroke="#9e93d7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Trajectory 2: Intersecting counter-attack line */}
          <path
            d="M 23 21 C 19 20, 16 14, 10 10 L 5 7"
            stroke="url(#counterGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead 2 */}
          <path
            d="M 10 7 L 5 7 L 5 12"
            stroke="#9e93d7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sharp intersection node */}
          <circle cx="14" cy="12.5" r="1.8" fill="#9e93d7" />
        </svg>
      </div>

      {/* Typography Logotype */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-base tracking-tight text-white leading-none">
          AdReverse
        </span>

        {showBadge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono tracking-tight font-medium bg-white/5 text-[#b5b1a6] border border-white/5 uppercase">
            INTEL v1.0
          </span>
        )}
      </div>
    </Link>
  );
}
