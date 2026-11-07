"use client";

import React, { useState } from "react";
import {
  AdAnalysisResult,
  AdAggregateSummary,
  Competitor,
} from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Clock,
  BarChart3,
  Layers,
} from "lucide-react";

interface AdBreakdownCardProps {
  competitor: Competitor;
  analyses: AdAnalysisResult[];
  aggregateSummary: AdAggregateSummary;
  onProceedToAdaptation: (selectedAdIds: string[]) => void;
}

export function AdBreakdownCard({
  competitor,
  analyses,
  aggregateSummary,
  onProceedToAdaptation,
}: AdBreakdownCardProps) {
  const [selectedAdIndex, setSelectedAdIndex] = useState<number>(0);
  const [selectedAdsForCampaign, setSelectedAdsForCampaign] = useState<string[]>(
    analyses.map((a) => a.ad.adId)
  );

  const currentAnalysis = analyses[selectedAdIndex] || analyses[0];
  const { ad, breakdown } = currentAnalysis;

  const toggleSelectAdForCampaign = (adId: string) => {
    setSelectedAdsForCampaign((prev) =>
      prev.includes(adId)
        ? prev.filter((id) => id !== adId)
        : [...prev, adId]
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / Bento Header */}
      <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs px-3.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e93d7] shadow-[0_0_6px_#9e93d7]" />
              <span className="font-mono text-[11px] text-[#b5b1a6]">STEP 03</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#9e93d7] font-medium">Ad Deconstruction & Reverse-Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Deconstructed Creatives & Vulnerability Gaps
            </h2>
            <p className="text-sm text-zinc-400">
              Dissected high-converting ad units from <span className="text-white font-medium">{competitor.name}</span>.
            </p>
          </div>

          <Button
            onClick={() =>
              onProceedToAdaptation(
                selectedAdsForCampaign.length > 0
                  ? selectedAdsForCampaign
                  : [ad.adId]
              )
            }
            className="rounded-full bg-white text-zinc-950 font-bold px-7 py-3 text-sm hover:bg-zinc-200 transition-all shadow-md gap-2 shrink-0 cursor-pointer"
          >
            Generate Counter-Campaign
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* 4 Bento Aggregate Index Tiles with Strict Semantic Mapping */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Tile 1: Ads Analysed (Neutral Slate) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-zinc-800/80 flex flex-col justify-between">
            <span className="text-xs text-[#b5b1a6] font-mono uppercase tracking-wider block font-semibold">Ads Analysed</span>
            <div className="text-2xl font-bold text-white mt-1">
              {aggregateSummary.totalAdsAnalysed}
            </div>
            <span className="text-[11px] text-[#b5b1a6] font-mono">Active creative pool</span>
          </div>

          {/* Tile 2: Avg Effectiveness (Sage Mint / Clean Emerald #6cbb7a) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#6cbb7a]/30 flex flex-col justify-between">
            <span className="text-xs text-[#6cbb7a] font-mono uppercase tracking-wider block font-semibold">Avg Effectiveness</span>
            <div className="text-2xl font-bold text-white mt-1">
              {aggregateSummary.avgEffectivenessScore.toFixed(1)}
              <span className="text-sm text-[#6cbb7a]/60 font-mono">/100</span>
            </div>
            <span className="text-[11px] text-[#6cbb7a]/80 font-mono">Benchmark index</span>
          </div>

          {/* Tile 3: Dominant Hook (Soft Lavender #9e93d7) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#9e93d7]/30 flex flex-col justify-between">
            <span className="text-xs text-[#9e93d7] font-mono uppercase tracking-wider block font-semibold">Dominant Hook</span>
            <div className="text-base font-bold text-white mt-1 capitalize truncate">
              {aggregateSummary.mostUsedHookType.replace("_", " ")}
            </div>
            <span className="text-[11px] text-[#9e93d7]/80 font-mono">Persuasion mechanism</span>
          </div>

          {/* Tile 4: Core Exploit (Warm Muted Amber #e8b98d) */}
          <div className="bg-[#181b24] rounded-2xl p-4 border border-[#e8b98d]/30 flex flex-col justify-between">
            <span className="text-xs text-[#e8b98d] font-mono uppercase tracking-wider block font-semibold">02. Vulnerability Gap</span>
            <div className="text-xs font-semibold text-zinc-200 mt-1 line-clamp-2">
              {aggregateSummary.topVulnerabilityGap}
            </div>
          </div>
        </div>
      </div>

      {/* Pill-Tabs for Creative Selection */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-[#b5b1a6] font-mono uppercase tracking-wider font-semibold mr-2 shrink-0">
          Creatives:
        </span>
        {analyses.map((item, idx) => {
          const isCurrent = idx === selectedAdIndex;
          return (
            <button
              key={item.ad.adId}
              onClick={() => setSelectedAdIndex(idx)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isCurrent
                  ? "bg-white text-zinc-950 font-bold shadow-sm"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-zinc-800"
              }`}
            >
              <span className="capitalize">#{idx + 1} &bull; {item.ad.platform}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                  isCurrent
                    ? "bg-zinc-200 text-zinc-950"
                    : "bg-[#6cbb7a]/15 text-[#6cbb7a] border border-[#6cbb7a]/20"
                }`}
              >
                {item.breakdown.effectivenessScore}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Breakdown Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Raw Creative Frame (5 cols) */}
        <div className="lg:col-span-5 bg-[#13161c] rounded-3xl p-6 border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              {/* Channel badge with Cyan #99d3df */}
              <span className="rounded-full bg-[#99d3df]/15 text-[#99d3df] border border-[#99d3df]/30 text-xs px-3 py-1 font-mono uppercase font-semibold">
                {ad.platform}
              </span>
              <span className="text-xs text-[#b5b1a6] font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#b5b1a6]" /> {ad.daysActive}d active
              </span>
            </div>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={selectedAdsForCampaign.includes(ad.adId)}
                onChange={() => toggleSelectAdForCampaign(ad.adId)}
                className="rounded-full accent-[#9e93d7] w-4 h-4 cursor-pointer"
              />
              <span className="font-mono text-[11px] text-[#b5b1a6]">Include</span>
            </label>
          </div>

          {/* Ad Mock Creative Frame */}
          <div className="rounded-2xl bg-[#181b24] p-5 border border-zinc-800 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/5">
                {competitor.name}
              </span>
              <span className="text-[11px] font-mono text-[#b5b1a6]">
                {ad.estimatedImpressions
                  ? `~${(ad.estimatedImpressions / 1000000).toFixed(1)}M impressions`
                  : "Active Scaled"}
              </span>
            </div>

            <div className="my-6 text-center space-y-2">
              <p className="text-base font-bold text-white tracking-tight leading-snug">
                &ldquo;{breakdown.hook}&rdquo;
              </p>
              {ad.headline && (
                <p className="text-xs text-zinc-300 line-clamp-2">
                  {ad.headline}
                </p>
              )}
            </div>

            <div className="pt-3 flex justify-between items-center border-t border-zinc-800">
              <span className="text-[11px] text-[#b5b1a6] font-mono uppercase tracking-wider font-medium">CTA Action</span>
              <span className="rounded-full bg-white text-zinc-950 font-bold text-xs px-4 py-1.5 shadow-sm">
                {ad.ctaText}
              </span>
            </div>
          </div>

          {/* Ad Copy Body */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider block text-[#b5b1a6] font-semibold">
              Primary Ad Copy:
            </span>
            <p className="text-xs text-zinc-200 bg-[#181b24] p-4 rounded-2xl border border-zinc-800/80 leading-relaxed italic">
              &ldquo;{ad.adCopy}&rdquo;
            </p>
          </div>

          {ad.targetDemographic && (
            <div className="text-xs text-zinc-400 pt-1 flex items-start gap-1.5">
              <span className="font-mono text-[#e8b98d] font-semibold shrink-0">Demographic: </span>
              <span className="text-zinc-300">{ad.targetDemographic}</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Color-Coded Bento Cards for Hook (#9e93d7), Vulnerability Gap (#e8b98d), Pain Point (#e9b0ce) & Counter-Angle (#6cbb7a) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Lavender #9e93d7 (Hook Psihologic & Persuasion Mechanism) */}
          <div className="bg-[#13161c] rounded-3xl p-6 border border-[#9e93d7]/35 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#9e93d7]/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#9e93d7]/15 flex items-center justify-center text-[#9e93d7] border border-[#9e93d7]/25">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9e93d7] font-semibold">
                  01. Psychological Hook Analysis
                </h3>
              </div>
              <span className="rounded-full bg-[#9e93d7]/15 text-[#9e93d7] border border-[#9e93d7]/25 text-[10px] font-mono px-3 py-0.5 capitalize">
                {breakdown.hookType.replace("_", " ")}
              </span>
            </div>

            <p className="text-sm font-semibold text-white leading-relaxed">
              &ldquo;{breakdown.hook}&rdquo;
            </p>

            <div className="text-xs text-zinc-300 leading-relaxed pt-1 bg-[#181b24] p-3 rounded-2xl border border-zinc-800/80">
              <span className="font-mono text-[#9e93d7] uppercase text-[10px] block font-semibold mb-0.5">
                Mechanism:
              </span>
              {breakdown.mechanism}
            </div>
          </div>

          {/* Card 2: Warm Muted Amber #e8b98d (02. VULNERABILITY GAP DETECTED) */}
          <div className="bg-[#28241F]/40 rounded-3xl p-6 border border-[#e8b98d]/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e8b98d]/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#e8b98d]/15 flex items-center justify-center text-[#e8b98d] border border-[#e8b98d]/25">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#e8b98d] font-bold">
                  02. VULNERABILITY GAP DETECTED
                </h3>
              </div>
              <span className="rounded-full bg-[#e8b98d]/15 text-[#e8b98d] border border-[#e8b98d]/30 text-[10px] font-mono px-2.5 py-0.5 font-bold uppercase">
                Vulnerability Gap
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#e8b98d] font-medium leading-relaxed bg-[#13161c]/80 p-3.5 rounded-2xl border border-[#e8b98d]/20">
              {breakdown.vulnerabilityGap}
            </p>
          </div>

          {/* Card 3: Dusty Rose Pastel #e9b0ce (Pain Point & Emotional Tension) */}
          <div className="bg-[#2D2228]/40 rounded-3xl p-6 border border-[#e9b0ce]/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e9b0ce]/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#e9b0ce]/15 flex items-center justify-center text-[#e9b0ce] border border-[#e9b0ce]/25">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#e9b0ce] font-semibold">
                  Customer Friction & Pain Point
                </h3>
              </div>
              <span className="rounded-full bg-[#e9b0ce]/15 text-[#e9b0ce] border border-[#e9b0ce]/30 text-[10px] font-mono px-2.5 py-0.5 font-medium">
                Emotional Tension
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-[#13161c]/80 p-3.5 rounded-2xl border border-[#e9b0ce]/20">
              {breakdown.painPoint}
            </p>

            {/* Emotional Triggers */}
            <div className="pt-1 space-y-1.5">
              <span className="text-[10px] font-mono text-[#b5b1a6] uppercase tracking-wider block">
                Triggered States:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {breakdown.emotionalTriggers.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[#e9b0ce]/10 border border-[#e9b0ce]/20 text-[#e9b0ce] text-xs px-3 py-0.5 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Sage Mint #6cbb7a (Offer Structure & Effectiveness Score) */}
          <div className="bg-[#13161c] rounded-3xl p-6 border border-[#6cbb7a]/35 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#6cbb7a]/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#6cbb7a]/15 flex items-center justify-center text-[#6cbb7a] border border-[#6cbb7a]/25">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#6cbb7a] font-semibold">
                  Offer Structure & Efficiency
                </h3>
              </div>
              <span className="rounded-full bg-[#6cbb7a]/15 text-[#6cbb7a] border border-[#6cbb7a]/25 text-xs font-mono px-3 py-1 font-bold">
                {breakdown.effectivenessScore}/100 Score
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-[#181b24] p-3 rounded-2xl border border-zinc-800/80">
              <span className="font-mono text-[#6cbb7a] text-xs font-semibold">Offer Framing: </span>
              {breakdown.offerStructure}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
