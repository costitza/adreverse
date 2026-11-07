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
import { Sparkles, ArrowRight, Loader2, Globe, Building2, Target, Volume2, ShieldCheck } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border/40 gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Brand Onboarding & Positioning
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Define your core value proposition and audience. We'll use this to benchmark against your top competitors.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={loadPreset}
          className="self-start md:self-auto gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Load Demo Preset (LumaFit)
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              <Globe className="w-4 h-4 text-muted-foreground" />
              Website URL
            </label>
            <input
              type="url"
              required
              value={formData.websiteUrl}
              onChange={(e) =>
                setFormData({ ...formData, websiteUrl: e.target.value })
              }
              placeholder="https://yourbrand.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          {/* Market Niche */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              <Target className="w-4 h-4 text-muted-foreground" />
              Market Niche
            </label>
            <input
              type="text"
              required
              value={formData.niche}
              onChange={(e) =>
                setFormData({ ...formData, niche: e.target.value })
              }
              placeholder="e.g. Women's Activewear & Fitness Supplements"
              className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          {/* Brand Voice */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              Brand Voice & Tone
            </label>
            <select
              value={formData.brandVoice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brandVoice: e.target.value as BrandVoice,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none capitalize"
            >
              <option value="inspirational">Inspirational</option>
              <option value="professional">Professional</option>
              <option value="conversational">Conversational</option>
              <option value="humorous">Humorous</option>
              <option value="authoritative">Authoritative</option>
              <option value="empathetic">Empathetic</option>
            </select>
          </div>
        </div>

        {/* Unique Selling Proposition */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Unique Selling Proposition (USP)
          </label>
          <textarea
            required
            rows={2}
            value={formData.usp}
            onChange={(e) =>
              setFormData({ ...formData, usp: e.target.value })
            }
            placeholder="What differentiates you from competitors?"
            className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
          />
        </div>

        {/* Product Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Key Products / Services <span className="text-xs text-muted-foreground">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={productsInput}
            onChange={(e) => setProductsInput(e.target.value)}
            placeholder="High-waist Leggings, Sports Bras, Recovery Powder"
            className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>

        {/* Target Audience Section */}
        <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Audience Demographics & Psychographics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Age Range
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
                placeholder="24–42"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Target Geographies (e.g. US, UK, EU)
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
                placeholder="US, UK, Canada, Australia"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Audience Core Pain Points (comma-separated)
              </label>
              <input
                type="text"
                value={painPointsInput}
                onChange={(e) => setPainPointsInput(e.target.value)}
                placeholder="activewear that pills, supplements with artificial fillers"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Key Interests & Lifestyle Tags (comma-separated)
              </label>
              <input
                type="text"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="yoga, strength training, clean eating, sustainability"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 h-auto text-sm font-semibold gap-2 shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Brand & Scanning Market...
              </>
            ) : (
              <>
                Proceed to Market Discovery
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
