import React, { useMemo, useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Coffee,
  Flame,
  Fish,
  Soup,
  Cake,
  UtensilsCrossed,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  Clock,
  Wifi,
  Car,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

type Category = "coffee" | "grill" | "seafood" | "noodle" | "sweet" | "general";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  tags: string[];
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  category: Category;
  image: string;
}

// Data dasar (tanpa image)
const BASE_RESTAURANTS = [
  {"id": "happy-noodle-restaurant", "name": "\"Happy\" Noodle Restaurant", "address": "Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara", "tags": ["Mie Goreng", "Kwetiau Goreng", "Nasi Goreng Babi", "Bakmi Kuah"], "priceMin": 25000, "priceMax": 50000, "rating": 4.5, "category": "noodle"},
  {"id": "3j-lamongan-cafe-n-resto", "name": "3J Lamongan Cafe n Resto", "address": "Pardomuan I, Kec. Pangururan, Kabupaten Samosir", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "coffee"},
  {"id": "alyssa-restaurant-pizza", "name": "Alyssa Restaurant Pizza", "address": "Tuktuk Siadong, Simanindo, Kabupaten Samosir", "tags": ["Pizza Andaliman", "Grilled Fish", "Ikan Bakar", "Gado Gado Vege"], "priceMin": 50000, "priceMax": 75000, "rating": 4.4, "category": "grill"},
  {"id": "alza-cemilan-korean-street-food-grill", "name": "ALZA CEMILAN KOREAN STREET FOOD GRILL", "address": "Terminal Onan Baru, Pardomuan I, Kec. Pangururan, Samosir", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 5.0, "category": "grill"},
  {"id": "amora-cafe", "name": "Amora Cafe", "address": "Parsuratan, Kec. Balige, Toba, Sumatera Utara", "tags": [], "priceMin": null, "priceMax": null, "rating": 3.8, "category": "coffee"},
  {"id": "andrian-rumah-makan-nasional", "name": "Andrian Rumah Makan Nasional", "address": "Tuktuk Siadong, Simanindo, Kabupaten Samosir", "tags": ["Seafood Nasi Goreng", "Nila Asam Manis", "Kopi Susu", "Ikan Saus Tauco"], "priceMin": 25000, "priceMax": 50000, "rating": 4.4, "category": "coffee"},
  {"id": "artomoro-lamongan", "name": "Artomoro Lamongan", "address": "Dosroha, Simanindo, Kabupaten Samosir", "tags": ["Bakso", "Seafood", "Mie Ayam"], "priceMin": 1000, "priceMax": 25000, "rating": 4.0, "category": "seafood"},
  {"id": "bakso-dorela", "name": "Bakso Dorela", "address": "Lumban Dolok Haume Bange, Kec. Balige, Toba", "tags": ["Bakso", "Misop", "Mie Ayam", "Mie Babi"], "priceMin": null, "priceMax": null, "rating": 4.6, "category": "noodle"},
  {"id": "bakso-mas-pandu-wong-solo", "name": "Bakso Mas Pandu \"Wong Solo\"", "address": "Sangkar Nihuta, Kec. Balige, Toba", "tags": ["Mie ayam bakso", "Halal"], "priceMin": null, "priceMax": null, "rating": 4.5, "category": "noodle"},
  {"id": "bakso-pak-radit-khas-malang", "name": "Bakso Pak Radit (Khas Malang)", "address": "Pardede Onan, Kec. Balige, Toba", "tags": ["Bakso Kosong", "Mie Ayam"], "priceMin": null, "priceMax": null, "rating": 3.6, "category": "noodle"},
  {"id": "balige-seafood", "name": "Balige Seafood", "address": "Jl. P. Siantar No.2, Kec. Balige, Toba", "tags": ["Cumi Goreng Tepung", "Ikan Kembung Tauco", "Seafood Kombinasi", "Kakap Panggang"], "priceMin": 50000, "priceMax": 75000, "rating": 4.1, "category": "grill"},
  {"id": "betesda-cafe-balige", "name": "Betesda Cafe Balige", "address": "Danau Toba, Sibola Hotangsas, Balige, Toba", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.3, "category": "coffee"},
  {"id": "betty-bites-balige", "name": "Betty Bites Balige", "address": "Jl. P. Siantar KM-2, Tampubolon, Balige", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.0, "category": "general"},
  {"id": "biwa-cafe-resto", "name": "Biwa Cafe & Resto", "address": "Jl. Parapat, Sibaganding, Simalungun", "tags": ["Ikan", "Jus Jeruk", "Ayam Bakar", "Coffee Milk"], "priceMin": 25000, "priceMax": 50000, "rating": 4.3, "category": "coffee"},
  {"id": "bmw-coffee", "name": "BMW Coffee", "address": "Balige II, Kec. Balige, Toba", "tags": ["Kerang Rebus", "Taro Smoothie", "Matcha Latte", "Red Velvet"], "priceMin": null, "priceMax": null, "rating": 5.0, "category": "coffee"},
  {"id": "bona-panatapan-cafe", "name": "Bona Panatapan Cafe", "address": "Siogung-Ogung, Kec. Pangururan, Samosir", "tags": ["Nasi Goreng"], "priceMin": 15000, "priceMax": 30000, "rating": 4.8, "category": "coffee"},
  {"id": "bpk-babi-panggang-karo-sembiring", "name": "BPK (Babi Panggang Karo) Sembiring", "address": "Ps. Pangururan, Kec. Pangururan, Samosir", "tags": ["Babi Panggang Karo"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "grill"},
  {"id": "bpk-karona", "name": "BPK Karona", "address": "Jl. Sisingamangaraja, Balige I, Toba", "tags": ["Babi Panggang Karo"], "priceMin": 25000, "priceMax": 50000, "rating": 4.3, "category": "grill"},
  {"id": "bpk-panca-jaya", "name": "BPK Panca Jaya", "address": "Jl. By Pass Balige, Balige III, Toba", "tags": ["Babi Panggang Karo", "Saksang", "Ikan Mas Arsik", "Ikan Jahir Panggang"], "priceMin": 25000, "priceMax": 50000, "rating": 4.8, "category": "grill"},
  {"id": "bpk-tambar-lihe-clarissa-gurusinga", "name": "BPK Tambar Lihe Clarissa Gurusinga", "address": "Jl. D.I. Panjaitan, Marsangap, Kec. Silaen, Toba", "tags": ["Babi Panggang Karo"], "priceMin": 25000, "priceMax": 25000, "rating": 4.8, "category": "grill"},
  {"id": "bpk-torang-dan-ikan-bakar", "name": "BPK Torang dan Ikan Bakar", "address": "Garoga, Tuktuk Siadong, Samosir", "tags": ["Saksang Tanpa Gota Darah", "Saksang Namargota Darah", "Dali ni Horbo"], "priceMin": 25000, "priceMax": 50000, "rating": 4.8, "category": "grill"},
  {"id": "cantik-daijo-cafe", "name": "Cantik Daijo Cafe", "address": "Jl. Sisingamangaraja, Aruan, Kec. Laguboti, Toba", "tags": ["Vanila Milk Shake", "Dimsum Udang", "Kopi Americano", "Nasi Goreng Spesial"], "priceMin": 25000, "priceMax": 50000, "rating": 4.4, "category": "coffee"},
  {"id": "chinese-food-gemar", "name": "Chinese Food Gemar", "address": "Jl. Lintas Sumatera No.57a, Kec. Balige, Toba", "tags": ["Mie Goreng Seafood", "Mie Pangsit Babi", "Capcai", "Nasi Goreng Babi"], "priceMin": 25000, "priceMax": 50000, "rating": 4.0, "category": "seafood"},
  {"id": "d-barans-cafe", "name": "D'barans Cafe", "address": "Jl. Gereja, Kec. Balige, Toba", "tags": ["Nasi Ayam Tofu Seafood", "Nasi Lele", "Nasi Cumi Saos Pedas", "Nasi Goreng"], "priceMin": 25000, "priceMax": 50000, "rating": 4.0, "category": "coffee"},
  {"id": "d-view-cafe-and-resto", "name": "D'view Cafe and Resto", "address": "Jl. Raya Tomok No.12, Garoga, Simanindo, Samosir", "tags": ["Ayam Goreng", "Mie Tek Tek", "Affogato", "Fish N Fries"], "priceMin": 25000, "priceMax": 50000, "rating": 4.6, "category": "coffee"},
  {"id": "damar-toba-lakeside-eatery-stay", "name": "Damar Toba ~ Lakeside Eatery & Stay", "address": "Jl. Pemandian No.94, Kec. Balige, Toba", "tags": ["Mie Gomak", "Sate", "Kopi Latte", "Ikan Naniura"], "priceMin": 30000, "priceMax": 700000, "rating": 4.8, "category": "coffee"},
  {"id": "damasus-nataboan-resto", "name": "Damasus Nataboan Resto", "address": "Sibaganding, Kabupaten Simalungun", "tags": ["Nila Tauco", "Lobster Saus Tiram", "Ikan Nila Bakar", "Nila Arsik"], "priceMin": 25000, "priceMax": 50000, "rating": 3.9, "category": "grill"},
  {"id": "diva-putri-minang", "name": "Diva Putri Minang", "address": "Lumban Pea, Kec. Balige, Toba", "tags": [], "priceMin": null, "priceMax": null, "rating": 4.0, "category": "general"},
  {"id": "driving-range-restaurant", "name": "Driving Range Restaurant", "address": "Lake Toba, North Sumatra", "tags": [], "priceMin": null, "priceMax": null, "rating": 4.3, "category": "general"},
  {"id": "dunia-bubur", "name": "Dunia Bubur", "address": "Jl. Gereja, Balige II, Kec. Balige, Toba", "tags": [], "priceMin": 25000, "priceMax": 25000, "rating": 4.3, "category": "sweet"},
  {"id": "elios-rumah-makan-khas-batak", "name": "Elios - Rumah Makan Khas Batak", "address": "Tuktuk Siadong, Simanindo, Samosir", "tags": ["Babi Panggang", "Ayam Kampung", "Babi Guling", "Lobster Panggang"], "priceMin": 25000, "priceMax": 50000, "rating": 3.7, "category": "grill"},
  {"id": "family-resto", "name": "Family Resto", "address": "Jl. Lintas Sumatera No.57a, Kec. Balige, Toba", "tags": ["Nasi Goreng Ayam"], "priceMin": 25000, "priceMax": 50000, "rating": 4.2, "category": "general"},
  {"id": "family-resto-samosir", "name": "Family Resto Samosir", "address": "Jl. Gereja, Sait Nihuta, Kec. Pangururan, Samosir", "tags": ["Nasi Goreng Ayam"], "priceMin": 25000, "priceMax": 50000, "rating": 4.8, "category": "general"},
  {"id": "gotil-f-b", "name": "GotiL F&B", "address": "Jl. Patuan Anggi No.28, Kec. Balige, Toba", "tags": ["Bebek Gotil", "Ayam Gotil", "Dimsum Soup", "Soup Ayam"], "priceMin": 25000, "priceMax": 50000, "rating": 4.6, "category": "general"},
  {"id": "hidangan-muslim-rm-charissa", "name": "Hidangan Muslim RM Charissa", "address": "Kaldera, Pardamean Sibisa, Kec. Ajibata, Toba", "tags": ["Napinadar", "Mie Goreng", "Aneka Juice"], "priceMin": 15000, "priceMax": 50000, "rating": 4.1, "category": "noodle"},
  {"id": "horas-vegetarian-restaurant", "name": "Horas Vegetarian Restaurant", "address": "Tuktuk Siadong, Kabupaten Samosir", "tags": ["Soya Sauce Chicken", "Fried Noodles with Tempeh", "Vegan Randang", "Vegetable Curry"], "priceMin": 50000, "priceMax": 75000, "rating": 4.8, "category": "noodle"},
  {"id": "hotel-and-restaurant-singgalang", "name": "Hotel and Restaurant Singgalang", "address": "Jl. Sisingamangaraja No.52, Kabupaten Simalungun", "tags": ["Bandrek", "Sop Perut Ikan", "Nasi Goreng", "Udang Tauco"], "priceMin": null, "priceMax": null, "rating": 4.7, "category": "seafood"},
  {"id": "hutanta-cafe", "name": "Hutanta Cafe", "address": "Jl. P. Siantar KM 2, Sibola Hotangsas, Toba", "tags": ["Kopi Dingin", "Nasi Goreng Ayam", "Sate Udang Pete", "Fish and Chips"], "priceMin": 25000, "priceMax": 50000, "rating": 4.5, "category": "coffee"},
  {"id": "ijabu-coffee-roastery", "name": "Ijabu Coffee & Roastery", "address": "Jl. Raja Paindoan, Kec. Balige, Toba", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 5.0, "category": "coffee"},
  {"id": "istana-pempek-balige", "name": "Istana Pempek Balige", "address": "Jl. Tarutung, Longat, Jalinsum, Toba", "tags": ["Nasi Goreng Seafood", "Nasi Ayam Geprek", "Udang Goreng Tepung", "Pempek Asli Ikan Tenggiri"], "priceMin": 25000, "priceMax": 50000, "rating": 4.7, "category": "seafood"},
  {"id": "jenny-s-restaurant", "name": "Jenny's Restaurant", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Grilled Fish", "BBQ Lake Fish", "Tauco Udang", "Sate Babi"], "priceMin": 75000, "priceMax": 100000, "rating": 4.3, "category": "grill"},
  {"id": "joe-s-restaurant", "name": "Joe's Restaurant", "address": "Kabupaten Samosir", "tags": ["Sira Pege Panggang", "Roasted Pork", "Fish Barbeque", "BBQ Pork Ribs"], "priceMin": 25000, "priceMax": 50000, "rating": 4.7, "category": "grill"},
  {"id": "kafe-pak-pos", "name": "Kafe Pak Pos", "address": "Jl. Sisingamangaraja, Tiga Raja, Simalungun", "tags": ["Ikan Nila Tauco", "Ayam Penyet", "Kari Kambing", "Mujair Sambal Ijo"], "priceMin": 25000, "priceMax": 50000, "rating": 4.5, "category": "coffee"},
  {"id": "kedai-bakmi-bahagia", "name": "Kedai Bakmi \"Bahagia\"", "address": "Jl. Sisingamangaraja No.98, Kec. Balige, Toba", "tags": ["Bakmi China", "Aneka Jus"], "priceMin": 25000, "priceMax": 50000, "rating": 4.2, "category": "noodle"},
  {"id": "kedai-bakmi-bahagia-2", "name": "Kedai Bakmi Bahagia 2", "address": "Jl. Patuan Nagari No.57 A, Kec. Balige, Toba", "tags": ["Mie Kuah"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "noodle"},
  {"id": "kedai-bakmie-kopi-serasi", "name": "Kedai Bakmie & Kopi Serasi", "address": "Jl. Sisingamangaraja No.143, Parapat, Simalungun", "tags": ["Nasi Goreng", "Mie Pangsit", "Pangsit Goreng"], "priceMin": 25000, "priceMax": 50000, "rating": 3.2, "category": "coffee"},
  {"id": "kedai-islam-rahayu", "name": "Kedai Islam \"Rahayu\"", "address": "Jl. Parsoburan, Kec. Habinsaran, Toba", "tags": ["Mushola", "Halal"], "priceMin": 25000, "priceMax": 25000, "rating": 4.5, "category": "general"},
  {"id": "kedai-mie-lily", "name": "Kedai Mie Lily", "address": "Pardede Onan, Kec. Balige, Toba", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 3.7, "category": "noodle"},
  {"id": "la-pinus-damasus-bistro-resto", "name": "La Pinus Damasus Bistro & Resto", "address": "Sipangan Bolon, Kabupaten Simalungun", "tags": ["Lobster Saus Tiram", "Ikan Nila Goreng", "Udang Saos Tiram", "Kopi Susu"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "coffee"},
  {"id": "lapo-barat-restaurant-catering", "name": "Lapo Barat (Restaurant & Catering)", "address": "Ps. Pangururan, Kec. Pangururan, Samosir", "tags": ["Makanan Batak"], "priceMin": 25000, "priceMax": 50000, "rating": 4.2, "category": "general"},
  {"id": "leo-s-restaurant", "name": "Leo's Restaurant", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Ikan Bakar Nila", "Ayam Napinadar", "Lobster Steam", "Lake Toba Lobster"], "priceMin": 50000, "priceMax": 75000, "rating": 4.7, "category": "grill"},
  {"id": "leon-cafe", "name": "Leon Cafe", "address": "Pantai Bul Bul, Sibola Hotangsas, Toba", "tags": ["Nasi Goreng Spesial", "Cumi Asin Pedas"], "priceMin": 25000, "priceMax": 75000, "rating": 4.7, "category": "coffee"},
  {"id": "maruba-restaurant", "name": "Maruba Restaurant", "address": "Tuktuk Siadong, Simanindo, Samosir", "tags": ["Sambal Tuktuk", "Tilapia Fish Curry", "Sangsang", "Babi Panggang"], "priceMin": 50000, "priceMax": 75000, "rating": 4.6, "category": "grill"},
  {"id": "matahari-restaurant-and-homestay", "name": "Matahari Restaurant and Homestay", "address": "Tuktuk Siadong, Simanindo, Samosir", "tags": ["Pork Schnitzel with Bratkartoffeln", "Fried Rice Special", "Pork Sambal", "French Fries & Mixed Salads"], "priceMin": 200000, "priceMax": 200000, "rating": 4.3, "category": "general"},
  {"id": "ola-kisat", "name": "Ola Kisat", "address": "Lumban Pea, Kec. Balige, Toba", "tags": ["Babi Panggang Karo"], "priceMin": null, "priceMax": null, "rating": 4.6, "category": "grill"},
  {"id": "onand-coffee", "name": "Onand Coffee", "address": "Jl. Patuan Nagari No.89, Pardede Onan, Toba", "tags": ["Espresso Susu", "Vietnam Drip", "Sanger", "Ice Mocca"], "priceMin": 25000, "priceMax": 50000, "rating": 4.7, "category": "coffee"},
  {"id": "orari-restaurant", "name": "Orari Restaurant", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Ikan Bakar", "Pizza Andaliman", "Kopi Coklat", "Cumi Goreng"], "priceMin": 20000, "priceMax": 50000, "rating": 3.9, "category": "coffee"},
  {"id": "pagar-batu-resto-penginapan", "name": "Pagar Batu Resto & Penginapan", "address": "Tuuk Sihotang, Kec. Harian, Samosir", "tags": ["Nasi Ayam Penyet", "Chicken Katsu", "Aneka Juice"], "priceMin": 25000, "priceMax": 50000, "rating": 4.2, "category": "general"},
  {"id": "palito-coffee-and-resto", "name": "Palito Coffee and Resto", "address": "Ps. Pangururan, Kec. Pangururan, Samosir", "tags": ["Mie Gomak campur Daging", "Aglio Olio", "Nasi Ayam Bakar Taliwang", "Hot Chocolate"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "coffee"},
  {"id": "point-coffee-balige", "name": "Point Coffee Balige", "address": "Jl. Sisingamangaraja, Balige II, Toba", "tags": ["Kopi Jadul", "Latte", "Affogato Point", "Mochachino"], "priceMin": 25000, "priceMax": 50000, "rating": 4.7, "category": "coffee"},
  {"id": "poncha-clbk", "name": "Poncha CLBK", "address": "Cinta Dame, Simanindo, Kabupaten Samosir", "tags": ["Ketoprak Getir", "Bolu Aneka", "Seblak Kwetiauw", "Bubur Ayam Jakarta"], "priceMin": 1000, "priceMax": 20000, "rating": 4.6, "category": "noodle"},
  {"id": "pondok-azzahra", "name": "Pondok Azzahra", "address": "Jl. Sisingamangaraja, Parapat, Simalungun", "tags": ["Ayam Goreng", "Nasi Goreng", "Indomie", "Nasi Gurih"], "priceMin": 10000, "priceMax": 25000, "rating": 4.3, "category": "noodle"},
  {"id": "pondok-kolding-pangururan", "name": "Pondok Kolding Pangururan", "address": "Jl. Patuan Anggi, Ps. Pangururan, Samosir", "tags": ["Mie Ayam Bakso", "Bakso Bakar", "Kwetiaw Goreng", "Bakso Urat"], "priceMin": 10000, "priceMax": 50000, "rating": 4.1, "category": "grill"},
  {"id": "pondok-makan-home-stay-h-karsim", "name": "Pondok Makan & Home Stay H. Karsim", "address": "Jl. Josep Sinaga No.20, Danau Toba, Simalungun", "tags": ["Ayam Geprek Sambal Andaliman", "Steak Ayam Crispy", "Soto Medan", "Rendang Jengkol"], "priceMin": 25000, "priceMax": 50000, "rating": 5.0, "category": "grill"},
  {"id": "poppy-s-restaurant-guest-house", "name": "Poppy's Restaurant & Guest House", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Pancake with honey", "American breakfast", "filled pancake", "vege omelette"], "priceMin": 25000, "priceMax": 50000, "rating": 4.7, "category": "sweet"},
  {"id": "putra-kembar-coffee-shop-resto", "name": "Putra Kembar Coffee Shop & Resto", "address": "Warkop Panorama I, Sibaganding, Tapanuli Utara", "tags": ["Kopi", "Sop Iga", "Susu Coklat", "Ayam Geprek"], "priceMin": 25000, "priceMax": 50000, "rating": 4.2, "category": "coffee"},
  {"id": "qta-coffee-and-resto", "name": "Qta Coffee and Resto", "address": "Jl. Simbolon Purba, Kec. Pangururan, Samosir", "tags": ["Pisang Barangan", "Bakwan Goreng", "Stick Ubi"], "priceMin": 15000, "priceMax": 30000, "rating": 4.3, "category": "coffee"},
  {"id": "raja-seafood-balige", "name": "Raja Seafood Balige", "address": "Jl. Patuan Nagari, Pardede Onan, Toba", "tags": ["Taoge Ikan Asin", "Sop Bakso Ikan", "Seafood Tumpah"], "priceMin": null, "priceMax": null, "rating": 5.0, "category": "seafood"},
  {"id": "rapindo-cafe-balige", "name": "Rapindo Cafe Balige", "address": "Lumban Silintong, Toba", "tags": ["Indomie kuah atau goreng", "Nasi Goreng"], "priceMin": null, "priceMax": null, "rating": 4.0, "category": "coffee"},
  {"id": "restaurant-asia", "name": "Restaurant Asia", "address": "Jl. Sisingamangaraja No.65, Parapat, Simalungun", "tags": ["Nasi Goreng", "Bistik Babi", "Ikan Nila Asam Manis", "Kopi Hitam"], "priceMin": 50000, "priceMax": 75000, "rating": 4.4, "category": "coffee"},
  {"id": "restaurant-dugul", "name": "Restaurant Dugul", "address": "Desa Siallagan Pinda Raya, Kabupaten Samosir", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.6, "category": "general"},
  {"id": "restaurant-sehat", "name": "Restaurant Sehat", "address": "Jl. Sisingamangaraja No.43, Tiga Raja, Simalungun", "tags": ["Bistik Babi", "Samcan Goreng", "Shrimp Tauco", "Kwetiau Goreng"], "priceMin": 50000, "priceMax": 75000, "rating": 4.0, "category": "noodle"},
  {"id": "resto-family-9-9", "name": "Resto Family 9.9", "address": "Dermaga Pustaha Waterfront City, Pangururan, Samosir", "tags": [], "priceMin": null, "priceMax": null, "rating": 3.0, "category": "general"},
  {"id": "restoran-tabo-toko-roti-dan-sangrai-kopi", "name": "Restoran Tabo Toko Roti dan Sangrai Kopi", "address": "Jl. Lkr. Tuktuk No.115, Tuktuk Siadong, Samosir", "tags": ["Cake", "Fish and Chips", "Marble Cake & Passion Fruit Cake"], "priceMin": 50000, "priceMax": 75000, "rating": 4.4, "category": "coffee"},
  {"id": "rm-bpk-man-kena-bang-gurning", "name": "RM BPK Man Kena (Bang Gurning)", "address": "Sialanguan, Kec. Pangururan, Samosir", "tags": ["Babi Panggang Karo", "Kidu Kidu"], "priceMin": 25000, "priceMax": 50000, "rating": 4.2, "category": "grill"},
  {"id": "rm-gumarang", "name": "RM Gumarang", "address": "Jl. Patuan Nagari No.30, Sangkar Nihuta, Toba", "tags": ["Ikan Arsik", "Masakan Padang"], "priceMin": null, "priceMax": null, "rating": 4.0, "category": "grill"},
  {"id": "rm-islam-nauli", "name": "RM Islam \"Nauli\"", "address": "Jl. Bukit Barisan No.26, Kec. Balige, Toba", "tags": ["Ayam Goreng", "Rendang Kerbau", "Ikan Mujahir Bakar", "Sop Iga Kerbau"], "priceMin": null, "priceMax": null, "rating": 5.0, "category": "grill"},
  {"id": "rm-khas-batak-mata-mual", "name": "RM Khas Batak Mata Mual", "address": "Dolok Tolong, Kec. Balige, Toba", "tags": ["Arsik Ikan Jahir", "Arsik Ikan Mas"], "priceMin": null, "priceMax": null, "rating": 4.0, "category": "grill"},
  {"id": "rm-lapo-jior", "name": "RM Lapo Jior", "address": "Jl. Sisingamangaraja No.47, Sibola Hotangsas, Toba", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.6, "category": "general"},
  {"id": "rm-muslim-menara", "name": "RM Muslim Menara", "address": "Jl. Sisingamangaraja, Parapat, Simalungun", "tags": ["Nasi Goreng", "Kopi"], "priceMin": 25000, "priceMax": 50000, "rating": 5.0, "category": "coffee"},
  {"id": "rm-siaek-mual", "name": "RM Siaek Mual", "address": "Jl. Gereja, Ps. Pangururan, Samosir", "tags": ["Babi Kecap", "Babi Arsik", "Susu Kerbau"], "priceMin": 25000, "priceMax": 75000, "rating": 4.5, "category": "grill"},
  {"id": "rm-gomgom-khas-batak", "name": "RM Gomgom Khas Batak", "address": "Jl. Dr. Sutomo, Sangkar Nihuta, Toba", "tags": ["Babi Panggang", "Sambal Natinombur", "Saksang", "Arsik"], "priceMin": null, "priceMax": null, "rating": 4.9, "category": "grill"},
  {"id": "rm-islam-roda-baru", "name": "RM Islam Roda Baru", "address": "Jl. Patuan Nagari No.9A, Pardede Onan, Toba", "tags": ["Masakan Padang", "Makanan Halal"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "general"},
  {"id": "rm-nasional-sampean-uli", "name": "RM Nasional Sampean Uli", "address": "Sigaol Simbolon, Kec. Palipi, Samosir", "tags": ["Ayam Rias", "Food Fresh Fruit", "Juice Avocado", "Napinadar"], "priceMin": 25000, "priceMax": 50000, "rating": 4.8, "category": "general"},
  {"id": "rm-parapat", "name": "RM Parapat", "address": "Tiga Raja, Kec. Girsang Sipangan Bolon, Simalungun", "tags": ["Makanan China"], "priceMin": 25000, "priceMax": 50000, "rating": 5.0, "category": "general"},
  {"id": "rm-siganupari-ajibata", "name": "RM Siganupari Ajibata", "address": "Jl. Motung Sibisa, Kec. Ajibata, Toba", "tags": ["Panggang Babi", "Saksang", "Sop isi", "Ikan Nila Panggang"], "priceMin": 25000, "priceMax": 50000, "rating": 4.3, "category": "grill"},
  {"id": "rosalie-s-beer-garden-and-restaurant", "name": "Rosalie's Beer Garden and Restaurant", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Gado Gado", "Tahu Goreng Sambal", "Perkedel", "Chicken Curry"], "priceMin": 50000, "priceMax": 75000, "rating": 5.0, "category": "general"},
  {"id": "rujak-agam-balige", "name": "Rujak Agam Balige", "address": "Jl. Patuan Nagari, Kec. Balige, Toba", "tags": ["Aneka Rujak Buah"], "priceMin": null, "priceMax": null, "rating": 3.7, "category": "sweet"},
  {"id": "rumah-dimsum-balige", "name": "Rumah Dimsum Balige", "address": "Jl. Gereja, Sibola Hotangsas, Toba", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.5, "category": "general"},
  {"id": "rumah-makan-pondok-karen", "name": "Rumah Makan \"Pondok Karen\"", "address": "Tiga Raja, Kec. Girsang Sipangan Bolon, Simalungun", "tags": [], "priceMin": 25000, "priceMax": 50000, "rating": 4.0, "category": "general"},
  {"id": "rumah-makan-elizabeth", "name": "Rumah Makan Elizabeth", "address": "Jalan Panatapan, Sipangan Bolon, Simalungun", "tags": ["Kopi Susu", "Kopi Hitam", "Indomie Telur", "Ikan Nila Bakar"], "priceMin": 25000, "priceMax": 50000, "rating": 5.0, "category": "coffee"},
  {"id": "rumah-makan-holong-ni-dainang", "name": "Rumah Makan Holong Ni Dainang", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Grilled Fish", "Fried Tofu and Fried Tempeh", "Bintang Beers", "Iced Tea & Lemon Tea"], "priceMin": 25000, "priceMax": 50000, "rating": 4.7, "category": "grill"},
  {"id": "rumah-makan-islam-mami-tempo", "name": "Rumah Makan Islam Mami Tempo", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Nasi Goreng", "Ayam Penyet", "Soto Ayam", "Ikan Nila Goreng"], "priceMin": 25000, "priceMax": 50000, "rating": 4.3, "category": "seafood"},
  {"id": "rumah-makan-islam-monggo", "name": "Rumah Makan Islam Monggo", "address": "Jl. Lkr. Tuktuk, Tuktuk Siadong, Samosir", "tags": ["Ikan Mujahir", "Ayam Goreng", "Indomie"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "seafood"},
  {"id": "rumah-makan-islam-murni", "name": "Rumah Makan Islam Murni", "address": "Tuktuk Siadong, Simanindo, Samosir", "tags": ["Ayam Goreng", "Gulai Kepala Ikan Nila", "Nasi Putih Rendang Daging"], "priceMin": 25000, "priceMax": 50000, "rating": null, "category": "seafood"},
  {"id": "rumah-makan-islam-murni-tuktuk", "name": "Rumah Makan Islam Murni Tuktuk", "address": "Tuktuk Siadong, Simanindo, Samosir", "tags": ["Ayam Goreng", "Gulai Kepala Ikan Nila", "Daging Rendang"], "priceMin": 25000, "priceMax": 50000, "rating": 4.3, "category": "seafood"},
  {"id": "rumah-makan-khas-batak-lamhot", "name": "Rumah Makan Khas Batak Lamhot", "address": "Jl. Patuan Nagari, Sangkar Nihuta, Toba", "tags": ["Ikan Arsik", "Babi Panggang"], "priceMin": 25000, "priceMax": 50000, "rating": 4.4, "category": "grill"},
  {"id": "rumah-makan-khas-batak-moranta-simbolon", "name": "Rumah Makan Khas Batak Moranta Simbolon", "address": "Jl. Gereja, Kabupaten Samosir", "tags": ["Ikan Jahir Goreng", "Babi Panggang"], "priceMin": 25000, "priceMax": 50000, "rating": 4.5, "category": "grill"},
  {"id": "rumah-makan-khas-batak-parapat", "name": "Rumah Makan Khas Batak Parapat", "address": "Jl. Sisingamangaraja, Sipangan Bolon, Simalungun", "tags": ["Ikan Bakar", "Daging Babi Panggang"], "priceMin": 25000, "priceMax": 50000, "rating": 4.1, "category": "grill"},
  {"id": "rumah-makan-khas-batak-tiurma-siboro", "name": "Rumah Makan Khas Batak Tiurma Siboro", "address": "Jl. Josep Sinaga No.227, Tiga Raja, Simalungun", "tags": ["Babi Panggang", "Ikan Mas Arsik", "Saksang Babi", "Ubi Tumbuk"], "priceMin": 25000, "priceMax": 50000, "rating": 4.0, "category": "grill"}
];

// Tambahkan properti image pada setiap restoran (seed berdasarkan id)
const RESTAURANTS: Restaurant[] = BASE_RESTAURANTS.map(r => ({
  ...r,
  image: `https://picsum.photos/seed/${r.id}/400/250`
}));

const CATEGORY_META: Record<
  Category,
  { label: string; icon: React.ElementType; from: string; to: string; chip: string }
> = {
  grill: {
    label: "Panggang Khas Batak",
    icon: Flame,
    from: "#1D6FA5",
    to: "#0D3352",
    chip: "#7DD3FC",
  },
  seafood: {
    label: "Hidangan Danau & Laut",
    icon: Fish,
    from: "#0E7FA8",
    to: "#0A3A4C",
    chip: "#5FE3E8",
  },
  coffee: {
    label: "Kopi & Kafe",
    icon: Coffee,
    from: "#2A5A8C",
    to: "#132A44",
    chip: "#9FCBF0",
  },
  noodle: {
    label: "Mi & Bakso",
    icon: Soup,
    from: "#1F6E9C",
    to: "#0E3450",
    chip: "#8ED9F5",
  },
  sweet: {
    label: "Manis & Kudapan",
    icon: Cake,
    from: "#3A6FB8",
    to: "#182F4E",
    chip: "#AFD4F7",
  },
  general: {
    label: "Hidangan Nusantara",
    icon: UtensilsCrossed,
    from: "#26507C",
    to: "#132339",
    chip: "#9FC3E8",
  },
};

const CATEGORY_ORDER: Category[] = [
  "grill",
  "seafood",
  "coffee",
  "noodle",
  "sweet",
  "general",
];

const DISH_SPOTLIGHT = [
  "Babi Panggang Karo",
  "Ikan Arsik",
  "Saksang",
  "Nasi Goreng",
  "Kopi",
  "Napinadar",
  "Mie Gomak",
  "Seafood",
];

function formatRupiah(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}rb`;
  }
  return `${n}`;
}

function priceLabel(min: number | null, max: number | null): string {
  if (min == null || max == null) return "Hubungi restoran";
  if (min === max) return `Rp ${formatRupiah(min)} / orang`;
  return `Rp ${formatRupiah(min)} – ${formatRupiah(max)} / orang`;
}

type SortKey = "rating" | "price" | "az";

export default function CulinaryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activeDish, setActiveDish] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [visibleCount, setVisibleCount] = useState(12);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    RESTAURANTS.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  const dishCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    DISH_SPOTLIGHT.forEach((dish) => {
      counts[dish] = RESTAURANTS.filter((r) => {
        const hay = (r.name + " " + r.tags.join(" ")).toLowerCase();
        return hay.includes(dish.toLowerCase());
      }).length;
    });
    return counts;
  }, []);

  const avgRating = useMemo(() => {
    const withRating = RESTAURANTS.filter((r) => r.rating != null) as (Restaurant & {
      rating: number;
    })[];
    return withRating.reduce((sum, r) => sum + r.rating, 0) / withRating.length;
  }, []);

  const filtered = useMemo(() => {
    let list = RESTAURANTS.filter((r) => {
      const matchesQuery =
        query.trim() === "" ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        r.address.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "all" || r.category === activeCategory;
      const matchesDish =
        !activeDish ||
        (r.name + " " + r.tags.join(" ")).toLowerCase().includes(activeDish.toLowerCase());
      return matchesQuery && matchesCategory && matchesDish;
    });

    list = [...list].sort((a, b) => {
      if (sortKey === "rating") {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
      if (sortKey === "price") {
        const ap = a.priceMin ?? Number.MAX_SAFE_INTEGER;
        const bp = b.priceMin ?? Number.MAX_SAFE_INTEGER;
        return ap - bp;
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [query, activeCategory, activeDish, sortKey]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #1E293B 50%, #0F172A 100%)",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
        color: "#F8FAFC",
        paddingBottom: "72px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .cul-serif { font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.01em; }
        .cul-fade-up { animation: culFadeUp 0.5s ease both; }
        @keyframes culFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cul-card { 
          transition: transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease, border-color 0.3s ease; 
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(12px);
        }
        .cul-card:hover { 
          transform: translateY(-4px); 
          border-color: rgba(59, 130, 246, 0.5) !important; 
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(59, 130, 246, 0.15); 
        }
        .cul-chip { transition: all 0.2s ease; }
        .cul-chip:hover { transform: translateY(-2px); }
        .cul-scrollbar::-webkit-scrollbar { height: 6px; }
        .cul-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.4); border-radius: 999px; }
        .cul-input::placeholder { color: #64748B; }
        .cul-select { color-scheme: dark; }
      `}</style>

      {/* Hero */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 0" }}>
        <div
          className="cul-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: "#60A5FA",
          }}
        >
          <Sparkles size={14} />
          {RESTAURANTS.length}+ Kuliner Terverifikasi
        </div>

        <h1
          className="cul-serif cul-fade-up"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.1,
            fontWeight: 700,
            margin: "16px 0 12px",
            maxWidth: "780px",
            animationDelay: "0.06s",
          }}
        >
          Kuliner di Sekitar{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #60A5FA, #38BDF8 50%, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Danau Toba
          </span>
        </h1>
        <p
          className="cul-fade-up"
          style={{
            color: "#94A3B8",
            fontSize: "16px",
            lineHeight: 1.6,
            maxWidth: "640px",
            margin: 0,
            animationDelay: "0.1s",
          }}
        >
          Temukan kuliner terbaik lengkap dengan rating, fasilitas, dan kisaran harga per orang — dari rumah makan budget hingga restoran tepi danau.
        </p>

        {/* Search + filters */}
        <div
          className="cul-fade-up"
          style={{
            marginTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "10px",
            borderRadius: "16px",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            animationDelay: "0.14s",
          }}
        >
          <div
            style={{
              flex: "1 1 280px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Search size={18} color="#64748B" />
            <input
              className="cul-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(12);
              }}
              placeholder="Cari nama hotel atau lokasi..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F8FAFC",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={16} color="#64748B" />
            <select
              className="cul-select"
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value as Category | "all");
                setVisibleCount(12);
              }}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F8FAFC",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <option style={{ color: "#0F172A" }} value="all">
                Semua Tipe
              </option>
              {CATEGORY_ORDER.map((cat) => (
                <option style={{ color: "#0F172A" }} key={cat} value={cat}>
                  {CATEGORY_META[cat].label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} color="#64748B" />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
          >
            <select
              className="cul-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F8FAFC",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <option style={{ color: "#0F172A" }} value="rating">
                Rating Tertinggi
              </option>
              <option style={{ color: "#0F172A" }} value="price">
                Harga Terendah
              </option>
              <option style={{ color: "#0F172A" }} value="az">
                Nama A-Z
              </option>
            </select>
            <ChevronDown size={16} color="#64748B" />
          </div>
        </div>

        {/* Dish spotlight chips */}
        <div
          className="cul-fade-up cul-scrollbar"
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "4px",
            animationDelay: "0.18s",
          }}
        >
          {DISH_SPOTLIGHT.map((dish) => {
            const active = activeDish === dish;
            return (
              <button
                key={dish}
                onClick={() => {
                  setActiveDish(active ? null : dish);
                  setVisibleCount(12);
                }}
                className="cul-chip"
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: active ? "1px solid #3B82F6" : "1px solid rgba(255,255,255,0.12)",
                  background: active ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.04)",
                  color: active ? "#60A5FA" : "#CBD5E1",
                }}
              >
                {dish}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: active ? "#60A5FA" : "#64748B",
                  }}
                >
                  {dishCounts[dish]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "28px auto 16px",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", color: "#64748B" }}>
          Menampilkan <strong style={{ color: "#F8FAFC" }}>{visible.length}</strong> dari{" "}
          <strong style={{ color: "#F8FAFC" }}>{filtered.length}</strong> kuliner
          {activeDish ? (
            <>
              {" "}
              untuk{" "}
              <span
                style={{
                  color: "#60A5FA",
                  fontWeight: 600,
                }}
              >
                "{activeDish}"
              </span>
            </>
          ) : null}
        </p>
        {(query || activeCategory !== "all" || activeDish) && (
          <button
            onClick={() => {
              setQuery("");
              setActiveCategory("all");
              setActiveDish(null);
              setVisibleCount(12);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#60A5FA",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <X size={14} /> Hapus filter
          </button>
        )}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {visible.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px 20px",
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "16px",
              background: "rgba(30, 41, 59, 0.3)",
              color: "#64748B",
            }}
          >
            <UtensilsCrossed size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: "15px" }}>
              Tidak ada kuliner yang cocok. Coba kata kunci atau filter lain.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {visible.map((r, idx) => {
              const meta = CATEGORY_META[r.category];
              const Icon = meta.icon;
              return (
                <div
                  key={r.id}
                  className="cul-card cul-fade-up"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    animationDelay: `${(idx % 12) * 0.03}s`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image Container */}
                  <div
                    style={{
                      position: "relative",
                      height: "180px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Dark overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.4) 100%)",
                      }}
                    />
                    
                    {/* Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(8px)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#F8FAFC",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#22C55E",
                          display: "inline-block",
                        }}
                      />
                      Beroperasi
                    </div>

                    {r.rating != null && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 10px",
                          borderRadius: "999px",
                          background: "rgba(15, 23, 42, 0.8)",
                          backdropFilter: "blur(8px)",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#FBBF24",
                        }}
                      >
                        <Star size={14} fill="#FBBF24" strokeWidth={0} />
                        {r.rating.toFixed(1)}
                      </div>
                    )}

                    {/* Category badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: "rgba(59, 130, 246, 0.9)",
                        backdropFilter: "blur(8px)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {meta.label.split(" ")[0]}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      flex: 1,
                    }}
                  >
                    <h3
                      className="cul-serif"
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: 1.4,
                        color: "#F8FAFC",
                      }}
                    >
                      {r.name}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        color: "#94A3B8",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      <MapPin size={16} style={{ flexShrink: 0, marginTop: "1px" }} color="#64748B" />
                      <span
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {r.address}
                      </span>
                    </div>

                    {r.tags.length > 0 && (
                      <div 
                        style={{ 
                          display: "flex", 
                          flexWrap: "wrap", 
                          gap: "6px",
                        }}
                      >
                        {r.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "11px",
                              fontWeight: 500,
                              padding: "4px 10px",
                              borderRadius: "999px",
                              background: "rgba(59, 130, 246, 0.15)",
                              border: "1px solid rgba(59, 130, 246, 0.3)",
                              color: "#60A5FA",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price and button */}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "2px" }}>
                          Mulai dari
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#60A5FA" }}>
                          {r.priceMin ? `Rp ${formatRupiah(r.priceMin)}` : "Hubungi"}
                          <span style={{ fontSize: "12px", fontWeight: 500, color: "#64748B", marginLeft: "4px" }}>
                            /orang
                          </span>
                        </div>
                      </div>
                      <button
                        style={{
                          padding: "10px 20px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                          border: "none",
                          color: "#FFFFFF",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 8px 20px -6px rgba(59, 130, 246, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
            <button
              onClick={() => setVisibleCount((v) => v + 12)}
              style={{
                padding: "12px 28px",
                borderRadius: "999px",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                background: "rgba(59, 130, 246, 0.1)",
                color: "#60A5FA",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
              }}
            >
              Muat Lebih Banyak ({filtered.length - visible.length} lagi)
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "56px auto 0",
          padding: "20px 24px 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          color: "#64748B",
          fontSize: "13px",
        }}
      >
        Kurasi kuliner sekitar Danau Toba — Balige, Samosir, Parapat & Simalungun.
      </div>
    </div>
  );
}