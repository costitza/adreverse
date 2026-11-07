import json
import re
from typing import Optional
from fastapi import APIRouter, HTTPException, Request, Header, status
from app.schemas.domain import (
    CampaignGenerationRequest,
    CampaignGenerationResponse,
)
from app.services.campaign_service import campaign_service

router = APIRouter(prefix="/campaign", tags=["Campaign Adaptation & Generation"])

async def _parse_campaign_payload(request: Request) -> CampaignGenerationRequest:
    raw_body = await request.body()
    if not raw_body or not raw_body.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request body cannot be empty",
        )
    raw_text = raw_body.decode("utf-8", errors="replace")
    cleaned_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', raw_text)
    data = json.loads(cleaned_text)
    return CampaignGenerationRequest.model_validate(data)

@router.post(
    "/generate",
    response_model=CampaignGenerationResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate Counter-Campaigns (Step 4)",
    description="Generates high-converting campaigns adapted across strategic angles (direct comparison, problem agitation, social proof).",
)
async def generate_campaign(
    request: Request,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
):
    try:
        payload = await _parse_campaign_payload(request)
        return await campaign_service.generate_campaigns(payload, user_id=x_user_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate campaigns: {str(e)}",
        )
