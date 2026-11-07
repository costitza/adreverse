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
  TrendingUp,
  Radio,
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
        return "bg-rose-500/10 text-rose-300 border-rose-500/20";
      case "challenger":
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "niche":
        return "bg-violet-500/10 text-violet-300 border-violet-500/20";
      default:
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
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
    <div className="w-full space-y-6">
      {/* Top Banner (clean, minimal, aligned with Step 1) */}
      <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs px-3.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e93d7] shadow-[0_0_6px_#9e93d7]" />
              <span className="font-mono text-[11px] text-[#b5b1a6]">STEP 02</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#9e93d7] font-medium">Competitor Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Competitor Vault
            </h2>
            <p className="text-sm text-zinc-400">
              Identified <span className="text-zinc-200 font-medium">{competitors.length} key players</span> in the{" "}
              <span className="text-zinc-200 font-semibold">{onboardingData.brand.niche}</span> vertical.
            </p>
          </div>

          {/* Quick inline market pills */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#181b24] border border-zinc-800 text-xs font-mono text-zinc-300">
              <Radio className="w-3.5 h-3.5 text-[#6cbb7a]" />
              <span>{marketSnapshot.totalActiveAds} Active Ads</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#181b24] border border-zinc-800 text-xs font-mono text-zinc-300">
              <TrendingUp className="w-3.5 h-3.5 text-[#9e93d7]" />
              <span>{marketSnapshot.avgEffectivenessScore}/100 Score</span>
            </div>
          </div>
        </div>

        {/* Opportunity Gap - subtle highlight */}
        {marketSnapshot.opportunityGapSummary && (
          <div className="mt-5 pt-4 border-t border-zinc-800/70 flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
            <Sparkles className="w-4 h-4 text-[#e8b98d] shrink-0 mt-0.5" />
            <p>
              <strong className="text-zinc-200">Opportunity Gap:</strong>{" "}
              {marketSnapshot.opportunityGapSummary}
            </p>
          </div>
        )}
      </div>

      {/* Clean Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitors.map((comp) => {
          const isSelected = comp.id === selectedId;

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#161a23] border-[#9e93d7] shadow-lg ring-1 ring-[#9e93d7]/30"
                  : "bg-[#13161c] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#151922]"
              }`}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {comp.name}
                      </h3>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#9e93d7]" />
                      )}
                    </div>
                    <a
                      href={comp.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-[#b5b1a6] hover:text-white flex items-center gap-1.5 mt-1 transition-colors font-mono"
                    >
                      <Globe className="w-3 h-3 text-zinc-400" />
                      <span>{getHostname(comp.websiteUrl)}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                    </a>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold border ${getTierBadge(
                      comp.marketShareTier
                    )}`}
                  >
                    {comp.marketShareTier}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                  {comp.summary}
                </p>
              </div>

              {/* Bottom stats & channels */}
              <div className="mt-5 pt-3.5 border-t border-zinc-800/60 flex items-center justify-between gap-3 text-xs">
                {/* Reach Score */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">Reach:</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {comp.estimatedReachScore}%
                  </span>
                </div>

                {/* Channel badges */}
                <div className="flex items-center gap-1">
                  {comp.activeChannels.meta && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                      Meta
                    </span>
                  )}
                  {comp.activeChannels.tiktok && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                      TikTok
                    </span>
                  )}
                  {comp.activeChannels.instagram && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                      IG
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer (Centered & rounded CTA bar) */}
      {selectedCompetitor && (
        <div className="bg-[#13161c] rounded-3xl p-4 sm:p-5 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#6cbb7a]" />
            <span className="text-xs text-zinc-300">
              Selected competitor:{" "}
              <strong className="text-white">{selectedCompetitor.name}</strong>
            </span>
          </div>

          <Button
            onClick={() => onSelectCompetitor(selectedCompetitor)}
            className="w-full sm:w-auto rounded-full bg-white text-zinc-950 font-semibold px-8 py-2.5 text-sm hover:bg-zinc-200 transition-all gap-2 cursor-pointer shadow-sm"
          >
            <span>Analyze {selectedCompetitor.name}&apos;s Ads</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
