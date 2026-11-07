// =============================================================================
// ADGENESIS / ADREVERSE — SINGLE SOURCE OF TRUTH
// shared/types.ts
//
// Workflow:
//   Step 1 → Brand Onboarding
//   Step 2 → Market / Competitor Discovery
//   Step 3 → Ad Scraping & Reverse Engineering
//   Step 4 → Campaign Adaptation & Generation
//
// Conventions:
//   - All properties are camelCase for clean JSON serialisation (Next.js ↔ FastAPI)
//   - Every Response type has a corresponding MOCK_* constant for demo resilience
//   - Supabase row shapes mirror the interface fields 1-to-1
// =============================================================================

// ---------------------------------------------------------------------------
// SHARED PRIMITIVES
// ---------------------------------------------------------------------------

export type Platform = "facebook" | "instagram" | "tiktok";

export type MarketShareTier = "dominant" | "challenger" | "niche" | "emerging";

export type StrategyAngle =
  | "direct_comparison"
  | "problem_agitation"
  | "social_proof_reviews";

export type HookType =
  | "question"
  | "bold_statement"
  | "statistic"
  | "story"
  | "controversy"
  | "pattern_interrupt"
  | "testimonial";

export type BrandVoice =
  | "professional"
  | "conversational"
  | "inspirational"
  | "humorous"
  | "authoritative"
  | "empathetic";

/** Generic API envelope for all backend responses */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

/** Pagination metadata used in list endpoints */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
}

// =============================================================================
// STEP 1 — BRAND ONBOARDING
// =============================================================================

