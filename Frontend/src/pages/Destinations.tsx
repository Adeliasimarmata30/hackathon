"use client";

import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Ticket,
  Star,
  ArrowUpRight,
  Mountain,
  Landmark,
  Building2,
  Church,
  BookOpen,
  Store,
  Users2,
  X,
  ChevronDown,
  Compass,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Destination {
  place_name: string;
  place_type: string;
  entry_fee: string | null;
  operational_hour: string;
  address: string;
  lat_long: string;
  rating: string;
  status: string;
  image?: string; // Tambahan atribut image
}

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

// Fungsi untuk membuat Link Google Maps yang akurat berdasarkan Nama & Alamat
function getGoogleMapsLink(name: string, address: string): string {
  const query = `${name}, ${address}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function parseRating(raw: string): number | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null;
  const value = parseFloat(cleaned);
  return value >= 0 && value <= 5 ? value : null;
}

function parseFee(raw: string | null): { label: string; min: number; free: boolean } {
  if (!raw) return { label: "Tidak ada info", min: Infinity, free: false };
  if (raw.toLowerCase() === "gratis") return { label: "Gratis", min: 0, free: true };
  if (raw.toLowerCase() === "sukarela") return { label: "Sukarela", min: 0, free: true };

  if (raw.includes("-")) {
    const [lo, hi] = raw.split("-").map((s) => s.trim());
    const min = parseInt(lo.replace(/\./g, ""), 10) || 0;
    return { label: `Rp ${lo} - ${hi}`, min, free: false };
  }

  const num = parseInt(raw.replace(/\./g, ""), 10);
  if (Number.isNaN(num)) return { label: "Tidak ada info", min: Infinity, free: false };
  return { label: `Rp ${num.toLocaleString("id-ID")}`, min: num, free: false };
}

/* ------------------------------------------------------------------ */
/*  Data — destinasi wisata di sekitar Danau Toba                      */
/*  NOTE: Ganti URL 'image' dengan link foto asli Anda jika diinginkan */
/* ------------------------------------------------------------------ */

const DESTINATIONS: Destination[] = [
  { 
    place_name: "Air Terjun Sipisopiso", 
    place_type: "Wisata Alam", 
    entry_fee: "5000", 
    operational_hour: "24 jam", 
    address: "Desa Tongging, Kec. Merek, Kabupaten Karo, Sumatera Utara", 
    lat_long: "2.9167551705008496, 98.51951452083213", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    place_name: "Pantai Pasir Putih Parbaba", 
    place_type: "Wisata Alam", 
    entry_fee: "5000", 
    operational_hour: "24 jam", 
    address: "Huta Bolon, Kec. Pangururan, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6967247534948746, 98.69005631394812", 
    rating: "3.8", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    place_name: "Bukit Holbung", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 15.000", 
    operational_hour: "24 jam", 
    address: "Hariara Pohan, Kec. Harian, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.5305337914347272, 98.69783122383308", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Museum Batak T.B. Silalahi Center", 
    place_type: "Museum", 
    entry_fee: "10.000 - 20.000", 
    operational_hour: "08.30 - 16.30", 
    address: "Jl. Dr. TB. Silalahi No.88, Balige, Toba, Sumatera Utara", 
    lat_long: "2.3333867366371246, 99.04840606801524", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1565060169368-628eb6c45671?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Patung Sigalegale", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "08.00 - 19.00", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6521028136146314, 98.86083039685249", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Aek Bath Sitio-tio", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sitio-Tio, Kec. Bakti Raja, Humbang Hasundutan, Sumatera Utara", 
    lat_long: "2.3036644824882817, 98.80432723432095", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    place_name: "Aek Rangat Pangururan", 
    place_type: "Wisata Alam", 
    entry_fee: "10.000 - 15.000", 
    operational_hour: "24 jam", 
    address: "Aek Rangat, Kec. Pangururan, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.618962358400672, 98.67544479814435", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Aek Sipaulak Hosa Loja", 
    place_type: "Wisata Buatan", 
    entry_fee: "Gratis", 
    operational_hour: "08.30 - 18.30", 
    address: "Silalahi 1, Paropo, Kec. Silahsabungan, Kabupaten Dairi, Sumatera Utara", 
    lat_long: "2.8010265335577316, 98.50145103617437", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Binanga Bolon", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Pua Dolok, Kec. Pua, Kabupaten Simalungun, Sumatera Utara", 
    lat_long: "2.846344777940582, 98.72883816801654", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1518182170546-0766bc6f9213?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Efrata", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sosor Dolok, Harian, Samosir Regency, North Sumatra", 
    lat_long: "2.537091727190248, 98.64495212082959", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Janji", 
    place_type: "Wisata Alam", 
    entry_fee: "Sukarela", 
    operational_hour: "24 jam", 
    address: "Tipang, Kec. Bakti Raja, Humbang Hasundutan, Sumatera Utara", 
    lat_long: "2.339668555177338, 98.81571392383263", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Lae", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "08.00 - 19.00", 
    address: "Jl. Runding, Sidiangkat, Kec. Sidikalang, Kabupaten Dairi, Sumatera Utara", 
    lat_long: "2.6119379443651214, 98.34885390213006", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1546948632-709808b50c09?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Nai sogop", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "07.00 - 18.00", 
    address: "Sarimarrihit, Kec. Sianjur Mula Mula, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.591226177946073, 98.62214953172492", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1534068590799-09895a701e3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Pollung", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Purba Baringin, Pakkat, Humbang Hasundutan Regency, North Sumatra", 
    lat_long: "2.1312944261352422, 98.54417190733461", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Sampuran", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Huta Namora, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.278675286188601, 99.14360208788077", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Siboruon Balige", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "08.00 - 17.00", 
    address: "Siboruon, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.289866206064578, 99.08388020674705", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Sigarattung", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "24 jam", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6103417399774993, 98.86415213917927", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Sigota gota Sipultak Hoda", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Tipang, Dolok sanggul, Humbang Hasundutan Regency", 
    lat_long: "2.3559239918217845, 98.80575426315701", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1465311440653-ba9bb029dabf?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Sigura-Gura", 
    place_type: "Wisata Alam", 
    entry_fee: "10.000 - 20.000", 
    operational_hour: "24 jam", 
    address: "Halado, Kec. Pintu Pohan Merant, Toba, Sumatera Utara", 
    lat_long: "2.5557703317675244, 99.30466568874047", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1504280509243-48907c056e2c?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Simolap", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sibongkare, Tara bintang, Humbang Hasundutan Regency, North Sumatra", 
    lat_long: "2.2711197303957404, 98.51857442082807", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1520698108785-2c8ca8225711?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Sitapigagan", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "09.00 - 17.00", 
    address: "Bonan Dolok, Kec. Sianjur Mula Mula, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6396408813041736, 98.60949392383327", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1533230408706-d977211a5f4c?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Situmurun", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "08.00 - 17.00", 
    address: "Jonggi Nihuta, Hatinggian, Kec. Lumban Julu, Toba, Sumatera Utara", 
    lat_long: "2.537730210260568, 99.00801408303306", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Tombak Pangaribuan", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Palipi, Kec. Palipi, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.531858219807868, 98.81674159499656", 
    rating: "4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Tonduhan", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 Jam", 
    address: "Desa Buntu Bayu, Kec. Tonduhan", 
    lat_long: "2.81000367963384, 99.18851032083141", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Air Terjun Turunan Buhit (Jabel)", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 Jam", 
    address: "Tonduhan, Hatonduhan, Simalungun Regency, North Sumatra", 
    lat_long: "2.857505631025593, 99.22376443247403", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Arung Jeram Desa Parhitean", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "09.00 - 17.00", 
    address: "Parhitean, Pintu Pohan Merant, Toba, North Sumatra", 
    lat_long: "2.5614011254221576, 99.34421355767306", 
    rating: "5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bah Salak Waterfall", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 Jam", 
    address: "Nagur Usang, Tapian Dolok, Simalungun Regency, North Sumatra", 
    lat_long: "3.0697986926073986, 99.03394713617631", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bakkara Village", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Simamora, Bakti Raja, Humbang Hasundutan Regency, North Sumatra", 
    lat_long: "2.309688894662536, 98.80873650396826", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1566125882500-87e27f022f6b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Balerong - Balige", 
    place_type: "Balai Masyarakat", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Jl. Lintas Sumatera No.88, Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.3346149361375397, 99.06579032568816", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1566125882500-87e27f022f6b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batak Museum", 
    place_type: "Museum", 
    entry_fee: "Gratis", 
    operational_hour: "08.00 - 20.00", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6508562618035936, 98.86005155266994", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1565060169368-628eb6c45671?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu Basiha", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Silalahi Pagar Batu, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.3516819530447366, 99.02520953701003", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu Gantung", 
    place_type: "Wisata Alam", 
    entry_fee: "15.000 - 20.000", 
    operational_hour: "09.30 - 17.30", 
    address: "Lake Toba, Kabupaten Simalungun, Sumatera Utara", 
    lat_long: "2.6886712399767156, 98.92425658150654", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu Kursi Raja Siallagan", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "10.000 - 25.000", 
    operational_hour: "08.00 - 18.00", 
    address: "Siallagan Pindaraya, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6792311052576823, 98.83603599685262", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu lihi star", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "10.00 - 19.15", 
    address: "Pematang Tambun Raya, Kec. Pematang Sidamanik, Kabupaten Simalungun", 
    lat_long: "2.7790376217041697, 98.8200177116348", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu Marhosa", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6043970438755335, 98.86803312883649", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu Maroppa", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Tamba Dolok, Kec. Sitio-Tio, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.4812855354916366, 98.71560298336162", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1500534314263-0869bed13843?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Batu Sigadap", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "10.000 - 20.000", 
    operational_hour: "24 jam", 
    address: "Silalahi I, Kec. Silahsabungan, Kabupaten Dairi, Sumatera Utara", 
    lat_long: "2.8015124776057707, 98.52755453432401", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Boli Boli Hot Spring", 
    place_type: "Wisata Alam", 
    entry_fee: "70000", 
    operational_hour: "24 jam", 
    address: "Situmeang Hasundutan, Kec. Sipoholon, Kabupaten Tapanuli Utara", 
    lat_long: "2.075401772091245, 98.94415589285848", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Beta Tuk-tuk", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Tomok, Simanindo, Samosir Regency, North Sumatra", 
    lat_long: "2.661213384375491, 98.84684237033036", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Burung", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Siboro, Kec. Sianjur Mula Mula, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.632008605398129, 98.65494368336203", 
    rating: "4.8", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1501854140884-074bf6bcb8ac?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Doa", 
    place_type: "Wisata Rohani", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Huta Ginjang, Kec. Muara, Kabupaten Tapanuli Utara, Sumatera Utara", 
    lat_long: "2.315048939426742, 98.9802962680152", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1548625361-12c823052d34?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Holbung", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 15.000", 
    operational_hour: "24 jam", 
    address: "Hariara Pohan, Kec. Harian, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.5305337914347272, 98.69783122383308", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Indah Simarjarunjung", 
    place_type: "Wisata Alam", 
    entry_fee: "5000", 
    operational_hour: "24 Jam", 
    address: "Jl. Simarjarunjung, Butu Bayu Pane Raja, Kec. Dolok Pardamean", 
    lat_long: "2.813506292007093, 98.78124308864622", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1500534314263-0869bed13843?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Pahoda", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "05.00 - 17.00", 
    address: "Lumban Silintong, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.34938999309088, 99.04028385235127", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Senyum", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Motung, Kec. Ajibata, Toba, Sumatera Utara", 
    lat_long: "2.6360931627435993, 98.92099197166834", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Sidihoni", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "24 jam", 
    address: "Sidihoni atas, Salaon Toba, Kec. Ronggur Nihuta, Kabupaten Samosir", 
    lat_long: "2.6095052754175807, 98.74926526447645", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Simargulang Ombun", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "24 jam", 
    address: "Tamba Dolok, Kec. Sitio-Tio, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.5064715317725974, 98.73868626615997", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Sipatungan", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sabulan, Kec. Sitio-Tio, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.4275610304959483, 98.79325043567833", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1500534314263-0869bed13843?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Sipolha", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "24 jam", 
    address: "Bukit Sipolha, Sipolha Horison, Pematang Sidamanik, Simalungun Regency", 
    lat_long: "2.7351674458357733, 98.85938732754488", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1501854140884-074bf6bcb8ac?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Bukit Tara Bunga", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "24 jam", 
    address: "Lintong Nihuta, Kec. Tampahan, Toba, Sumatera Utara", 
    lat_long: "2.3447867741231683, 99.01722798118647", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1490750967868-58cb7506aed1?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Caldera toba nomadic escape", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 40.000", 
    operational_hour: "07.00 - 18.00", 
    address: "Pardamean Sibisa, Kec. Ajibata, Toba, Sumatera Utara", 
    lat_long: "2.6080342986728144, 98.94603542383321", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Cottage Aek Tawar Sari", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Ronggur Nihuta, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.5884552399094702, 98.78133438465389", 
    rating: "4.8", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Danau Sidihoni", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Salaon Toba, Kec. Ronggur Nihuta, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.603283367624243, 98.74502128405312", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Desa Adat Ragi Hotang", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Meat, Kec. Tampahan, Toba, Sumatera Utara", 
    lat_long: "2.318298678713521, 99.00482579685168", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Desa Wisata Sigapiton", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "07.00 - 18.00", 
    address: "Motung, Ajibata, Toba, North Sumatra", 
    lat_long: "2.60058812427431, 98.92950331219843", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Desa Wisata Silalahi Pagar Batu", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "09.00 - 17.00", 
    address: "Jl. Dr. TB. Silalahi, Hinalang Bagasan, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.3310119766622237, 99.04921861186872", 
    rating: "5.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1566125882500-87e27f022f6b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Desa Wisata Tomok Parsaoran", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "10.000 - 30.000", 
    operational_hour: "24 jam", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6520233615901345, 98.86097999499678", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Dolok Pottas", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sihombu, Tara bintang, Humbang Hasundutan Regency, North Sumatra", 
    lat_long: "2.2384191313836848, 98.45567430548473", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Galeri Umkm Tapanuli Utara", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 Jam", 
    address: "Situmeang Hasundutan, North Tapanuli Regency, North Sumatra", 
    lat_long: "2.0748359775581573, 98.94342494781242", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Geosite Sipinsur", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "07.00 - 23.00", 
    address: "Parulohan, Kec. Paranginan, Kabupaten Humbang Hasundutan, Sumatera Utara", 
    lat_long: "2.3293591970762058, 98.88132952351594", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Gereja Tua HKBP Balige", 
    place_type: "Wisata Rohani", 
    entry_fee: "Gratis", 
    operational_hour: "10.00 - 16.00", 
    address: "Jl. Gereja, Balige III, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.3311701766360384, 99.06720829128471", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1548625361-12c823052d34?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Gereja Tua HKBP SIgumpar", 
    place_type: "Wisata Rohani", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sigumpar Dangsina, Kec. Sigumpar, Toba, Sumatera Utara", 
    lat_long: "2.395120284187212, 99.15735095266926", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1548625361-12c823052d34?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Gua Liang Sipege", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Hutagaol Peatalun, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.308890280711529, 99.10179902568808", 
    rating: "4.8", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1504280509243-48907c056e2c?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Gunung Pusuk Buhit", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Ginolat, Kec. Sianjur Mula Mula, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6008269597984164, 98.65154563917919", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Istana Raja Sisingamangaraja", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "24 jam", 
    address: "Simamora, Kec. Bakti Raja, Kabupaten Humbang Hasundutan, Sumatera Utara", 
    lat_long: "2.306005820043636, 98.81262538336117", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Jembatan Lae Pendaroh", 
    place_type: "Wisata Buatan", 
    entry_fee: "10.000 - 20.000", 
    operational_hour: "24 jam", 
    address: "Sidikalang-Seribudolok, Sitinjo I, Kec. Sitinjo, Kabupaten Dairi", 
    lat_long: "2.735077062165259, 98.38192129199514", 
    rating: "4.1", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1545562083-a600704fa46e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Kampung Ulos Hutaraja", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "08.00 - 17.00", 
    address: "Kampung ulos, Huta Bolon, Kec. Pangururan, Kabupaten Samosir", 
    lat_long: "2.66421841107743, 98.68906971219853", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Kawah Putih Dolok Tinggi Raja", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "09:00 - 17:00", 
    address: "Dolok Marawa, Silau Kahean, Simalungun Regency, North Sumatra", 
    lat_long: "3.1498774620014363, 98.78655231898344", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Kebun Teh Sidamanik", 
    place_type: "Wisata Alam", 
    entry_fee: null, 
    operational_hour: "24 Jam", 
    address: "Desa Bah Butong, Kec. Sidamanik", 
    lat_long: "2.8603077834594752, 98.90801049039571", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Labersa Toba Fantasi Waterpark", 
    place_type: "Wisata Buatan", 
    entry_fee: "40.000 - 50.000", 
    operational_hour: "09.00 - 18.00", 
    address: "Jl. Saribu Raja, Saribu Raja Janji Maria, Kec. Balige, Toba", 
    lat_long: "2.338981695097184, 99.08218332568822", 
    rating: "3.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Letter Z", 
    place_type: "Wisata Buatan", 
    entry_fee: "25000", 
    operational_hour: "24 jam", 
    address: "Pangaribuan, Siempat Nempu Hulu, Dairi Regency, North Sumatra", 
    lat_long: "2.8373610108088347, 98.25859632083154", 
    rating: "4.1", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1566125882500-87e27f022f6b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Makam DR. I.L. Nommensen", 
    place_type: "Wisata Rohani", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sigumpar Dangsina, Kec. Sigumpar, Toba, Sumatera Utara", 
    lat_long: "2.395502884111956, 99.15591323917884", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1548625361-12c823052d34?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Makam Sisingamangaraja XII", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Silalahi Pagar Batu, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.331051116577472, 99.04944102568821", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Manigom Nauli", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "08:00 - 18:00", 
    address: "Buntu Bartong, Tiga Dolok, Kec. Dolok Panribuan, Kabupaten Simalungun", 
    lat_long: "2.8197910091597844, 99.03792030548833", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Menara Pandang Simanindo", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 7.000", 
    operational_hour: "24 jam", 
    address: "Simanindo Sangkal, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.7483294426395792, 98.75034042383369", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Monumen D.I. Panjaitan", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.3349104174722743, 99.06404724271351", 
    rating: "4.8", 
    status: "tutup",
    image: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Monumen Perang Dunia II", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Jl. Porsea, Ps. Porsea, Kec. Porsea, Toba, Sumatera Utara", 
    lat_long: "2.44362767701753, 99.15616068465391", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Monumen Raja SONAKMALELA", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Napitupulu Bagasan, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.334519775687315, 99.06660872383264", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Mual Sipangolu (Mual Sisingamangaraja)", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Simangulampe, Kec. Bakti Raja, Kabupaten Humbang Hasundutan", 
    lat_long: "2.3210405210871796, 99.07007489814437", 
    rating: "4.9", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Mual Sirambe", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sitangkola, Kec. Laguboti, Toba, Sumatera Utara", 
    lat_long: "2.2964703223035907, 99.11723296801506", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Museum Batak T.B. Silalahi Center", 
    place_type: "Museum", 
    entry_fee: "10.000 - 20.000", 
    operational_hour: "08.30 - 16.30", 
    address: "Jl. Dr. TB. Silalahi No.88, Silalahi Pagar Batu, Kec. Balige", 
    lat_long: "2.3333867366371246, 99.04840606801524", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1565060169368-628eb6c45671?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Museum Huta Bolon Simanindo", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "10.000 - 20.000", 
    operational_hour: "08.00 - 17.00", 
    address: "Jalan Pelabuhan, Simanindo Sangkal, Simanindo, Samosir Regency", 
    lat_long: "2.752495075783331, 98.74411332568928", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1565060169368-628eb6c45671?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Objek Wisata Pantai Paris", 
    place_type: "Wisata Alam", 
    entry_fee: "15000", 
    operational_hour: "24 Jam", 
    address: "Tigaras, Dolok Pardamean, Simalungun Regency", 
    lat_long: "2.801775749425957, 98.7801203650101", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Panatapan Puncak Sidiangkat", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Sitinjo I, Kec. Sitinjo, Kabupaten Dairi, Sumatera Utara", 
    lat_long: "2.6991313206258614, 98.30348574781604", 
    rating: "4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Panorama Adian Nalambok", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "08.00 - 21.00", 
    address: "Gurgur Aek Raja, Kec. Tampahan, Toba, Sumatera Utara", 
    lat_long: "2.307646460798102, 99.01332381186874", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Panorama Lembah Bakara", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Huta Lontung, Kec. Muara, Kabupaten Tapanuli Utara, Sumatera Utara", 
    lat_long: "2.3424092944384154, 98.85931056801523", 
    rating: "5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1501854140884-074bf6bcb8ac?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Batuhoda", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "09.30 - 18.00", 
    address: "Cinta Dame, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.7601236233591098, 98.72538180548797", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Gajah Tidur Paropo Silalahi", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.831196437896846, 98.52662246315995", 
    rating: "4.1", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Kenangan", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "07:00 - 12:00", 
    address: "Tigaras, Kec. Dolok Pardamean, Kabupaten Simalungun", 
    lat_long: "2.7844166014427234, 98.8041355073385", 
    rating: "4.0", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Lumban Silintong", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Lumban Silintong, Kec. Balige, Sumatera Utara", 
    lat_long: "2.341517594609889, 99.05024732383258", 
    rating: "5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Pakkodian Tampahan", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Danau Toba, Lintong Nihuta, Kec. Tampahan, Toba, Sumatera Utara", 
    lat_long: "2.339909734703453, 99.01346289685164", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Parparean 2", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "08.00 - 18.00", 
    address: "Jl. Lintas Sumatera, Patane V, Kec. Porsea, Toba, Sumatera Utara", 
    lat_long: "2.4338404807113827, 99.14819682536269", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Pasir Putih Lumban Bul-bul Balige", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "07.00 - 21.30", 
    address: "Lumban Bulbul, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.3492596002020694, 99.07327785959252", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Pelangi", 
    place_type: "Wisata Alam", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "07.00 - 21.30", 
    address: "Lumban Pea, Kec. Balige, Toba, Sumatera Utara", 
    lat_long: "2.356344164693513, 99.09779924868393", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Pulo Tao", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "09.00 - 17.30", 
    address: "Sitalolo No.Desa, Cinta Dame, Simanindo, Samosir Regency", 
    lat_long: "2.757012591263358, 98.73455648336235", 
    rating: "4.5", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pantai Silalahi", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "08.00 - 20.00", 
    address: "Silalahi III, Kec. Silahsabungan, Kabupaten Dairi, Sumatera Utara", 
    lat_long: "2.79491108652294, 98.52778616616071", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Parhonasan", 
    place_type: "Wisata Buatan", 
    entry_fee: "Gratis", 
    operational_hour: "08.30 - 18.00", 
    address: "Sempung Polling, Lae Parira, Dairi Regency, North Sumatra", 
    lat_long: "2.8076761801605605, 98.1821342409364", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1566125882500-87e27f022f6b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pasar Tomok", 
    place_type: "Wisata Bisnis", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "07.35 - 19.00", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.652310496226617, 98.86267708336206", 
    rating: "4.4", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pasir Putih Parbaba", 
    place_type: "Wisata Alam", 
    entry_fee: "5000", 
    operational_hour: "24 jam", 
    address: "Desa Huta Bolon, Kecamatan Pangururan", 
    lat_long: "2.6967247534948746, 98.69005631394812", 
    rating: "3.8", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Patung Sigalegale", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "5.000 - 10.000", 
    operational_hour: "08.00 - 19.00", 
    address: "Tomok, Simanindo, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.6521028136146314, 98.86083039685249", 
    rating: "4.6", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Patung Yesus, Bukit Sibeabea", 
    place_type: "Wisata Rohani", 
    entry_fee: "30.000 - 100.000", 
    operational_hour: "24 jam", 
    address: "Turpuk Sihotang, Kec. Harian, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.5509849707538286, 98.67231159499654", 
    rating: "4.7", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1548625361-12c823052d34?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pemandian Aek Sipitu Dai", 
    place_type: "Wisata Budaya / Sejarah", 
    entry_fee: "10000", 
    operational_hour: "06.00 - 23.00", 
    address: "Aek Sipitudai, Kec. Sianjur Mula Mula, Kabupaten Samosir, Sumatera Utara", 
    lat_long: "2.5789980466511797, 98.64760079685229", 
    rating: "4.3", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800"
  },
  { 
    place_name: "Pemandian Air Panas Rianiate", 
    place_type: "Wisata Alam", 
    entry_fee: "Gratis", 
    operational_hour: "24 jam", 
    address: "Paropo I, Silahisabungan, Dairi Regency, North Sumatra", 
    lat_long: "2.5307880567488503, 98.7337321919938", 
    rating: "4.2", 
    status: "beroperasi",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800"
  },
];

/* ------------------------------------------------------------------ */
/*  Category visual system                                             */
/* ------------------------------------------------------------------ */

type CategoryStyle = {
  icon: typeof Mountain;
  gradient: string;
  ring: string;
  chip: string;
  glow: string;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Wisata Alam": {
    icon: Mountain,
    gradient: "from-emerald-500/25 via-emerald-900/40 to-[#0A1120]",
    ring: "text-emerald-400/25",
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    glow: "#10B981",
  },
  "Wisata Budaya / Sejarah": {
    icon: Landmark,
    gradient: "from-amber-500/25 via-amber-900/40 to-[#0A1120]",
    ring: "text-amber-400/25",
    chip: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    glow: "#F59E0B",
  },
  "Wisata Buatan": {
    icon: Building2,
    gradient: "from-indigo-500/25 via-indigo-900/40 to-[#0A1120]",
    ring: "text-indigo-400/25",
    chip: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    glow: "#6366F1",
  },
  "Wisata Rohani": {
    icon: Church,
    gradient: "from-fuchsia-500/25 via-fuchsia-900/40 to-[#0A1120]",
    ring: "text-fuchsia-400/25",
    chip: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
    glow: "#D946EF",
  },
  Museum: {
    icon: BookOpen,
    gradient: "from-sky-500/25 via-sky-900/40 to-[#0A1120]",
    ring: "text-sky-400/25",
    chip: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    glow: "#0EA5E9",
  },
  "Wisata Bisnis": {
    icon: Store,
    gradient: "from-orange-500/25 via-orange-900/40 to-[#0A1120]",
    ring: "text-orange-400/25",
    chip: "bg-orange-500/10 text-orange-300 border-orange-500/30",
    glow: "#F97316",
  },
  "Balai Masyarakat": {
    icon: Users2,
    gradient: "from-cyan-500/25 via-cyan-900/40 to-[#0A1120]",
    ring: "text-cyan-400/25",
    chip: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    glow: "#06B6D4",
  },
};

const DEFAULT_STYLE: CategoryStyle = {
  icon: MapPin,
  gradient: "from-slate-500/25 via-slate-900/40 to-[#0A1120]",
  ring: "text-slate-400/25",
  chip: "bg-slate-500/10 text-slate-300 border-slate-500/30",
  glow: "#64748B",
};

/* ------------------------------------------------------------------ */
/*  Small presentational bits                                          */
/* ------------------------------------------------------------------ */

function ContourMotif({ color }: { color: string }) {
  return (
    <svg
      className="absolute -right-6 -top-10 h-40 w-40 opacity-40 pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
    >
      {[26, 42, 58, 74, 90].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} stroke={color} strokeWidth="1" />
      ))}
    </svg>
  );
}

function RatingBadge({ rating }: { rating: string }) {
  const value = parseRating(rating);
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-amber-50">
        {value !== null ? value.toFixed(1).replace(/\.0$/, "") : "Baru"}
      </span>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const isOpen = status.toLowerCase() === "beroperasi";
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isOpen ? "bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" : "bg-rose-400"
        }`}
      />
      <span className="text-xs font-medium text-slate-100">
        {isOpen ? "Beroperasi" : "Tutup"}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function DestinationCard({ d }: { d: Destination }) {
  const style = CATEGORY_STYLES[d.place_type] ?? DEFAULT_STYLE;
  const Icon = style.icon;
  const fee = parseFee(d.entry_fee);
  const hours = d.operational_hour.toLowerCase().includes("24")
    ? "Buka 24 Jam"
    : d.operational_hour;

  // Menggunakan fungsi helper untuk link yang akurat
  const mapLink = getGoogleMapsLink(d.place_name, d.address);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1830] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.35)]">
      {/* Header with Image */}
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${style.gradient}`}>
        {/* Background Image Logic */}
        {d.image ? (
          <img
            src={d.image}
            alt={d.place_name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // Fallback jika link gambar rusak/mati
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          // Fallback Pattern jika tidak ada gambar
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${style.glow} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        )}
        
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1830] via-[#0E1830]/60 to-transparent" />
        
        {/* Decorative Elements */}
        <ContourMotif color={style.glow} />
        <Icon className={`absolute -bottom-4 -right-4 h-28 w-28 ${style.ring}`} strokeWidth={1} />
        <Icon className="absolute left-4 top-4 h-6 w-6 text-white/90 drop-shadow-md" strokeWidth={1.75} />

        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5 z-10">
          <StatusPill status={d.status} />
          <RatingBadge rating={d.rating} />
        </div>

        <span
          className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-md z-10 ${style.chip}`}
        >
          {d.place_type}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-slate-50">
          {d.place_name}
        </h3>

        <div className="flex items-start gap-2 text-xs text-slate-400">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          <span className="line-clamp-2">{d.address}</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            {hours}
          </span>
          <span className="flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5 text-slate-500" />
            <span className={fee.free ? "text-emerald-400" : "text-slate-300"}>{fee.label}</span>
          </span>
        </div>

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-950/40 transition-transform duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          Buka di Peta
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

