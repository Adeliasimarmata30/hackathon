import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Wifi,
  ParkingCircle,
  Coffee,
  Snowflake,
  WashingMachine,
  Baby,
  Waves,
  Accessibility,
  Music4,
  Clock,
  SlidersHorizontal,
  BadgeCheck,
  Building2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  1. RAW DATA (apa adanya dari sumber) — setiap entri satu string   */
/*     multi-baris berisi seluruh atribut, akan di-parse di bawah.    */
/* ------------------------------------------------------------------ */

const RAW_HOTELS: string[] = [
  "Bagus Bay Guest House\nprice-per-head: 130000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Parkir Gratis\naddress: Jl. Lkr. Tuktuk No.Kelurahan, Tuktuk Siadong, Simanindo, Kabupaten Samosir, Sumatera Utara 22395\nlat-long: 2.670105989512679,98.85502157667653\nplace-type: Hotel\nplace-rating: 5.0\nstatus: beroperasi",
  "Brain Homestay\nprice-per-head: 100000\ncheck-in: 14.0\nFasilitas: Sarapan\naddress: Hutabasagasan, Sihiong, Jangga Toruan, Balige, Toba, Sumatera Utara 22386, Indonesia\nlat-long: 2.5482791,99.0812858\nplace-type: Hotel\nplace-rating: 4.7\nstatus: beroperasi",
  "Brussels Homestay\nprice-per-head: 280000\nFasilitas: Wi-Fi, Parkir Gratis, Cocok untuk anak-anak\naddress: Jl. D. I. Panjaitan no. 14, balige, Sumatera Utara 22312, Indonesia\nlat-long: 2.33624,99.0634391\nplace-type: Rumah wisata\nplace-rating: 4.6\nstatus: beroperasi",
  "Carolina Hotel\nprice-per-head: 400000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wifi gratis, Sarapan gratis, Parkir gratis, AC, Layanan Binatu\naddress: Tuktuk Siadong, Simanindo, Kabupaten Samosir, Sumatera Utara 22395\nlat-long: 2.6688426,98.8613286\nplace-type: Hotel bintang 2\nplace-rating: 4.3\nstatus: beroperasi",
  "Hotel Adela\nprice-per-head: 40000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wi-Fi, Parkir Gratis, AC\naddress: Jl, Sitangkola, Kec. Laguboti, Toba, Sumatera Utara 22381, Indonesia\nlat-long: 2.3338055,99.1290349\nplace-type: Hotel\nplace-rating: 4.1\nstatus: beroperasi",
  "Hotel Nabasa\nprice-per-head: 350000\nFasilitas: Wi-Fi gratis, Sarapan, Parkir gratis, AC, Layanan binatu\naddress: Jl. Siliwangi No.8, Kec. Balige, Toba, Sumatera Utara, Indonesia\nlat-long: 2.3359467,99.0624334\nplace-type: Hotel\nplace-rating: 4.1\nstatus: beroperasi",
  "Hotel Santo Djaya\nprice-per-head: 200.000 - 300.000\nFasilitas: Wi-Fi, Tempat Parkir, Cocok Untuk anak - anak\naddress: Jl. Sisingamangaraja, Ps. Porsea, Kec. Porsea, Kabupaten Samosir, Sumatera Utara 22384\nlat-long: 2.4452915,99.1552925\nplace-type: Hotel\nplace-rating: 3.8\nstatus: beroperasi",
  "Hotel Sere Nauli\nprice-per-head: 400000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wi-Fi gratis, Sarapan, Parkir gratis, Kolam renang luar, AC, Layanan binatu\naddress: Jl. Sisingamangaraja No.1, Ps. Laguboti, Kec. Laguboti, Toba, Sumatera Utara 22381\nlat-long: 2.3528556,99.1217736\nplace-type: Hotel\nplace-rating: 4.1\nstatus: beroperasi",
  "Labersa Hotel and Convention Center Toba, Balige\nprice-per-head: 900000\ncheck-out: 12.0\nFasilitas: Wi-Fi gratis, Sarapan, Parkir gratis, Kolam renang luar, AC, Layanan binatu\naddress: Saribu Raja Janji Maria, Kec. Balige, Toba, Sumatera Utara, Indonesia\nlat-long: 2.3386395,99.0816343\nplace-type: Hotel Resor\nplace-rating: 4.5\nstatus: beroperasi",
  "Nauli Inn\nprice-per-head: 250.000 - 400.000\nFasilitas: Sarapan, AC, TV, Air panas, Wi-Fi\naddress: Jl. Sibola Hotang No.km 1, RW.2, Sibola Hotangsas, Kec. Balige, Toba, Sumatera Utara, Indonesia\nlat-long: 2.3444332,99.0787909\nplace-type: Pondok\nplace-rating: 4.9\nstatus: beroperasi",
  "Romlan Guesthouse\nprice-per-head: 200000\ncheck-in: 14.3\ncheck-out: 12.0\nFasilitas: Wi-fi gratis, Sarapan berbayar, Parkir berbayar, Layanan binatu\naddress: Tuktuk; Siadong 36; RI-22395, Tuktuk Siadong, Simanindo, Kabupaten Samosir, Sumatera Utara 22395\nlat-long: 2.6735597,98.8606037\nplace-type: Hotel bintang 3\nplace-rating: 4.9\nstatus: beroperasi",
  "SAPADIA VILLA BALIGE II\nprice-per-head: 800000\nFasilitas: Parkir Gratis, Live Music\naddress: Balige III, Kec. Balige, Toba, Sumatera Utara, Indonesia\nlat-long: 2.3284243,99.0670912\nplace-type: Vila\nplace-rating: 4.6\nstatus: beroperasi",
  "Tabo Cottages\nprice-per-head: 800000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wifi gratis, Sarapan gratis, Parkir gratis, Kolam renang luar, AC\naddress: Jl. Lkr. Tuktuk No.115 Toba, Tuktuk Siadong, Simanindo, Kabupaten Samosir, Sumatera Utara 22395\nlat-long: 2.6705927,98.8559241\nplace-type: Restoran\nplace-rating: 4.6\nstatus: beroperasi",
  "TASYA HOMESTAY\nprice-per-head: 40000\naddress: Jl. Lintas Sumatera, Patane III, Kec. Porsea, Toba, Sumatera Utara 22384, Indonesia\nlat-long: 2.4496319,99.1530834\nplace-type: Motel\nplace-rating: 3.0\nstatus: beroperasi",
  "Thyesza Hotel Resort\nprice-per-head: 350000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wi-fi gratis, Sarapan gratis, Parkir gratis, dapat diakses, kolam renang luar, AC\naddress: Unjur, Jl. Pulau Samosir, Simanindo, Kabupaten Samosir, Sumatera Utara 22395\nlat-long: 2.6938638,98.8209669\nplace-type: Restoran\nplace-rating: 3.8\nstatus: beroperasi",
  "Tiara Bunga Hotel\nprice-per-head: 700.000 - 1.200.000\ncheck-in: 14.0\ncheck-out: 11.0\nFasilitas: Wi-Fi gratis, Sarapan, Parkir gratis, Kolam renang luar, AC, Layanan binatu\naddress: Jl. Raya TaraBunga, Tara Bunga, Kec. Tampahan, Toba, Sumatera Utara 22312, Indonesia\nlat-long: 2.3628718,99.0308496\nplace-type: Hotel\nplace-rating: 4.2\nstatus: beroperasi",
  "Vany Villa Balige\nprice-per-head: 700000\nFasilitas: Kolam renang anak-anak\naddress: Jl. By Pass Balige, Sianipar Sihailhail, Kec. Balige, Toba, Sumatera Utara 22311, Indonesia\nlat-long: 2.3202379,99.0619852\nplace-type: Hotel\nplace-rating: 4.6\nstatus: beroperasi",
  "Grand Mareda Hotel\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wi-Fi, Sarapan Gratis, AC, Layanan Kamar\naddress: 84X6+XVP, Jl Pasar Melintang, Aruan, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia\nlat-long: 2.3499528,99.1122069\nplace-type: Hotel\nplace-rating: 3.9\nstatus: beroperasi",
  "Hotel and Restaurant Singgalang\ncheck-out: 22.0\nrecommend-menu: Bandrek, Sop Perut Ikan, Sayur Kangkung Dan Ikan Nila, Juice Jeruk, Nasi Goreng, Udang Tauco, Ikan Tauco, Udang Goreng Tepung Oats, Ifu Mie Goreng, Es Kopi Susu, Padang Restaurant Assorted Meals, Stir Fry Cuttlefish, Stir Fried Bean Sprouts, Stir Fried Mix Vegetables, Ayam Penyet, Hot Plate Tofu, Garlic Chicken, Kwetiaw Goreng, Stir Fry Vermicelli\naddress: Jl. Sisingamangaraja No.52, Tiga Raja, Kec. Girsang Sipangan Bolon, Kabupaten Simalungun, Sumatera Utara 21174\nlat-long: 2.667133089956276,98.93924339016954\nplace-type: China\nplace-rating: 4.7\nstatus: beroperasi",
  "HOTEL BAHAGIA BALIGE\naddress: Jl. Sisingamangaraja Kelurahan No.21, Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83M8+Q2 Napitupulu Bagasan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3343907,99.065022\nplace-type: Hotel\nplace-rating: 4.0\nstatus: beroperasi",
  "Hotel Dizomn\nFasilitas: Waterheater\naddress: Jl. D.I Panjaitan No.19, Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83P7+HJ Napitupulu Bagasan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3364256,99.0640091\nplace-type: Hotel\nplace-rating: 3.6\nstatus: beroperasi",
  "Hotel O Balige City Near Tugu Juara Monang\nprice-per-head: 78000\naddress: Pohan Julu, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (7379+H7 Pohan Julu, Kabupaten Tapanuli Utara, Sumatera Utara, Indonesia)\nlat-long: 2.2639672,99.0681668\nplace-type: Hotel\nplace-rating: 5.0\nstatus: beroperasi",
  "Ita Soposurung Hotel\ncheck-in: 14.0\ncheck-out: 0.0\nFasilitas: Wifi, Sarapan, Parkir Gratis, AC, Layanan Bibatu\naddress: Jl. Lintas Sumatera No.252, Hinalang Bagasan, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (82GX+RX Hinalang Bagasan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3270655,99.0499578\nplace-type: Hotel\nplace-rating: 4.4\nstatus: beroperasi",
  "J&J Guest House 1 Rumah\nprice-per-head: 800000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Dapat diakses, Sarapan berbayar, Parkir Gratis\naddress: Jalan, Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara 22311, Indonesia (83P8+C2 Napitupulu Bagasan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.336051,99.0650606\nplace-type: Hotel\nplace-rating: 4.3\nstatus: beroperasi",
  "Lago Hotel & Resto\nprice-per-head: 30.000 - 700.000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wi-Fi gratis, Sarapan, Parkir gratis, AC, Restoran\naddress: Jl. Sibola Hotang, Sibola Hotangsas, Toba, Sumatera Utara 22312, Indonesia (83WH+79 Sibola Hotangsas, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3456277,99.078423\nplace-type: Hotel\nplace-rating: 4.5\nstatus: beroperasi",
  "Mutiara Balige Hotel\nprice-per-head: 300000\ncheck-in: 13.0\ncheck-out: 12.0\nFasilitas: Wi-Fi gratis, Sarapan, Parkir gratis, AC, Layanan binatu\naddress: Sibola Hotangsas, Kec. Balige, Toba, Sumatera Utara, Indonesia (83M5+CG Sibola Hotangsas, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.333572,99.058865\nplace-type: Hotel\nplace-rating: 4.1\nstatus: beroperasi",
  "OYO 90645 Karisma Residence\nprice-per-head: 100000\ncheck-in: 14.0\nFasilitas: Wi-Fi, Parkir Gratis, AC\naddress: 242, Jl. Sisingamangaraja No.242B, Balige I, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83MC+J8 Balige II, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3340345,99.0708738\nplace-type: Hotel\nplace-rating: 3.6\nstatus: beroperasi",
  "Pondok Siliwangi 26\naddress: Jl. Siliwangi, Toba, Sumatera Utara, Indonesia (83P6+6R Pardede Onan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3355892,99.0620598\nplace-type: Hotel\nplace-rating: 4.2\nstatus: beroperasi",
  "Pudan Residence\nprice-per-head: 107000\ncheck-out: 12.0\nFasilitas: Wi-Fi, AC, Parkir Gratis\naddress: Jl. Parluasan, Balige II, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83JC+JG Balige II, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3315951999999998,99.0713519\nplace-type: Guest house\nplace-rating: 3.9\nstatus: beroperasi",
  "Purnama Balige Hotel\nprice-per-head: 400000\ncheck-in: 14.0\ncheck-out: 12.0\nFasilitas: Wi-Fi gratis, Sarapan berbayar, Parkir gratis, AC, Layanan binatu\naddress: 83M5+RR6, Jl. Pardede Pasir No.10, Kec. Balige, Sumatera Utara 22314, Indonesia\nlat-long: 2.3345625,99.0595625\nplace-type: Hotel\nplace-rating: 4.0\nstatus: beroperasi",
  "RAP Hotel Balige\nprice-per-head: 240000\ncheck-in: 14.0\nFasilitas: Wi-Fi, Parkir Gratis, AC, Cocok untuk anak-anak\naddress: Jl. Pendeta Munson Jl. Pardede Pasir No.9, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83M6+J8 Pardede Onan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3341051999999998,99.0607736\nplace-type: Hotel\nplace-rating: 4.0\nstatus: beroperasi",
  "Tendy Guest House\nprice-per-head: 400000\nFasilitas: Kamar, Eksterior\naddress: Jl. Siborongborong - Parapat, Patane V, Kec. Porsea, Toba, Sumatera Utara 22384, Indonesia (F532+3M Patane V, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.4527418,99.1516836\nplace-type: Guest house\nplace-rating: 4.6\nstatus: beroperasi",
  "The Boat Homestay and Spa\nprice-per-head: 330000\nFasilitas: Sarapan\naddress: Jl. Tarutung No.100, Sangkar Nihuta, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83H3+MR Sangkar Nihuta, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3291886,99.0545349\nplace-type: Rumah wisata\nplace-rating: 4.3\nstatus: beroperasi",
  "Toba Village inn\nprice-per-head: 400000\ncheck-in: 12.0\ncheck-out: 12.0\nFasilitas: Dekat dengan transportasi umum dan bandara\naddress: Kampung Tuktuk Siadong, Kecamatan Simanindo, Ambarita, Tuktuk Siadong, Simanindo, Kabupaten Samosir, Sumatera Utara 22395\nlat-long: 2.6693009131933585,98.85349290366256\nplace-type: Hotel bintang 3\nstatus: beroperasi",
  "TOPI TAO HOMESTAY PANGURURAN (KAWASAN WATERFRONT CITY)\nFasilitas: View Danau Toba\naddress: Jl. Putri Lopian, Pardomuan I, Kec. Pangururan, Kabupaten Samosir, Sumatera Utara 22392\nlat-long: 2.6068400229917223,98.69808932085448\nplace-type: Restoran\nplace-rating: 4.4\nstatus: beroperasi",
  "wisma LAKSAMANA\naddress: Jl. Mulia Raja No.20, Kelurahan Napitu Puluh, Kec. Balige, Toba, Sumatera Utara 22312, Indonesia (83Q7+3C Napitupulu Bagasan, Toba, Sumatera Utara, Indonesia)\nlat-long: 2.3376991,99.0635266\nplace-type: Hotel\nplace-rating: 4.2\nstatus: beroperasi",
];

