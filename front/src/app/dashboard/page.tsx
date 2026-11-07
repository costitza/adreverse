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
import { Sidebar, StepId } from "@/components/layout/Sidebar";
import {
  discoverCompetitors,
  analyzeAd,
  generateCounterCampaign,
} from "@/lib/api";
import {
  ArrowLeft,
  Loader2,
  Search,
  ChevronRight,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const STEP_TITLES: Record<StepId, string> = {
  1: "Brand Matrix",
  2: "Competitor Vault",
  3: "Ad Breakdown",
  4: "Campaign Studio",
};

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Step 1 Handler: Onboarding Completed -> Fetch Competitor Radar
  const handleOnboardingSuccess = async (data: BrandOnboardingResponse) => {
    setOnboardingData(data);
    setLoading(true);

    try {
      const disc = await discoverCompetitors({
        brandId: data.brand.id,
      });

      setCompetitors(disc.competitors);
      setMarketSnapshot(disc.marketSnapshot);
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

  const handleStepSelect = (step: StepId) => {
    setCurrentStep(step);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepId);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex min-h-screen bg-[#151821] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
      {/* 1. SIDEBAR STÂNGA (Permanent, fix: w-64, h-screen, fixed, left-0, top-0, z-50) */}
      <Sidebar
        currentStep={currentStep}
        onSelectStep={handleStepSelect}
        completedSteps={[1, 2, 3, 4].filter((s) => s < currentStep)}
        creditsUsed={26}
        creditsTotal={100}
      />

      {/* 2. WORKSPACE DREAPTA (Zona de lucru interactivă: ml-64 flex-1 min-h-screen bg-[#151821] p-8 overflow-y-auto) */}
      <div className="ml-64 flex-1 min-h-screen bg-[#151821] p-8 overflow-y-auto flex flex-col">
        {/* Header superior fin */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          {/* Breadcrumbs minimaliste sau buton "← Back" */}
          <div className="flex items-center gap-3 text-xs text-[#b5b1a6] font-mono">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 border border-zinc-800 text-xs font-mono transition-all cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#9e93d7]" />
                <span>← Back to {STEP_TITLES[(currentStep - 1) as StepId]}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6cbb7a]" />
                <span className="text-white font-semibold">Active Session</span>
              </div>
            )}

            <ChevronRight className="w-3.5 h-3.5 text-zinc-700 hidden sm:inline" />
            <span className="text-zinc-500 hidden sm:inline">Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700 hidden sm:inline" />
            <span className="text-[#9e93d7] font-semibold hidden sm:inline">
              {currentStep}. {STEP_TITLES[currentStep]}
            </span>
          </div>

          {/* Căutare tip capsulă rotunjită */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search competitors, hooks, or angles..."
                className="bg-[#181b24] border border-zinc-800 text-zinc-100 font-medium rounded-full px-5 py-2.5 shadow-sm w-96 placeholder:text-zinc-500 text-xs sm:text-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="sm:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Conținut Dinamic: Randează interactiv pasul activ curent */}
        <main className="flex-1 w-full max-w-7xl mx-auto">
          {loading ? (
            <div className="min-h-[450px] bg-[#13161c] rounded-3xl border border-zinc-800/80 p-12 flex flex-col items-center justify-center space-y-4 shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-[#9e93d7]" />
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-white">
                  Deconstructing Psychological Hooks & Vulnerability Gaps
                </p>
                <p className="text-xs text-[#b5b1a6] font-mono">
                  Benchmarking against Meta Ad Library and TikTok Creative Center...
                </p>
              </div>
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
      </div>
    </div>
  );
}
