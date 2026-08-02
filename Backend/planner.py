from config import supabase


# ==========================================================
# PARSE CONTENT
# ==========================================================
# 'content' disimpan sebagai teks multi-baris hasil row_to_document()
# di notebook 02, formatnya:
#   Sumber: <sheet_name>
#   <kolom>: <value>
#   <kolom>: <value>
#   ...
# Field asli (address, rating, dst) TIDAK pernah disimpan terpisah
# di 'metadata' saat ingestion, jadi kita parse ulang dari 'content'.

def parse_content(content):

    if not content:
        return {}

    fields = {}

    for line in content.strip().split("\n"):

        if ":" not in line:
            continue

        key, value = line.split(":", 1)

        key = (
            key.strip()
               .lower()
               .replace("-", "_")
               .replace(" ", "_")
        )

        value = value.strip()

        if key == "sumber":
            continue

        fields[key] = value

    return fields


# ==========================================================
# GET WISATA (dari sheet kanonik: wisata-metadata)
# ==========================================================

def get_destinations():

    response = (
        supabase
        .table("documents")
        .select("metadata, content")
        .eq("metadata->>category", "wisata")
        .eq("metadata->>sheet", "wisata-metadata")
        .execute()
    )

    destinations = []

    for row in response.data:

        fields = parse_content(row.get("content"))

        destinations.append({
            "place": fields.get("place_name") or row["metadata"].get("place"),
            "address": fields.get("address"),
            "rating": fields.get("place_rating"),
            "service_hour": fields.get("operational_hour"),
            "entry_fee": fields.get("entry_fee"),
            "place_type": fields.get("place_type"),
            "status": fields.get("status"),
            "description": fields.get("description"),
        })

    return destinations


# ==========================================================
# GET WISATA (NAMA SAJA - untuk autocomplete /destinations)
# ==========================================================

def get_destination_names():

    response = (
        supabase
        .table("documents")
        .select("metadata, content")
        .eq("metadata->>category", "wisata")
        .eq("metadata->>sheet", "wisata-metadata")
        .execute()
    )

    names = set()

    for row in response.data:

        fields = parse_content(row.get("content"))

        place = fields.get("place_name") or row["metadata"].get("place")

        if place:
            names.add(place)

    return sorted(list(names))

# ==========================================================
# GET HOTELS (dari sheet kanonik: hotel-metadata)
# ==========================================================

def get_hotels():

    response = (
        supabase
        .table("documents")
        .select("metadata, content")
        .eq("metadata->>category", "hotel")
        .eq("metadata->>sheet", "hotel-metadata")
        .execute()
    )

    hotels = []

    for row in response.data:

        fields = parse_content(row.get("content"))

        hotels.append({
            "place": fields.get("place_name") or row["metadata"].get("place"),
            "address": fields.get("address"),
            "rating": fields.get("place_rating"),
            "price_from": fields.get("price_per_head"),
            "check_in": fields.get("check_in"),
            "check_out": fields.get("check_out"),
            "facilities": fields.get("fasilitas"),
            "recommend_menu": fields.get("recommend_menu"),
            "status": fields.get("status"),
        })

    return hotels


# ==========================================================
# GET RESTAURANTS (dari sheet kanonik: resto-metadata)
# ==========================================================

def get_restaurants():

    response = (
        supabase
        .table("documents")
        .select("metadata, content")
        .eq("metadata->>category", "resto")
        .eq("metadata->>sheet", "resto-metadata")
        .execute()
    )

    restaurants = []

    for row in response.data:

        fields = parse_content(row.get("content"))

        restaurants.append({
            "place": fields.get("place_name") or row["metadata"].get("place"),
            "address": fields.get("address"),
            "rating": fields.get("place_rating"),
            "price_from": fields.get("price_per_head"),
            "opening_hours": fields.get("opening-hours"),
            "facilities": fields.get("fasilitas"),
            "recommend_menu": fields.get("recommend_menu"),
            "status": fields.get("status"),
        })

    return restaurants
