import re

from planner import (
    get_destinations,
    get_hotels,
    get_restaurants,
)

# ==========================================================
# PARSE PRICE
# ==========================================================

def parse_price(price):

    if price is None:
        return None

    text = str(price)

    text = (
        text.replace("Rp", "")
            .replace(".", "")
            .replace(",", "")
            .replace(" ", "")
    )

    digits = "".join(c for c in text if c.isdigit())

    if digits == "":
        return None

    return int(digits)


# ==========================================================
# PARSE RATING
# ==========================================================

def parse_rating(rating):

    if rating is None:
        return 0

    try:
        return float(str(rating).replace(",", "."))
    except (ValueError, TypeError):
        return 0


# ==========================================================
# NORMALIZE TEXT
# ==========================================================

def normalize(text):

    if text is None:
        return ""

    text = text.lower()

    # Buang semua karakter selain huruf/angka, TERMASUK spasi,
    # supaya "bulbul" tetap match "Bul-bul" / "Bul bul" / "Bul_Bul".
    text = re.sub(r"[^a-z0-9]", "", text)

    return text


# ==========================================================
# FILTER HOTEL
# ==========================================================

def filter_hotels(hotels, budget, hotel_rating):

    selected = []

    for hotel in hotels:

        rating = parse_rating(
            hotel.get("rating")
        )

        price = parse_price(
            hotel.get("price_from")
        )

        if price is None:
            price = 999999999

        if rating >= hotel_rating and price <= budget:

            hotel["parsed_price"] = price

            selected.append(hotel)

    # Jika kosong, abaikan rating
    if not selected:

        for hotel in hotels:

            price = parse_price(
                hotel.get("price_from")
            )

            if price is None:
                continue

            if price <= budget:

                hotel["parsed_price"] = price

                selected.append(hotel)

    # Jika masih kosong, ambil hotel termurah
    if not selected:

        for hotel in hotels:

            price = parse_price(
                hotel.get("price_from")
            )

            if price is None:
                continue

            hotel["parsed_price"] = price

            selected.append(hotel)

    selected.sort(
        key=lambda x: x["parsed_price"]
    )

    return selected[:5]


# ==========================================================
# FORMAT DESTINATIONS
# ==========================================================

def format_destinations(destinations):

    if not destinations:
        return "No destination data."

    text = ""

    for d in destinations:

        text += f"""
Place : {d.get('place')}
Address : {d.get('address')}
Rating : {d.get('rating')}
Opening Hours : {d.get('service_hour')}

------------------------------------
"""

    return text


# ==========================================================
# FORMAT HOTELS
# ==========================================================

def format_hotels(hotels):

    if not hotels:
        return "No hotel data."

    text = ""

    for h in hotels:

        text += f"""
Hotel : {h.get('place')}
Rating : {h.get('rating')}
Price : {h.get('price_from')}
Address : {h.get('address')}

------------------------------------
"""

    return text


# ==========================================================
# FORMAT RESTAURANTS
# ==========================================================

def format_restaurants(restaurants):

    if not restaurants:
        return "No restaurant data."

    text = ""

    for r in restaurants[:10]:

        text += f"""
Restaurant : {r.get('place')}

------------------------------------
"""

    return text


# ==========================================================
# BUILD TRIP PROMPT
# ==========================================================

def build_trip_prompt(
    destination: str,
    duration: int,
    budget: int,
    hotel_rating: int,
):

    destinations = get_destinations()
    hotels = get_hotels()
    restaurants = get_restaurants()

    print("=" * 60)
    print("DESTINATIONS :", len(destinations))
    print("HOTELS       :", len(hotels))
    print("RESTAURANTS  :", len(restaurants))
    print("=" * 60)

    # ================= DEBUG =================

    print("\n========== USER INPUT ==========")
    print("Destination :", destination)
    print("Duration    :", duration)
    print("Budget      :", budget)
    print("HotelRating :", hotel_rating)
    print("================================\n")

    if destinations:

        print("========== SAMPLE DESTINATION ==========")
        print(destinations[0])
        print("========================================\n")

    else:

        print("Destination list is EMPTY!")

    # ======================================================
    # FILTER DESTINATION
    # ======================================================

    keyword = normalize(destination)

    print("Keyword :", keyword)

    selected_destination = []

    for item in destinations:

        place = normalize(item.get("place"))

        if keyword in place:

            selected_destination.append(item)

    # Hilangkan duplikasi (mis. banyak baris review untuk tempat yang sama)
    unique = {}

    for item in selected_destination:

        unique[item["place"]] = item

    selected_destination = list(unique.values())

    # Fallback: kalau tidak ketemu dari nama tempat, coba cari dari alamat
    if not selected_destination:

        for item in destinations:

            if keyword in normalize(item.get("address")):

                selected_destination.append(item)

        unique = {}

        for item in selected_destination:

            unique[item["place"]] = item

        selected_destination = list(unique.values())

    print("Selected Destination:")
    print(selected_destination)

    # Jika destinasi tidak ditemukan
    if not selected_destination:
        return None

    # ======================================================
    # FILTER HOTEL
    # ======================================================

    selected_hotels = filter_hotels(hotels, budget, hotel_rating)

    # ======================================================
    # BUILD PROMPT
    # ======================================================

    prompt = f"""
You are TOBA INFINITY AI.

Create a {duration}-day travel itinerary.

Use ONLY the information provided below.

Never invent hotels, restaurants, or destinations.

If some information is unavailable, write:
"Data not available."

================================================

DESTINATIONS

{format_destinations(selected_destination)}

================================================

HOTELS

{format_hotels(selected_hotels)}

================================================

RESTAURANTS

{format_restaurants(restaurants)}

================================================

Requirements

1. Make a {duration}-day itinerary.
2. Recommend ONE hotel.
3. Recommend restaurants near the destination.
4. Mention destination highlights.
5. Use markdown.

"""

    return prompt