import json
from fastapi.testclient import TestClient
import main
from app.core.supabase import supabase

client = TestClient(main.app)

print("=" * 70)
print("TEST COMPLET WORKFLOW PENTRU BRANDUL: Skullcandy (Casti & Audio)")
print("=" * 70)

# PASUL 1: Brand Onboarding
print("\n>>> PASUL 1: ONBOARDING BRAND Skullcandy...")
res1 = client.post("/api/brand/onboard", json={
    "companyName": "Skullcandy",
    "niche": "Wireless Headphones, Earbuds & Audio Gear",
    "websiteUrl": "https://skullcandy.com",
    "usp": "Vibrant, bass-heavy audio gear designed for board sports and youth culture"
})
assert res1.status_code == 200, f"Pasul 1 a esuat: {res1.text}"
data1 = res1.json()
brand = data1["brand"]
brand_id = brand["id"]
print("✓ Brand ID generat:", brand_id)
print("✓ Companie:", brand["companyName"])
print("✓ Nisa detectata:", brand["niche"])
print("✓ USP extras:", brand["usp"])
print("✓ Brand Voice:", brand["brandVoice"])
print("✓ Produse extrase:", brand["productRange"][:3])
print("✓ Public tinta (varsta):", brand["targetAudience"]["ageRange"])
print("✓ Unghiuri sugerate de AI:", data1["extractedInsights"]["suggestedStrategyAngles"])

# PASUL 2: Competitor Discovery
print("\n>>> PASUL 2: COMPETITOR DISCOVERY...")
res2 = client.post("/api/discovery", json={
    "brandId": brand_id,
    "niche": "wireless headphones and earbuds audio consumer electronics",
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
    summary = c["summary"][:120]
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
    ad_copy = a["ad"]["adCopy"][:80]
    hook = a["breakdown"]["hook"]
    htype = a["breakdown"]["hookType"]
    pain = a["breakdown"]["painPoint"]
    vuln = a["breakdown"]["vulnerabilityGap"]
    score = a["breakdown"]["effectivenessScore"]
    print(f"   [Ad {idx+1}]")
    print(f"    Ad Text: {ad_copy}...")
    print(f"    Hook AI: {hook}")
    print(f"    Hook Type: {htype}")
    print(f"    Pain Point: {pain}")
    print(f"    Vulnerability Gap: {vuln}")
    print(f"    Scor Eficacitate: {score}/100")

source_ad_ids = [a["ad"]["adId"] for a in analyses]

# PASUL 4: Campaign Generation
print("\n>>> PASUL 4: GENERARE CAMPANII CONTRAR-ATAC PENTRU Skullcandy...")
res4 = client.post("/api/campaign/generate", json={
    "brandId": brand_id,
    "competitorAdIds": source_ad_ids,
    "strategyAngles": ["direct_comparison", "problem_agitation"],
    "customInstructions": "Focus on heavy sensory bass, street culture authenticity, and fair pricing vs overpriced sterile audiophile brands."
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
    print(f"   Titlu Reclama: {hl}")
    print(f"   Text Principal: {ptxt}...")
    print(f"   Call To Action: {cta}")
    print(f"   Concept Vizual: {brief}...")
    print(f"   Storyboard UGC Video ({frames_count} cadre):")
    for frame in c["ugcStoryboard"][:2]:
        sec = frame["second"]
        vframe = frame["visualFrame"]
        ascript = frame["audioScript"][:50]
        print(f"     - Secunda {sec}: {vframe} | Audio: {ascript}...")
    print(f"   Economii vs Agentie: {savings_pct}% (${savings_usd})")
    print(f"   ROAS Estimat: {roas}x")

# VERIFICARE PERSISTENTA IN SUPABASE
print("\n>>> VERIFICARE PERSISTENTA IN SUPABASE...")
b_row = supabase.table("brand_profiles").select("id, company_name").eq("id", brand_id).execute()
print(f"✓ Supabase brand_profiles: {len(b_row.data)} rand salvat ({b_row.data[0]['company_name']})")

c_rows = supabase.table("competitors").select("id, name").eq("brand_id", brand_id).execute()
print(f"✓ Supabase competitors: {len(c_rows.data)} randuri salvate")

ad_rows = supabase.table("competitor_ads").select("ad_id").eq("brand_id", brand_id).execute()
print(f"✓ Supabase competitor_ads: {len(ad_rows.data)} randuri salvate")

an_rows = supabase.table("ad_analyses").select("id").eq("brand_id", brand_id).execute()
print(f"✓ Supabase ad_analyses: {len(an_rows.data)} randuri salvate")

camp_rows = supabase.table("ad_campaigns").select("id, campaign_name").eq("brand_id", brand_id).execute()
print(f"✓ Supabase ad_campaigns: {len(camp_rows.data)} randuri salvate")

print("\n" + "=" * 70)
print("REZULTAT: TOT WORKFLOW-UL END-TO-END A REUSIT CU DATE REALE PENTRU SKULLCANDY!")
print("=" * 70)
