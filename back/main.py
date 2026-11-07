# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.brand import router as brand_router
from app.routers.discovery import router as discovery_router
from app.routers.ads import router as ads_router
from app.routers.campaigns import router as campaigns_router

app = FastAPI(
    title="AdGenesis / AdReverse API",
    version="1.0.0",
    description="AI Ad Reverse-Engineering & Competitor Intelligence Platform API",
)

# CORS configuration for Frontend interoperability
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers with /api prefix
app.include_router(brand_router, prefix="/api")
app.include_router(discovery_router, prefix="/api")
app.include_router(ads_router, prefix="/api")
app.include_router(campaigns_router, prefix="/api")

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": "AdReverse Backend",
        "workflows": [
            "Step 1: Brand Onboarding",
            "Step 2: Market Discovery",
            "Step 3: Ad Scraping & Reverse Engineering",
            "Step 4: Campaign Adaptation & Generation",
        ],
    }
