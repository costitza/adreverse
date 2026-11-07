import uuid
from datetime import datetime, timezone
from typing import Optional

from langchain_core.prompts import ChatPromptTemplate
from app.core.mock_data import MOCK_BRAND_PROFILE, MOCK_BRAND_INSIGHTS
from app.schemas.domain import (
    BrandOnboardingRequest,
    BrandOnboardingResponse,
    BrandProfile,
    BrandInsights,
    TargetAudience,
)
from app.services.scraper_service import scraper_service
from app.services.db_service import db_service
from app.services.ai_service import get_llm, BrandExtractionResult

class BrandService:
    @staticmethod
    async def onboard_brand(
        payload: BrandOnboardingRequest,
        user_id_override: Optional[str] = None,
    ) -> BrandOnboardingResponse:
        """
        Step 1: Onboard Brand.
        - Accepts URL, partial profile, or free-text brand description.
        - Scrapes website content using Jina Reader.
        - Uses LangChain + Groq/Gemini to extract USP, voice, audience, product range, and insights.
        - Saves to Supabase.
        - Employs fallback to mock data on rate limits / failures.
        """
        effective_user_id = (
            user_id_override
            or payload.user_id
            or "user_" + uuid.uuid4().hex[:16]
        )
        now_iso = datetime.now(timezone.utc).isoformat()
        brand_id = f"brand_{uuid.uuid4().hex[:24]}"

        scraped_content = ""
        target_url = payload.website_url or ""
        if target_url:
            scraped_content = await scraper_service.scrape_with_jina(target_url) or ""

        # Prepare context for LLM extraction
        context_parts = []
        if payload.company_name:
            context_parts.append(f"Company Name: {payload.company_name}")
        if payload.niche:
            context_parts.append(f"Niche/Industry: {payload.niche}")
        if payload.website_url:
            context_parts.append(f"Website URL: {payload.website_url}")
        if payload.usp:
            context_parts.append(f"USP: {payload.usp}")
        if payload.product_range:
            context_parts.append(f"Products: {', '.join(payload.product_range)}")
        if payload.brand_voice:
            context_parts.append(f"Brand Voice: {payload.brand_voice}")
        if payload.brand_description:
            context_parts.append(f"Brand Description: {payload.brand_description}")
        if scraped_content:
            context_parts.append(f"Scraped Website Content:\n{scraped_content}")

        context_text = "\n\n".join(context_parts).strip()

        llm = get_llm()
        extraction: Optional[BrandExtractionResult] = None

        if llm and (context_text or target_url or payload.brand_description):
            try:
                structured_llm = llm.with_structured_output(BrandExtractionResult)
                prompt = ChatPromptTemplate.from_messages([
                    (
                        "system",
                        "You are an expert marketing strategist and brand positioning analyst. "
                        "Given the following brand details and scraped web content, deconstruct and synthesize "
                        "the brand's core identity: company name, specific niche, USP, product range, brand voice "
                        "(one of: professional, conversational, inspirational, humorous, authoritative, empathetic), "
                        "target audience (ageRange, genders ['male'|'female'|'all'], interests, painPoints, geographies), "
                        "and supplementary brand insights (primaryValueProposition, toneKeywords, inferredCompetitorNiches, suggestedStrategyAngles)."
                    ),
                    ("human", "Brand Context:\n{context}")
                ])
                chain = prompt | structured_llm
                extraction = await chain.ainvoke({"context": context_text or "Default Direct-To-Consumer brand"})
            except Exception as e:
                extraction = None

        # Fallback or synthesis
        if extraction:
            brand_profile = BrandProfile(
                id=brand_id,
                user_id=effective_user_id,
                company_name=payload.company_name or extraction.company_name,
                niche=payload.niche or extraction.niche,
                website_url=payload.website_url or target_url or "https://example.com",
                usp=payload.usp or extraction.usp,
                product_range=payload.product_range if payload.product_range else extraction.product_range,
                brand_voice=payload.brand_voice or extraction.brand_voice,
                target_audience=payload.target_audience or extraction.target_audience,
                created_at=now_iso,
                updated_at=now_iso,
            )
            insights = BrandInsights(
                primary_value_proposition=extraction.primary_value_proposition,
                tone_keywords=extraction.tone_keywords,
                inferred_competitor_niches=extraction.inferred_competitor_niches,
                suggested_strategy_angles=extraction.suggested_strategy_angles,
            )
        else:
            # Fallback to realistic mock seed with user overrides
            brand_profile = BrandProfile(
                id=brand_id,
                user_id=effective_user_id,
                company_name=payload.company_name or MOCK_BRAND_PROFILE.company_name,
                niche=payload.niche or MOCK_BRAND_PROFILE.niche,
                website_url=payload.website_url or MOCK_BRAND_PROFILE.website_url,
                usp=payload.usp or MOCK_BRAND_PROFILE.usp,
                product_range=payload.product_range if payload.product_range else MOCK_BRAND_PROFILE.product_range,
                brand_voice=payload.brand_voice or MOCK_BRAND_PROFILE.brand_voice,
                target_audience=payload.target_audience or MOCK_BRAND_PROFILE.target_audience,
                created_at=now_iso,
                updated_at=now_iso,
            )
            insights = MOCK_BRAND_INSIGHTS

        # Persist to Supabase asynchronously with safety
        try:
            await db_service.save_brand_profile(brand_profile)
        except Exception:
            pass

        return BrandOnboardingResponse(
            brand=brand_profile,
            extracted_insights=insights,
        )

brand_service = BrandService()
