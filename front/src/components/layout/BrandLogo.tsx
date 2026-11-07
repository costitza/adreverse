import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function BrandLogo({ className = "", showBadge = false, size = "md" }: BrandLogoProps) {
  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-16 h-16",
  }[size];

  const textSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl sm:text-3xl",
    xl: "text-3xl sm:text-4xl",
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group select-none transition-opacity hover:opacity-95 ${className}`}
      aria-label="AdReverse Home"
    >
      <div className={`relative flex items-center justify-center ${iconSizeClasses} rounded-xl overflow-hidden shrink-0`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="AdReverse Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Typography Logotype */}
      <div className="flex items-center gap-2">
        <span className={`font-bold ${textSizeClasses} tracking-tight text-white leading-none font-sans`}>
          AdReverse
        </span>
      </div>
    </Link>
  );
}
