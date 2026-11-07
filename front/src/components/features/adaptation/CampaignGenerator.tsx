"use client";

import React, { useState } from "react";
import {
  GeneratedCampaign,
  AdaptationStrategy,
  StrategyAngle,
  UgcStoryboardFrame,
} from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Clapperboard,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Video,
  FileText,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Share2,
} from "lucide-react";

interface CampaignGeneratorProps {
  campaigns: GeneratedCampaign[];
  adaptationStrategies: AdaptationStrategy[];
  onRestart: () => void;
}

export function CampaignGenerator({
  campaigns,
  adaptationStrategies,
  onRestart,
}: CampaignGeneratorProps) {
  const [activeAngle, setActiveAngle] = useState<StrategyAngle>(
    campaigns[0]?.angleUsed || "direct_comparison"
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const currentCampaign =
    campaigns.find((c) => c.angleUsed === activeAngle) || campaigns[0];

  const currentStrategy = adaptationStrategies.find(
    (s) => s.angleUsed === activeAngle
  );

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getAngleLabel = (angle: StrategyAngle) => {
    switch (angle) {
      case "direct_comparison":
        return "Direct Comparison";
      case "problem_agitation":
        return "Problem Agitation";
      case "social_proof_reviews":
        return "Social Proof & Reviews";
      default:
        return angle;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Counter-Campaign & UGC Storyboard
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Generated multi-angle counter-narratives engineered to exploit competitor vulnerability gaps.
          </p>
        </div>
        <Button
          onClick={onRestart}
          variant="outline"
          size="sm"
          className="self-start md:self-auto text-xs"
        >
          New Analysis
        </Button>
      </div>

      {/* Tabs for Strategy Angles */}
      <div className="flex gap-2 border-b border-border/50 pb-2 overflow-x-auto">
        {campaigns.map((camp) => {
          const isActive = camp.angleUsed === activeAngle;
          return (
            <button
              key={camp.id}
              onClick={() => setActiveAngle(camp.angleUsed)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{getAngleLabel(camp.angleUsed)}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {camp.projectedMetrics.estimatedRoas}x ROAS
              </span>
            </button>
          );
        })}
      </div>

      {/* Cost vs. Value & Projected Performance Bar */}
      {currentCampaign && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl border border-border/60 bg-card shadow-xs">
            <span className="text-xs text-muted-foreground block flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              Agency Savings
            </span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              ${currentCampaign.estimatedCostSavings.savingsUsd.toLocaleString()}
            </div>
            <span className="text-[11px] text-muted-foreground">
              {currentCampaign.estimatedCostSavings.savingsPercent}% lower production cost
            </span>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-card shadow-xs">
            <span className="text-xs text-muted-foreground block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Time-to-Market
            </span>
            <div className="text-2xl font-bold text-foreground mt-1">
              {currentCampaign.estimatedCostSavings.timeToMarketDays} Day
            </div>
            <span className="text-[11px] text-muted-foreground">
              vs 30+ days traditional agency
            </span>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-card shadow-xs">
            <span className="text-xs text-muted-foreground block flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              Projected ROAS
            </span>
            <div className="text-2xl font-bold text-primary mt-1">
              {currentCampaign.projectedMetrics.estimatedRoas}x
            </div>
            <span className="text-[11px] text-muted-foreground capitalize">
              {currentCampaign.projectedMetrics.confidenceLevel} confidence
            </span>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-card shadow-xs">
            <span className="text-xs text-muted-foreground block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Projected CTR / Conv.
            </span>
            <div className="text-2xl font-bold text-foreground mt-1">
              {currentCampaign.projectedMetrics.estimatedCtr}% /{" "}
              {currentCampaign.projectedMetrics.estimatedConversionRate}%
            </div>
            <span className="text-[11px] text-muted-foreground">
              Conversion Benchmark
            </span>
          </div>
        </div>
      )}

      {/* Main Campaign Content Grid */}
      {currentCampaign && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Copy & Creative Brief (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Ad Copy Box */}
            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Primary Ad Copy
                </h3>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() =>
                    handleCopy(
                      `${currentCampaign.headline}\n\n${currentCampaign.primaryText}\n\n${currentCampaign.cta}`,
                      "copy"
                    )
                  }
                  className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copiedField === "copy" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Headline
                </span>
                <p className="text-sm font-bold text-foreground leading-snug">
                  {currentCampaign.headline}
                </p>
              </div>

              {/* Primary Body */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Body Copy
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed bg-muted/20 p-3.5 rounded-xl border border-border/40 whitespace-pre-line">
                  {currentCampaign.primaryText}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  Call to Action:
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-xs">
                  {currentCampaign.cta}
                </span>
              </div>
            </div>

            {/* Visual Concept Brief */}
            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-3 shadow-xs">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Video className="w-4 h-4 text-violet-500" />
                Art Director Concept Brief
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3.5 rounded-xl border border-border/40">
                {currentCampaign.visualConceptBrief}
              </p>
            </div>

            {/* Strategic Adaptation Context */}
            {currentStrategy && (
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2 text-xs">
                <span className="font-bold text-foreground block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Key Differentiators Highlighted
                </span>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {currentStrategy.differentiators.map((diff, i) => (
                    <li key={i}>{diff}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: UGC Storyboard Frame-by-Frame (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Clapperboard className="w-5 h-5 text-primary" />
                  Second-by-Second UGC Storyboard
                </h3>
                <span className="text-xs text-muted-foreground">
                  {currentCampaign.ugcStoryboard.length} frames ready for TikTok / Reels creator production
                </span>
              </div>
            </div>

            {/* Storyboard Vertical Timeline Cards */}
            <div className="space-y-3">
              {currentCampaign.ugcStoryboard.map((frame: UgcStoryboardFrame, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border hover:shadow-xs relative"
                >
                  <div className="flex items-start gap-3">
                    {/* Time Stamp Badge */}
                    <div className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold shrink-0">
                      {frame.second}s
                    </div>

                    <div className="space-y-2 flex-1">
                      {/* Visual Frame Description */}
                      <div>
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                          Visual Scene:
                        </span>
                        <p className="text-xs font-medium text-foreground mt-0.5">
                          {frame.visualFrame}
                        </p>
                      </div>

                      {/* Audio Script */}
                      <div className="bg-muted/30 p-2.5 rounded-lg border border-border/30">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wide block">
                          Spoken Audio / Voiceover:
                        </span>
                        <p className="text-xs text-foreground italic mt-0.5">
                          {frame.audioScript}
                        </p>
                      </div>

                      {/* Overlay & Transition tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        {frame.textOverlay && (
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 font-mono text-[10px]">
                            Overlay: {frame.textOverlay}
                          </span>
                        )}
                        {frame.transitionNote && (
                          <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px]">
                            Cut: {frame.transitionNote}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
