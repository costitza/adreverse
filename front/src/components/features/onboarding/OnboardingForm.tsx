"use client";

import React, { useState } from "react";
import {
  BrandOnboardingRequest,
  BrandVoice,
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
  Volume2,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

interface OnboardingFormProps {
  onSuccess: (data: BrandOnboardingResponse) => void;
}

export function OnboardingForm({ onSuccess }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BrandOnboardingRequest>({
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

  const [productsInput, setProductsInput] = useState(
    formData.productRange.join(", ")
  );
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
      productRange: productsInput
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
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
      const response = await submitBrandProfile(payload);
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
    setProductsInput(MOCK_BRAND_PROFILE.productRange.join(", "));
    setInterestsInput(MOCK_BRAND_PROFILE.targetAudience.interests.join(", "));
    setPainPointsInput(MOCK_BRAND_PROFILE.targetAudience.painPoints.join(", "));
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / Bento Header */}
      <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs px-3.5 py-1 font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e93d7] shadow-[0_0_6px_#9e93d7]" />
              <span className="font-mono text-[11px] text-[#b5b1a6]">STEP 01</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#9e93d7] font-medium">Brand Positioning Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Brand Positioning & Intelligence Matrix
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Define your core value proposition and demographic parameters. Our AI pipeline benchmarks your unique angles against 60+ day scaled competitor campaigns.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadPreset}
            className="self-start md:self-center gap-2 rounded-full bg-white/5 border-zinc-700 hover:bg-white/10 text-zinc-200 text-xs py-2 px-4 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e8b98d]" />
            <span>Load Demo Brand (LumaFit)</span>
          </Button>
        </div>
      </div>

      {/* Main Bento Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Core Identity (Clean Dark Bento Card) */}
          <div className="bg-[#13161c] rounded-3xl p-6 sm:p-7 border border-zinc-800/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9e93d7]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Brand Entity</h3>
                  <span className="text-[11px] text-[#b5b1a6] font-mono">Core identity & domain</span>
                </div>
              </div>
              <span className="rounded-full bg-white/5 text-[#b5b1a6] border border-white/10 text-[11px] font-mono px-3 py-0.5">
                Required
              </span>
            </div>

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
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
            </div>

            {/* Website URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#99d3df]" />
                Website URL
              </label>
              <input
                type="url"
                required
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({ ...formData, websiteUrl: e.target.value })
                }
                placeholder="https://lumafit.com"
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
            </div>

            {/* Market Niche */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#9e93d7]" />
                Market Niche & Industry
              </label>
              <input
                type="text"
                required
                value={formData.niche}
                onChange={(e) =>
                  setFormData({ ...formData, niche: e.target.value })
                }
                placeholder="e.g. Women's High-Performance Activewear"
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
            </div>

            {/* Brand Voice */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#6cbb7a]" />
                Brand Editorial Voice
              </label>
              <select
                value={formData.brandVoice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brandVoice: e.target.value as BrandVoice,
                  })
                }
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all capitalize cursor-pointer"
              >
                <option value="inspirational">Inspirational & Empowering</option>
                <option value="authoritative">Authoritative & Evidence-based</option>
                <option value="conversational">Conversational & Direct</option>
                <option value="humorous">Humorous & Witty</option>
                <option value="professional">Professional & Technical</option>
                <option value="empathetic">Empathetic & Solution-first</option>
              </select>
            </div>
          </div>

          {/* Card 2: Value Proposition & Product Catalog (Warm Coral / Dusty Rose Tint) */}
          <div className="bg-[#2D2228]/40 rounded-3xl p-6 sm:p-7 border border-[#e9b0ce]/30 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e9b0ce]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e9b0ce]/15 flex items-center justify-center text-[#e9b0ce]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#e9b0ce]">USP & Product Matrix</h3>
                    <span className="text-[11px] text-[#b5b1a6] font-mono">Unfair advantage vs category</span>
                  </div>
                </div>
                <span className="rounded-full bg-[#e9b0ce]/15 border border-[#e9b0ce]/30 text-[#e9b0ce] text-xs px-3 py-0.5 font-medium">
                  Core Lever
                </span>
              </div>

              {/* USP */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-200">
                  Unique Selling Proposition (USP)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.usp}
                  onChange={(e) =>
                    setFormData({ ...formData, usp: e.target.value })
                  }
                  placeholder="e.g. Sculpting activewear built with breathable recycled ocean fiber with 100% zero-sheer squat guarantee."
                  className="w-full px-5 py-3 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all resize-none"
                />
              </div>

              {/* Product Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#e9b0ce]" />
                  Product Catalog <span className="text-[#b5b1a6] text-[11px] font-mono">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={productsInput}
                  onChange={(e) => setProductsInput(e.target.value)}
                  placeholder="High-waist Leggings, Compression Bras, Workout Sets"
                  className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#13161c]/80 border border-[#e9b0ce]/20 text-xs text-zinc-300 leading-relaxed">
              <span className="text-[#e9b0ce] font-semibold">Strategic Counter-Attack:</span> These product differentiators will be automatically pitted against the competitor&apos;s exposed vulnerabilities in Step 4.
            </div>
          </div>
        </div>

        {/* Card 3: Target Demographic & Psychographics */}
        <div className="bg-[#13161c] rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#9e93d7]/15 flex items-center justify-center text-[#9e93d7]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Target Demographic & Psychographic Friction</h3>
                <span className="text-[11px] text-[#b5b1a6] font-mono">Customer tension & emotional triggers</span>
              </div>
            </div>
            <span className="rounded-full bg-white/5 border border-white/10 text-[#b5b1a6] text-xs px-3 py-0.5 font-medium font-mono">
              Audience Data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
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
                placeholder="US, UK, Australia, Canada, EU"
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Core Customer Pain Points <span className="text-[#b5b1a6] text-[11px] font-mono">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={painPointsInput}
                onChange={(e) => setPainPointsInput(e.target.value)}
                placeholder="leggings sliding down, see-through fabric, waistband rolling"
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Key Interests & Behavioral Triggers <span className="text-[#b5b1a6] text-[11px] font-mono">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="pilates, strength training, wellness, functional athleisure"
                className="w-full px-5 py-2.5 rounded-xl bg-[#363e4f] border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm font-medium shadow-sm outline-none focus:border-[#9e93d7] focus:ring-1 focus:ring-[#9e93d7] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Bar with White Pill CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#b5b1a6] font-mono">
            Pipeline Step 1 / 4 &bull; Autonomous competitor crawl initiated upon submission.
          </span>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-full bg-white text-zinc-950 font-semibold px-8 py-3 text-sm hover:bg-zinc-200 transition-all shadow-md gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                Scanning Market & Rivals...
              </>
            ) : (
              <>
                Proceed to Competitor Vault
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
