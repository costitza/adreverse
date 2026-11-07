# ROLE: Modular FastAPI & AI Backend Engineer

You operate strictly inside `/backend`.[cite: 1] Write clean, modular, well-structured Python code that follows FastAPI best practices without unnecessary enterprise bloat.[cite: 1]

## 1. TECH STACK & EXTERNAL INTEGRATIONS
- **Framework:** FastAPI, Uvicorn, Pydantic v2, `httpx` (for async external API calls).[cite: 1]
- **AI / LLM (Groq High-Speed Stack):**
  - `langchain-groq` (`ChatGroq`), `langchain-core` (Prompts, Structured Outputs).[cite: 1]
  - **Text & Strategy**: ChatGroq with llama-3.3-70b-versatile (free tier).
  - **Creative Vision**: ChatGoogleGenerativeAI with gemini-1.5-flash (free via Google AI Studio) for ad image/creative deconstruction.
- **Third-Party Data Extraction APIs (Free Tiers + Fallback):**
  - **Jina Reader (`[https://r.jina.ai/](https://r.jina.ai/){url}`):** Free, keyless LLM-friendly web scraper to extract clean markdown from the user's website and competitor landing pages (Step 1).
  - **Tavily Search API:** AI-optimized web search (`tavily-python` or REST) to discover top niche competitors, market reach, and brand positioning (Step 2).
  - **Apify API (Meta Ad Library & TikTok Scrapers):** Fetches active competitor ads, media URLs, copy, and `daysActive` longevity metrics (Step 3).
- **Database & Cache:** Supabase (`supabase-py`) to cache scraped ads, store AI breakdowns, and provide instant database fallbacks during live demos.[cite: 1]
- **Auth Context:** Clerk user context passed from frontend (via headers or request payload).[cite: 1]

## 2. MODULAR DIRECTORY STRUCTURE
Maintain a clean separation of concerns inside `/backend`:[cite: 1]

```text
backend/
├── main.py                 # App initialization, CORS, and router registration ONLY
├── app/
│   ├── core/               # Config, .env settings, and shared clients (Supabase, Groq, Tavily/Apify config)
│   ├── schemas/            # Pydantic v2 models grouped by domain (mirroring /shared/types.ts in camelCase)
│   ├── routers/            # FastAPI APIRouter modules (brand.py, competitors.py, ads.py, campaigns.py)
│   └── services/           # Business logic, scrapers, LangChain pipelines, and Supabase caching
│       ├── scraper_service.py  # Jina Reader, Tavily, and Apify API integrations with DB/Mock fallback
│       ├── ai_service.py       # ChatGroq pipelines (.with_structured_output) for the 4 workflow steps
│       └── db_service.py       # Supabase read/write operations and caching layer
```

## 3. ARCHITECTURAL & CODING STANDARDS
- **Thin Routers, Modular Services:**[cite: 1]
  - `routers/` ONLY handle HTTP routing, request validation, and calling a service function.[cite: 1]
  - `services/` contain all scraping pipelines, LangChain chains, and database operations.[cite: 1]
- **Pragmatic Simplicity (No Bloat):**[cite: 1]
  - Use clean `async def` functions and `httpx.AsyncClient` for external API calls.[cite: 1]
  - Do NOT introduce abstract factory classes, complex DI containers, custom ORMs, or Celery/Redis queues.[cite: 1]
- **LangChain & Groq Best Practices:**[cite: 1]
  - Use `ChatPromptTemplate` and `.with_structured_output(PydanticModel)` to guarantee type-safe JSON responses from Groq.[cite: 1]
  - **Resilience & Graceful Degradation (Critical for Technical Excellence):** Wrap all external calls (Tavily, Apify, Jina, Groq, Supabase) in `try/except` blocks with strict timeouts (e.g., 10-15 seconds).[cite: 1, 3] If an external scraper times out or hits a rate limit, automatically fall back to cached Supabase records or pre-loaded realistic seed data so the API always returns a valid `200 OK` structured response.

## 4. HARD BOUNDARIES
- **READ-ONLY `/shared`:** Read `/shared/types.ts` as the single source of truth for all schemas.[cite: 1] NEVER modify files in `/shared`.[cite: 1]
- **NO FRONTEND ACCESS:** NEVER read or modify files in `/frontend`.[cite: 1]
- **CamelCase Parity:** Ensure Pydantic schemas in `app/schemas/` match the exact `camelCase` field names defined in `/shared/types.ts` (use `alias_generator=to_camel` or explicit camelCase field names).[cite: 1]
