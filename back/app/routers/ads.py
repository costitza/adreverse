import json
import re
from fastapi import APIRouter, HTTPException, Request, status
from app.schemas.domain import (
    AdAnalysisRequest,
    AdAnalysisResponse,
)
from app.services.ads_service import ads_service

router = APIRouter(prefix="/ads", tags=["Ad Scraping & Reverse Engineering"])

async def _parse_ad_analysis_payload(request: Request) -> AdAnalysisRequest:
    raw_body = await request.body()
    if not raw_body or not raw_body.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request body cannot be empty",
        )
    raw_text = raw_body.decode("utf-8", errors="replace")
    cleaned_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', raw_text)
    data = json.loads(cleaned_text)
    return AdAnalysisRequest.model_validate(data)

@router.post(
    "/analyse",
    response_model=AdAnalysisResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyse Competitor Ads (Step 3)",
    description="Deconstructs competitor ads: hook type, pain point, mechanism, vulnerability gap, and effectiveness score.",
)
async def analyse_ads(request: Request):
    try:
        payload = await _parse_ad_analysis_payload(request)
        return await ads_service.analyse_competitor_ads(payload)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyse competitor ads: {str(e)}",
        )
