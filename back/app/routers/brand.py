import json
import re
from typing import Optional
from fastapi import APIRouter, Header, HTTPException, Request, status
from app.schemas.domain import (
    BrandOnboardingRequest,
    BrandOnboardingResponse,
)
from app.services.brand_service import brand_service

router = APIRouter(prefix="/brand", tags=["Brand Onboarding"])

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
