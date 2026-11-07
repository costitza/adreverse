import os
from supabase import create_client, Client
from app.core.config import settings

supabase: Client | None = None

if settings.SUPABASE_URL and settings.SUPABASE_KEY:
    try:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Supabase client: {e}")
        supabase = None


def get_supabase_client() -> Client:
    if supabase is None:
        raise RuntimeError("Clientul Supabase nu a fost inițializat. Verifică SUPABASE_URL și SUPABASE_KEY în .env.")
    return supabase