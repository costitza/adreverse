import json
import re
from fastapi import APIRouter, HTTPException, Request, status
from app.schemas.domain import (
    MarketDiscoveryRequest,
    MarketDiscoveryResponse,
)
from app.services.discovery_service import discovery_service

router = APIRouter(tags=["Market & Competitor Discovery"])

async def _parse_discovery_payload(request: Request) -> MarketDiscoveryRequest:
    raw_body = await request.body()
    if not raw_body or not raw_body.strip():
        return MarketDiscoveryRequest()
    raw_text = raw_body.decode("utf-8", errors="replace")
    cleaned_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', raw_text)
    try:
        data = json.loads(cleaned_text)
    except Exception:
        data = {"niche": cleaned_text.strip()}
    return MarketDiscoveryRequest.model_validate(data)

@router.post(
    "/discovery",
    response_model=MarketDiscoveryResponse,
    status_code=status.HTTP_200_OK,
    summary="Discover Competitors (Step 2 - POST /api/discovery)",
    description="Finds top direct competitors and calculates market saturation and opportunity gaps.",
)
async def discover_competitors(request: Request):
    try:
        payload = await _parse_discovery_payload(request)
        return await discovery_service.discover_competitors(payload)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to discover competitors: {str(e)}",
        )

@router.post(
    "/discovery/run",
    response_model=MarketDiscoveryResponse,
    status_code=status.HTTP_200_OK,
    summary="Discover Competitors Run (Step 2 - POST /api/discovery/run)",
    description="Alias matching /api/discovery/run as defined in shared types.",
)
async def run_discovery(request: Request):
    try:
        payload = await _parse_discovery_payload(request)
        return await discovery_service.discover_competitors(payload)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to discover competitors: {str(e)}",
        )
