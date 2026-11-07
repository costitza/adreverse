import uuid
from datetime import datetime, timezone
from typing import List, Optional

from langchain_core.prompts import ChatPromptTemplate
from app.core.mock_data import MOCK_COMPETITORS, MOCK_MARKET_SNAPSHOT
from app.schemas.domain import (
    MarketDiscoveryRequest,
    MarketDiscoveryResponse,
    Competitor,
    ActiveChannels,
    MarketSnapshot,
)
from app.services.scraper_service import scraper_service
from app.services.db_service import db_service
from app.services.ai_service import get_llm, MarketDiscoveryResultLLM

class DiscoveryService:
    @staticmethod
    async def discover_competitors(payload: MarketDiscoveryRequest) -> MarketDiscoveryResponse:
        """
        Step 2: Competitor Discovery.
        - Accepts brand_id or niche or brand_profile.
        - Searches top market competitors using Tavily API.
        - Uses LangChain + Groq/Gemini to extract competitor reach, tier, channels, summary, and market snapshot.
        - Saves to Supabase `competitors` table.
        - Falls back gracefully to intelligent LLM generation or rich mock data.
        """
        now_iso = datetime.now(timezone.utc).isoformat()
        brand_id = payload.brand_id or (payload.brand_profile.id if payload.brand_profile else str(uuid.uuid4()))
        
        niche = payload.niche
        if not niche and payload.brand_profile:
            niche = payload.brand_profile.niche
        if not niche and brand_id:
            # Check if brand profile exists in DB
            db_brand = await db_service.get_brand_profile(brand_id)
            if db_brand:
                niche = db_brand.get("niche")

        if not niche:
            niche = "Activewear and Fitness DTC Brands"

        max_comps = payload.max_competitors or 5

        # 1. Search with Tavily API for top competitor brands in this niche
        tavily_results = await scraper_service.search_with_tavily(
            query=f"top direct to consumer DTC competitor brands in {niche} meta ad campaigns",
            max_results=max_comps,
        )

        tavily_context = ""
        if tavily_results:
            tavily_context = "\n".join([
                f"- Title: {r.get('title', '')} | URL: {r.get('url', '')} | Content: {r.get('content', '')}"
                for r in tavily_results
            ])

        # 2. Invoke LLM for structured competitor intelligence
        llm = get_llm()
        result_llm: Optional[MarketDiscoveryResultLLM] = None

        if llm:
            try:
                structured_llm = llm.with_structured_output(MarketDiscoveryResultLLM)
                prompt = ChatPromptTemplate.from_messages([
                    (
                        "system",
                        "You are an elite competitive intelligence director and performance marketing analyst. "
                        "Analyze the niche and search context to identify the top competitor brands running aggressive ads. "
                        "For each competitor, provide: name, website_url, estimated_reach_score (0-100), market_share_tier "
                        "(dominant, challenger, niche, emerging), active channels (meta, tiktok, instagram, youtube, google), "
                        "a strategic summary of their ad angles, an ad_library_query string, and logo_url if known. "
                        "Also calculate an overall market snapshot: total_active_ads, avg_effectiveness_score, dominant_hook_type, "
                        "top_platform, market_saturation_level, and an opportunity_gap_summary highlighting where our brand can win."
                    ),
                    (
                        "human",
                        "Target Niche: {niche}\n"
                        "Search Findings from Web:\n{tavily_context}\n"
                        "Maximum Competitors: {max_competitors}"
                    ),
                ])
                chain = prompt | structured_llm
                result_llm = await chain.ainvoke({
                    "niche": niche,
                    "tavily_context": tavily_context or "No web search data available, use real-world industry knowledge.",
                    "max_competitors": max_comps,
                })
            except Exception:
                result_llm = None

        competitors: List[Competitor] = []
        market_snapshot: MarketSnapshot

        if result_llm and result_llm.competitors:
            for item in result_llm.competitors[:max_comps]:
                domain = item.website_url.replace("https://", "").replace("http://", "").split("/")[0]
                logo_url = item.logo_url or f"https://logo.clearbit.com/{domain}"
                competitors.append(
                    Competitor(
                        id=str(uuid.uuid4()),
                        brand_id=brand_id,
                        name=item.name,
                        website_url=item.website_url,
                        estimated_reach_score=item.estimated_reach_score,
                        market_share_tier=item.market_share_tier,
                        active_channels=ActiveChannels(
                            meta=item.active_meta,
                            tiktok=item.active_tiktok,
                            instagram=item.active_instagram,
                            youtube=item.active_youtube,
                            google=item.active_google,
                        ),
                        summary=item.summary,
                        ad_library_query=item.ad_library_query,
                        logo_url=logo_url,
                        discovered_at=now_iso,
                    )
                )

            market_snapshot = MarketSnapshot(
                total_active_ads=result_llm.total_active_ads,
                avg_effectiveness_score=result_llm.avg_effectiveness_score,
                dominant_hook_type=result_llm.dominant_hook_type,
                top_platform=result_llm.top_platform,
                market_saturation_level=result_llm.market_saturation_level if result_llm.market_saturation_level in ["low", "medium", "high", "saturated"] else "high",
                opportunity_gap_summary=result_llm.opportunity_gap_summary,
            )
        else:
            # Fallback to rich mock data with current brand_id
            competitors = [
                Competitor(
                    id=str(uuid.uuid4()),
                    brand_id=brand_id,
                    name=c.name,
                    website_url=c.website_url,
                    estimated_reach_score=c.estimated_reach_score,
                    market_share_tier=c.market_share_tier,
                    active_channels=c.active_channels,
                    summary=c.summary,
                    ad_library_query=c.ad_library_query,
                    logo_url=c.logo_url,
                    discovered_at=now_iso,
                )
                for c in MOCK_COMPETITORS[:max_comps]
            ]
            market_snapshot = MOCK_MARKET_SNAPSHOT

        # Persist to Supabase
        try:
            await db_service.save_competitors(competitors)
        except Exception:
            pass

        return MarketDiscoveryResponse(
            brand_id=brand_id,
            competitors=competitors,
            market_snapshot=market_snapshot,
            scraped_at=now_iso,
        )

discovery_service = DiscoveryService()
