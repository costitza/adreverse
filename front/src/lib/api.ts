import {
  BrandOnboardingRequest,
  BrandOnboardingResponse,
  MarketDiscoveryRequest,
  MarketDiscoveryResponse,
  AdAnalysisRequest,
  AdAnalysisResponse,
  CampaignGenerationRequest,
  CampaignGenerationResponse,
  MOCK_BRAND_PROFILE,
  MOCK_BRAND_INSIGHTS,
  MOCK_COMPETITORS,
  MOCK_MARKET_SNAPSHOT,
  MOCK_AD_ANALYSES,
  MOCK_AD_AGGREGATE_SUMMARY,
  MOCK_GENERATED_CAMPAIGNS,
  MOCK_ADAPTATION_STRATEGIES,
  ApiResponse,
} from "@shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Generic fetcher that sends request to FastAPI and falls back safely to mock data
 */
async function fetchWithFallback<T>(
  endpoint: string,
  options: RequestInit,
  fallbackData: T
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[API Warning] ${endpoint} returned status ${response.status}. Using fallback mock data.`);
      return fallbackData;
    }

    const payload = await response.json();

    // Check if wrapped in standard ApiResponse envelope
    if (payload && typeof payload === "object" && "data" in payload && "success" in payload) {
      const apiResponse = payload as ApiResponse<T>;
      if (apiResponse.success && apiResponse.data !== undefined) {
        return apiResponse.data;
      }
    }

    // Direct data return
    return payload as T;
  } catch (error) {
    console.warn(`[API Fallback] Request to ${endpoint} failed:`, error);
    return fallbackData;
  }
}

/**
 * Step 1: Submit Brand Profile
 */
export async function submitBrandProfile(
  payload: BrandOnboardingRequest
): Promise<BrandOnboardingResponse> {
  const fallbackResponse: BrandOnboardingResponse = {
    brand: {
      ...MOCK_BRAND_PROFILE,
      companyName: payload.companyName || MOCK_BRAND_PROFILE.companyName,
      niche: payload.niche || MOCK_BRAND_PROFILE.niche,
      websiteUrl: payload.websiteUrl || MOCK_BRAND_PROFILE.websiteUrl,
      usp: payload.usp || MOCK_BRAND_PROFILE.usp,
      productRange: payload.productRange?.length ? payload.productRange : MOCK_BRAND_PROFILE.productRange,
      brandVoice: payload.brandVoice || MOCK_BRAND_PROFILE.brandVoice,
      targetAudience: payload.targetAudience || MOCK_BRAND_PROFILE.targetAudience,
    },
    extractedInsights: MOCK_BRAND_INSIGHTS,
  };

  return fetchWithFallback<BrandOnboardingResponse>(
    "/api/brand/onboard",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    fallbackResponse
  );
}

/**
 * Step 2: Discover Competitors in Market
 */
export async function discoverCompetitors(
  payload: MarketDiscoveryRequest
): Promise<MarketDiscoveryResponse> {
  const fallbackResponse: MarketDiscoveryResponse = {
    brandId: payload.brandId,
    competitors: MOCK_COMPETITORS,
    marketSnapshot: MOCK_MARKET_SNAPSHOT,
    scrapedAt: new Date().toISOString(),
  };

  return fetchWithFallback<MarketDiscoveryResponse>(
    "/api/discovery/run",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    fallbackResponse
  );
}

/**
 * Step 3: Analyze Competitor Ad(s)
 */
export async function analyzeAd(
  payload: AdAnalysisRequest
): Promise<AdAnalysisResponse> {
  const fallbackResponse: AdAnalysisResponse = {
    brandId: payload.brandId,
    competitorId: payload.competitorId,
    analyses: MOCK_AD_ANALYSES,
    aggregateSummary: MOCK_AD_AGGREGATE_SUMMARY,
  };

  return fetchWithFallback<AdAnalysisResponse>(
    "/api/ads/analyse",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    fallbackResponse
  );
}

/**
 * Step 4: Generate Counter-Campaign with UGC Storyboard
 */
export async function generateCounterCampaign(
  payload: CampaignGenerationRequest
): Promise<CampaignGenerationResponse> {
  const filteredCampaigns = MOCK_GENERATED_CAMPAIGNS.filter((c) =>
    payload.strategyAngles?.length ? payload.strategyAngles.includes(c.angleUsed) : true
  );

  const fallbackResponse: CampaignGenerationResponse = {
    brandId: payload.brandId,
    campaigns: filteredCampaigns.length > 0 ? filteredCampaigns : MOCK_GENERATED_CAMPAIGNS,
    adaptationStrategies: MOCK_ADAPTATION_STRATEGIES,
    generatedAt: new Date().toISOString(),
  };

  return fetchWithFallback<CampaignGenerationResponse>(
    "/api/campaign/generate",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    fallbackResponse
  );
}
