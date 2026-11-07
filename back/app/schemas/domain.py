from typing import List, Optional, Literal, Generic, TypeVar
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
    age_range: str = Field(description="e.g. '25-45'")
    genders: List[Literal["male", "female", "all"]]
    interests: List[str]
    pain_points: List[str]
    geographies: List[str]

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
    # For quick onboarding with just URL or free text
    brand_description: Optional[str] = None
    user_id: Optional[str] = None

class BrandOnboardingResponse(CamelModel):
    brand: BrandProfile
    extracted_insights: BrandInsights

# Also alias for request body matching prompt instructions if needed
BrandOnboardRequest = BrandOnboardingRequest
BrandOnboardResponse = BrandOnboardingResponse

# ---------------------------------------------------------------------------
# STEP 2 — MARKET / COMPETITOR DISCOVERY
# ---------------------------------------------------------------------------

class ActiveChannels(CamelModel):
    meta: bool
    tiktok: bool
    instagram: bool
    youtube: Optional[bool] = False
    google: Optional[bool] = False

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
