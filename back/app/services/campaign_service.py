import uuid
import json
import re
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any

from app.core.mock_data import MOCK_GENERATED_CAMPAIGNS
from app.schemas.domain import (
    CampaignGenerationRequest,
    CampaignGenerationResponse,
    GeneratedCampaign,
    AdaptationStrategy,
    StrategyAngle,
    CostSavingsEstimate,
    ProjectedMetrics,
    UgcStoryboardFrame,
)
from app.services.db_service import db_service
from app.services.ai_service import get_llm

class CampaignService:
    @staticmethod
    async def generate_campaigns(payload: CampaignGenerationRequest, user_id: Optional[str] = None) -> CampaignGenerationResponse:
        """
        Step 4: Campaign Adaptation & Generation.
        - Loads Brand Profile & competitor ad breakdowns.
        - Generates superior counter-campaigns for requested strategy angles:
          * direct_comparison
          * problem_agitation
          * social_proof_reviews
        - Produces UGC storyboard, visual briefs, cost savings, and metrics.
        - Saves to Supabase `ad_campaigns` table.
        - Falls back gracefully to resilient mock campaigns on limits.
        """
        brand_id = payload.brand_id
        now_iso = datetime.now(timezone.utc).isoformat()
        requested_angles: List[StrategyAngle] = payload.strategy_angles or [
            "direct_comparison",
            "problem_agitation",
            "social_proof_reviews",
        ]

        # 1. Fetch Brand Profile context from Supabase
        brand_data = await db_service.get_brand_profile(brand_id)
        company_name = brand_data.get("company_name", "Our Brand") if brand_data else "Our Brand"
        niche = brand_data.get("niche", "E-commerce") if brand_data else "E-commerce"
        usp = brand_data.get("usp", "Superior performance & transparent quality") if brand_data else "Superior performance"
        voice = brand_data.get("brand_voice", "inspirational") if brand_data else "inspirational"

        # 2. Fetch competitor ad analyses / vulnerability gaps
        ad_breakdowns_summary = []
        if payload.competitor_ad_ids:
            ads = await db_service.get_ads_by_ids(payload.competitor_ad_ids)
            if ads:
                for a in ads:
                    ad_breakdowns_summary.append(f"- Competitor Ad: {a.get('headline', '')} | Copy: {a.get('ad_copy', '')[:120]}")

        if not ad_breakdowns_summary:
            analyses = await db_service.get_ad_analyses_by_brand(brand_id)
            if analyses:
                for an in analyses[:3]:
                    bd = an.get("breakdown", {})
                    ad_breakdowns_summary.append(f"- Weakness/Gap: {bd.get('vulnerabilityGap', '')} | Hook: {bd.get('hook', '')}")

        context_weaknesses = "\n".join(ad_breakdowns_summary) if ad_breakdowns_summary else "Competitors rely on generic discounts, high prices and zero transparency."

        # 3. Generate Campaigns per angle via Groq LLM
        campaigns: List[GeneratedCampaign] = []
        adaptation_strategies: List[AdaptationStrategy] = []
        llm = get_llm()

        for angle in requested_angles:
            campaign: Optional[GeneratedCampaign] = None

            if llm:
                try:
                    prompt = f"""You are a world-class Direct Response Creative Director.
Create an unstoppable counter-advertising campaign for:
- Brand Name: {company_name}
- Niche: {niche}
- Brand USP: {usp}
- Tone of Voice: {voice}
- Competitor Vulnerabilities to Exploit:
{context_weaknesses}
- Strategy Angle to Use: {angle}
- Custom Instructions: {payload.custom_instructions or 'None'}

Return ONLY a valid JSON object matching this schema:
{{
  "headline": "Punchy high-converting headline",
  "primaryText": "Full primary ad copy text addressing customer pain and highlighting USP",
  "cta": "See the Difference →",
  "visualConceptBrief": "Art director concept brief describing split-screens or visuals",
  "ugcStoryboard": [
    {{"second": 0, "visualFrame": "Description of frame", "audioScript": "Dialogue or voiceover", "textOverlay": "On-screen text", "transitionNote": "quick zoom"}},
    {{"second": 5, "visualFrame": "Description of frame", "audioScript": "Dialogue or voiceover", "textOverlay": "On-screen text", "transitionNote": "cut"}},
    {{"second": 12, "visualFrame": "Description of frame", "audioScript": "Dialogue or voiceover", "textOverlay": "On-screen text", "transitionNote": "none"}},
    {{"second": 22, "visualFrame": "Call to action card", "audioScript": "Final CTA", "textOverlay": "Link in bio", "transitionNote": "fade"}}
  ],
  "estimatedCostSavings": {{
    "traditionalAgencyCostUsd": 17500,
    "aiGenerationCostUsd": 250,
    "savingsUsd": 17250,
    "savingsPercent": 98.5,
    "timeToMarketDays": 1
  }},
  "projectedMetrics": {{
    "estimatedCtr": 3.9,
    "estimatedConversionRate": 2.7,
    "estimatedRoas": 4.5,
    "confidenceLevel": "high"
  }},
  "differentiators": ["Transparent pricing", "Superior materials", "Proven testing"],
  "avoidPatterns": ["Hype without proof", "Hidden subscriptions"],
  "toneGuidelines": "Empowering, direct and transparent"
}}"""
                    res = await llm.ainvoke(prompt)
                    cleaned = re.sub(r'```json|```', '', res.content).strip()
                    parsed = json.loads(cleaned)

                    campaign = GeneratedCampaign(
                        id=str(uuid.uuid4()),
                        brand_id=brand_id,
                        angle_used=angle,
                        headline=parsed.get("headline", f"{company_name} - Upgrade Today"),
                        primary_text=parsed.get("primaryText", ""),
                        cta=parsed.get("cta", "Shop Now →"),
                        visual_concept_brief=parsed.get("visualConceptBrief", ""),
                        ugc_storyboard=[UgcStoryboardFrame.model_validate(f) for f in parsed.get("ugcStoryboard", [])],
                        estimated_cost_savings=CostSavingsEstimate.model_validate(parsed.get("estimatedCostSavings", {})),
                        projected_metrics=ProjectedMetrics.model_validate(parsed.get("projectedMetrics", {})),
                        generated_at=now_iso,
                    )

                    adaptation_strategies.append(
                        AdaptationStrategy(
                            angle_used=angle,
                            source_ad_ids=payload.competitor_ad_ids or [],
                            differentiators=parsed.get("differentiators", [usp]),
                            avoid_patterns=parsed.get("avoidPatterns", ["Vague claims", "Overpriced markups"]),
                            tone_guidelines=parsed.get("toneGuidelines", f"Aligned with {voice} voice"),
                        )
                    )
                except Exception:
                    campaign = None

            # Fallback to realistic mock campaign matching angle
            if not campaign:
                matching_mock = next((c for c in MOCK_GENERATED_CAMPAIGNS if c.angle_used == angle), MOCK_GENERATED_CAMPAIGNS[0])
                campaign = GeneratedCampaign(
                    id=str(uuid.uuid4()),
                    brand_id=brand_id,
                    angle_used=angle,
                    headline=matching_mock.headline.replace("LumaFit", company_name),
                    primary_text=matching_mock.primary_text.replace("LumaFit", company_name),
                    cta=matching_mock.cta,
                    visual_concept_brief=matching_mock.visual_concept_brief.replace("LumaFit", company_name),
                    ugc_storyboard=[
                        UgcStoryboardFrame(
                            second=f.second,
                            visual_frame=f.visual_frame.replace("LumaFit", company_name),
                            audio_script=f.audio_script.replace("LumaFit", company_name),
                            text_overlay=f.text_overlay.replace("LumaFit", company_name) if f.text_overlay else None,
                            transition_note=f.transition_note,
                        )
                        for f in matching_mock.ugc_storyboard
                    ],
                    estimated_cost_savings=matching_mock.estimated_cost_savings,
                    projected_metrics=matching_mock.projected_metrics,
                    generated_at=now_iso,
                )

                adaptation_strategies.append(
                    AdaptationStrategy(
                        angle_used=angle,
                        source_ad_ids=payload.competitor_ad_ids or [],
                        differentiators=[usp, "Fair pricing", "Verified transparency"],
                        avoid_patterns=["Generic discount flooding", "Vague claims"],
                        tone_guidelines=f"Matches {voice} brand tone",
                    )
                )

            campaigns.append(campaign)

        # 4. Save generated campaigns in Supabase `ad_campaigns`
        try:
            await db_service.save_generated_campaigns(campaigns, user_id=user_id)
        except Exception:
            pass

        return CampaignGenerationResponse(
            brand_id=brand_id,
            campaigns=campaigns,
            adaptation_strategies=adaptation_strategies,
            generated_at=now_iso,
        )

campaign_service = CampaignService()
