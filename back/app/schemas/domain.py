from typing import List, Optional, Literal, Generic, TypeVar, Dict
from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

T = TypeVar("T")

class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

# ---------------------------------------------------------------------------
# SHARED PRIMITIVES
# ---------------------------------------------------------------------------

Platform = Literal["facebook", "instagram", "tiktok"]
MarketShareTier = Literal["dominant", "challenger", "niche", "emerging"]
StrategyAngle = Literal["direct_comparison", "problem_agitation", "social_proof_reviews"]
HookType = Literal[
    "question",
    "bold_statement",
    "statistic",
    "story",
    "controversy",
    "pattern_interrupt",
    "testimonial",
]
BrandVoice = Literal[
    "professional",
    "conversational",
    "inspirational",
    "humorous",
    "authoritative",
    "empathetic",
]

class ApiResponse(CamelModel, Generic[T]):
    success: bool
    data: T
    error: Optional[str] = None
    timestamp: str

class PaginationMeta(CamelModel):
    page: int
    page_size: int
    total: int
    has_next_page: bool

# ---------------------------------------------------------------------------
# STEP 1 — BRAND ONBOARDING
# ---------------------------------------------------------------------------

class TargetAudience(CamelModel):
    age_range: str = Field(default="25-45", description="e.g. '25-45'")
    genders: List[Literal["male", "female", "all"]] = Field(default_factory=lambda: ["all"])
    interests: List[str] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list)
    geographies: List[str] = Field(default_factory=list)

class BrandProfile(CamelModel):
    id: str
    user_id: str
    company_name: str
    niche: str
    website_url: str
    usp: str
    product_range: List[str]
    brand_voice: BrandVoice
    target_audience: TargetAudience
    created_at: str
    updated_at: str

class BrandInsights(CamelModel):
    primary_value_proposition: str
    tone_keywords: List[str]
    inferred_competitor_niches: List[str]
    suggested_strategy_angles: List[StrategyAngle]

class BrandOnboardingRequest(CamelModel):
    company_name: Optional[str] = None
    niche: Optional[str] = None
    website_url: Optional[str] = None
    usp: Optional[str] = None
    product_range: Optional[List[str]] = Field(default_factory=list)
    brand_voice: Optional[BrandVoice] = None
    target_audience: Optional[TargetAudience] = None
    brand_description: Optional[str] = None
    user_id: Optional[str] = None

class BrandOnboardingResponse(CamelModel):
    brand: BrandProfile
    extracted_insights: BrandInsights

BrandOnboardRequest = BrandOnboardingRequest
BrandOnboardResponse = BrandOnboardingResponse

# ---------------------------------------------------------------------------
# STEP 2 — MARKET / COMPETITOR DISCOVERY
# ---------------------------------------------------------------------------

class ActiveChannels(CamelModel):
    meta: bool = True
    tiktok: bool = True
    instagram: bool = True
    youtube: Optional[bool] = False
    google: Optional[bool] = True

class Competitor(CamelModel):
    id: str
    brand_id: str
    name: str
    website_url: str
    estimated_reach_score: int  # 0–100
    market_share_tier: MarketShareTier
    active_channels: ActiveChannels
    summary: str
    ad_library_query: str
    logo_url: Optional[str] = None
    discovered_at: str

class MarketSnapshot(CamelModel):
    total_active_ads: int
    avg_effectiveness_score: float
    dominant_hook_type: HookType
    top_platform: Platform
    market_saturation_level: Literal["low", "medium", "high", "saturated"]
    opportunity_gap_summary: str

class MarketDiscoveryRequest(CamelModel):
    brand_id: Optional[str] = None
    niche: Optional[str] = None
    max_competitors: Optional[int] = 5
    include_tiers: Optional[List[MarketShareTier]] = None
    brand_profile: Optional[BrandProfile] = None

