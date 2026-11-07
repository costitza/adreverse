"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface CarouselSlide {
  id: string;
  name: string;
  badge: string;
  description: string;
  src: string;
  accentColor: string;
  glowClass: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: "instagram",
    name: "Instagram",
    badge: "Instagram Reels & Feed",
    description: "Visual Hook & Aesthetic Deconstruction",
    src: "/instagram.png",
    accentColor: "#e1306c",
    glowClass: "from-[#e1306c]/20 via-[#833ab4]/15 to-transparent",
  },
  {
    id: "tiktok",
    name: "TikTok",
    badge: "TikTok Creative Center",
    description: "UGC Creator Script & Retention Tracking",
    src: "/tiktok.png",
    accentColor: "#25f4ee",
    glowClass: "from-[#25f4ee]/20 via-[#fe2c55]/15 to-transparent",
  },
  {
    id: "facebook",
    name: "Facebook",
    badge: "Meta Ad Library",
    description: "Longevity & Scaled Copy Analysis",
    src: "/facebook.png",
    accentColor: "#1877f2",
    glowClass: "from-[#1877f2]/20 via-[#0866ff]/15 to-transparent",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Auto-rotate every 5 seconds, pauses when user hovers
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Ambient Glow Behind Card */}
      <div
        className={`absolute -inset-3 bg-gradient-to-tr ${currentSlide.glowClass} rounded-3xl blur-2xl pointer-events-none transition-all duration-700 opacity-70`}
      />

      {/* Main Container */}
      <div className="relative rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl space-y-3">
        {/* Top Control Bar: Platform Pills */}
        <div className="flex items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 border border-zinc-800/80">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-zinc-950 font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {slide.name}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-7 h-7 rounded-full bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-7 h-7 rounded-full bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Display Frame for Screenshot */}
        <div className="relative w-full h-[460px] sm:h-[500px] rounded-2xl bg-black/60 border border-zinc-800/80 overflow-hidden flex items-center justify-center group">
          {/* Active Image */}
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img
              key={currentSlide.id}
              src={currentSlide.src}
              alt={currentSlide.badge}
              className="w-auto h-full max-h-full object-contain rounded-xl shadow-lg transition-opacity duration-300 animate-in fade-in"
            />
          </div>

          {/* Floating Bottom Status Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#11131a]/90 border border-zinc-800/90 backdrop-blur-md text-xs shadow-lg">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentSlide.accentColor }}
              />
              <span className="font-medium text-white text-[11px]">
                {currentSlide.badge}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              Live Reverse-Engineered
            </span>
          </div>
        </div>

        {/* Subtitle / Caption Bar */}
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="text-zinc-400 font-sans text-[11px] truncate">
            {currentSlide.description}
          </span>
          {/* Progress Indicators */}
          <div className="flex items-center gap-1 shrink-0">
            {SLIDES.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
