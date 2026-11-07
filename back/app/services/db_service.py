from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
import uuid
from app.core.supabase import supabase
from app.schemas.domain import BrandProfile, Competitor

class DbService:
    @staticmethod
    async def save_brand_profile(profile: BrandProfile) -> Optional[Dict[str, Any]]:
        """Save or update brand profile in Supabase `brand_profiles` (or `brands`) table."""
        if not supabase:
            return None
        
        row_data = {
            "id": profile.id,
            "user_id": profile.user_id,
            "company_name": profile.company_name,
            "niche": profile.niche,
            "website_url": profile.website_url,
            "usp": profile.usp,
            "product_range": profile.product_range,
            "brand_voice": profile.brand_voice,
            "target_audience": profile.target_audience.model_dump(by_alias=False),
            "created_at": profile.created_at,
            "updated_at": profile.updated_at,
        }

        # Try `brand_profiles` first, then `brands`
        for table in ["brand_profiles", "brands"]:
            try:
                res = supabase.table(table).upsert(row_data).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                # Table might not exist or schema differs slightly
                continue
        return None

    @staticmethod
    async def get_brand_profile(brand_id: str) -> Optional[Dict[str, Any]]:
        if not supabase:
            return None
        for table in ["brand_profiles", "brands"]:
            try:
                res = supabase.table(table).select("*").eq("id", brand_id).execute()
                if res.data and len(res.data) > 0:
                    return res.data[0]
            except Exception:
                continue
        return None

    @staticmethod
    async def save_competitors(competitors: List[Competitor]) -> Optional[List[Dict[str, Any]]]:
        """Save discovered competitors to Supabase `competitors` table."""
        if not supabase or not competitors:
            return None

        rows = []
        for comp in competitors:
            rows.append({
                "id": comp.id,
                "brand_id": comp.brand_id,
                "name": comp.name,
                "website_url": comp.website_url,
                "estimated_reach_score": comp.estimated_reach_score,
                "market_share_tier": comp.market_share_tier,
                "active_channels": comp.active_channels.model_dump(by_alias=False),
                "summary": comp.summary,
                "ad_library_query": comp.ad_library_query,
                "logo_url": comp.logo_url,
                "discovered_at": comp.discovered_at,
            })

        try:
            res = supabase.table("competitors").upsert(rows).execute()
            return res.data
        except Exception as e:
            return None

    @staticmethod
    async def get_competitors_by_brand(brand_id: str) -> Optional[List[Dict[str, Any]]]:
        if not supabase:
            return None
        try:
            res = supabase.table("competitors").select("*").eq("brand_id", brand_id).execute()
            if res.data:
                return res.data
        except Exception:
            pass
        return None

db_service = DbService()