/* ------------------------------------------------------------------ */
/*  2. TYPES & PARSER                                                  */
/* ------------------------------------------------------------------ */

interface Hotel {
  id: number;
  name: string;
  priceLabel: string | null;
  priceValue: number | null; // angka terendah, untuk sort
  checkIn: string | null;
  checkOut: string | null;
  facilities: string[];
  address: string;
  lat: number;
  lng: number;
  placeType: string;
  rating: number | null;
  status: string;
  image: string;
}

function parseHour(v: string): string {
  const n = parseFloat(v);
  if (Number.isNaN(n)) return v;
  const h = Math.floor(n);
  const m = Math.round((n - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function parsePrice(raw: string): { label: string; value: number | null } {
  const clean = raw.trim();
  const nums = clean
    .replace(/\./g, "")
    .split(/-|–/)
    .map((s) => parseInt(s.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const value = nums.length ? Math.min(...nums) : null;
  return { label: clean, value };
}

// kata kunci gambar tematik berdasarkan jenis properti
function imageFor(placeType: string, id: number): string {
  const t = placeType.toLowerCase();
  let keywords = "hotel,lake,resort";
  if (t.includes("resor") || t.includes("resort")) keywords = "resort,swimmingpool,tropical";
  else if (t.includes("vila")) keywords = "villa,tropical,pool";
  else if (t.includes("guest house")) keywords = "guesthouse,homestay,cozy";
  else if (t.includes("rumah wisata")) keywords = "homestay,cottage,garden";
  else if (t.includes("motel")) keywords = "motel,roadside,building";
  else if (t.includes("pondok")) keywords = "cottage,lodge,nature";
  else if (t.includes("restoran") || t === "china") keywords = "restaurant,dininghall,cafe";
  else if (t.includes("bintang")) keywords = "hotel,lobby,luxury";
  return `https://loremflickr.com/640/440/${keywords}?lock=${id}`;
}

function parseHotel(raw: string, id: number): Hotel {
  const lines = raw.split("\n");
  const name = lines[0].trim();
  const fields: Record<string, string> = {};
  for (let i = 1; i < lines.length; i++) {
    const idx = lines[i].indexOf(": ");
    if (idx === -1) continue;
    const key = lines[i].slice(0, idx).trim();
    const val = lines[i].slice(idx + 2).trim();
    fields[key] = val;
  }
  const [lat, lng] = (fields["lat-long"] || "0,0").split(",").map((n) => parseFloat(n));
  const price = fields["price-per-head"] ? parsePrice(fields["price-per-head"]) : null;
  const placeType = fields["place-type"] || "Hotel";

  return {
    id,
    name,
    priceLabel: price?.label ?? null,
    priceValue: price?.value ?? null,
    checkIn: fields["check-in"] ? parseHour(fields["check-in"]) : null,
    checkOut: fields["check-out"] ? parseHour(fields["check-out"]) : null,
    facilities: fields["Fasilitas"] ? fields["Fasilitas"].split(",").map((s) => s.trim()) : [],
    address: fields["address"] || "",
    lat,
    lng,
    placeType,
    rating: fields["place-rating"] ? parseFloat(fields["place-rating"]) : null,
    status: fields["status"] || "beroperasi",
    image: imageFor(placeType, id),
  };
}

const HOTELS: Hotel[] = RAW_HOTELS.map((raw, i) => parseHotel(raw, i));
const PLACE_TYPES = Array.from(new Set(HOTELS.map((h) => h.placeType))).sort();

/* ------------------------------------------------------------------ */
/*  3. HELPERS                                                         */
/* ------------------------------------------------------------------ */

function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

const FACILITY_ICON: Record<string, React.ElementType> = {
  wifi: Wifi,
  "wi-fi": Wifi,
  parkir: ParkingCircle,
  sarapan: Coffee,
  ac: Snowflake,
  binatu: WashingMachine,
  laundry: WashingMachine,
  anak: Baby,
  kolam: Waves,
  renang: Waves,
  akses: Accessibility,
  music: Music4,
};

function iconForFacility(f: string): React.ElementType {
  const key = f.toLowerCase();
  const found = Object.keys(FACILITY_ICON).find((k) => key.includes(k));
  return found ? FACILITY_ICON[found] : BadgeCheck;
}

/* ------------------------------------------------------------------ */
/*  4. COMPONENT                                                       */
/* ------------------------------------------------------------------ */

type SortKey = "rating" | "price-asc" | "price-desc" | "name";

export default function Hotels() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("Semua");
  const [sort, setSort] = useState<SortKey>("rating");

  const filtered = useMemo(() => {
    let list = HOTELS.filter((h) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q || h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q);
      const matchType = type === "Semua" || h.placeType === type;
      return matchQuery && matchType;
    });

    list = [...list].sort((a, b) => {
      if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sort === "price-asc")
        return (a.priceValue ?? Infinity) - (b.priceValue ?? Infinity);
      if (sort === "price-desc")
        return (b.priceValue ?? -Infinity) - (a.priceValue ?? -Infinity);
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [query, type, sort]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0a1930] via-[#0c2145] to-[#0a1830] text-blue-50">
      {/* ---------- glow backdrop ---------- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {/* ---------- header ---------- */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
            <Building2 className="h-3.5 w-3.5" />
            {HOTELS.length}+ Hotel Terverifikasi
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Hotel di Sekitar{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Danau Toba
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-200/70 sm:text-base">
            Temukan penginapan terbaik lengkap dengan rating, fasilitas, dan kisaran harga per
            malam — dari homestay budget hingga resor tepi danau.
          </p>
        </div>

        {/* ---------- filter bar ---------- */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-4 backdrop-blur-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama hotel atau lokasi..."
              className="w-full rounded-xl border border-blue-400/15 bg-[#0d2140] py-2.5 pl-10 pr-4 text-sm text-blue-50 placeholder:text-blue-300/50 outline-none ring-sky-400/40 transition focus:ring-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-blue-300/50" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border border-blue-400/15 bg-[#0d2140] px-3 py-2.5 text-sm text-blue-50 outline-none ring-sky-400/40 focus:ring-2"
            >
              <option value="Semua">Semua Tipe</option>
              {PLACE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl border border-blue-400/15 bg-[#0d2140] px-3 py-2.5 text-sm text-blue-50 outline-none ring-sky-400/40 focus:ring-2"
            >
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="name">Nama A–Z</option>
            </select>
          </div>
        </div>

        <p className="mb-5 text-sm text-blue-300/50">
          Menampilkan <span className="text-sky-400">{filtered.length}</span> dari{" "}
          {HOTELS.length} hotel
        </p>

        {/* ---------- grid ---------- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center text-center text-blue-300/50">
            <Building2 className="mb-3 h-10 w-10 opacity-40" />
            <p>Tidak ada hotel yang cocok dengan pencarianmu.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. CARD                                                             */
/* ------------------------------------------------------------------ */

function HotelCard({ hotel }: { hotel: Hotel }) {
  // Format URL Google Maps menggunakan Nama dan Alamat Hotel
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hotel.name + ", " + hotel.address
  )}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-[0_0_30px_-8px_rgba(56,132,255,0.35)]">
      {/* image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1830]/90 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-blue-400/15 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-blue-50 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Beroperasi
        </div>

        {hotel.rating !== null && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            {hotel.rating.toFixed(1)}
          </div>
        )}

        <div className="absolute bottom-3 left-3 rounded-full border border-sky-400/30 bg-sky-400/15 px-2.5 py-1 text-[11px] font-medium text-sky-300 backdrop-blur-sm">
          {hotel.placeType}
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-blue-50" title={hotel.name}>
          {hotel.name}
        </h3>

        <div className="flex items-start gap-1.5 text-xs text-blue-200/70">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-300/50" />
          <span className="line-clamp-2">{hotel.address}</span>
        </div>

        {(hotel.checkIn || hotel.checkOut) && (
          <div className="flex items-center gap-1.5 text-xs text-blue-200/70">
            <Clock className="h-3.5 w-3.5 shrink-0 text-blue-300/50" />
            <span>
              {hotel.checkIn ? `Check-in ${hotel.checkIn}` : ""}
              {hotel.checkIn && hotel.checkOut ? " · " : ""}
              {hotel.checkOut ? `Check-out ${hotel.checkOut}` : ""}
            </span>
          </div>
        )}

        {hotel.facilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hotel.facilities.slice(0, 4).map((f) => {
              const Icon = iconForFacility(f);
              return (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-400/10 px-2 py-1 text-[11px] text-blue-100"
                >
                  <Icon className="h-3 w-3 text-sky-400" />
                  {f}
                </span>
              );
            })}
            {hotel.facilities.length > 4 && (
              <span className="inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-[11px] text-blue-200/70">
                +{hotel.facilities.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {hotel.priceValue !== null ? (
              <>
                <p className="text-[11px] text-blue-300/50">Mulai dari</p>
                <p className="text-lg font-bold text-sky-300">
                  {formatRupiah(hotel.priceValue)}
                  <span className="ml-1 text-xs font-normal text-blue-300/50">/ orang</span>
                </p>
              </>
            ) : (
              <p className="text-xs text-blue-300/50">Hubungi untuk harga</p>
            )}
          </div>

          {/* PERUBAHAN DI SINI: Menggunakan tag <a> dengan target="_blank" ke Google Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 text-xs font-semibold text-[#050810] shadow-lg shadow-sky-500/25 transition hover:brightness-110"
          >
            Lihat Detail
          </a>
        </div>
      </div>
    </div>
  );
}