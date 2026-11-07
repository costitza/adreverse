import json
import re
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Header, HTTPException, Request, status
from app.schemas.domain import (
    BrandOnboardingRequest,
    BrandOnboardingResponse,
)
from app.services.brand_service import brand_service
from app.services.db_service import db_service

router = APIRouter(prefix="/brand", tags=["Brand Onboarding"])

@router.get(
    "/user-brands",
    response_model=List[Dict[str, Any]],
    status_code=status.HTTP_200_OK,
    summary="List All Vaults / Brands for User",
)
async def get_user_brands(
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
):
    if not x_user_id:
        return []
    return await db_service.get_brands_by_user(x_user_id)

@router.get(
    "/{brand_id}/vault",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get Complete Brand Vault (Brand, Competitors, Analyses, Campaigns)",
)
async def get_brand_vault(
    brand_id: str,
):
    brand = await db_service.get_brand_profile(brand_id)
    if not brand:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Brand vault not found",
        )
    
    competitors = await db_service.get_competitors_by_brand(brand_id) or []
    analyses = await db_service.get_ad_analyses_by_brand(brand_id) or []
    raw_campaigns = await db_service.get_campaigns_by_brand(brand_id) or []

    mapped_campaigns = []
    for c in raw_campaigns:
        gen = c.get("generated_copy") or {}
        mapped_campaigns.append({
            "id": c.get("id"),
            "brandId": c.get("brand_id"),
            "angleUsed": c.get("strategy_angle") or "direct_comparison",
            "headline": gen.get("headline") or c.get("campaign_name", "Counter-Campaign"),
            "primaryText": gen.get("primaryText", ""),
            "cta": gen.get("cta", "Shop Now →"),
            "visualConceptBrief": gen.get("visualConceptBrief", ""),
            "ugcStoryboard": gen.get("ugcStoryboard", []),
            "estimatedCostSavings": gen.get("estimatedCostSavings", {
                "traditionalAgencyCostUsd": 17500,
                "aiGenerationCostUsd": 250,
                "savingsUsd": 17250,
                "savingsPercent": 98.5,
                "timeToMarketDays": 1,
            }),
            "projectedMetrics": gen.get("projectedMetrics", {
                "estimatedCtr": 3.9,
                "estimatedConversionRate": 2.7,
                "estimatedRoas": 4.5,
                "confidenceLevel": "high",
            }),
            "generatedAt": c.get("created_at"),
        })

    return {
        "brand": brand,
        "competitors": competitors,
        "analyses": analyses,
        "campaigns": mapped_campaigns,
    }

@router.post(
    "/onboard",
    response_model=BrandOnboardingResponse,
    status_code=status.HTTP_200_OK,
    summary="Onboard Brand (Step 1)",
    description="Accepts website URL or brand description, extracts positioning via LLM and saves to Supabase.",
)
async def onboard_brand(
    request: Request,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
    authorization: Optional[str] = Header(None),
):
    try:
        raw_body = await request.body()
        if not raw_body or not raw_body.strip():
            payload = BrandOnboardingRequest()
        else:
            raw_text = raw_body.decode("utf-8", errors="replace")
            # Curăță eventualele caractere invizibile de control din terminal (ASCII < 32, cu excepția spațiului normal)
            cleaned_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', raw_text)
            try:
                data = json.loads(cleaned_text)
            except Exception:
                # Dacă e text brut fără JSON valid, îl tratăm ca brand_description
                data = {"brandDescription": cleaned_text.strip()}
            
            payload = BrandOnboardingRequest.model_validate(data)

        user_id = x_user_id or payload.user_id
        return await brand_service.onboard_brand(payload, user_id_override=user_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to onboard brand: {str(e)}",
        )
