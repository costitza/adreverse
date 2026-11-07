import os
import uuid
import logging
from typing import List, Dict, Any, Optional
from app.core.supabase import supabase
from app.schemas.domain import (
    BrandProfile,
    Competitor,
    BrandInsights,
    CompetitorAd,
    AdAnalysisResult,
    GeneratedCampaign,
)

logger = logging.getLogger(__name__)

def _ensure_uuid(val: Optional[str]) -> str:
    """Ensure a string is a valid UUID, otherwise generate a deterministic or random UUID."""
    if not val:
        return str(uuid.uuid4())
    try:
        return str(uuid.UUID(val))
    except (ValueError, AttributeError):
        return str(uuid.uuid5(uuid.NAMESPACE_DNS, str(val)))

class DbService:
    # -----------------------------------------------------------------------
    # STEP 1: Brand Profiles
    # -----------------------------------------------------------------------
    @staticmethod
    async def save_brand_profile(
        profile: BrandProfile,
        insights: Optional[BrandInsights] = None,
    ) -> Optional[Dict[str, Any]]:
        """Save or update brand profile in Supabase `brand_profiles` table."""
        if not supabase:
            logger.warning("Supabase client not initialized")
            return None

        brand_uuid = _ensure_uuid(profile.id)
        row_data: Dict[str, Any] = {
            "id": brand_uuid,
            "user_id": profile.user_id or "anonymous",
            "company_name": profile.company_name,
            "website_url": profile.website_url,
            "niche": profile.niche,
            "usp": profile.usp,
            "product_range": profile.product_range or [],
            "brand_voice": profile.brand_voice or "conversational",
            "target_audience": profile.target_audience.model_dump(by_alias=True) if profile.target_audience else {},
        }

        if insights:
            row_data.update({
                "primary_value_proposition": insights.primary_value_proposition,
                "tone_keywords": insights.tone_keywords,
                "inferred_competitor_niches": insights.inferred_competitor_niches,
                "suggested_strategy_angles": insights.suggested_strategy_angles,
            })

        try:
            res = supabase.table("brand_profiles").upsert(row_data).execute()
            if res.data:
                logger.info(f"Saved brand profile {brand_uuid}")
                return res.data[0]
        except Exception as e:
            logger.error(f"Failed to save brand profile to Supabase: {e}")
        return None

    @staticmethod
    async def get_brand_profile(brand_id: str) -> Optional[Dict[str, Any]]:
        if not supabase:
            return None
        brand_uuid = _ensure_uuid(brand_id)
        try:
            res = supabase.table("brand_profiles").select("*").eq("id", brand_uuid).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Could not fetch brand profile {brand_uuid}: {e}")
        return None

    @staticmethod
    async def get_brands_by_user(user_id: str) -> List[Dict[str, Any]]:
        if not supabase or not user_id:
            return []
        try:
            res = (
                supabase.table("brand_profiles")
                .select("*")
                .eq("user_id", user_id)
                .order("created_at", desc=True)
                .execute()
            )
            return res.data or []
        except Exception as e:
            logger.warning(f"Could not fetch brands for user {user_id}: {e}")
            return []

    # -----------------------------------------------------------------------
    # STEP 2: Competitors
    # -----------------------------------------------------------------------
    @staticmethod
    async def get_competitor(competitor_id: str) -> Optional[Dict[str, Any]]:
        if not supabase:
            return None
        comp_uuid = _ensure_uuid(competitor_id)
        try:
            res = supabase.table("competitors").select("*").eq("id", comp_uuid).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Could not fetch competitor {comp_uuid}: {e}")
        return None

    @staticmethod
    async def save_competitors(
        competitors: List[Competitor],
        user_id: Optional[str] = None,
    ) -> Optional[List[Dict[str, Any]]]:
        """Save discovered competitors to Supabase `competitors` table."""
        if not supabase or not competitors:
            return None

        rows = []
        for comp in competitors:
            comp_uuid = _ensure_uuid(comp.id)
            brand_uuid = _ensure_uuid(comp.brand_id)
            
            channels = comp.active_channels
            active_meta = getattr(channels, "meta", True)
            active_tiktok = getattr(channels, "tiktok", True)
            active_instagram = getattr(channels, "instagram", True)
            active_youtube = getattr(channels, "youtube", False) or False
            active_google = getattr(channels, "google", True) or False

            rows.append({
                "id": comp_uuid,
                "user_id": user_id or "anonymous",
                "brand_id": brand_uuid,
                "name": comp.name,
                "website_url": comp.website_url,
                "estimated_reach_score": comp.estimated_reach_score,
                "market_share_tier": comp.market_share_tier,
                "active_meta": active_meta,
                "active_tiktok": active_tiktok,
                "active_instagram": active_instagram,
                "active_youtube": active_youtube,
                "active_google": active_google,
                "summary": comp.summary,
                "ad_library_query": comp.ad_library_query,
                "logo_url": comp.logo_url,
            })

        try:
            res = supabase.table("competitors").upsert(rows).execute()
            logger.info(f"Saved {len(rows)} competitors")
            return res.data
        except Exception as e:
            logger.error(f"Failed to save competitors to Supabase: {e}")
            return None

    @staticmethod
    async def get_competitors_by_brand(brand_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        brand_uuid = _ensure_uuid(brand_id)
        try:
            res = supabase.table("competitors").select("*").eq("brand_id", brand_uuid).execute()
            if res.data:
                return res.data
        except Exception as e:
            logger.warning(f"Could not fetch competitors for brand {brand_uuid}: {e}")
        return None

    # -----------------------------------------------------------------------
    # STEP 3: Competitor Ads & Ad Analyses
    # -----------------------------------------------------------------------
    @staticmethod
    async def save_competitor_ads(ads: List[CompetitorAd]) -> Optional[List[Dict[str, Any]]]:
        if not supabase or not ads:
            return None

        rows = []
        for ad in ads:
            rows.append({
                "ad_id": _ensure_uuid(ad.ad_id),
                "competitor_id": _ensure_uuid(ad.competitor_id),
                "brand_id": _ensure_uuid(ad.brand_id),
                "platform": ad.platform,
                "media_url": ad.media_url,
                "thumbnail_url": ad.thumbnail_url,
                "ad_copy": ad.ad_copy,
                "headline": ad.headline,
                "cta_text": ad.cta_text,
                "days_active": ad.days_active,
                "estimated_impressions": ad.estimated_impressions,
                "target_demographic": ad.target_demographic,
                "landing_page_url": ad.landing_page_url,
            })

        try:
            res = supabase.table("competitor_ads").upsert(rows).execute()
            logger.info(f"Saved {len(rows)} competitor ads")
            return res.data
        except Exception as e:
            logger.error(f"Failed to save competitor ads to Supabase: {e}")
            return None

    @staticmethod
    async def get_competitor_ads(competitor_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        comp_uuid = _ensure_uuid(competitor_id)
        try:
            res = supabase.table("competitor_ads").select("*").eq("competitor_id", comp_uuid).execute()
            if res.data:
                return res.data
        except Exception as e:
            logger.warning(f"Could not fetch competitor ads: {e}")
        return None

    @staticmethod
    async def get_competitor_ads_by_brand(brand_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        brand_uuid = _ensure_uuid(brand_id)
        try:
            res = supabase.table("competitor_ads").select("*").eq("brand_id", brand_uuid).execute()
            if res.data:
                return res.data
        except Exception as e:
            logger.warning(f"Could not fetch competitor ads by brand: {e}")
        return None

    @staticmethod
    async def get_ads_by_ids(ad_ids: List[str]) -> Optional[List[Dict[str, Any]]]:
        if not supabase or not ad_ids:
            return None
        clean_ids = [_ensure_uuid(i) for i in ad_ids]
        try:
            res = supabase.table("competitor_ads").select("*").in_("ad_id", clean_ids).execute()
            if res.data:
                return res.data
        except Exception as e:
            logger.warning(f"Could not fetch ads by ids: {e}")
        return None

    @staticmethod
    async def save_ad_analyses(analyses: List[AdAnalysisResult], brand_id: str, competitor_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase or not analyses:
            return None

        rows = []
        for item in analyses:
            rows.append({
                "id": str(uuid.uuid4()),
                "ad_id": _ensure_uuid(item.ad.ad_id),
                "brand_id": _ensure_uuid(brand_id),
                "competitor_id": _ensure_uuid(competitor_id),
                # Stochează JSON-ul camelCase conform contractului frontend
                "breakdown": item.breakdown.model_dump(by_alias=True),
                "analysed_at": item.analysed_at,
            })

        try:
            res = supabase.table("ad_analyses").upsert(rows).execute()
            logger.info(f"Saved {len(rows)} ad analyses")
            return res.data
        except Exception as e:
            logger.error(f"Failed to save ad analyses to Supabase: {e}")
            return None

    @staticmethod
    async def get_ad_analyses_by_competitor(brand_id: str, competitor_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        brand_uuid = _ensure_uuid(brand_id)
        comp_uuid = _ensure_uuid(competitor_id)
        try:
            res = (
                supabase.table("ad_analyses")
                .select("*, competitor_ads(*)")
                .eq("brand_id", brand_uuid)
                .eq("competitor_id", comp_uuid)
                .execute()
            )
            if res.data:
                return res.data
        except Exception as e:
            logger.warning(f"Could not fetch ad analyses by competitor: {e}")
        return None

    @staticmethod
    async def get_ad_analyses_by_brand(brand_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        brand_uuid = _ensure_uuid(brand_id)
        try:
            res = supabase.table("ad_analyses").select("*").eq("brand_id", brand_uuid).execute()
            if res.data:
                return res.data
        except Exception as e:
            logger.warning(f"Could not fetch ad analyses: {e}")
        return None

    # -----------------------------------------------------------------------
    # STEP 4: Generated Campaigns
    # -----------------------------------------------------------------------
    @staticmethod
    async def save_generated_campaigns(
        campaigns: List[GeneratedCampaign],
        competitor_id: Optional[str] = None,
        user_id: Optional[str] = None,
    ) -> Optional[List[Dict[str, Any]]]:
        if not supabase or not campaigns:
            return None

        rows = []
        for camp in campaigns:
            brand_uuid = _ensure_uuid(camp.brand_id)
            comp_uuid = _ensure_uuid(competitor_id) if competitor_id else None
            rows.append({
                "id": _ensure_uuid(camp.id),
                "user_id": user_id or "anonymous",
                "brand_id": brand_uuid,
                "competitor_id": comp_uuid,
                "campaign_name": camp.headline,
                "strategy_angle": camp.angle_used,
                "hook_type": "bold_statement",
                "target_platform": "meta",
                "generated_copy": {
                    "headline": camp.headline,
                    "primaryText": camp.primary_text,
                    "cta": camp.cta,
                    "visualConceptBrief": camp.visual_concept_brief,
                    "ugcStoryboard": [f.model_dump(by_alias=True) for f in camp.ugc_storyboard],
                    "estimatedCostSavings": camp.estimated_cost_savings.model_dump(by_alias=True),
                    "projectedMetrics": camp.projected_metrics.model_dump(by_alias=True),
                },
                "status": "ready",
            })

        try:
            res = supabase.table("ad_campaigns").upsert(rows).execute()
            logger.info(f"Saved {len(rows)} generated campaigns")
            return res.data
        except Exception as e:
            logger.error(f"Failed to save generated campaigns to Supabase: {e}")
            return None

    @staticmethod
    async def get_campaigns_by_brand(brand_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        brand_uuid = _ensure_uuid(brand_id)
        try:
            res = (
                supabase.table("ad_campaigns")
                .select("*")
                .eq("brand_id", brand_uuid)
                .order("created_at", desc=True)
                .execute()
            )
            return res.data or []
        except Exception as e:
            logger.warning(f"Could not fetch campaigns by brand: {e}")
            return None

db_service = DbService()
