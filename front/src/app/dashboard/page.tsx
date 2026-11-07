"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BrandOnboardingResponse,
  Competitor,
  MarketSnapshot,
  AdAnalysisResult,
  AdAggregateSummary,
  GeneratedCampaign,
  AdaptationStrategy,
  MOCK_MARKET_SNAPSHOT,
} from "@shared/types";
import { OnboardingForm } from "@/components/features/onboarding/OnboardingForm";
import { CompetitorDashboard } from "@/components/features/discovery/CompetitorDashboard";
import { AdBreakdownCard } from "@/components/features/analysis/AdBreakdownCard";
import { CampaignGenerator } from "@/components/features/adaptation/CampaignGenerator";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  discoverCompetitors,
  analyzeAd,
  generateCounterCampaign,
  getUserBrandVaults,
  getBrandVault,
} from "@/lib/api";
import {
  ArrowLeft,
  Loader2,
  Search,
  CheckCircle2,
  Sliders,
  Compass,
  Zap,
  Film,
  FolderKanban,
  Plus,
  ChevronDown,
  Building,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export type StepId = 1 | 2 | 3 | 4;

const STEPS_NAV: { step: StepId; label: string; icon: React.ElementType }[] = [
  { step: 1, label: "Brand Matrix", icon: Sliders },
  { step: 2, label: "Competitor Vault", icon: Compass },
  { step: 3, label: "Ad Breakdown", icon: Zap },
  { step: 4, label: "Campaign Studio", icon: Film },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Multiple Vaults Management
  const [userVaults, setUserVaults] = useState<any[]>([]);
  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);
  const [vaultDropdownOpen, setVaultDropdownOpen] = useState(false);

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

  // Load existing vaults for the logged-in user
  useEffect(() => {
    async function loadVaults() {
      if (!user?.id) return;
      try {
        const vaults = await getUserBrandVaults(user.id);
        setUserVaults(vaults);
      } catch (err) {
        console.error("Error loading user vaults:", err);
      }
    }
    loadVaults();
  }, [user?.id]);

  // Handler to switch to a different vault
  const handleSelectVault = async (brand: any) => {
    setActiveBrandId(brand.id);
    setVaultDropdownOpen(false);
    setLoading(true);

    try {
      const fullVault = await getBrandVault(brand.id);
      if (fullVault) {
        setOnboardingData({
          brand: fullVault.brand,
          extractedInsights: {
            primaryValueProposition: fullVault.brand.primary_value_proposition || "",
            toneKeywords: fullVault.brand.tone_keywords || [],
            inferredCompetitorNiches: fullVault.brand.inferred_competitor_niches || [],
            suggestedStrategyAngles: fullVault.brand.suggested_strategy_angles || ["direct_comparison"],
          },
        });

        // Map competitors
        if (fullVault.competitors && fullVault.competitors.length > 0) {
          const mappedCompetitors: Competitor[] = fullVault.competitors.map((c: any) => ({
            id: c.id,
            brandId: c.brand_id,
            name: c.name,
            websiteUrl: c.website_url,
            estimatedReachScore: c.estimated_reach_score,
            marketShareTier: c.market_share_tier,
            activeChannels: {
              meta: c.active_meta ?? true,
              tiktok: c.active_tiktok ?? true,
              instagram: c.active_instagram ?? true,
              youtube: c.active_youtube ?? false,
              google: c.active_google ?? false,
            },
            summary: c.summary,
            adLibraryQuery: c.ad_library_query,
            logoUrl: c.logo_url,
            discoveredAt: c.created_at,
          }));
          setCompetitors(mappedCompetitors);
          setMarketSnapshot(MOCK_MARKET_SNAPSHOT);

          if (fullVault.campaigns && fullVault.campaigns.length > 0) {
            setCampaigns(fullVault.campaigns);
          }

          setCurrentStep(2);
        } else {
          setCurrentStep(1);
        }
      }
    } catch (err) {
      console.error("Failed to load vault details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewVault = () => {
    setActiveBrandId(null);
    setOnboardingData(null);
    setCompetitors([]);
    setSelectedCompetitor(null);
    setAdAnalyses([]);
    setCampaigns([]);
    setCurrentStep(1);
    setVaultDropdownOpen(false);
  };

  // Step 1 Handler: Onboarding Completed -> Fetch Competitor Radar
  const handleOnboardingSuccess = async (data: BrandOnboardingResponse) => {
    setOnboardingData(data);
    setActiveBrandId(data.brand.id);
    // Refresh user's vaults list
    if (user?.id) {
      getUserBrandVaults(user.id).then(setUserVaults).catch(() => {});
    }
    setLoading(true);

    try {
      const disc = await discoverCompetitors({
        brandId: data.brand.id,
        niche: data.brand.niche,
        brandProfile: data.brand,
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
      const activeBrandId = onboardingData?.brand.id || competitor.brandId;
      console.log(`[Dashboard] Analyzing ads for brand: ${activeBrandId}, competitor: ${competitor.id} (${competitor.name})`);

      const analysisResp = await analyzeAd({
        brandId: activeBrandId,
        competitorId: competitor.id,
      });

      console.log("[Dashboard] Analysis received:", analysisResp);

      if (analysisResp && analysisResp.analyses && analysisResp.analyses.length > 0) {
        setAdAnalyses(analysisResp.analyses);
        setAggregateSummary(analysisResp.aggregateSummary);
        setCurrentStep(3);
      } else {
        alert("No ads found or analysis failed for this competitor.");
      }
    } catch (err: any) {
      console.error("Ad Analysis error:", err);
      alert(`Ad Analysis failed: ${err.message || "Network / Backend Error"}`);
    } finally {
      setLoading(false);
    }
  };

  // Step 3 Handler: Proceed from Ad Analysis to Counter Campaign Generation
  const handleProceedToAdaptation = async (selectedAdIds: string[]) => {
    setLoading(true);

    try {
      const activeBrand = onboardingData?.brand?.id || activeBrandId;
      if (!activeBrand) {
        alert("Please select or onboard a brand profile first.");
        setLoading(false);
        return;
      }

      console.log(`[Dashboard] Generating counter campaign for brand: ${activeBrand}, adIds:`, selectedAdIds);

      const campaignResp = await generateCounterCampaign({
        brandId: activeBrand,
        competitorAdIds: selectedAdIds,
        strategyAngles: [
          "direct_comparison",
          "problem_agitation",
          "social_proof_reviews",
        ],
      });

      console.log("[Dashboard] Campaigns received:", campaignResp);

      if (campaignResp && campaignResp.campaigns && campaignResp.campaigns.length > 0) {
        setCampaigns(campaignResp.campaigns);
        setAdaptationStrategies(campaignResp.adaptationStrategies || []);
        setCurrentStep(4);
      } else {
        alert("Campaign generation returned no campaigns.");
      }
    } catch (err: any) {
      console.error("Campaign generation error:", err);
      alert(`Campaign generation failed: ${err.message || "Network / Backend Error"}`);
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
    <div className="min-h-screen bg-[#151821] text-zinc-100 font-sans selection:bg-white/20 selection:text-white flex flex-col">
      {/* Centered Top Floating / Rounded Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#151821]/80 border-b border-zinc-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Vault Switcher */}
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" />

            {/* Multi-Company Vault Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setVaultDropdownOpen(!vaultDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181b24] hover:bg-[#202531] border border-zinc-800 text-xs text-zinc-200 transition-all font-medium cursor-pointer shadow-sm"
              >
                <FolderKanban className="w-3.5 h-3.5 text-[#9e93d7]" />
                <span className="max-w-[130px] truncate">
                  {onboardingData?.brand.companyName || "Select Company"}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {vaultDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#161a23] border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>Your Company Vaults</span>
                    <span>{userVaults.length}</span>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1 my-1">
                    {userVaults.map((vault) => (
                      <button
                        key={vault.id}
                        type="button"
                        onClick={() => handleSelectVault(vault)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          activeBrandId === vault.id
                            ? "bg-[#9e93d7]/15 text-white font-medium border border-[#9e93d7]/30"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span className="truncate">{vault.company_name}</span>
                        </div>
                        {activeBrandId === vault.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9e93d7] shrink-0" />
                        )}
                      </button>
                    ))}

                    {userVaults.length === 0 && (
                      <div className="px-3 py-3 text-center text-xs text-zinc-500">
                        No saved vaults yet. Complete Step 1 to create one!
                      </div>
                    )}
                  </div>

                  <div className="pt-1.5 border-t border-zinc-800/80">
                    <button
                      type="button"
                      onClick={handleCreateNewVault}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ New Company Vault</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper pills (Centered navigation) */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#181b24] border border-zinc-800 shadow-inner">
              {STEPS_NAV.map((s) => {
                const Icon = s.icon;
                const isCurrent = currentStep === s.step;
                const isCompleted = currentStep > s.step;

                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => handleStepSelect(s.step)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isCurrent
                        ? "bg-white text-zinc-950 font-semibold shadow-sm"
                        : isCompleted
                        ? "text-zinc-200 hover:text-white hover:bg-white/5"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-zinc-950" : isCompleted ? "text-[#6cbb7a]" : "text-zinc-400"}`} />
                    <span>{s.label}</span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3 h-3 text-[#6cbb7a]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right side: Search & User profile */}
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search angles, hooks..."
                className="bg-[#181b24] border border-zinc-800 text-zinc-100 font-medium rounded-full pl-4 pr-9 py-1.5 shadow-sm w-64 placeholder:text-zinc-500 text-xs outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Sub-header / Back button row if past step 1 */}
        {currentStep > 1 && (
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181b24] hover:bg-[#202531] text-zinc-200 border border-zinc-800 text-xs font-medium transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#9e93d7]" />
              <span>← Back to {STEPS_NAV.find((s) => s.step === currentStep - 1)?.label}</span>
            </button>

            <span className="text-xs font-mono text-[#b5b1a6]">
              Step {currentStep} of 4 &bull; {STEPS_NAV.find((s) => s.step === currentStep)?.label}
            </span>
          </div>
        )}

        {loading ? (
          <div className="min-h-[420px] bg-[#13161c] rounded-3xl border border-zinc-800/80 p-12 flex flex-col items-center justify-center space-y-4 shadow-xl">
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
              <OnboardingForm
                onSuccess={handleOnboardingSuccess}
                userId={user?.id}
              />
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
  );
}
