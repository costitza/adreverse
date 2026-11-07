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
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
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

  const getTierPill = (tier: string) => {
    switch (tier) {
      case "dominant":
        return "bg-[#e9b0ce]/15 text-[#e9b0ce] border-[#e9b0ce]/30";
      case "challenger":
        return "bg-[#e8b98d]/15 text-[#e8b98d] border-[#e8b98d]/30";
      case "niche":
        return "bg-[#9e93d7]/15 text-[#9e93d7] border-[#9e93d7]/30";
      default:
        return "bg-[#6cbb7a]/15 text-[#6cbb7a] border-[#6cbb7a]/30";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Market Snapshot in Editorial Bento Style */}
      <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs px-3.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#99d3df] shadow-[0_0_6px_#99d3df]" />
              <span className="font-mono text-[11px] text-[#b5b1a6]">STEP 02</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#99d3df] font-medium">Market Vault & Competitor Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Competitor Intelligence & Ad Saturation
            </h2>
            <p className="text-sm text-zinc-400">
              Discovered <span className="text-white font-medium">{competitors.length} key players</span> actively advertising in the{" "}
              <span className="text-zinc-200 font-medium">{onboardingData.brand.niche}</span> vertical.
            </p>
          </div>
        </div>

        {/* 4 Bento Snapshot Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Bento Card 1: Mint #6cbb7a (Active Ads) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#6cbb7a]/30 flex flex-col justify-between">
            <span className="text-xs text-[#6cbb7a] font-mono uppercase tracking-wider font-semibold">Active Ads Tracked</span>
            <div className="text-2xl font-bold text-white mt-1">
              {marketSnapshot.totalActiveAds.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#b5b1a6] font-mono mt-1">Meta & TikTok combined</span>
          </div>

          {/* Bento Card 2: Dusty Rose #e9b0ce (Effectiveness) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#e9b0ce]/30 flex flex-col justify-between">
            <span className="text-xs text-[#e9b0ce] font-mono uppercase tracking-wider font-semibold">Avg Effectiveness</span>
            <div className="text-2xl font-bold text-white mt-1">
              {marketSnapshot.avgEffectivenessScore}
              <span className="text-sm text-[#e9b0ce]/60 font-mono">/100</span>
            </div>
            <span className="text-[11px] text-[#b5b1a6] font-mono mt-1">Market benchmark index</span>
          </div>

          {/* Bento Card 3: Soft Lavender #9e93d7 (Hook) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#9e93d7]/30 flex flex-col justify-between">
            <span className="text-xs text-[#9e93d7] font-mono uppercase tracking-wider font-semibold">Dominant Hook</span>
            <div className="text-base font-bold text-white mt-1 capitalize truncate">
              {marketSnapshot.dominantHookType.replace("_", " ")}
            </div>
            <span className="text-[11px] text-[#b5b1a6] font-mono mt-1">Top Platform: {marketSnapshot.topPlatform}</span>
          </div>

          {/* Bento Card 4: Muted Cyan #99d3df (Saturation) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#99d3df]/30 flex flex-col justify-between">
            <span className="text-xs text-[#99d3df] font-mono uppercase tracking-wider font-semibold">Market Saturation</span>
            <div className="text-base font-bold text-white mt-1 capitalize">
              {marketSnapshot.marketSaturationLevel}
            </div>
            <span className="text-[11px] text-[#6cbb7a] font-mono mt-1">White-space identified</span>
          </div>
        </div>

        {/* Strategic Opportunity Banner */}
        <div className="rounded-2xl bg-[#181b24] border border-zinc-800/80 p-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#9e93d7]/15 border border-[#9e93d7]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#9e93d7]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#9e93d7] font-semibold block mb-0.5">
              Strategic White-Space Detected
            </span>
            <span className="text-zinc-300">{marketSnapshot.opportunityGapSummary}</span>
          </div>
        </div>
      </div>

      {/* Bento Grid for Competitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitors.map((comp) => {
          const isSelected = comp.id === selectedId;
          return (
            <div
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between cursor-pointer bg-[#13161c] border ${
                isSelected
                  ? "border-[#9e93d7] shadow-xl ring-1 ring-[#9e93d7]/50"
                  : "border-zinc-800/80 hover:border-zinc-700 hover:bg-[#181b24]"
              }`}
            >
              <div>
                {/* Competitor Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      {comp.name}
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#9e93d7] fill-[#9e93d7]/20" />
                      )}
                    </h3>
                    <a
                      href={comp.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-[#b5b1a6] hover:text-white flex items-center gap-1 mt-1 transition-colors font-mono"
                    >
                      <Globe className="w-3 h-3 text-[#99d3df]" />
                      {new URL(comp.websiteUrl).hostname}
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                  {/* Market tier badge */}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold tracking-wider border ${getTierPill(
                      comp.marketShareTier
                    )}`}
                  >
                    {comp.marketShareTier}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-5">
                  {comp.summary}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                {/* Reach Score Bar with #6cbb7a progress */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-[#b5b1a6] text-[11px] font-mono">Estimated Reach Score</span>
                    <span className="font-mono font-bold text-white">{comp.estimatedReachScore}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-[#6cbb7a] rounded-full transition-all duration-500 shadow-[0_0_6px_rgba(108,187,122,0.4)]"
                      style={{ width: `${comp.estimatedReachScore}%` }}
                    />
                  </div>
                </div>

                {/* Active Channels (Muted Cyan #99d3df) & Deconstruct Action */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {comp.activeChannels.meta && (
                      <span className="rounded-full bg-[#99d3df]/15 text-[#99d3df] border border-[#99d3df]/30 font-mono text-[10px] px-2.5 py-0.5 font-medium">
                        Meta
                      </span>
                    )}
                    {comp.activeChannels.instagram && (
                      <span className="rounded-full bg-[#99d3df]/15 text-[#99d3df] border border-[#99d3df]/30 font-mono text-[10px] px-2.5 py-0.5 font-medium">
                        Instagram
                      </span>
                    )}
                    {comp.activeChannels.tiktok && (
                      <span className="rounded-full bg-[#99d3df]/15 text-[#99d3df] border border-[#99d3df]/30 font-mono text-[10px] px-2.5 py-0.5 font-medium">
                        TikTok
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCompetitor(comp);
                    }}
                    className="rounded-full bg-white text-zinc-950 font-semibold text-xs px-3.5 py-1.5 hover:bg-zinc-200 transition-all shadow-sm cursor-pointer"
                  >
                    Deconstruct
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Competitor Footer Bar */}
      <div className="bg-[#13161c] rounded-3xl p-5 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#9e93d7]/15 border border-[#9e93d7]/30 flex items-center justify-center text-[#9e93d7] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#b5b1a6] uppercase tracking-wider font-semibold block">
              Active Focus Target
            </span>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{selectedCompetitor.name}</span>
              <span className="text-xs text-[#b5b1a6] font-normal">
                &bull; Ready for creative reverse engineering
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onSelectCompetitor(selectedCompetitor)}
          className="rounded-full bg-white text-zinc-950 font-bold px-7 py-2.5 text-sm hover:bg-zinc-200 transition-all gap-2 cursor-pointer shrink-0"
        >
          <span>Deconstruct {selectedCompetitor.name}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
