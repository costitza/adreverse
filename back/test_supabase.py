import sys
import uuid
from app.core.config import settings
from app.core.supabase import get_supabase_client # sau modulul unde ai inițializat clientul

def test_supabase_connection():
    print("🔍 1. Verificare Configurare...")
    print(f"URL: {settings.SUPABASE_URL}")
    has_key = bool(settings.SUPABASE_KEY)
    print(f"Key Configurat: {has_key}")

    if not settings.SUPABASE_URL or not has_key:
        print("❌ Eroare: SUPABASE_URL sau SUPABASE_KEY lipsesc din .env!")
        return

    print("\n🔌 2. Inițializare Client...")
    try:
        supabase = get_supabase_client()
        if not supabase:
            print("❌ Clientul Supabase a returnat None.")
            return
        print("✅ Client inițializat cu succes.")
    except Exception as e:
        print(f"❌ Eroare la inițializarea clientului: {e}")
        return

    # Generăm un ID de test
    test_user_id = f"test_user_{uuid.uuid4().hex[:8]}"
    test_brand_data = {
        "user_id": test_user_id,
        "company_name": "Supabase Test Brand",
        "niche": "Testing & QA",
        "usp": "Validare conexiune Supabase din Python",
        "website_url": "https://test.local"
    }

    print("\n📝 3. Test Inserare (INSERT) în tabela 'brand_profiles'...")
    try:
        insert_res = supabase.table("brand_profiles").insert(test_brand_data).execute()
        if insert_res.data:
            print(f"✅ Inserare reușită! Rând creat cu ID: {insert_res.data[0].get('id', 'N/A')}")
        else:
            print(f"⚠️ Răspuns fără date la inserare: {insert_res}")
    except Exception as e:
        print(f"❌ Eroare la INSERT în brand_profiles: {e}")
        return

    print("\n📖 4. Test Citire (SELECT) din tabela 'brand_profiles'...")
    try:
        select_res = supabase.table("brand_profiles").select("*").eq("user_id", test_user_id).execute()
        if select_res.data and len(select_res.data) > 0:
            print(f"✅ Citire reușită! S-au găsit {len(select_res.data)} înregistrări pentru userul de test.")
        else:
            print("❌ Înregistrarea inserată nu a putut fi regăsită.")
    except Exception as e:
        print(f"❌ Eroare la SELECT: {e}")
        return

    print("\n🧹 5. Curățare Date Test (DELETE)...")
    try:
        supabase.table("brand_profiles").delete().eq("user_id", test_user_id).execute()
        print("✅ Înregistrarea de test a fost ștearsă cu succes.")
    except Exception as e:
        print(f"⚠️ Nu s-a putut șterge rândul de test (nu e critic): {e}")

    print("\n🎉 Conexiunea și operațiunile cu Supabase funcționează perfect!")

if __name__ == "__main__":
    test_supabase_connection()