"use client";

import React, { useState } from "react";
import {
  BrandOnboardingResponse,
  Competitor,
  MarketSnapshot,
  AdAnalysisResult,
  AdAggregateSummary,
  GeneratedCampaign,
  AdaptationStrategy,
} from "@shared/types";
import { OnboardingForm } from "@/components/features/onboarding/OnboardingForm";
import { CompetitorDashboard } from "@/components/features/discovery/CompetitorDashboard";
import { AdBreakdownCard } from "@/components/features/analysis/AdBreakdownCard";
import { CampaignGenerator } from "@/components/features/adaptation/CampaignGenerator";
import {
  discoverCompetitors,
  analyzeAd,
  generateCounterCampaign,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Building2,
  TrendingUp,
  Eye,
  Clapperboard,
  Loader2,
  Home as HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

type Step = 1 | 2 | 3 | 4;

interface StepInfo {
  step: Step;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
}

const STEPS: StepInfo[] = [
  {
    step: 1,
    title: "Brand Profile",
    shortDesc: "Onboarding & Positioning",
    icon: Building2,
  },
  {
    step: 2,
    title: "Market Discovery",
    shortDesc: "Competitor Intelligence",
    icon: TrendingUp,
  },
  {
    step: 3,
    title: "Ad Reverse-Eng",
    shortDesc: "Deconstruction & Gaps",
    icon: Eye,
  },
  {
    step: 4,
    title: "Counter-Campaign",
    shortDesc: "UGC Storyboard & Copy",
    icon: Clapperboard,
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Workflow State
  const [onboardingData, setOnboardingData] =
    useState<BrandOnboardingResponse | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [marketSnapshot, setMarketSnapshot] = useState<MarketSnapshot | null>(
    null
  );
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null);
  const [adAnalyses, setAdAnalyses] = useState<AdAnalysisResult[]>([]);
  const [aggregateSummary, setAggregateSummary] =
    useState<AdAggregateSummary | null>(null);
  const [campaigns, setCampaigns] = useState<GeneratedCampaign[]>([]);
  const [adaptationStrategies, setAdaptationStrategies] = useState<
    AdaptationStrategy[]
  >([]);

  // Step 1 Success Handler
  const handleOnboardingSuccess = async (data: BrandOnboardingResponse) => {
    setOnboardingData(data);
    setLoading(true);

    try {
      const discovery = await discoverCompetitors({
        brandId: data.brand.id,
      });
      setCompetitors(discovery.competitors);
      setMarketSnapshot(discovery.marketSnapshot);
      setCurrentStep(2);
    } catch (err) {
      console.error("Discovery error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2 Handler: Select Competitor & Trigger Ad Analysis
  const handleSelectCompetitor = async (competitor: Competitor) => {
    setSelectedCompetitor(competitor);
    setLoading(true);

    try {
      const analysisResp = await analyzeAd({
        brandId: onboardingData?.brand.id || competitor.brandId,
        competitorId: competitor.id,
      });

      setAdAnalyses(analysisResp.analyses);
      setAggregateSummary(analysisResp.aggregateSummary);
      setCurrentStep(3);
    } catch (err) {
      console.error("Ad Analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Step 3 Handler: Proceed from Ad Analysis to Counter Campaign Generation
  const handleProceedToAdaptation = async (selectedAdIds: string[]) => {
    setLoading(true);

    try {
      const campaignResp = await generateCounterCampaign({
        brandId: onboardingData?.brand.id || "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
        competitorAdIds: selectedAdIds,
        strategyAngles: [
          "direct_comparison",
          "problem_agitation",
          "social_proof_reviews",
        ],
      });

      setCampaigns(campaignResp.campaigns);
      setAdaptationStrategies(campaignResp.adaptationStrategies);
      setCurrentStep(4);
    } catch (err) {
      console.error("Campaign generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Back Navigation
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  // Reset Flow
  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              AR
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block leading-tight">
                AdReverse AI
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                Competitor Intelligence Platform
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground hidden sm:flex"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                Home
              </Button>
            </Link>
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                disabled={loading}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </Button>
            )}
            <div className="text-xs text-muted-foreground hidden sm:block">
              Step <span className="font-semibold text-foreground">{currentStep}</span> of 4
            </div>
            <div className="pl-2 border-l border-border/50">
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Steps Header */}
      <div className="border-b border-border/30 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <nav aria-label="Progress">
            <ol className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const isCompleted = currentStep > s.step;
                const isCurrent = currentStep === s.step;

                return (
                  <li
                    key={s.step}
                    className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${
                      isCurrent
                        ? "bg-card border border-primary/30 shadow-xs"
                        : "opacity-75"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : isCurrent
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        s.step
                      )}
                    </div>
                    <div className="truncate">
                      <span
                        className={`text-xs font-semibold block truncate leading-tight ${
                          isCurrent
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground hidden sm:block truncate">
                        {s.shortDesc}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Processing AI analysis and syncing data...
            </p>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <OnboardingForm onSuccess={handleOnboardingSuccess} />
            )}

            {currentStep === 2 && onboardingData && marketSnapshot && (
              <CompetitorDashboard
                onboardingData={onboardingData}
                competitors={competitors}
                marketSnapshot={marketSnapshot}
                onSelectCompetitor={handleSelectCompetitor}
              />
            )}

            {currentStep === 3 && selectedCompetitor && aggregateSummary && (
              <AdBreakdownCard
                competitor={selectedCompetitor}
                analyses={adAnalyses}
                aggregateSummary={aggregateSummary}
                onProceedToAdaptation={handleProceedToAdaptation}
              />
            )}

            {currentStep === 4 && (
              <CampaignGenerator
                campaigns={campaigns}
                adaptationStrategies={adaptationStrategies}
                onRestart={handleReset}
              />
            )}
          </>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        AdReverse Platform &copy; 2026 — AI-Powered Competitor Intelligence & Counter-Ad Generation
      </footer>
    </div>
  );
}
