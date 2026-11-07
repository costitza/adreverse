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
  Clapperboard,
  Copy,
  Check,
  Video,
  FileText,
  ShieldCheck,
  ArrowUpRight,
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
    campaigns?.[0]?.angleUsed || "direct_comparison"
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-2xl bg-zinc-900/30 border border-zinc-800/80 p-12 text-center space-y-4">
        <h3 className="text-base font-medium text-white">No Counter-Campaigns Available</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Please select an ad in Step 3 to generate strategic counter-campaigns.
        </p>
        <Button
          onClick={onRestart}
          className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-medium px-5 py-2 cursor-pointer transition-colors"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

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

  const formatTimestamp = (second: number) => {
    const startSec = Math.max(0, second || 0);
    const endSec = startSec + 3;
    const fmt = (s: number) => `0:${s.toString().padStart(2, "0")}`;
    return `${fmt(startSec)} - ${fmt(endSec)}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Minimal Header (Linear / Vercel style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Counter-Campaign Studio
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Strategic ad copy and UGC storyboard tailored against competitor friction points
          </p>
        </div>

        <Button
          onClick={onRestart}
          variant="outline"
          className="rounded-full bg-zinc-900/60 border-zinc-800 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white px-4 py-1.5 cursor-pointer self-start sm:self-auto transition-colors"
        >
          Start New Audit
        </Button>
      </div>

      {/* 2. Clean Strategy Angle Selector (No ROAS badges, pure tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {campaigns.map((camp) => {
          const isActive = camp.angleUsed === activeAngle;
          return (
            <button
              key={camp.id}
              onClick={() => setActiveAngle(camp.angleUsed)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer shrink-0 ${
                isActive
                  ? "bg-white text-zinc-950 font-semibold shadow-xs"
                  : "bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-800/70"
              }`}
            >
              {getAngleLabel(camp.angleUsed)}
            </button>
          );
        })}
      </div>

      {/* 3. Main Deliverables Grid (2 Columns: Copy & Storyboard) */}
      {currentCampaign && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Primary Copy & Creative Direction (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Ad Copy Card */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium text-xs text-white">
                    Primary Creative & Copy
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${currentCampaign.headline}\n\n${currentCampaign.primaryText}\n\nCTA: ${currentCampaign.cta}`,
                      "copy"
                    )
                  }
                  className="rounded-full bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white px-3 py-1 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedField === "copy" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Headline */}
              {currentCampaign.headline && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    Headline
                  </span>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {currentCampaign.headline}
                  </p>
                </div>
              )}

              {/* Primary Body */}
              {currentCampaign.primaryText && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    Ad Copy
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-black/20 p-3.5 rounded-xl border border-zinc-800/50 whitespace-pre-line font-sans max-h-56 overflow-y-auto">
                    {currentCampaign.primaryText}
                  </p>
                </div>
              )}

              {/* CTA Action Bar */}
              {currentCampaign.cta && (
                <div className="pt-2 flex items-center justify-between border-t border-zinc-800/60 text-xs">
                  <span className="font-mono text-[11px] text-zinc-500">Call to Action</span>
                  <span className="px-3 py-1 rounded-md bg-white text-zinc-950 font-medium text-xs flex items-center gap-1 shadow-xs">
                    <span>{currentCampaign.cta}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              )}
            </div>

            {/* Creative Director Brief */}
            {currentCampaign.visualConceptBrief && (
              <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 space-y-2.5">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                  <Video className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium text-xs text-white">
                    Creative Director Brief
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed bg-black/20 p-3.5 rounded-xl border border-zinc-800/50">
                  {currentCampaign.visualConceptBrief}
                </p>
              </div>
            )}

            {/* Key Differentiators */}
            {currentStrategy && currentStrategy.differentiators && currentStrategy.differentiators.length > 0 && (
              <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-4 space-y-2">
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  Differentiators Highlighted
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-300 pt-0.5">
                  {currentStrategy.differentiators.map((diff, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-zinc-500 mt-0.5">&bull;</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Frame-by-Frame UGC Storyboard (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Clapperboard className="w-3.5 h-3.5 text-zinc-400" />
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                  UGC Storyboard
                </h3>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">
                {currentCampaign.ugcStoryboard?.length || 0} frames
              </span>
            </div>

            {/* Frame List */}
            <div className="space-y-2.5">
              {currentCampaign.ugcStoryboard?.map((frame: UgcStoryboardFrame, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700/80"
                >
                  <div className="flex items-start gap-3">
                    {/* Timestamp */}
                    <span className="rounded-md bg-zinc-800/80 border border-zinc-700/50 px-2 py-0.5 font-mono text-[11px] text-zinc-300 shrink-0 font-medium">
                      {formatTimestamp(frame.second)}
                    </span>

                    <div className="space-y-2 flex-1">
                      {/* Visual Frame */}
                      {frame.visualFrame && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                            Visual Frame
                          </span>
                          <p className="text-xs text-zinc-200 mt-0.5 leading-relaxed">
                            {frame.visualFrame}
                          </p>
                        </div>
                      )}

                      {/* Audio Script */}
                      {frame.audioScript && (
                        <div className="bg-black/20 p-2.5 rounded-lg border border-zinc-800/40">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                            Voiceover / Audio
                          </span>
                          <p className="text-xs text-zinc-300 italic mt-0.5 leading-relaxed">
                            &ldquo;{frame.audioScript}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Overlay & Transition (Discreetly formatted) */}
                      {(frame.textOverlay || frame.transitionNote) && (
                        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                          {frame.textOverlay && (
                            <span className="text-zinc-400 font-mono text-[10px]">
                              <span className="text-zinc-500">Text on screen: </span>
                              &ldquo;{frame.textOverlay}&rdquo;
                            </span>
                          )}
                          {frame.textOverlay && frame.transitionNote && (
                            <span className="text-zinc-600">&bull;</span>
                          )}
                          {frame.transitionNote && (
                            <span className="text-zinc-500 font-mono text-[10px]">
                              Transition: {frame.transitionNote}
                            </span>
                          )}
                        </div>
                      )}
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
