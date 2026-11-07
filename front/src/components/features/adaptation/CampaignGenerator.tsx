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

  const getAngleTagStyle = (angle: StrategyAngle) => {
    switch (angle) {
      case "direct_comparison":
        return "text-[#9e93d7] border-[#9e93d7]/30 bg-[#9e93d7]/15";
      case "problem_agitation":
        return "text-[#e9b0ce] border-[#e9b0ce]/30 bg-[#e9b0ce]/15";
      case "social_proof_reviews":
        return "text-[#6cbb7a] border-[#6cbb7a]/30 bg-[#6cbb7a]/15";
      default:
        return "text-white border-white/20 bg-white/10";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / Bento Header */}
      <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs px-3.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6cbb7a] shadow-[0_0_6px_#6cbb7a]" />
              <span className="font-mono text-[11px] text-[#b5b1a6]">STEP 04</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#6cbb7a] font-medium">03. GENERATED COUNTER-CAMPAIGN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              AI Counter-Campaign & UGC Studio
            </h2>
            <p className="text-sm text-zinc-400">
              Multi-angle counter-narratives and frame-by-frame creator scripts targeting competitor friction.
            </p>
          </div>

          <Button
            onClick={onRestart}
            variant="outline"
            className="rounded-full bg-white/5 border-zinc-800 text-zinc-200 text-xs hover:bg-white/10 px-5 py-2.5 cursor-pointer"
          >
            Start New Audit
          </Button>
        </div>

        {/* Strategy Selector with Pill-Shaped Buttons */}
        <div className="pt-2">
          <span className="text-xs font-mono text-[#b5b1a6] uppercase tracking-wider font-semibold block mb-2.5">
            Select Counter-Attack Angle:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {campaigns.map((camp) => {
              const isActive = camp.angleUsed === activeAngle;
              return (
                <button
                  key={camp.id}
                  onClick={() => setActiveAngle(camp.angleUsed)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? "bg-white text-zinc-950 font-bold shadow-md ring-1 ring-white"
                      : "bg-[#181b24] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <span>{getAngleLabel(camp.angleUsed)}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-zinc-200 text-zinc-950"
                        : "bg-[#6cbb7a]/15 text-[#6cbb7a] border border-[#6cbb7a]/25"
                    }`}
                  >
                    {camp.projectedMetrics.estimatedRoas}x ROAS
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cost vs. Value & Projected Performance Bar */}
        {currentCampaign && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {/* Bento Card: Sage Mint #6cbb7a (Agency Savings) */}
            <div className="bg-[#181b24] rounded-2xl p-4 border border-[#6cbb7a]/30 flex flex-col justify-between">
              <span className="text-xs text-[#6cbb7a] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold">
                <DollarSign className="w-3.5 h-3.5 text-[#6cbb7a]" />
                Agency Savings
              </span>
              <div className="text-2xl font-bold text-white mt-1">
                ${currentCampaign.estimatedCostSavings.savingsUsd.toLocaleString()}
              </div>
              <span className="text-[11px] text-[#6cbb7a] font-mono mt-1 block">
                {currentCampaign.estimatedCostSavings.savingsPercent}% lower budget vs. agency
              </span>
            </div>

            {/* Bento Card: Cool Sand / Slate #b5b1a6 (Time-to-Market) */}
            <div className="bg-[#181b24] rounded-2xl p-4 border border-zinc-800/80 flex flex-col justify-between">
              <span className="text-xs text-[#b5b1a6] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#b5b1a6]" />
                Time-to-Market
              </span>
              <div className="text-2xl font-bold text-white mt-1">
                {currentCampaign.estimatedCostSavings.timeToMarketDays} Day
              </div>
              <span className="text-[11px] text-[#b5b1a6] font-mono mt-1 block">
                vs 3 weeks typical agency delay
              </span>
            </div>

            {/* Bento Card: Soft Lavender #9e93d7 (Projected ROAS) */}
            <div className="bg-[#181b24] rounded-2xl p-4 border border-[#9e93d7]/30 flex flex-col justify-between">
              <span className="text-xs text-[#9e93d7] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-[#9e93d7]" />
                Projected ROAS
              </span>
              <div className="text-2xl font-bold text-white mt-1">
                {currentCampaign.projectedMetrics.estimatedRoas}x
              </div>
              <span className="text-[11px] text-[#9e93d7] font-mono mt-1 block capitalize">
                {currentCampaign.projectedMetrics.confidenceLevel} confidence
              </span>
            </div>

            {/* Bento Card: Dusty Rose #e9b0ce (Projected CTR & Conv) */}
            <div className="bg-[#181b24] rounded-2xl p-4 border border-[#e9b0ce]/30 flex flex-col justify-between">
              <span className="text-xs text-[#e9b0ce] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#e9b0ce]" />
                Projected CTR &amp; Conv.
              </span>
              <div className="text-2xl font-bold text-white mt-1">
                {currentCampaign.projectedMetrics.estimatedCtr}% /{" "}
                {currentCampaign.projectedMetrics.estimatedConversionRate}%
              </div>
              <span className="text-[11px] text-[#b5b1a6] font-mono mt-1 block">
                Category index benchmark
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Campaign Grid */}
      {currentCampaign && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Primary Copy & Brief (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#13161c] rounded-3xl p-6 border border-zinc-800/80 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-semibold text-sm text-white">
                    Primary Ad Copy
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${currentCampaign.headline}\n\n${currentCampaign.primaryText}\n\n${currentCampaign.cta}`,
                      "copy"
                    )
                  }
                  className="rounded-full bg-white/5 hover:bg-white/10 border border-zinc-800 text-zinc-300 hover:text-white px-3 py-1 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedField === "copy" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#6cbb7a]" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Copy
                    </>
                  )}
                </button>
              </div>

              {/* Angle Tag Indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase border ${getAngleTagStyle(
                    currentCampaign.angleUsed
                  )}`}
                >
                  {getAngleLabel(currentCampaign.angleUsed)}
                </span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-mono bg-white/5 text-[#b5b1a6] border border-white/10">
                  Llama 3.3
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b5b1a6] block font-semibold">
                  Headline
                </span>
                <p className="text-sm font-bold text-white leading-snug">
                  {currentCampaign.headline}
                </p>
              </div>

              {/* Primary Body */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b5b1a6] block font-semibold">
                  Primary Text Body
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed bg-[#181b24] p-4 rounded-2xl border border-zinc-800/80 whitespace-pre-line">
                  {currentCampaign.primaryText}
                </p>
              </div>

              {/* CTA Pill */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-800/60">
                <span className="text-xs font-mono text-[#b5b1a6]">
                  Call to Action:
                </span>
                <span className="rounded-full bg-white text-zinc-950 font-bold text-xs px-5 py-2 shadow-sm">
                  {currentCampaign.cta}
                </span>
              </div>
            </div>

            {/* Visual Concept Brief with Lavender Accent */}
            <div className="bg-[#13161c] rounded-3xl p-6 border border-zinc-800/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                <div className="w-7 h-7 rounded-xl bg-[#9e93d7]/15 border border-[#9e93d7]/30 flex items-center justify-center text-[#9e93d7]">
                  <Video className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-semibold text-sm text-white">
                  Creative Director Brief
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#181b24] p-4 rounded-2xl border border-zinc-800/80">
                {currentCampaign.visualConceptBrief}
              </p>
            </div>

            {/* Differentiators Highlighted with Sage Mint Accent */}
            {currentStrategy && (
              <div className="bg-[#13161c] rounded-3xl p-5 border border-[#6cbb7a]/30 space-y-2.5 text-xs">
                <span className="font-mono text-[#6cbb7a] text-xs flex items-center gap-1.5 uppercase tracking-wide font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#6cbb7a]" /> Differentiators Highlighted
                </span>
                <ul className="space-y-1.5 text-zinc-200 pl-1">
                  {currentStrategy.differentiators.map((diff, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#6cbb7a] mt-0.5">&bull;</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: UGC Storyboard Timeline Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clapperboard className="w-5 h-5 text-[#9e93d7]" />
                  Frame-by-Frame UGC Storyboard Timeline
                </h3>
                <span className="text-xs text-[#b5b1a6] font-mono">
                  {currentCampaign.ugcStoryboard.length} frames ready for TikTok &amp; Reels production &bull; Model: Llama 3.3
                </span>
              </div>
            </div>

            {/* Timeline Cards */}
            <div className="space-y-4">
              {currentCampaign.ugcStoryboard.map((frame: UgcStoryboardFrame, index: number) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800/80 bg-[#13161c] p-6 transition-all hover:border-[#9e93d7]/40 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    {/* Timestamp with discrete Cool Sand font-mono #b5b1a6 */}
                    <div className="rounded-xl bg-[#181b24] border border-zinc-800 px-3 py-1.5 font-mono text-xs font-semibold text-[#b5b1a6] shrink-0">
                      0:0{frame.second} - 0:0{frame.second + 3}
                    </div>

                    <div className="space-y-3 flex-1">
                      {/* Visual Frame */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#b5b1a6] block font-semibold">
                          Visual Frame:
                        </span>
                        <p className="text-xs font-medium text-white mt-1 leading-relaxed">
                          {frame.visualFrame}
                        </p>
                      </div>

                      {/* Audio Script */}
                      <div className="bg-[#181b24] p-4 rounded-2xl border border-zinc-800/80">
                        <span className="text-[10px] font-mono uppercase tracking-wide text-[#b5b1a6] block font-semibold">
                          Audio Script / Voiceover:
                        </span>
                        <p className="text-xs text-zinc-200 italic mt-1 leading-relaxed">
                          &ldquo;{frame.audioScript}&rdquo;
                        </p>
                      </div>

                      {/* Overlay & Transition Capsule Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {frame.textOverlay && (
                          <span className="rounded-full bg-white text-zinc-950 font-mono text-[10px] font-semibold px-3 py-0.5 shadow-sm">
                            Overlay: &ldquo;{frame.textOverlay}&rdquo;
                          </span>
                        )}
                        {frame.transitionNote && (
                          <span className="rounded-full bg-white/5 border border-zinc-800 text-[#b5b1a6] font-mono text-[10px] px-2.5 py-0.5">
                            {frame.transitionNote}
                          </span>
                        )}
                        <span className="rounded-full bg-white/5 border border-white/5 text-[#b5b1a6] font-mono text-[10px] px-2 py-0.5">
                          9:16 Vertical
                        </span>
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
