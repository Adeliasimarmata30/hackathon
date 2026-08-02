import { motion } from "framer-motion";
import { MapPinned, Bot, Hotel, UtensilsCrossed, Landmark, MessageCircle, ArrowRight } from "lucide-react";
import Container from "../ui/Container";

const FEATURES = [
  { icon: <MapPinned />, label: "Destinasi", desc: "250+ destinasi wisata di sekitar Danau Toba, lengkap rating & jam operasional.", preview: <div className="space-y-2 text-xs text-slate-300"><div className="flex items-center gap-2 border-b border-white/5 pb-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Pantai Pasir Putih Bul-Bul</div><div className="flex items-center gap-2 border-b border-white/5 pb-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Air Terjun Sipiso-piso</div><div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Bukit Pahoda</div></div> },
  { icon: <Bot />, label: "Trip Planner", desc: "AI menyusun itinerary personal sesuai durasi, budget, dan preferensi hotel.", preview: <div className="text-xs text-slate-300"><div className="flex justify-between py-1"><span>Destinasi</span><span>Balige</span></div><div className="flex justify-between py-1"><span>Durasi</span><span>3 Hari</span></div><div className="mt-2 h-1.5 w-2/3 rounded-full bg-gradient-to-r from-[#0f4c81] to-cyan-400" /></div> },
  { icon: <Hotel />, label: "Hotel", desc: "150+ hotel terverifikasi dengan rating dan kisaran harga per malam.", preview: <div className="space-y-1.5 text-xs text-slate-300"><div className="flex justify-between"><span>Labersa Hotel</span><span className="text-amber-400">★★★★★</span></div><div className="flex justify-between"><span>Gemma Hotel Balige</span><span className="text-amber-400">★★★★</span></div></div> },
  { icon: <UtensilsCrossed />, label: "Kuliner", desc: "300+ resto dan kuliner khas Batak — dari mie gomak sampai ikan arsik.", preview: <div className="space-y-1.5 text-xs text-slate-300"><div className="flex justify-between"><span>Damar Toba Eatery</span><span className="text-cyan-300">Rp 45rb</span></div><div className="flex justify-between"><span>Hutanta Cafe</span><span className="text-cyan-300">Rp 30rb</span></div></div> },
  { icon: <Landmark />, label: "Budaya", desc: "Kenali filosofi ulos, rumah Bolon, dan tradisi Batak lewat kurasi AI.", preview: <div className="flex flex-wrap gap-1.5"><span className="rounded-md bg-amber-400/10 px-2 py-1 text-[10px] text-amber-300">Ulos</span><span className="rounded-md bg-amber-400/10 px-2 py-1 text-[10px] text-amber-300">Rumah Bolon</span><span className="rounded-md bg-amber-400/10 px-2 py-1 text-[10px] text-amber-300">Sigale-gale</span></div> },
  { icon: <MessageCircle />, label: "AI Chat", desc: "Tanya apa saja soal Toba, dijawab AI berbasis data destinasi & budaya.", preview: <div className="space-y-1.5 text-[11px]"><div className="max-w-[85%] rounded-xl rounded-bl-sm bg-cyan-300/10 px-3 py-2 text-cyan-100">Rekomendasi pantai buat keluarga?</div><div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-white/10 px-3 py-2 text-slate-300">Coba Pantai Bul-Bul, Samosir</div></div> },
];

export default function FeaturePreview() {
  return (
    <section className="relative overflow-hidden bg-[#050f1a] py-24">
      <Container>
        <span className="rounded-full border border-cyan-300/40 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur-md">
          Jelajahi Fitur
        </span>

        <h2 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight text-white lg:text-5xl">
          Semua yang kamu butuhkan, <br className="hidden sm:block" />
          <span className="text-cyan-300">satu platform.</span>
        </h2>

        <p className="mt-4 max-w-lg text-lg leading-8 text-slate-300">
          Sekilas tampilan dari tiap menu — dari cari destinasi, susun itinerary, sampai tanya-tanya budaya Batak ke AI.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-cyan-300/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300 transition group-hover:scale-110 group-hover:bg-cyan-300/20">
                  {feature.icon}
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-cyan-300">
                  {feature.label}
                  <ArrowRight size={12} className="transition group-hover:translate-x-1" />
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">{feature.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>

              <div className="mt-6 rounded-xl border border-white/5 bg-black/30 p-4">
                {feature.preview}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}