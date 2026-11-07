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
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s timeout for live AI/scrapers

    console.log(`[API Call] -> ${url}`, options.body ? JSON.parse(options.body as string) : "");

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
      console.error(`[API Warning] ${endpoint} returned status ${response.status}. Using fallback mock data.`);
      return fallbackData;
    }

    const payload = await response.json();
    console.log(`[API Response] <- ${endpoint}`, payload);

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
    console.error(`[API Fallback] Request to ${endpoint} failed:`, error);
    return fallbackData;
  }
}

/**
 * Get all saved brand vaults for current user
 */
export async function getUserBrandVaults(userId: string): Promise<any[]> {
  if (!userId) return [];
  return fetchWithFallback<any[]>(
    "/api/brand/user-brands",
    {
      method: "GET",
      headers: {
        "X-User-Id": userId,
      },
    },
    []
  );
}

/**
 * Get full data for a specific brand vault (brand, competitors, analyses, campaigns)
 */
export async function getBrandVault(brandId: string): Promise<any | null> {
  if (!brandId) return null;
  return fetchWithFallback<any | null>(
    `/api/brand/${brandId}/vault`,
    {
      method: "GET",
    },
    null
  );
}

/**
 * Step 1: Submit Brand Profile
 */
export async function submitBrandProfile(
  payload: BrandOnboardingRequest,
  userId?: string
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

  const headers: Record<string, string> = {};
  if (userId) {
    headers["X-User-Id"] = userId;
  }

  return fetchWithFallback<BrandOnboardingResponse>(
    "/api/brand/onboard",
    {
      method: "POST",
      headers,
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
  const url = `${API_BASE_URL}/api/ads/analyse`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`[API Error ${response.status}] ${errText}`);
    }

    const payloadJson = await response.json();
    return payloadJson as AdAnalysisResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("[analyzeAd Failed]", error);
    throw error;
  }
}

/**
 * Step 4: Generate Counter-Campaign with UGC Storyboard
 */
export async function generateCounterCampaign(
  payload: CampaignGenerationRequest
): Promise<CampaignGenerationResponse> {
  const url = `${API_BASE_URL}/api/campaign/generate`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`[API Error ${response.status}] ${errText}`);
    }

    const payloadJson = await response.json();
    return payloadJson as CampaignGenerationResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("[generateCounterCampaign Failed]", error);
    throw error;
  }
}
