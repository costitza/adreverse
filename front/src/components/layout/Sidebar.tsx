"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  Sliders,
  Compass,
  Zap,
  Film,
} from "lucide-react";

export type StepId = 1 | 2 | 3 | 4;

export interface NavStep {
  step: StepId;
  title: string;
  category: string;
  icon: React.ElementType;
}

export const NAV_STEPS: NavStep[] = [
  {
    step: 1,
    title: "Brand Matrix",
    category: "Identity & Voice",
    icon: Sliders,
  },
  {
    step: 2,
    title: "Competitor Vault",
    category: "Market Discovery",
    icon: Compass,
  },
  {
    step: 3,
    title: "Ad Breakdown",
    category: "Hooks & Vulnerability",
    icon: Zap,
  },
  {
    step: 4,
    title: "Campaign Studio",
    category: "UGC Scripts & Angles",
    icon: Film,
  },
];

interface SidebarProps {
  currentStep?: StepId;
  onSelectStep?: (step: StepId) => void;
  completedSteps?: number[];
  creditsUsed?: number;
  creditsTotal?: number;
}

export function Sidebar({
  currentStep = 1,
  onSelectStep,
  completedSteps = [],
  creditsUsed = 26,
  creditsTotal = 100,
}: SidebarProps) {
  const { user } = useUser();
  const activeCredits = Math.max(0, creditsTotal - creditsUsed);
  const creditPercent = Math.min(100, Math.round((activeCredits / creditsTotal) * 100));

  return (
    <aside
      className="w-64 h-screen fixed left-0 top-0 z-50 bg-[#13161c] border-r border-zinc-800/80 flex flex-col justify-between p-5 select-none"
      aria-label="Editorial B2B Dashboard Sidebar"
    >
      {/* Zona Superioară (Logo & Brand) */}
      <div className="space-y-6">
        <div className="pb-3 border-b border-zinc-800/60">
          <BrandLogo />
        </div>

        {/* Zona de Mijloc (Navigația pașilor) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#b5b1a6] font-medium">
              Pipeline Steps
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#9e93d7] border border-[#9e93d7]/20">
              4 STEPS
            </span>
          </div>

          <nav className="space-y-1.5" aria-label="Workflow Steps">
            {NAV_STEPS.map((s) => {
              const Icon = s.icon;
              const isCurrent = currentStep === s.step;
              const isCompleted = completedSteps.includes(s.step) || currentStep > s.step;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => {
                    if (onSelectStep) {
                      onSelectStep(s.step);
                    }
                  }}
                  className={`w-full text-left rounded-xl px-3.5 py-2.5 transition-all flex items-center gap-3 relative group ${
                    isCurrent
                      ? "bg-white/10 text-white font-medium shadow-xs"
                      : isCompleted
                      ? "text-zinc-300 hover:bg-white/[0.05] hover:text-white cursor-pointer"
                      : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200 cursor-pointer"
                  }`}
                >
                  {/* Pastilă / linie verticală de accent în stânga pentru pasul activ */}
                  {isCurrent && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-[#9e93d7] shadow-[0_0_10px_rgba(158,147,215,0.7)]"
                      aria-hidden="true"
                    />
                  )}

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isCurrent
                        ? "bg-[#9e93d7]/20 text-[#9e93d7] border border-[#9e93d7]/40"
                        : isCompleted
                        ? "bg-[#6cbb7a]/15 text-[#6cbb7a] border border-[#6cbb7a]/30"
                        : "bg-white/[0.04] text-zinc-500 border border-white/5 group-hover:text-zinc-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs block truncate leading-tight ${
                        isCurrent ? "text-white font-semibold" : "text-zinc-300"
                      }`}
                    >
                      {s.step}. {s.title}
                    </div>
                    <div className="text-[10px] text-[#b5b1a6] truncate font-mono">
                      {s.category}
                    </div>
                  </div>

                  {isCompleted && !isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6cbb7a] shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Zona Inferioară (Widget Credite + Profil) */}
      <div className="space-y-4 pt-4 border-t border-zinc-800/80">
        {/* Widget de consum stil Bento compact */}
        <div className="bg-[#181b24] p-3 rounded-2xl border border-zinc-800/60 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-white text-[11px] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#6cbb7a]" />
              Active Credits
            </span>
            <span className="font-mono text-[11px] text-[#b5b1a6] font-semibold">
              {activeCredits} / {creditsTotal}
            </span>
          </div>

          {/* Bară subțire de progres colorată în #6cbb7a */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-[#6cbb7a] rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(108,187,122,0.4)]"
              style={{ width: `${creditPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#b5b1a6] font-mono">
            <span>Quota Status</span>
            <span className="text-[#6cbb7a] font-medium">{creditPercent}% Available</span>
          </div>
        </div>

        {/* Rând de profil utilizator minimalist */}
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="shrink-0 scale-90">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-full ring-1 ring-zinc-700",
                  },
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate leading-tight">
                {user?.fullName || user?.firstName || "AdReverse Lead"}
              </div>
              <div className="text-[10px] font-mono text-[#b5b1a6] truncate leading-tight">
                {user?.primaryEmailAddress?.emailAddress || "intel@adreverse.ai"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
