"use client";

import React, { useState } from "react";
import {
  BrandOnboardingRequest,
  BrandOnboardingResponse,
  MOCK_BRAND_PROFILE,
} from "@shared/types";
import { submitBrandProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  Globe,
  Building2,
  Target,
  Users,
} from "lucide-react";

interface OnboardingFormProps {
  onSuccess: (data: BrandOnboardingResponse) => void;
  userId?: string;
}

export function OnboardingForm({ onSuccess, userId }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BrandOnboardingRequest>({
    companyName: MOCK_BRAND_PROFILE.companyName,
    niche: MOCK_BRAND_PROFILE.niche,
    websiteUrl: MOCK_BRAND_PROFILE.websiteUrl,
    usp: MOCK_BRAND_PROFILE.usp || "High-performance direct-to-consumer product offering",
    productRange: [...(MOCK_BRAND_PROFILE.productRange || [])],
    brandVoice: MOCK_BRAND_PROFILE.brandVoice,
    targetAudience: {
      ageRange: MOCK_BRAND_PROFILE.targetAudience.ageRange,
      genders: [...MOCK_BRAND_PROFILE.targetAudience.genders],
      interests: [...MOCK_BRAND_PROFILE.targetAudience.interests],
      painPoints: [...MOCK_BRAND_PROFILE.targetAudience.painPoints],
      geographies: [...MOCK_BRAND_PROFILE.targetAudience.geographies],
    },
  });

  const [interestsInput, setInterestsInput] = useState(
    formData.targetAudience.interests.join(", ")
  );
  const [painPointsInput, setPainPointsInput] = useState(
    formData.targetAudience.painPoints.join(", ")
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: BrandOnboardingRequest = {
      ...formData,
      usp: formData.usp || "Direct-to-consumer brand offering",
      productRange: formData.productRange?.length ? formData.productRange : ["Core Collection"],
      targetAudience: {
        ...formData.targetAudience,
        interests: interestsInput
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        painPoints: painPointsInput
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
      },
    };

    try {
      const response = await submitBrandProfile(payload, userId);
      onSuccess(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = () => {
    setFormData({
      companyName: MOCK_BRAND_PROFILE.companyName,
      niche: MOCK_BRAND_PROFILE.niche,
      websiteUrl: MOCK_BRAND_PROFILE.websiteUrl,
      usp: MOCK_BRAND_PROFILE.usp,
      productRange: [...MOCK_BRAND_PROFILE.productRange],
      brandVoice: MOCK_BRAND_PROFILE.brandVoice,
      targetAudience: {
        ageRange: MOCK_BRAND_PROFILE.targetAudience.ageRange,
        genders: [...MOCK_BRAND_PROFILE.targetAudience.genders],
        interests: [...MOCK_BRAND_PROFILE.targetAudience.interests],
        painPoints: [...MOCK_BRAND_PROFILE.targetAudience.painPoints],
        geographies: [...MOCK_BRAND_PROFILE.targetAudience.geographies],
      },
    });
    setInterestsInput(MOCK_BRAND_PROFILE.targetAudience.interests.join(", "));
    setPainPointsInput(MOCK_BRAND_PROFILE.targetAudience.painPoints.join(", "));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Minimal Header (Linear / Vercel style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Brand Workspace &amp; Identity
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Configure your company profile and audience parameters to benchmark against competitors
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={loadPreset}
          className="rounded-full bg-zinc-900/60 border-zinc-800 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white px-4 py-1.5 cursor-pointer self-start sm:self-auto transition-colors gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Load Preset</span>
        </Button>
      </div>

      {/* 2. Form Cards */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card 1: Core Entity & Market Positioning */}
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-medium text-xs text-white">
                Brand Entity &amp; Market
              </span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500">Core Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Company / Brand Name
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="e.g. LumaFit"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>

            {/* Website URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-zinc-400" />
                Website Domain
              </label>
              <input
                type="url"
                required
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({ ...formData, websiteUrl: e.target.value })
                }
                placeholder="https://lumafit.com"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>

            {/* Market Niche */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <Target className="w-3 h-3 text-zinc-400" />
                Market Niche
              </label>
              <input
                type="text"
                required
                value={formData.niche}
                onChange={(e) =>
                  setFormData({ ...formData, niche: e.target.value })
                }
                placeholder="e.g. Performance Activewear"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Target Audience & Friction */}
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-medium text-xs text-white">
                Target Demographic &amp; Friction Points
              </span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500">Audience Data</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Primary Age Demographic
              </label>
              <input
                type="text"
                value={formData.targetAudience.ageRange}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAudience: {
                      ...formData.targetAudience,
                      ageRange: e.target.value,
                    },
                  })
                }
                placeholder="24–38 years old"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Target Geographies
              </label>
              <input
                type="text"
                value={formData.targetAudience.geographies.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAudience: {
                      ...formData.targetAudience,
                      geographies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                placeholder="US, UK, Canada, EU"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Customer Friction Points <span className="text-zinc-500 text-[11px] font-mono">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={painPointsInput}
                onChange={(e) => setPainPointsInput(e.target.value)}
                placeholder="fading fabric, rolling waistbands, hidden markups"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Key Interests &amp; Behavioral Triggers <span className="text-zinc-500 text-[11px] font-mono">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="strength training, clean eating, functional design"
                className="w-full px-3.5 py-2 rounded-xl bg-black/20 border border-zinc-800/60 text-zinc-100 placeholder:text-zinc-500 text-xs outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
              />
            </div>
          </div>
        </div>

        {/* 3. Action Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-zinc-500 font-mono">
            Pipeline Step 1 / 4 &bull; Autonomous competitor crawl initiated upon submission
          </span>

          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-full bg-white text-zinc-950 font-medium px-6 py-2.5 text-xs hover:bg-zinc-200 transition-colors shadow-xs gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-950" />
                <span>Scanning Market &amp; Competitors...</span>
              </>
            ) : (
              <>
                <span>Proceed to Competitor Radar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
