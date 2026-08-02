from config import supabase

response = (
    supabase
    .table("documents")
    .select("metadata")
    .eq("metadata->>category", "wisata")
    .eq("metadata->>sheet", "wisata-metadata")
    .limit(1)
    .execute()
)

if response.data:
    print("RAW METADATA KEYS (sheet=wisata-metadata):")
    for k, v in response.data[0]["metadata"].items():
        print(f"  {k!r}: {v!r}")
else:
    print("Tidak ada row dengan sheet='wisata-metadata'.")
    print("Cek juga daftar sheet apa saja yang ada untuk category='wisata':")

    resp_all = (
        supabase
        .table("documents")
        .select("metadata")
        .eq("metadata->>category", "wisata")
        .execute()
    )

    sheets_found = set()
    for row in resp_all.data:
        sheets_found.add(row["metadata"].get("sheet"))

    print("Sheets found:", sheets_found)