type SortKey = "rating" | "fee" | "az";
const PAGE_SIZE = 12;

export default function Destinations() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Semua Kategori");
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => ["Semua Kategori", ...Array.from(new Set(DESTINATIONS.map((d) => d.place_type))).sort()],
    []
  );

  const stats = useMemo(() => {
    const total = DESTINATIONS.length;
    const alam = DESTINATIONS.filter((d) => d.place_type === "Wisata Alam").length;
    const gratis = DESTINATIONS.filter((d) => d.entry_fee === "Gratis").length;
    return { total, alam, gratis };
  }, []);

  const filtered = useMemo(() => {
    let list = DESTINATIONS.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        d.place_name.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q) ||
        d.place_type.toLowerCase().includes(q);
      const matchesCategory = category === "Semua Kategori" || d.place_type === category;
      return matchesQuery && matchesCategory;
    });

    list = [...list].sort((a, b) => {
      if (sortKey === "az") return a.place_name.localeCompare(b.place_name);
      if (sortKey === "fee") return parseFee(a.entry_fee).min - parseFee(b.entry_fee).min;
      const ra = parseRating(a.rating);
      const rb = parseRating(b.rating);
      if (ra === null && rb === null) return 0;
      if (ra === null) return 1;
      if (rb === null) return -1;
      return rb - ra;
    });

    return list;
  }, [query, category, sortKey]);

  const shown = filtered.slice(0, visible);

  function resetPaging() {
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -right-40 top-96 h-[480px] w-[480px] rounded-full bg-emerald-500/[0.07] blur-[140px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300">
            <Compass className="h-3.5 w-3.5" />
            {stats.total}+ Destinasi Wisata Terverifikasi
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Destinasi Wisata di Sekitar{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              Danau Toba
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Jelajahi air terjun, bukit panorama, situs budaya Batak, hingga tempat ibadah
            bersejarah — lengkap dengan rating, jam operasional, dan tiket masuk.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="font-semibold text-slate-100">{stats.total}</span> total lokasi
            </span>
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="font-semibold text-emerald-300">{stats.alam}</span> wisata alam
            </span>
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="font-semibold text-sky-300">{stats.gratis}</span> tanpa biaya masuk
            </span>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#0E1830]/80 p-3 backdrop-blur-sm md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPaging();
              }}
              placeholder="Cari nama destinasi atau lokasi..."
              className="w-full rounded-xl border border-white/10 bg-[#0A1120] py-2.5 pl-10 pr-9 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-blue-500/40 transition focus:ring-2"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  resetPaging();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label="Hapus pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                resetPaging();
              }}
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#0A1120] py-2.5 pl-3.5 pr-9 text-sm text-slate-200 outline-none ring-blue-500/40 transition focus:ring-2 md:w-56"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="relative">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="w-full appearance-none rounded-xl border border-blue-400/30 bg-blue-500/10 py-2.5 pl-3.5 pr-9 text-sm font-medium text-blue-200 outline-none ring-blue-500/40 transition focus:ring-2 md:w-48"
            >
              <option value="rating">Rating Tertinggi</option>
              <option value="fee">Tiket Termurah</option>
              <option value="az">Nama A-Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-500">
          Menampilkan <span className="text-slate-300">{shown.length}</span> dari{" "}
          <span className="text-slate-300">{filtered.length}</span> destinasi
        </p>

        {shown.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d, i) => (
              <DestinationCard key={`${d.place_name}-${i}`} d={d} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-20 text-center">
            <p className="text-sm text-slate-400">
              Tidak ada destinasi yang cocok dengan pencarian ini.
            </p>
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-200"
            >
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </main>
    </div>
  );
}