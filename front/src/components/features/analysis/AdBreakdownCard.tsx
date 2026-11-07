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
  Flame,
  Lightbulb,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle,
  ExternalLink,
  Target,
  BarChart3,
  Layers,
  ChevronRight,
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 70) return "text-amber-600 bg-amber-500/10 border-amber-500/20";
    return "text-rose-600 bg-rose-500/10 border-rose-500/20";
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header & Meta Analysis Summary */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              Ad Reverse-Engineering & Vulnerability Breakdown
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Deconstructed top performing creatives from{" "}
              <span className="font-semibold text-foreground">{competitor.name}</span>.
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
            className="px-5 py-2.5 h-auto text-sm font-semibold gap-2 shadow-md hover:shadow-lg transition-all"
          >
            Generate Counter-Campaign
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Aggregate Insights Bar */}
        <div className="p-4 rounded-xl border border-border/60 bg-card grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-muted-foreground block">Ads Analysed</span>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {aggregateSummary.totalAdsAnalysed}
            </div>
            <span className="text-[11px] text-muted-foreground">Active in ad library</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Avg Score</span>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {aggregateSummary.avgEffectivenessScore.toFixed(1)}/100
            </div>
            <span className="text-[11px] text-muted-foreground">Effectiveness index</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Dominant Hook</span>
            <div className="text-base font-bold text-foreground mt-1 truncate capitalize">
              {aggregateSummary.mostUsedHookType.replace("_", " ")}
            </div>
            <span className="text-[11px] text-muted-foreground">Framework: AIDA / PAS</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Top Exploit Gap</span>
            <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-1 line-clamp-2">
              Transparency & Proof deficit
            </div>
          </div>
        </div>

        {/* Global Competitor Vulnerability Callout */}
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-foreground">
              Core Competitor Weakness:{" "}
            </span>
            <span className="text-muted-foreground">
              {aggregateSummary.topVulnerabilityGap}
            </span>
          </div>
        </div>
      </div>

      {/* Ad Selection Selector (Horizontal Pills) */}
      <div className="flex gap-2 border-b border-border/40 pb-3 overflow-x-auto">
        {analyses.map((item, idx) => {
          const isCurrent = idx === selectedAdIndex;
          const isChecked = selectedAdsForCampaign.includes(item.ad.adId);
          return (
            <button
              key={item.ad.adId}
              onClick={() => setSelectedAdIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
                isCurrent
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Creative #{idx + 1} ({item.ad.platform})</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isCurrent
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {item.breakdown.effectivenessScore}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Raw Ad Creative Preview (4 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-border/60 bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                {ad.platform}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {ad.daysActive} days active
              </span>
            </div>
            <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAdsForCampaign.includes(ad.adId)}
                onChange={() => toggleSelectAdForCampaign(ad.adId)}
                className="rounded border-input text-primary focus:ring-primary w-3.5 h-3.5"
              />
              <span className="text-muted-foreground">Use in Counter-Ad</span>
            </label>
          </div>

          {/* Ad Mock Creative Box */}
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 flex flex-col justify-between text-white shadow-inner relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/20 backdrop-blur">
                {competitor.name}
              </span>
              <span className="text-[11px] text-white/70">
                {ad.estimatedImpressions
                  ? `~${(ad.estimatedImpressions / 1000000).toFixed(1)}M imp.`
                  : "Sponsored"}
              </span>
            </div>

            <div className="z-10 my-auto text-center space-y-2 px-3">
              <p className="text-sm font-bold tracking-tight text-white/95">
                "{breakdown.hook}"
              </p>
              {ad.headline && (
                <p className="text-xs text-white/80 line-clamp-2 italic">
                  {ad.headline}
                </p>
              )}
            </div>

            <div className="z-10 pt-2 flex justify-between items-center border-t border-white/10">
              <span className="text-[11px] text-white/60">CTA</span>
              <span className="px-3 py-1 rounded bg-white text-zinc-950 font-bold text-xs">
                {ad.ctaText}
              </span>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Ad Copy */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground block">
              Primary Ad Copy:
            </span>
            <p className="text-xs text-foreground bg-muted/30 p-3 rounded-lg border border-border/40 leading-relaxed italic">
              "{ad.adCopy}"
            </p>
          </div>

          {ad.targetDemographic && (
            <div className="text-[11px] text-muted-foreground pt-1">
              <span className="font-semibold text-foreground">Targeting: </span>
              {ad.targetDemographic}
            </div>
          )}
        </div>

        {/* Right Column: AI Reverse-Engineering Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card Header with Score */}
          <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  Psychological & Copy Deconstruction
                </h3>
                <span className="text-xs text-muted-foreground">
                  Persuasion Framework:{" "}
                  <strong className="text-foreground">{breakdown.persuasionFramework}</strong>
                </span>
              </div>
              <div
                className={`px-3 py-1.5 rounded-xl border text-sm font-bold ${getScoreColor(
                  breakdown.effectivenessScore
                )}`}
              >
                Score: {breakdown.effectivenessScore}/100
              </div>
            </div>

            {/* Grid of 4 Core Deconstruction Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Hook Analysis */}
              <div className="p-3.5 rounded-xl border border-border/40 bg-muted/20 space-y-1.5">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" /> Hook Type ({breakdown.hookType})
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  "{breakdown.hook}"
                </p>
              </div>

              {/* Core Pain Point */}
              <div className="p-3.5 rounded-xl border border-border/40 bg-muted/20 space-y-1.5">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <Target className="w-3.5 h-3.5" /> Target Pain Point
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {breakdown.painPoint}
                </p>
              </div>

              {/* Mechanism */}
              <div className="p-3.5 rounded-xl border border-border/40 bg-muted/20 space-y-1.5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <Layers className="w-3.5 h-3.5" /> Solution Mechanism
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {breakdown.mechanism}
                </p>
              </div>

              {/* Offer Structure */}
              <div className="p-3.5 rounded-xl border border-border/40 bg-muted/20 space-y-1.5">
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <BarChart3 className="w-3.5 h-3.5" /> Offer Framing
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {breakdown.offerStructure}
                </p>
              </div>
            </div>

            {/* Emotional Triggers Pill Bar */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground block">
                Triggered Emotions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {breakdown.emotionalTriggers.map((trigger, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-medium"
                  >
                    #{trigger}
                  </span>
                ))}
              </div>
            </div>

            {/* Exploit Vulnerability Gap - High Importance */}
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                Vulnerability Gap to Exploit
              </div>
              <p className="text-xs text-foreground leading-relaxed font-medium">
                {breakdown.vulnerabilityGap}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