/** Core brand profile — stored in Supabase `brands` table */
export interface BrandProfile {
  id: string;
  userId: string; // Clerk userId
  companyName: string;
  niche: string;
  websiteUrl: string;
  usp: string; // Unique Selling Proposition
  productRange: string[]; // List of main products / services
  brandVoice: BrandVoice;
  targetAudience: TargetAudience;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface TargetAudience {
  ageRange: string; // e.g. "25-45"
  genders: Array<"male" | "female" | "all">;
  interests: string[];
  painPoints: string[];
  geographies: string[];
}

/** POST /api/brand/onboard — request body */
export interface BrandOnboardingRequest {
  companyName: string;
  niche: string;
  websiteUrl: string;
  usp: string;
  productRange: string[];
  brandVoice: BrandVoice;
  targetAudience: TargetAudience;
}

/** POST /api/brand/onboard — response body */
export interface BrandOnboardingResponse {
  brand: BrandProfile;
  extractedInsights: BrandInsights;
}

/** AI-extracted supplementary insights about the brand, derived from its website */
export interface BrandInsights {
  primaryValueProposition: string;
  toneKeywords: string[];
  inferredCompetitorNiches: string[];
  suggestedStrategyAngles: StrategyAngle[];
}

// =============================================================================
// STEP 2 — MARKET / COMPETITOR DISCOVERY
// =============================================================================

/** A single discovered competitor */
export interface Competitor {
  id: string;
  brandId: string; // FK → BrandProfile.id
  name: string;
  websiteUrl: string;
  estimatedReachScore: number; // 0–100
  marketShareTier: MarketShareTier;
  activeChannels: ActiveChannels;
  summary: string; // 2–3 sentence AI-generated overview
  adLibraryQuery: string; // Suggested Facebook/Meta Ad Library search string
  logoUrl?: string;
  discoveredAt: string; // ISO 8601
}

export interface ActiveChannels {
  meta: boolean;
  tiktok: boolean;
  instagram: boolean;
  youtube?: boolean;
  google?: boolean;
}

/** POST /api/discovery/run — request body */
export interface MarketDiscoveryRequest {
  brandId: string;
  niche?: string;
  brandProfile?: BrandProfile;
  maxCompetitors?: number; // default: 5
  includeTiers?: MarketShareTier[];
}

/** POST /api/discovery/run — response body */
export interface MarketDiscoveryResponse {
  brandId: string;
  competitors: Competitor[];
  marketSnapshot: MarketSnapshot;
  scrapedAt: string; // ISO 8601
}

/** High-level market summary returned alongside competitors */
export interface MarketSnapshot {
  totalActiveAds: number;
  avgEffectivenessScore: number;
  dominantHookType: HookType;
  topPlatform: Platform;
  marketSaturationLevel: "low" | "medium" | "high" | "saturated";
  opportunityGapSummary: string;
}

// =============================================================================
// STEP 3 — AD SCRAPING & REVERSE ENGINEERING
// =============================================================================

/** Raw scraped ad data from Meta Ad Library / TikTok / Apify */
export interface CompetitorAd {
  adId: string;
  competitorId: string; // FK → Competitor.id
  brandId: string; // FK → BrandProfile.id
  platform: Platform;
  mediaUrl: string; // Hosted URL of the creative (image or video)
  thumbnailUrl?: string;
  adCopy: string; // Primary ad text
  headline?: string;
  ctaText: string; // e.g. "Shop Now", "Learn More"
  daysActive: number; // Longevity/profitability indicator
  estimatedImpressions?: number;
  targetDemographic?: string;
  landingPageUrl?: string;
  scrapedAt: string; // ISO 8601
}

/** AI-generated deconstruction of a competitor ad */
export interface AdBreakdown {
  hook: string; // The opening line / first 3 seconds
  hookType: HookType;
  painPoint: string; // The core customer problem the ad targets
  mechanism: string; // The unique solution / mechanism presented
  offerStructure: string; // How the offer is framed (discount, guarantee, bundle…)
  vulnerabilityGap: string; // The gap your brand can exploit to outperform this ad
  effectivenessScore: number; // 0–100 AI-judged score
  emotionalTriggers: string[]; // e.g. ["fear of missing out", "social proof"]
  persuasionFramework: string; // e.g. "PAS", "AIDA", "BAB"
  estimatedCpm?: number; // Cost per thousand impressions estimate (USD)
  keywordDensity?: Record<string, number>; // word → frequency in ad copy
}

/** Full analysis result combining raw ad + AI breakdown */
export interface AdAnalysisResult {
  ad: CompetitorAd;
  breakdown: AdBreakdown;
  analysedAt: string; // ISO 8601
}

/** POST /api/ads/analyse — request body */
export interface AdAnalysisRequest {
  brandId: string;
  competitorId: string;
  adIds?: string[]; // If omitted, analyse all scraped ads for the competitor
  forceRefresh?: boolean;
}

/** POST /api/ads/analyse — response body */
export interface AdAnalysisResponse {
  brandId: string;
  competitorId: string;
  analyses: AdAnalysisResult[];
  aggregateSummary: AdAggregateSummary;
}

/** Aggregated intelligence across all analysed ads for a competitor */
export interface AdAggregateSummary {
  totalAdsAnalysed: number;
  avgEffectivenessScore: number;
  mostUsedHookType: HookType;
  mostUsedPlatform: Platform;
  commonPainPoints: string[];
  commonEmotionalTriggers: string[];
  topVulnerabilityGap: string;
}

// =============================================================================
// STEP 4 — CAMPAIGN ADAPTATION & GENERATION
// =============================================================================

/** A single second-by-second UGC storyboard frame */
export interface UgcStoryboardFrame {
  second: number; // e.g. 0, 1, 2 … 59
  visualFrame: string; // Description of what appears on screen
  audioScript: string; // Voiceover / dialogue for this second
  textOverlay?: string; // On-screen caption / text
  transitionNote?: string; // Cut, zoom, fade, etc.
}

/** A complete generated campaign for one strategy angle */
export interface GeneratedCampaign {
  id: string;
  brandId: string; // FK → BrandProfile.id
  angleUsed: StrategyAngle;
  headline: string;
  primaryText: string; // Main ad copy body
  cta: string;
  visualConceptBrief: string; // Art-director brief for the creative team
  ugcStoryboard: UgcStoryboardFrame[];
  estimatedCostSavings: CostSavingsEstimate;
  projectedMetrics: ProjectedMetrics;
  generatedAt: string; // ISO 8601
}

/** Cost-vs-value breakdown shown in the dashboard */
export interface CostSavingsEstimate {
  traditionalAgencyCostUsd: number;
  aiGenerationCostUsd: number;
  savingsUsd: number;
  savingsPercent: number; // 0–100
  timeToMarketDays: number;
}

/** Projected performance metrics for the generated campaign */
export interface ProjectedMetrics {
  estimatedCtr: number; // Click-through-rate %
  estimatedConversionRate: number; // %
  estimatedRoas: number; // Return on Ad Spend (multiplier)
  confidenceLevel: "low" | "medium" | "high";
}

/** Adaptation strategy context used during generation */
export interface AdaptationStrategy {
  angleUsed: StrategyAngle;
  sourceAdIds: string[]; // Competitor ads used as inspiration
  differentiators: string[]; // Brand-specific differentiators to highlight
  avoidPatterns: string[]; // Patterns from competitor ads to avoid
  toneGuidelines: string; // Tone guidelines derived from BrandProfile.brandVoice
}

/** POST /api/campaign/generate — request body */
export interface CampaignGenerationRequest {
  brandId: string;
  competitorAdIds: string[]; // Ads to use as reverse-engineering input
  strategyAngles: StrategyAngle[]; // Which angles to generate (1–3)
  customInstructions?: string; // Optional free-text guidance from user
}

/** POST /api/campaign/generate — response body */
export interface CampaignGenerationResponse {
  brandId: string;
  campaigns: GeneratedCampaign[];
  adaptationStrategies: AdaptationStrategy[];
  generatedAt: string; // ISO 8601
}

// =============================================================================
// SUPABASE DB ROW TYPES (snake_case mirror — used by backend only)
// =============================================================================

/** Mirrors the `brands` Supabase table row */
export interface BrandRow {
  id: string;
  user_id: string;
  company_name: string;
  niche: string;
  website_url: string;
  usp: string;
  product_range: string[];
  brand_voice: BrandVoice;
  target_audience: TargetAudience;
  created_at: string;
  updated_at: string;
}

/** Mirrors the `competitors` Supabase table row */
export interface CompetitorRow {
  id: string;
  brand_id: string;
  name: string;
  website_url: string;
  estimated_reach_score: number;
  market_share_tier: MarketShareTier;
  active_channels: ActiveChannels;
  summary: string;
  ad_library_query: string;
  logo_url?: string;
  discovered_at: string;
}

/** Mirrors the `competitor_ads` Supabase table row */
export interface CompetitorAdRow {
  ad_id: string;
  competitor_id: string;
  brand_id: string;
  platform: Platform;
  media_url: string;
  thumbnail_url?: string;
  ad_copy: string;
  headline?: string;
  cta_text: string;
  days_active: number;
  estimated_impressions?: number;
  target_demographic?: string;
  landing_page_url?: string;
  scraped_at: string;
}

/** Mirrors the `ad_analyses` Supabase table row */
export interface AdAnalysisRow {
  id: string;
  ad_id: string;
  brand_id: string;
  competitor_id: string;
  breakdown: AdBreakdown;
  analysed_at: string;
}

/** Mirrors the `generated_campaigns` Supabase table row */
export interface GeneratedCampaignRow {
  id: string;
  brand_id: string;
  angle_used: StrategyAngle;
  headline: string;
  primary_text: string;
  cta: string;
  visual_concept_brief: string;
  ugc_storyboard: UgcStoryboardFrame[];
  estimated_cost_savings: CostSavingsEstimate;
  projected_metrics: ProjectedMetrics;
  generated_at: string;
}

// =============================================================================
// MOCK DATA — Demo Resilience Layer
// Real-world-like data so the demo never fails on rate-limited scrapers
// =============================================================================

// ---------------------------------------------------------------------------
// MOCK — Step 1: Brand Profile
// ---------------------------------------------------------------------------

export const MOCK_BRAND_PROFILE: BrandProfile = {
  id: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
  userId: "user_2cZbMkpLdH9qTxzNvOeRfJsWi",
  companyName: "LumaFit",
  niche: "Women's Activewear & Fitness Supplements",
  websiteUrl: "https://lumafit.co",
  usp: "Science-backed, sustainable activewear designed by female athletes — zero greenwashing, 100% performance.",
  productRange: [
    "High-waist Leggings",
    "Sports Bras",
    "Pre-Workout Powder",
    "Recovery Collagen Blend",
    "Resistance Bands Set",
  ],
  brandVoice: "inspirational",
  targetAudience: {
    ageRange: "24–42",
    genders: ["female"],
    interests: [
      "yoga",
      "strength training",
      "wellness",
      "clean eating",
      "sustainability",
    ],
    painPoints: [
      "activewear that fades or pills after a few washes",
      "supplements with hidden artificial ingredients",
      "brands that performatively claim sustainability without proof",
    ],
    geographies: ["US", "UK", "Canada", "Australia"],
  },
  createdAt: "2026-10-01T09:15:00Z",
  updatedAt: "2026-10-15T14:30:00Z",
};

export const MOCK_BRAND_INSIGHTS: BrandInsights = {
  primaryValueProposition:
    "Premium performance-wear with verified eco-credentials and transparent ingredient sourcing.",
  toneKeywords: ["empowering", "honest", "science-led", "community-driven"],
  inferredCompetitorNiches: [
    "Women's performance apparel",
    "Clean supplement brands",
    "Eco-conscious sportswear",
  ],
  suggestedStrategyAngles: [
    "direct_comparison",
    "social_proof_reviews",
    "problem_agitation",
  ],
};

// ---------------------------------------------------------------------------
// MOCK — Step 2: Competitor Discovery
// ---------------------------------------------------------------------------

export const MOCK_COMPETITORS: Competitor[] = [
  {
    id: "comp_01JF2XK8QR5VNTPM3GHYD6W0B",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    name: "Gymshark",
    websiteUrl: "https://gymshark.com",
    estimatedReachScore: 94,
    marketShareTier: "dominant",
    activeChannels: {
      meta: true,
      tiktok: true,
      instagram: true,
      youtube: true,
      google: true,
    },
    summary:
      "Gymshark is a UK-based fitness apparel giant with a massive influencer network and Gen-Z brand loyalty. Their Meta ads focus heavily on aspirational lifestyle visuals and limited-edition drops to drive urgency.",
    adLibraryQuery: 'advertiser:"Gymshark" category:CLOTHING',
    logoUrl: "https://logo.clearbit.com/gymshark.com",
    discoveredAt: "2026-10-16T08:00:00Z",
  },
  {
    id: "comp_01JF2XK8QR5VNTPM3GHYD6W0C",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    name: "Lululemon",
    websiteUrl: "https://lululemon.com",
    estimatedReachScore: 97,
    marketShareTier: "dominant",
    activeChannels: {
      meta: true,
      tiktok: true,
      instagram: true,
      youtube: true,
      google: true,
    },
    summary:
      "Lululemon dominates the premium athleisure segment with community-first marketing and product innovation storytelling. Their ads lean into mindfulness, yoga aesthetics, and high-income female demographics.",
    adLibraryQuery: 'advertiser:"lululemon" category:CLOTHING',
    logoUrl: "https://logo.clearbit.com/lululemon.com",
    discoveredAt: "2026-10-16T08:01:00Z",
  },
  {
    id: "comp_01JF2XK8QR5VNTPM3GHYD6W0D",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    name: "Fabletics",
    websiteUrl: "https://fabletics.com",
    estimatedReachScore: 78,
    marketShareTier: "challenger",
    activeChannels: {
      meta: true,
      tiktok: true,
      instagram: true,
      youtube: false,
      google: true,
    },
    summary:
      "Fabletics competes on value with its subscription VIP model, aggressively advertising 2-for-$24 legging deals. Their ads are heavily direct-response with strong price anchoring and celebrity endorsements.",
    adLibraryQuery: 'advertiser:"Fabletics" category:CLOTHING',
    logoUrl: "https://logo.clearbit.com/fabletics.com",
    discoveredAt: "2026-10-16T08:02:00Z",
  },
  {
    id: "comp_01JF2XK8QR5VNTPM3GHYD6W0E",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    name: "Alo Yoga",
    websiteUrl: "https://aloyoga.com",
    estimatedReachScore: 82,
    marketShareTier: "challenger",
    activeChannels: {
      meta: true,
      tiktok: true,
      instagram: true,
      youtube: false,
      google: false,
    },
    summary:
      "Alo Yoga targets a spiritually conscious, luxury-fitness consumer. Instagram-first strategy with high production value. Ads rarely discount — premium positioning is maintained through mindfulness and wellness storytelling.",
    adLibraryQuery: 'advertiser:"Alo Yoga" category:CLOTHING',
    logoUrl: "https://logo.clearbit.com/aloyoga.com",
    discoveredAt: "2026-10-16T08:03:00Z",
  },
  {
    id: "comp_01JF2XK8QR5VNTPM3GHYD6W0F",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    name: "Sweaty Betty",
    websiteUrl: "https://sweatybetty.com",
    estimatedReachScore: 61,
    marketShareTier: "niche",
    activeChannels: {
      meta: true,
      tiktok: false,
      instagram: true,
      youtube: false,
      google: true,
    },
    summary:
      "Sweaty Betty is a British heritage brand targeting the 30–50 female fitness segment. Limited TikTok presence creates an opening for challengers. Strong with running and outdoor activity aesthetics.",
    adLibraryQuery: 'advertiser:"Sweaty Betty" category:CLOTHING',
    logoUrl: "https://logo.clearbit.com/sweatybetty.com",
    discoveredAt: "2026-10-16T08:04:00Z",
  },
];

export const MOCK_MARKET_SNAPSHOT: MarketSnapshot = {
  totalActiveAds: 1247,
  avgEffectivenessScore: 68,
  dominantHookType: "bold_statement",
  topPlatform: "instagram",
  marketSaturationLevel: "high",
  opportunityGapSummary:
    "The market is dominated by aspirational lifestyle visuals. A transparency-led, ingredient-honest narrative is significantly underrepresented — this is LumaFit's primary white space.",
};

// ---------------------------------------------------------------------------
// MOCK — Step 3: Ad Analysis
// ---------------------------------------------------------------------------

export const MOCK_COMPETITOR_ADS: CompetitorAd[] = [
  {
    adId: "ad_01JF2XK8QR5VNTPM3GHYD6W0G",
    competitorId: "comp_01JF2XK8QR5VNTPM3GHYD6W0C", // Lululemon
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    platform: "instagram",
    mediaUrl:
      "https://cdn.example.com/mock-ads/lululemon-align-leggings-ad.mp4",
    thumbnailUrl:
      "https://cdn.example.com/mock-ads/lululemon-align-leggings-thumb.jpg",
    adCopy:
      "Feel every stretch. Live every moment. The Align Legging — engineered for the studio and beyond. Free shipping on orders $100+.",
    headline: "Move Without Limits — Align Legging",
    ctaText: "Shop Now",
    daysActive: 142,
    estimatedImpressions: 4800000,
    targetDemographic: "Women 28–44, fitness enthusiasts, household income $80k+",
    landingPageUrl:
      "https://lululemon.com/collections/align-leggings?utm_source=ig_ad",
    scrapedAt: "2026-10-16T09:00:00Z",
  },
  {
    adId: "ad_01JF2XK8QR5VNTPM3GHYD6W0H",
    competitorId: "comp_01JF2XK8QR5VNTPM3GHYD6W0B", // Gymshark
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    platform: "facebook",
    mediaUrl: "https://cdn.example.com/mock-ads/gymshark-blackfriday-ad.mp4",
    thumbnailUrl:
      "https://cdn.example.com/mock-ads/gymshark-blackfriday-thumb.jpg",
    adCopy:
      "⚡ LIMITED TIME. Up to 60% off sitewide. The drop you've been waiting for — don't let your size sell out. Gymshark Black Friday is LIVE.",
    headline: "60% Off. Ends Tonight.",
    ctaText: "Shop the Drop",
    daysActive: 7,
    estimatedImpressions: 12000000,
    targetDemographic: "Women & Men 18–35, gym-goers, deal-seekers",
    landingPageUrl: "https://gymshark.com/pages/black-friday",
    scrapedAt: "2026-10-16T09:05:00Z",
  },
  {
    adId: "ad_01JF2XK8QR5VNTPM3GHYD6W0I",
    competitorId: "comp_01JF2XK8QR5VNTPM3GHYD6W0D", // Fabletics
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    platform: "facebook",
    mediaUrl: "https://cdn.example.com/mock-ads/fabletics-vip-offer.mp4",
    thumbnailUrl:
      "https://cdn.example.com/mock-ads/fabletics-vip-offer-thumb.jpg",
    adCopy:
      "Why pay $80 for a single pair of leggings? As a VIP member, get 2 pairs for just $24. No catch — cancel anytime. Kate Hudson approved.",
    headline: "2 Leggings for $24 — VIP Offer Ends Sunday",
    ctaText: "Get the Deal",
    daysActive: 38,
    estimatedImpressions: 7200000,
    targetDemographic: "Women 25–45, budget-conscious fitness shoppers",
    landingPageUrl: "https://fabletics.com/pages/vip-offer",
    scrapedAt: "2026-10-16T09:10:00Z",
  },
];

export const MOCK_AD_ANALYSES: AdAnalysisResult[] = [
  {
    ad: MOCK_COMPETITOR_ADS[0],
    breakdown: {
      hook: "Feel every stretch. Live every moment.",
      hookType: "bold_statement",
      painPoint:
        "Activewear that restricts movement or feels uncomfortable during yoga and high-intensity workouts.",
      mechanism:
        "Proprietary Nulu™ fabric engineered for a 'naked' sensation — four-way stretch, no digging waistband.",
      offerStructure:
        "Premium price anchoring with free shipping threshold ($100+) to increase average order value.",
      vulnerabilityGap:
        "Zero transparency on fabric sourcing or sustainability credentials. LumaFit can win with verified eco-certs and ingredient disclosure.",
      effectivenessScore: 81,
      emotionalTriggers: ["aspiration", "comfort", "identity"],
      persuasionFramework: "AIDA",
      estimatedCpm: 14.5,
      keywordDensity: { stretch: 1, feel: 1, moment: 1, free: 1 },
    },
    analysedAt: "2026-10-16T10:00:00Z",
  },
  {
    ad: MOCK_COMPETITOR_ADS[1],
    breakdown: {
      hook: "⚡ LIMITED TIME. Up to 60% off sitewide.",
      hookType: "pattern_interrupt",
      painPoint:
        "Fear of missing out on a time-limited deal; anxiety about size availability.",
      mechanism:
        "Urgency + scarcity combined (limited time + sell-out risk) to trigger immediate purchase decision.",
      offerStructure:
        "Aggressive percentage discount (60%) used as the dominant visual and copy hook — discount-first positioning.",
      vulnerabilityGap:
        "Gymshark trains consumers to wait for sales, eroding brand premium. LumaFit should reinforce value-over-price narrative to attract a less discount-dependent customer.",
      effectivenessScore: 76,
      emotionalTriggers: [
        "fear of missing out",
        "urgency",
        "excitement",
        "loss aversion",
      ],
      persuasionFramework: "PAS",
      estimatedCpm: 9.8,
      keywordDensity: {
        off: 1,
        limited: 1,
        "sell out": 1,
        live: 1,
        "black friday": 1,
      },
    },
    analysedAt: "2026-10-16T10:05:00Z",
  },
  {
    ad: MOCK_COMPETITOR_ADS[2],
    breakdown: {
      hook: "Why pay $80 for a single pair of leggings?",
      hookType: "question",
      painPoint:
        "Premium activewear is unaffordable; consumers feel over-charged by incumbents like Lululemon.",
      mechanism:
        "Direct price comparison anchoring ($80 vs. $12/pair VIP) with celebrity validation (Kate Hudson) to add aspirational credibility.",
      offerStructure:
        "Loss-leader VIP subscription entry — 2 for $24 is the acquisition cost; LTV is captured through the monthly membership.",
      vulnerabilityGap:
        "Fabletics' subscription model creates buyer's remorse and churn. LumaFit can position as 'transparent pricing, no subscriptions, no tricks' to capture disillusioned Fabletics customers.",
      effectivenessScore: 73,
      emotionalTriggers: [
        "value",
        "social proof",
        "comparison",
        "anti-establishment",
      ],
      persuasionFramework: "BAB",
      estimatedCpm: 11.2,
      keywordDensity: { pay: 1, deal: 1, cancel: 1, vip: 1, kate: 1 },
    },
    analysedAt: "2026-10-16T10:10:00Z",
  },
];

export const MOCK_AD_AGGREGATE_SUMMARY: AdAggregateSummary = {
  totalAdsAnalysed: 3,
  avgEffectivenessScore: 76.7,
  mostUsedHookType: "bold_statement",
  mostUsedPlatform: "facebook",
  commonPainPoints: [
    "uncomfortable activewear during intense exercise",
    "overpriced premium brands",
    "fear of missing out on limited deals",
  ],
  commonEmotionalTriggers: [
    "aspiration",
    "urgency",
    "social proof",
    "value-seeking",
  ],
  topVulnerabilityGap:
    "No competitor communicates supply chain transparency or verified sustainability. This is LumaFit's clearest white-space.",
};

// ---------------------------------------------------------------------------
// MOCK — Step 4: Generated Campaigns
// ---------------------------------------------------------------------------

export const MOCK_GENERATED_CAMPAIGNS: GeneratedCampaign[] = [
  // ── Angle 1: Direct Comparison ────────────────────────────────────────────
  {
    id: "camp_01JF2XK8QR5VNTPM3GHYD6W0J",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    angleUsed: "direct_comparison",
    headline: "Same Stretch. Traceable Supply Chain. Half the Greenwashing.",
    primaryText:
      "You've tried the $120 legging from the brand that plants a tree and says nothing else. We'll show you exactly where every thread comes from — certified by Bluesign®, made by real people paid fair wages. LumaFit Align Pro: Performance you can verify. Free shipping. 60-day returns. No subscription trap.",
    cta: "See the Difference →",
    visualConceptBrief:
      "Split-screen: Left side shows a competitor legging tag with a vague 'eco-friendly' badge. Right side shows LumaFit's tag with a QR code linking to full supply-chain traceability. Final frame: woman in mid-squat wearing LumaFit leggings, overlay text: 'Certified. Transparent. Yours.'",
    ugcStoryboard: [
      {
        second: 0,
        visualFrame:
          "Creator holds up a competitor legging tag, squinting at fine print.",
        audioScript:
          '"I spent $120 on these because the brand called them eco-friendly. So I looked into it…"',
        textOverlay: "POV: You read the label 👀",
      },
      {
        second: 5,
        visualFrame:
          "Creator pulls up a vague sustainability page on their phone — no certifications, no data.",
        audioScript:
          '"Their entire sustainability page is two paragraphs and a stock photo of a forest."',
        textOverlay: "No certs. No data. Just vibes.",
        transitionNote: "quick zoom into phone screen",
      },
      {
        second: 11,
        visualFrame: "Creator holds up LumaFit legging, scans QR on tag.",
        audioScript:
          '"LumaFit sent me their leggings and asked me to check their receipts."',
        textOverlay: "Challenge accepted 🔍",
      },
      {
        second: 17,
        visualFrame:
          "Phone shows Bluesign® certificate page, fabric origin map.",
        audioScript:
          `"Bluesign certified. Exact factory location. Fair-wage audit report. It's all there."`,
        textOverlay: "Real certifications. Real factories.",
      },
      {
        second: 25,
        visualFrame:
          "Creator wearing LumaFit leggings does a deep squat and hip hinge.",
        audioScript:
          '"And they perform. Four-way stretch, no see-through, waistband stays put during heavy deadlifts."',
        textOverlay: "No compromise on performance 💪",
        transitionNote: "slow-motion on squat",
      },
      {
        second: 35,
        visualFrame: "Creator to camera, casual tone.",
        audioScript:
          '"$89. Free shipping. 60-day returns. No monthly subscription nonsense."',
        textOverlay: "LumaFit — Honest Activewear",
      },
      {
        second: 42,
        visualFrame: "Call-to-action card: LumaFit logo + 'See the Difference'",
        audioScript: '"Link in bio. See the proof for yourself."',
        textOverlay: "LumaFit.co — See the Difference →",
      },
    ],
    estimatedCostSavings: {
      traditionalAgencyCostUsd: 18500,
      aiGenerationCostUsd: 290,
      savingsUsd: 18210,
      savingsPercent: 98.4,
      timeToMarketDays: 1,
    },
    projectedMetrics: {
      estimatedCtr: 3.8,
      estimatedConversionRate: 2.4,
      estimatedRoas: 4.2,
      confidenceLevel: "high",
    },
    generatedAt: "2026-10-16T11:00:00Z",
  },

  // ── Angle 2: Problem Agitation ────────────────────────────────────────────
  {
    id: "camp_01JF2XK8QR5VNTPM3GHYD6W0K",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    angleUsed: "problem_agitation",
    headline:
      "Your Leggings Are Pilling. Your Pre-Workout Has Synthetic Dyes. You Deserve Better.",
    primaryText:
      "You didn't start training to settle. But somehow you ended up with leggings that pill after 10 washes and a pre-workout that tastes like a lab accident. LumaFit was built by female athletes who got fed up. Every piece is wash-tested to 100 cycles. Every supplement uses only IFOS-certified ingredients. No compromise. No excuses. Time to upgrade.",
    cta: "Upgrade My Training →",
    visualConceptBrief:
      "Opening: extreme close-up of pilled, faded competitor leggings under harsh light. Mid-section: ingredient label of a competitor supplement with 20+ unpronounceable additives circled in red. Closing: smooth, vibrant LumaFit leggings, clean supplement label — stark visual contrast. Mood: clinical-to-empowering.",
    ugcStoryboard: [
      {
        second: 0,
        visualFrame:
          "Extreme close-up of pilled, faded leggings — creator's hand pinches pilling",
        audioScript:
          '"Tell me you bought cheap leggings without telling me you bought cheap leggings."',
        textOverlay: "After 15 washes 😬",
      },
      {
        second: 5,
        visualFrame:
          "Creator holds up competitor supplement, starts reading label.",
        audioScript:
          '"Red 40. Artificial flavours. Sucralose. Acesulfame potassium — what even is that?"',
        textOverlay: "Your 'clean' pre-workout 👆",
        transitionNote: "fast cuts between label items",
      },
      {
        second: 14,
        visualFrame:
          "Creator sets down competitor products. Looks directly at camera.",
        audioScript:
          '"I trained for three years before I realised I was paying premium prices for mid-tier ingredients."',
        textOverlay: "Three years I won't get back.",
      },
      {
        second: 22,
        visualFrame: "LumaFit legging unfolds — smooth, vivid, no pilling.",
        audioScript:
          '"LumaFit leggings are tested for 100 wash cycles. These are mine after 60."',
        textOverlay: "Wash test: 60 cycles. Zero pilling. ✅",
      },
      {
        second: 30,
        visualFrame:
          "Creator holds LumaFit pre-workout, reads short, clean ingredient list.",
        audioScript:
          `"IFOS-certified ingredients. Five actives. Nothing you can't pronounce."`,
        textOverlay: "5 ingredients. All certified. 🧪",
      },
      {
        second: 38,
        visualFrame: "Creator during intense training montage — squats, runs.",
        audioScript:
          '"This is what it feels like when your gear actually works as hard as you do."',
        textOverlay: "No compromise. No excuses. 🔥",
        transitionNote: "energetic fast-cut montage",
      },
      {
        second: 48,
        visualFrame: "Call-to-action with product shots.",
        audioScript: '"LumaFit. Upgrade your training. Link below."',
        textOverlay: "LumaFit.co — Upgrade My Training →",
      },
    ],
    estimatedCostSavings: {
      traditionalAgencyCostUsd: 18500,
      aiGenerationCostUsd: 290,
      savingsUsd: 18210,
      savingsPercent: 98.4,
      timeToMarketDays: 1,
    },
    projectedMetrics: {
      estimatedCtr: 4.1,
      estimatedConversionRate: 2.9,
      estimatedRoas: 5.1,
      confidenceLevel: "high",
    },
    generatedAt: "2026-10-16T11:02:00Z",
  },

  // ── Angle 3: Social Proof / Reviews ──────────────────────────────────────
  {
    id: "camp_01JF2XK8QR5VNTPM3GHYD6W0L",
    brandId: "brand_01JF2XK8QR5VNTPM3GHYD6W0A",
    angleUsed: "social_proof_reviews",
    headline: "47,000 Female Athletes Switched. Here's Why.",
    primaryText:
      "\"I've tried every legging. These are the only ones I've reordered three times.\" — Maya R., CrossFit coach ★★★★★\n\n\"I cancelled my Fabletics sub the same day these arrived. Night and day.\" — Priya S., marathon runner ★★★★★\n\nOver 47,000 women have made the switch to LumaFit. With a 4.9/5 rating across 11,200 reviews — and a 60-day no-questions return policy — the risk is on us.",
    cta: "Join 47,000 Athletes →",
    visualConceptBrief:
      "Mosaic-style UGC compilation: quick cuts of real customers in LumaFit gear across diverse training contexts — CrossFit box, home yoga, outdoor run, strength gym. Text overlays display real review snippets. Closing frame: animated 4.9★ rating badge with review count. Warm, authentic colour grade — no studio polish.",
    ugcStoryboard: [
      {
        second: 0,
        visualFrame:
          "Split screen of 4 different women in LumaFit gear — different ages, backgrounds, training styles.",
        audioScript:
          `"47,000 women didn't all stumble on the same legging by accident."`,
        textOverlay: "47,000 athletes. One verdict. ⭐",
      },
      {
        second: 6,
        visualFrame: "Close-up: Maya R. in CrossFit box, review text overlay.",
        audioScript:
          `"CrossFit coach Maya: I've tried every legging. These are the only ones I've reordered three times."`,
        textOverlay: '"Reordered 3x" — Maya R. ★★★★★',
      },
      {
        second: 14,
        visualFrame: "Priya S. crossing finish line at a 10k, smiling.",
        audioScript:
          '"Marathon runner Priya cancelled her Fabletics subscription the same day these arrived."',
        textOverlay: '"Night and day." — Priya S. ★★★★★',
      },
      {
        second: 22,
        visualFrame:
          "Montage of UGC clips — yoga, weight training, outdoor run — all LumaFit gear.",
        audioScript:
          '"From the yoga studio to the squat rack — real women, real training, real results."',
        textOverlay: "Real women. Real training.",
        transitionNote: "energetic mosaic cut",
      },
      {
        second: 32,
        visualFrame: "Animated graphic: 4.9★ / 11,200 reviews badge appears.",
        audioScript: '"4.9 stars. 11,200 reviews. The numbers don\'t lie."',
        textOverlay: "4.9 ★ — 11,200 verified reviews",
      },
      {
        second: 40,
        visualFrame: "Creator holds LumaFit legging, speaks to camera.",
        audioScript:
          '"60-day return policy. No questions. The risk is completely on them."',
        textOverlay: "60-day return. Zero risk. 💯",
      },
      {
        second: 48,
        visualFrame: "Final card: LumaFit logo + CTA",
        audioScript: '"Join 47,000 athletes. Link below."',
        textOverlay: "LumaFit.co — Join 47,000 Athletes →",
      },
    ],
    estimatedCostSavings: {
      traditionalAgencyCostUsd: 18500,
      aiGenerationCostUsd: 290,
      savingsUsd: 18210,
      savingsPercent: 98.4,
      timeToMarketDays: 1,
    },
    projectedMetrics: {
      estimatedCtr: 4.6,
      estimatedConversionRate: 3.2,
      estimatedRoas: 5.8,
      confidenceLevel: "high",
    },
    generatedAt: "2026-10-16T11:04:00Z",
  },
];

export const MOCK_ADAPTATION_STRATEGIES: AdaptationStrategy[] = [
  {
    angleUsed: "direct_comparison",
    sourceAdIds: [
      "ad_01JF2XK8QR5VNTPM3GHYD6W0G",
      "ad_01JF2XK8QR5VNTPM3GHYD6W0I",
    ],
    differentiators: [
      "Bluesign® certified fabric",
      "Full supply chain traceability via QR code",
      "No subscription model",
      "60-day return policy",
    ],
    avoidPatterns: [
      "Vague eco-friendly claims without certification",
      "Celebrity endorsement without product credibility",
      "Subscription upsell pressure",
    ],
    toneGuidelines:
      "Inspirational but grounded in verifiable facts. Confident comparisons — never aggressive or dismissive. Lead with proof, follow with emotion.",
  },
  {
    angleUsed: "problem_agitation",
    sourceAdIds: ["ad_01JF2XK8QR5VNTPM3GHYD6W0H"],
    differentiators: [
      "100-cycle wash test",
      "IFOS-certified supplement ingredients",
      "Designed by female athletes",
    ],
    avoidPatterns: [
      "Urgency/scarcity tactics (discount-first positioning)",
      "Generic aspirational lifestyle without substance",
    ],
    toneGuidelines:
      "Empathetic frustration in the problem phase, then authoritative confidence in the solution phase. Speak directly to the audience's intelligence.",
  },
  {
    angleUsed: "social_proof_reviews",
    sourceAdIds: [
      "ad_01JF2XK8QR5VNTPM3GHYD6W0G",
      "ad_01JF2XK8QR5VNTPM3GHYD6W0I",
    ],
    differentiators: [
      "47,000+ customers",
      "4.9/5 star rating",
      "11,200 verified reviews",
      "Real athlete testimonials across diverse disciplines",
    ],
    avoidPatterns: [
      "Polished/aspirational studio visuals",
      "Only showing one body type or demographic",
    ],
    toneGuidelines:
      "Let the community speak. Creator voice should be a facilitator, not a salesperson. Authenticity over production value.",
  },
];

// ---------------------------------------------------------------------------
// NOTE: All types are already exported at their declaration site above.
// No re-exports needed — import directly from "@shared/types".
// ---------------------------------------------------------------------------
