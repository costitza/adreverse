import httpx
from typing import Optional, List, Dict, Any
from app.core.config import settings

class ScraperService:
    @staticmethod
    async def scrape_with_jina(url: str, timeout: float = 12.0) -> Optional[str]:
        """Fetch clean LLM-friendly markdown content via Jina Reader (https://r.jina.ai/{url})."""
        if not url:
            return None
        
        target_url = url if url.startswith(("http://", "https://")) else f"https://{url}"
        jina_endpoint = f"https://r.jina.ai/{target_url}"
        headers = {
            "Accept": "text/plain",
            "User-Agent": "AdReverseBot/1.0",
        }

        try:
            async with httpx.AsyncClient(timeout=timeout, follow_redirects=True) as client:
                response = await client.get(jina_endpoint, headers=headers)
                if response.status_code == 200 and response.text:
                    # Limit content to first ~12,000 characters to keep prompt fast and within token limits
                    return response.text[:12000]
        except Exception:
            pass
        return None

    @staticmethod
    async def search_with_tavily(query: str, max_results: int = 5, timeout: float = 10.0) -> Optional[List[Dict[str, Any]]]:
        """Search relevant competitor information using Tavily Search API with fallback."""
        if not settings.TAVILY_API_KEY:
            return None

        try:
            # tavily-python is synchronous or we can use REST API with httpx for pure async
            async with httpx.AsyncClient(timeout=timeout) as client:
                payload = {
                    "api_key": settings.TAVILY_API_KEY,
                    "query": query,
                    "search_depth": "basic",
                    "include_answer": True,
                    "max_results": max_results,
                }
                res = await client.post("https://api.tavily.com/search", json=payload)
                if res.status_code == 200:
                    data = res.json()
                    return data.get("results", [])
        except Exception:
            pass
        return None

scraper_service = ScraperService()
