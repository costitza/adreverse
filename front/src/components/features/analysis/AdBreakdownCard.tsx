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
  CheckCircle2,
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
      {/* Top Banner (clean, debloated, uniform with Steps 1 & 2) */}
      <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs px-3.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e93d7] shadow-[0_0_6px_#9e93d7]" />
              <span className="font-mono text-[11px] text-[#b5b1a6]">STEP 03</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#9e93d7] font-medium">Ad Breakdown & Gaps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Deconstructed Creatives & Vulnerabilities
            </h2>
            <p className="text-sm text-zinc-400">
              Analysed <span className="text-zinc-200 font-semibold">{analyses.length} active ads</span> from{" "}
              <span className="text-zinc-200 font-semibold">{competitor.name}</span>.
            </p>
          </div>

          {/* Quick inline pills */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-2xl bg-[#181b24] border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="text-zinc-400">Avg Score: </span>
              <strong className="text-white">{aggregateSummary.avgEffectivenessScore.toFixed(0)}/100</strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-2xl bg-[#181b24] border border-zinc-800 text-xs font-mono text-zinc-300 capitalize">
              <span className="text-zinc-400">Hook: </span>
              <strong className="text-white">{aggregateSummary.mostUsedHookType.replace("_", " ")}</strong>
            </div>
          </div>
        </div>

        {/* Global Opportunity / Vulnerability Banner */}
        {aggregateSummary.topVulnerabilityGap && (
          <div className="mt-5 pt-4 border-t border-zinc-800/70 flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-[#e8b98d] shrink-0 mt-0.5" />
            <p>
              <strong className="text-zinc-200">Competitor Weakness:</strong>{" "}
              {aggregateSummary.topVulnerabilityGap}
            </p>
          </div>
        )}
      </div>

      {/* Pill-Tabs for Switching Between Creative Analyses */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-[#b5b1a6] font-mono uppercase tracking-wider font-semibold mr-2 shrink-0">
          Creatives:
        </span>
        {analyses.map((item, idx) => {
          const isCurrent = idx === selectedAdIndex;
          const isChecked = selectedAdsForCampaign.includes(item.ad.adId);

          return (
            <button
              key={item.ad.adId}
              type="button"
              onClick={() => setSelectedAdIndex(idx)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all flex items-center gap-2.5 shrink-0 cursor-pointer ${
                isCurrent
                  ? "bg-white text-zinc-950 font-bold shadow-sm"
                  : "bg-[#181b24] text-zinc-300 hover:bg-[#202531] border border-zinc-800"
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
              {isChecked && (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? "text-emerald-700" : "text-emerald-400"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Unified 2-Column Clean Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Creative Card & Ad Copy (5 cols) */}
        <div className="lg:col-span-5 bg-[#13161c] rounded-3xl p-6 border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/5 border border-white/10 text-xs px-3 py-0.5 font-mono uppercase text-zinc-300">
                {ad.platform}
              </span>
              <span className="text-xs text-[#b5b1a6] font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {ad.daysActive}d active
              </span>
            </div>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={selectedAdsForCampaign.includes(ad.adId)}
                onChange={() => toggleSelectAdForCampaign(ad.adId)}
                className="rounded-full accent-[#9e93d7] w-4 h-4 cursor-pointer"
              />
              <span className="font-mono text-[11px] text-[#b5b1a6]">Target</span>
            </label>
          </div>

          {/* Ad Mock Card */}
          <div className="rounded-2xl bg-[#181b24] p-5 border border-zinc-800 flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/5">
                {competitor.name}
              </span>
              <span className="text-[11px] font-mono text-[#b5b1a6]">
                {ad.estimatedImpressions
                  ? `~${(ad.estimatedImpressions / 1000000).toFixed(1)}M impressions`
                  : "Active Ad"}
              </span>
            </div>

            <div className="my-5 space-y-2">
              <p className="text-sm sm:text-base font-bold text-white tracking-tight">
                &ldquo;{breakdown.hook}&rdquo;
              </p>
              {ad.headline && (
                <p className="text-xs text-zinc-400">
                  {ad.headline}
                </p>
              )}
            </div>

            <div className="pt-3 flex justify-between items-center border-t border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 font-mono">CTA</span>
              <span className="rounded-full bg-white text-zinc-950 font-semibold text-xs px-3 py-1 shadow-sm">
                {ad.ctaText}
              </span>
            </div>
          </div>

          {/* Primary Copy */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider block text-zinc-400 font-medium">
              Ad Copy:
            </span>
            <p className="text-xs text-zinc-200 bg-[#181b24] p-4 rounded-2xl border border-zinc-800/80 leading-relaxed italic">
              &ldquo;{ad.adCopy}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Clean Unified Analysis Card (7 cols) */}
        <div className="lg:col-span-7 bg-[#13161c] rounded-3xl p-6 border border-zinc-800/80 shadow-sm space-y-5">
          {/* Section 1: Hook & Mechanism */}
          <div className="space-y-2 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9e93d7]" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
                  Hook & Mechanism
                </h3>
              </div>
              <span className="rounded-full bg-[#9e93d7]/15 text-[#9e93d7] border border-[#9e93d7]/25 text-[10px] font-mono px-2.5 py-0.5 capitalize">
                {breakdown.hookType.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm font-semibold text-white">
              &ldquo;{breakdown.hook}&rdquo;
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#181b24] p-3 rounded-2xl border border-zinc-800/70">
              <strong className="text-zinc-200">How it works:</strong> {breakdown.mechanism}
            </p>
          </div>

          {/* Section 2: Vulnerability Gap */}
          <div className="space-y-2 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#e8b98d]" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#e8b98d] font-bold">
                Exposed Vulnerability
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-[#e8b98d] font-medium leading-relaxed bg-[#28241F]/40 p-3.5 rounded-2xl border border-[#e8b98d]/25">
              {breakdown.vulnerabilityGap}
            </div>
          </div>

          {/* Section 3: Customer Friction & Triggers */}
          <div className="space-y-2 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
                Customer Friction & Triggers
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {breakdown.painPoint}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {breakdown.emotionalTriggers.map((t, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] px-2.5 py-0.5 font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Offer Structure */}
          <div className="flex items-start justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#6cbb7a]" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
                  Offer Framing
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {breakdown.offerStructure}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Score</span>
              <span className="text-base font-mono font-bold text-white">
                {breakdown.effectivenessScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer (Centered & rounded CTA bar) */}
      <div className="bg-[#13161c] rounded-3xl p-4 sm:p-5 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#6cbb7a]" />
          <span>
            {selectedAdsForCampaign.length} of {analyses.length} creatives selected for counter-campaign
          </span>
        </div>

        <Button
          onClick={() =>
            onProceedToAdaptation(
              selectedAdsForCampaign.length > 0
                ? selectedAdsForCampaign
                : [ad.adId]
            )
          }
          className="w-full sm:w-auto rounded-full bg-white text-zinc-950 font-semibold px-8 py-2.5 text-sm hover:bg-zinc-200 transition-all gap-2 cursor-pointer shadow-sm"
        >
          <span>Generate Counter-Campaign Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
