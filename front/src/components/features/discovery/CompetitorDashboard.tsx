"use client";

import React, { useState } from "react";
import {
  Competitor,
  MarketSnapshot,
  BrandOnboardingResponse,
} from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  Globe,
  ArrowRight,
  ExternalLink,
  Check,
  Radio,
  TrendingUp,
} from "lucide-react";

interface CompetitorDashboardProps {
  onboardingData: BrandOnboardingResponse;
  competitors: Competitor[];
  marketSnapshot: MarketSnapshot;
  onSelectCompetitor: (competitor: Competitor) => void;
}

export function CompetitorDashboard({
  onboardingData,
  competitors,
  marketSnapshot,
  onSelectCompetitor,
}: CompetitorDashboardProps) {
  const [selectedId, setSelectedId] = useState<string>(competitors[0]?.id || "");

  const selectedCompetitor =
    competitors.find((c) => c.id === selectedId) || competitors[0];

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "dominant":
        return "border-rose-500/20 text-rose-300 bg-rose-500/10";
      case "challenger":
        return "border-amber-500/20 text-amber-300 bg-amber-500/10";
      case "niche":
        return "border-purple-500/20 text-purple-300 bg-purple-500/10";
      default:
        return "border-emerald-500/20 text-emerald-300 bg-emerald-500/10";
    }
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Minimal Header (Linear / Vercel style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Competitor Intelligence Radar
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Identified <span className="text-zinc-200 font-medium">{competitors.length} key market players</span> in the{" "}
            <span className="text-zinc-200 font-medium">{onboardingData.brand.niche}</span> vertical
          </p>
        </div>

        {/* Quick inline market metrics */}
        <div className="flex items-center gap-2">
          {marketSnapshot.totalActiveAds && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>{marketSnapshot.totalActiveAds} Active Ads</span>
            </div>
          )}
          {marketSnapshot.avgEffectivenessScore && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <TrendingUp className="w-3 h-3 text-purple-400" />
              <span>{marketSnapshot.avgEffectivenessScore}/100 Avg Score</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitors.map((comp) => {
          const isSelected = comp.id === selectedId;

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`rounded-2xl p-5 transition-colors cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? "bg-zinc-900/70 border-white/40 ring-1 ring-white/10 shadow-xs"
                  : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
              }`}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white tracking-tight">
                        {comp.name}
                      </h3>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <a
                      href={comp.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 mt-0.5 transition-colors font-mono"
                    >
                      <Globe className="w-3 h-3 text-zinc-500" />
                      <span>{getHostname(comp.websiteUrl)}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>

                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-mono uppercase font-medium border ${getTierBadge(
                      comp.marketShareTier
                    )}`}
                  >
                    {comp.marketShareTier}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-300 leading-relaxed bg-black/20 p-3.5 rounded-xl border border-zinc-800/40 font-sans">
                  {comp.summary}
                </p>
              </div>

              {/* Bottom stats & channels */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-3 text-xs">
                {/* Reach Score */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-zinc-500">Reach Index:</span>
                  <span className="text-xs font-mono font-semibold text-white">
                    {comp.estimatedReachScore}%
                  </span>
                </div>

                {/* Channel badges */}
                <div className="flex items-center gap-1">
                  {comp.activeChannels.meta && (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-[10px] font-mono text-zinc-300">
                      Meta
                    </span>
                  )}
                  {comp.activeChannels.tiktok && (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-[10px] font-mono text-zinc-300">
                      TikTok
                    </span>
                  )}
                  {comp.activeChannels.instagram && (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-[10px] font-mono text-zinc-300">
                      IG
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Action Footer Bar */}
      {selectedCompetitor && (
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              Target selected: <strong className="text-white">{selectedCompetitor.name}</strong>
            </span>
          </div>

          <Button
            onClick={() => onSelectCompetitor(selectedCompetitor)}
            className="w-full sm:w-auto rounded-full bg-white text-zinc-950 font-medium px-6 py-2.5 text-xs hover:bg-zinc-200 transition-colors gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Analyze {selectedCompetitor.name}&apos;s Ads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
