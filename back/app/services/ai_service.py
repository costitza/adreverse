import logging
from typing import Optional, List
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from app.schemas.domain import (
    BrandVoice,
    StrategyAngle,
    TargetAudience,
    MarketShareTier,
    HookType,
    Platform,
)

logger = logging.getLogger(__name__)

class BrandExtractionResult(BaseModel):
    company_name: str = Field(description="Brand or company name")
    niche: str = Field(description="Specific e-commerce/business industry niche")
    usp: str = Field(description="Unique selling proposition, what makes this brand unique")
    product_range: List[str] = Field(description="Core products or product categories offered")
    brand_voice: BrandVoice = Field(
        default="conversational",
        description="Brand voice tone: professional, conversational, inspirational, humorous, authoritative, or empathetic",
    )
    target_audience: TargetAudience = Field(description="Detailed target demographic and psychographics")
    primary_value_proposition: str = Field(description="Main value proposition derived from the brand")
    tone_keywords: List[str] = Field(description="Keywords describing the brand voice")
    inferred_competitor_niches: List[str] = Field(description="Adjacent or direct competitor niche categories")
    suggested_strategy_angles: List[StrategyAngle] = Field(
        description="List of recommended creative angles from direct_comparison, problem_agitation, social_proof_reviews"
    )

class CompetitorItemLLM(BaseModel):
    name: str = Field(description="Name of competitor brand")
    website_url: str = Field(description="Website domain or URL e.g. https://gymshark.com")
    estimated_reach_score: int = Field(description="Score between 0 and 100 indicating market reach/footprint")
    market_share_tier: MarketShareTier = Field(
        description="dominant, challenger, niche, or emerging"
    )
    active_meta: bool = Field(default=True, description="Active on Meta (Facebook)")
    active_tiktok: bool = Field(default=True, description="Active on TikTok")
    active_instagram: bool = Field(default=True, description="Active on Instagram")
    active_youtube: bool = Field(default=False, description="Active on YouTube")
    active_google: bool = Field(default=True, description="Active on Google")
    summary: str = Field(description="2-3 sentence strategic intelligence overview of this competitor and their ad angles")
    ad_library_query: str = Field(description="Search string suitable for Meta Ad Library query")
    logo_url: Optional[str] = Field(default=None, description="Clearbit or official logo URL")

class MarketDiscoveryResultLLM(BaseModel):
    competitors: List[CompetitorItemLLM] = Field(description="Discovered top competitors")
    total_active_ads: int = Field(default=500, description="Estimated total active ads across these competitors")
    avg_effectiveness_score: float = Field(default=75.0, description="Average estimated effectiveness score (0-100)")
    dominant_hook_type: HookType = Field(default="bold_statement", description="Dominant hook type seen in the market")
    top_platform: Platform = Field(default="instagram", description="Top converting platform: facebook, instagram, or tiktok")
    market_saturation_level: str = Field(default="high", description="low, medium, high, or saturated")
    opportunity_gap_summary: str = Field(description="Strategic analysis of where competitors are weak and where user's brand can win")

def get_llm():
    """
    Return active, high-speed LLM with graceful model fallback.
    Uses verified models on Groq ('openai/gpt-oss-120b', 'qwen/qwen3.8-27b')
    with modern non-deprecated parameter syntax (`model` instead of `model_name`).
    """
    # 1. Primary: Groq ultra-speed inference
    if settings.GROQ_API_KEY and settings.GROQ_API_KEY.strip():
        groq_models = [
            "openai/gpt-oss-120b",
            "qwen/qwen3.8-27b",
        ]
        for m in groq_models:
            try:
                return ChatGroq(
                    model=m,
                    api_key=settings.GROQ_API_KEY.strip(),
                    temperature=0.2,
                    timeout=15,
                )
            except Exception:
                continue

    # 2. Secondary fallback: Google Gemini
    gemini_key = settings.GEMINI_API_KEY or settings.GOOGLE_API_KEY
    if gemini_key and gemini_key.strip():
        gemini_models = ["gemini-1.5-flash", "gemini-1.5-pro"]
        for m in gemini_models:
            try:
                return ChatGoogleGenerativeAI(
                    model=m,
                    api_key=gemini_key.strip(),
                    temperature=0.2,
                    timeout=15,
                )
            except Exception:
                continue

    return None
