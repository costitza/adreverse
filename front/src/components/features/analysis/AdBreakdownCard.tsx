"use client";

import React, { useState } from "react";
import {
  AdAnalysisResult,
  AdAggregateSummary,
  Competitor,
} from "@shared/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

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
  if (!currentAnalysis) return null;

  const { ad, breakdown } = currentAnalysis;

  const toggleSelectAd = (adId: string) => {
    setSelectedAdsForCampaign((prev) =>
      prev.includes(adId)
        ? prev.filter((id) => id !== adId)
        : [...prev, adId]
    );
  };

  const isSelected = selectedAdsForCampaign.includes(ad.adId);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Minimal Header (Clean, Linear/Vercel style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Ad Reverse Engineering
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Analyzing creative strategies and positioning for{" "}
            <span className="text-zinc-200 font-medium">{competitor.name}</span>
          </p>
        </div>

        {/* Global Competitor Vulnerability (if present) */}
        {aggregateSummary?.topVulnerabilityGap && (
          <div className="text-xs text-zinc-400 max-w-md text-left sm:text-right">
            <span className="text-zinc-500 font-mono text-[11px] block uppercase tracking-wider">
              Primary Opportunity
            </span>
            <span className="text-zinc-300 line-clamp-1">
              {aggregateSummary.topVulnerabilityGap}
            </span>
          </div>
        )}
      </div>

      {/* 2. Compact Tabs for Switching Creatives */}
      {analyses.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {analyses.map((item, idx) => {
            const isCurrent = idx === selectedAdIndex;
            return (
              <button
                key={item.ad.adId}
                type="button"
                onClick={() => setSelectedAdIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                  isCurrent
                    ? "bg-white text-zinc-950 font-medium border-white shadow-xs"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800"
                }`}
              >
                <span className="capitalize">{item.ad.platform || "Ad"} #{idx + 1}</span>
                {selectedAdsForCampaign.includes(item.ad.adId) && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-zinc-950" : "bg-emerald-400"}`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Aerated 2-Column Split (Linear / Vercel layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Source Creative Preview (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header: Platform & Include toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                {ad.platform} Creative
              </span>

              <button
                type="button"
                onClick={() => toggleSelectAd(ad.adId)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    : "bg-zinc-800/40 text-zinc-400 border-zinc-700/50 hover:text-zinc-200"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                <span>{isSelected ? "Selected" : "Select Ad"}</span>
              </button>
            </div>

            {/* Hook Highlight */}
            {breakdown?.hook && (
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Hook Line
                </span>
                <p className="text-sm font-medium text-white leading-snug">
                  &ldquo;{breakdown.hook}&rdquo;
                </p>
              </div>
            )}

            {/* Headline if distinct */}
            {ad.headline && ad.headline !== breakdown?.hook && (
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Headline
                </span>
                <p className="text-xs text-zinc-300">
                  {ad.headline}
                </p>
              </div>
            )}

            {/* Primary Ad Copy */}
            {ad.adCopy && (
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Ad Copy
                </span>
                <p className="text-xs text-zinc-300 bg-black/20 p-3.5 rounded-xl border border-zinc-800/50 leading-relaxed font-sans max-h-48 overflow-y-auto">
                  {ad.adCopy}
                </p>
              </div>
            )}
          </div>

          {/* Footer: CTA Button (if present) */}
          {ad.ctaText && (
            <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono text-[11px]">Action</span>
              <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-200 font-medium">
                {ad.ctaText}
              </span>
            </div>
          )}
        </div>

        {/* Right: AI Strategic Deconstruction (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-5">
            {/* Block 1: Competitor Strategy & Mechanism */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                Competitor Angle & Mechanism
              </span>

              {breakdown?.mechanism ? (
                <p className="text-xs text-zinc-300 leading-relaxed bg-black/20 p-3.5 rounded-xl border border-zinc-800/50">
                  {breakdown.mechanism}
                </p>
              ) : (
                <p className="text-xs text-zinc-400 italic">
                  No specific mechanism extracted for this ad unit.
                </p>
              )}

              {breakdown?.painPoint && (
                <div className="pt-1 text-xs text-zinc-400">
                  <span className="text-zinc-500 font-mono text-[11px]">Target Tension: </span>
                  <span className="text-zinc-300">{breakdown.painPoint}</span>
                </div>
              )}
            </div>

            {/* Block 2: Vulnerability Gap & Recommended Counter-Attack */}
            <div className="space-y-2 pt-3 border-t border-zinc-800/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Vulnerability & Attack Angle
              </span>

              {breakdown?.vulnerabilityGap ? (
                <p className="text-xs text-zinc-200 leading-relaxed bg-amber-500/5 border border-amber-500/15 p-3.5 rounded-xl">
                  {breakdown.vulnerabilityGap}
                </p>
              ) : (
                <p className="text-xs text-zinc-400 italic">
                  Vulnerability assessment not detected.
                </p>
              )}

              {breakdown?.offerStructure && (
                <div className="pt-1 text-xs text-zinc-400">
                  <span className="text-zinc-500 font-mono text-[11px]">Offer Framing: </span>
                  <span className="text-zinc-300">{breakdown.offerStructure}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-mono text-[11px]">
              {selectedAdsForCampaign.length} of {analyses.length} ads selected
            </span>

            <Button
              onClick={() =>
                onProceedToAdaptation(
                  selectedAdsForCampaign.length > 0
                    ? selectedAdsForCampaign
                    : [ad.adId]
                )
              }
              className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-medium px-5 py-2 text-xs transition-colors gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Build Counter-Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
