import json
from fastapi.testclient import TestClient
import main
from app.core.supabase import supabase

client = TestClient(main.app)

print("=" * 75)
print("TEST WORKFLOW NISA BICICLETE: Santa Cruz Bicycles")
print("=" * 75)

# PASUL 1: Brand Onboarding
print("\n>>> PASUL 1: ONBOARDING BRAND Santa Cruz Bicycles (Jina + Groq)...")
res1 = client.post("/api/brand/onboard", json={
    "companyName": "Santa Cruz Bicycles",
    "niche": "High-Performance Mountain Bikes & Gravel Bicycles",
    "websiteUrl": "https://santacruzbicycles.com",
    "usp": "Legendary VPP suspension, lifetime warranty, and premium carbon mountain bikes built for aggressive trail riding"
})
assert res1.status_code == 200, f"Pasul 1 a esuat: {res1.text}"
data1 = res1.json()
brand = data1["brand"]
brand_id = brand["id"]
print("✓ Brand ID:", brand_id)
print("✓ Companie:", brand["companyName"])
print("✓ Nisa detectata:", brand["niche"])
print("✓ USP extras:", brand["usp"])
print("✓ Brand Voice:", brand["brandVoice"])
print("✓ Produse extrase:", brand["productRange"][:3])
print("✓ Public tinta:", brand["targetAudience"]["ageRange"], brand["targetAudience"]["interests"])
print("✓ Unghiuri sugerate:", data1["extractedInsights"]["suggestedStrategyAngles"])

# PASUL 2: Competitor Discovery
print("\n>>> PASUL 2: COMPETITOR DISCOVERY (Tavily + Groq)...")
res2 = client.post("/api/discovery", json={
    "brandId": brand_id,
    "niche": "premium mountain bikes and enduro downhill bicycles DTC brands",
    "maxCompetitors": 2
})
assert res2.status_code == 200, f"Pasul 2 a esuat: {res2.text}"
data2 = res2.json()
competitors = data2["competitors"]
print(f"✓ Competitori descoperiti: {len(competitors)}")
for idx, c in enumerate(competitors):
    name = c["name"]
    url = c["websiteUrl"]
    tier = c["marketShareTier"]
    reach = c["estimatedReachScore"]
    summary = c["summary"][:130]
    print(f"   {idx+1}. {name} ({url}) | Tier: {tier} | Reach: {reach}")
    print(f"      Sumar: {summary}...")
print("✓ Oportunitate in piata (Opportunity Gap):")
print("  ", data2["marketSnapshot"]["opportunityGapSummary"])

target_comp = competitors[0]
comp_id = target_comp["id"]
comp_name = target_comp["name"]

# PASUL 3: Ad Scraping & Reverse Engineering
print(f"\n>>> PASUL 3: AD SCRAPING & REVERSE ENGINEERING pentru {comp_name}...")
res3 = client.post("/api/ads/analyse", json={
    "brandId": brand_id,
    "competitorId": comp_id,
    "forceRefresh": True
})
assert res3.status_code == 200, f"Pasul 3 a esuat: {res3.text}"
data3 = res3.json()
analyses = data3["analyses"]
print(f"✓ Reclame extrase si analizate: {len(analyses)}")
for idx, a in enumerate(analyses):
    ad_copy = a["ad"]["adCopy"][:90]
    hook = a["breakdown"]["hook"]
    htype = a["breakdown"]["hookType"]
    pain = a["breakdown"]["painPoint"]
    vuln = a["breakdown"]["vulnerabilityGap"]
    score = a["breakdown"]["effectivenessScore"]
    print(f"   [Ad {idx+1}]")
    print(f"    Headline: {a['ad']['headline']}")
    print(f"    Text: {ad_copy}...")
    print(f"    Hook AI: {hook}")
    print(f"    Hook Type: {htype}")
    print(f"    Pain Point: {pain}")
    print(f"    Punct Slab (Vulnerability Gap): {vuln}")
    print(f"    Scor Eficacitate: {score}/100")

source_ad_ids = [a["ad"]["adId"] for a in analyses]

# PASUL 4: Campaign Generation
print(f"\n>>> PASUL 4: GENERARE CAMPANII CONTRAR-ATAC PENTRU Santa Cruz Bicycles...")
res4 = client.post("/api/campaign/generate", json={
    "brandId": brand_id,
    "competitorAdIds": source_ad_ids,
    "strategyAngles": ["direct_comparison", "problem_agitation"],
    "customInstructions": "Highlight legendary lifetime frame warranty, indestructible carbon build, and authentic California dirt heritage vs mass-market corporate bike conglomerates."
})
assert res4.status_code == 200, f"Pasul 4 a esuat: {res4.text}"
data4 = res4.json()
campaigns = data4["campaigns"]
print(f"✓ Campanii generate: {len(campaigns)}")
for c in campaigns:
    angle = c["angleUsed"].upper()
    hl = c["headline"]
    ptxt = c["primaryText"][:140]
    cta = c["cta"]
    brief = c["visualConceptBrief"][:120]
    frames_count = len(c["ugcStoryboard"])
    savings_pct = c["estimatedCostSavings"]["savingsPercent"]
    savings_usd = c["estimatedCostSavings"]["savingsUsd"]
    roas = c["projectedMetrics"]["estimatedRoas"]
    print(f"\n   === Unghi: {angle} ===")
    print(f"   Titlu: {hl}")
    print(f"   Text: {ptxt}...")
    print(f"   CTA: {cta}")
    print(f"   Brief Vizual: {brief}...")
    print(f"   Storyboard ({frames_count} cadre):")
    for frame in c["ugcStoryboard"][:2]:
        sec = frame["second"]
        vframe = frame["visualFrame"]
        ascript = frame["audioScript"][:50]
        print(f"     - Sec {sec}: {vframe} | Audio: {ascript}...")
    print(f"   Economii vs Agentie: {savings_pct}% (${savings_usd})")
    print(f"   ROAS: {roas}x")

# VERIFICARE PERSISTENTA IN SUPABASE
print("\n>>> VERIFICARE PERSISTENTA IN SUPABASE PENTRU Santa Cruz...")
b_row = supabase.table("brand_profiles").select("id, company_name").eq("id", brand_id).execute()
print(f"✓ brand_profiles: {len(b_row.data)} rand ({b_row.data[0]['company_name']})")

c_rows = supabase.table("competitors").select("id, name").eq("brand_id", brand_id).execute()
print(f"✓ competitors: {len(c_rows.data)} randuri ({[r['name'] for r in c_rows.data]})")

ad_rows = supabase.table("competitor_ads").select("ad_id, headline").eq("brand_id", brand_id).execute()
print(f"✓ competitor_ads: {len(ad_rows.data)} randuri ({[r['headline'] for r in ad_rows.data]})")

an_rows = supabase.table("ad_analyses").select("id").eq("brand_id", brand_id).execute()
print(f"✓ ad_analyses: {len(an_rows.data)} randuri")

camp_rows = supabase.table("ad_campaigns").select("id, campaign_name").eq("brand_id", brand_id).execute()
print(f"✓ ad_campaigns: {len(camp_rows.data)} randuri ({[r['campaign_name'] for r in camp_rows.data]})")

print("\n" + "=" * 75)
print("REZULTAT FINAL: TESTUL PENTRU SANTA CRUZ BICYCLES A REUSIT 100%!")
print("=" * 75)
