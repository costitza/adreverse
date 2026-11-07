"use client";

import React, { useState } from "react";
import {
  Competitor,
  MarketSnapshot,
  BrandOnboardingResponse,
} from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Globe,
  Radio,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Search,
  CheckCircle2,
  Check,
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
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "challenger":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "niche":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header & Extracted Brand Insight Notice */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Market Discovery & Competitor Landscape
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Identified {competitors.length} primary competitors in the{" "}
              <span className="font-semibold text-foreground">
                {onboardingData.brand.niche}
              </span>{" "}
              space.
            </p>
          </div>
        </div>

        {/* Market Snapshot Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-border/50 bg-card/60 backdrop-blur shadow-xs">
            <span className="text-xs text-muted-foreground block">Active Ads Scanned</span>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {marketSnapshot.totalActiveAds.toLocaleString()}
            </div>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
              Across Meta & TikTok
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-card/60 backdrop-blur shadow-xs">
            <span className="text-xs text-muted-foreground block">Avg Effectiveness</span>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {marketSnapshot.avgEffectivenessScore}/100
            </div>
            <span className="text-[11px] text-amber-500 font-medium flex items-center gap-1 mt-1">
              High competition
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-card/60 backdrop-blur shadow-xs">
            <span className="text-xs text-muted-foreground block">Dominant Hook Type</span>
            <div className="text-base font-bold text-foreground mt-1 truncate capitalize">
              {marketSnapshot.dominantHookType.replace("_", " ")}
            </div>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
              Top platform: {marketSnapshot.topPlatform}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-card/60 backdrop-blur shadow-xs">
            <span className="text-xs text-muted-foreground block">Market Opportunity</span>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 capitalize">
              {marketSnapshot.marketSaturationLevel} Saturation
            </div>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 truncate">
              White-space identified
            </span>
          </div>
        </div>

        {/* Opportunity Callout Banner */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-foreground">Strategic White-Space: </span>
            <span className="text-muted-foreground">{marketSnapshot.opportunityGapSummary}</span>
          </div>
        </div>
      </div>

      {/* Competitor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map((comp) => {
          const isSelected = comp.id === selectedId;
          return (
            <div
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`cursor-pointer rounded-xl border p-5 transition-all text-left relative flex flex-col justify-between ${
                isSelected
                  ? "border-primary bg-primary/[0.03] shadow-md ring-2 ring-primary/20"
                  : "border-border/60 bg-card hover:border-border hover:shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                      {comp.name}
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10 inline" />
                      )}
                    </h3>
                    <a
                      href={comp.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-0.5"
                    >
                      <Globe className="w-3 h-3" />
                      {new URL(comp.websiteUrl).hostname}
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getTierBadge(
                      comp.marketShareTier
                    )}`}
                  >
                    {comp.marketShareTier}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                  {comp.summary}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/40">
                {/* Reach Score Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-muted-foreground">Estimated Reach Score</span>
                    <span className="font-bold text-foreground">{comp.estimatedReachScore}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${comp.estimatedReachScore}%` }}
                    />
                  </div>
                </div>

                {/* Active Channels */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground text-[11px] flex items-center gap-1">
                    <Radio className="w-3 h-3 text-primary" /> Active Ads on:
                  </span>
                  <div className="flex gap-1.5">
                    {comp.activeChannels.meta && (
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-[10px]">
                        Meta
                      </span>
                    )}
                    {comp.activeChannels.instagram && (
                      <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 font-medium text-[10px]">
                        IG
                      </span>
                    )}
                    {comp.activeChannels.tiktok && (
                      <span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium text-[10px]">
                        TikTok
                      </span>
                    )}
                    {comp.activeChannels.google && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-[10px]">
                        Google
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Action CTA */}
      <div className="p-4 rounded-xl border border-border/60 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block">
            Selected Competitor for Ad Reverse Engineering
          </span>
          <div className="text-base font-bold text-foreground mt-0.5 flex items-center gap-2">
            <span>{selectedCompetitor?.name}</span>
            <span className="text-xs text-muted-foreground font-normal">
              (Query: <code className="text-[11px] font-mono bg-muted px-1.5 py-0.5 rounded">{selectedCompetitor?.adLibraryQuery}</code>)
            </span>
          </div>
        </div>

        <Button
          onClick={() => selectedCompetitor && onSelectCompetitor(selectedCompetitor)}
          className="px-6 py-2.5 h-auto text-sm font-semibold gap-2 shadow-md hover:shadow-lg transition-all"
        >
          Reverse-Engineer Ads
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