class MarketDiscoveryResponse(CamelModel):
    brand_id: str
    competitors: List[Competitor]
    market_snapshot: MarketSnapshot
    scraped_at: str

DiscoverCompetitorsRequest = MarketDiscoveryRequest
DiscoverCompetitorsResponse = MarketDiscoveryResponse

# ---------------------------------------------------------------------------
# STEP 3 — AD SCRAPING & REVERSE ENGINEERING
# ---------------------------------------------------------------------------

class CompetitorAd(CamelModel):
    ad_id: str
    competitor_id: str
    brand_id: str
    platform: Platform
    media_url: str
    thumbnail_url: Optional[str] = None
    ad_copy: str
    headline: Optional[str] = None
    cta_text: str
    days_active: int
    estimated_impressions: Optional[int] = None
    target_demographic: Optional[str] = None
    landing_page_url: Optional[str] = None
    scraped_at: str

class AdBreakdown(CamelModel):
    hook: str
    hook_type: HookType
    pain_point: str
    mechanism: str
    offer_structure: str
    vulnerability_gap: str
    effectiveness_score: int  # 0–100
    emotional_triggers: List[str]
    persuasion_framework: str
    estimated_cpm: Optional[float] = None
    keyword_density: Optional[Dict[str, int]] = None

class AdAnalysisResult(CamelModel):
    ad: CompetitorAd
    breakdown: AdBreakdown
    analysed_at: str

class AdAnalysisRequest(CamelModel):
    brand_id: str
    competitor_id: str
    ad_ids: Optional[List[str]] = None
    force_refresh: Optional[bool] = False

class AdAggregateSummary(CamelModel):
    total_ads_analysed: int
    avg_effectiveness_score: float
    most_used_hook_type: HookType
    most_used_platform: Platform
    common_pain_points: List[str]
    common_emotional_triggers: List[str]
    top_vulnerability_gap: str

class AdAnalysisResponse(CamelModel):
    brand_id: str
    competitor_id: str
    analyses: List[AdAnalysisResult]
    aggregate_summary: AdAggregateSummary

# ---------------------------------------------------------------------------
# STEP 4 — CAMPAIGN ADAPTATION & GENERATION
# ---------------------------------------------------------------------------

class UgcStoryboardFrame(CamelModel):
    second: int
    visual_frame: str
    audio_script: str
    text_overlay: Optional[str] = None
    transition_note: Optional[str] = None

class CostSavingsEstimate(CamelModel):
    traditional_agency_cost_usd: float
    ai_generation_cost_usd: float
    savings_usd: float
    savings_percent: float
    time_to_market_days: int

class ProjectedMetrics(CamelModel):
    estimated_ctr: float
    estimated_conversion_rate: float
    estimated_roas: float
    confidence_level: Literal["low", "medium", "high"]

class GeneratedCampaign(CamelModel):
    id: str
    brand_id: str
    angle_used: StrategyAngle
    headline: str
    primary_text: str
    cta: str
    visual_concept_brief: str
    ugc_storyboard: List[UgcStoryboardFrame]
    estimated_cost_savings: CostSavingsEstimate
    projected_metrics: ProjectedMetrics
    generated_at: str

class AdaptationStrategy(CamelModel):
    angle_used: StrategyAngle
    source_ad_ids: List[str]
    differentiators: List[str]
    avoid_patterns: List[str]
    tone_guidelines: str

class CampaignGenerationRequest(CamelModel):
    brand_id: str
    competitor_ad_ids: Optional[List[str]] = Field(default_factory=list)
    strategy_angles: Optional[List[StrategyAngle]] = Field(
        default_factory=lambda: ["direct_comparison", "problem_agitation", "social_proof_reviews"]
    )
    custom_instructions: Optional[str] = None
    force_refresh: Optional[bool] = False

class CampaignGenerationResponse(CamelModel):
    brand_id: str
    campaigns: List[GeneratedCampaign]
    adaptation_strategies: List[AdaptationStrategy]
    generated_at: str
