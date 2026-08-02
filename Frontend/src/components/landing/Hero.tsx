import { motion } from "framer-motion";
import { ArrowRight, Bot, MapPinned, Hotel, UtensilsCrossed, MessageCircle, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/d/d4/Lake_Toba%2C_Indonesia_%28Unsplash%29.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <img src={HERO_IMAGE} alt="Lake Toba" className="absolute inset-0 h-full w-full object-cover scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08263D]/95 via-[#0F4C81]/70 to-[#0F4C81]/40" />

      <Container>
        <div className="relative z-10 grid items-center gap-16 py-20 lg:grid-cols-2 lg:py-0">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur-md">
              <Sparkles size={14} className="text-cyan-300" />
              AI Smart Tourism Platform
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-[1.1] text-white lg:text-7xl">
              Jelajahi Danau Toba <br />
              <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                dengan Kecerdasan Buatan
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              Temukan destinasi tersembunyi, pelajari budaya Batak, dan biarkan AI menyusun itinerary personal sesuai gaya perjalananmu.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button>
                <div className="flex items-center gap-2">
                  Mulai Jelajahi <ArrowRight size={18} />
                </div>
              </Button>
              <button className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                Ngobrol dengan AI
              </button>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
              <Stat number="250+" label="Destinasi" />
              <Stat number="150+" label="Hotel" />
              <Stat number="300+" label="Kuliner" />
              <Stat number="8" label="Kabupaten" />
            </div>
          </motion.div>

          {/* RIGHT - AI Cards */}
          <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="hidden lg:block">
            <div className="grid gap-6">
              {/* Trip Planner */}
              <div className="rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl transition hover:border-cyan-300/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-300">
                    <Bot size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI Trip Planner</h2>
                    <p className="text-sm text-slate-300">Rekomendasi Cerdas</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <PlannerItem icon={<MapPinned size={18} />} text="Destinasi : Balige" />
                  <PlannerItem icon={<Hotel size={18} />} text="Durasi : 3 Hari" />
                  <PlannerItem icon={<UtensilsCrossed size={18} />} text="Budget : Rp 2.500.000" />
                </div>
                <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 py-4 font-bold text-slate-900 transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20">
                  Buat Itinerary
                </button>
              </div>

              {/* AI Chat */}
              <div className="rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl transition hover:border-amber-300/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI Chat Assistant</h2>
                    <p className="text-sm text-slate-300">Tanya Apa Saja</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <ChatBubble text="Rekomendasi pantai buat keluarga?" isUser />
                  <ChatBubble text="Coba Pantai Bul-Bul di Samosir! Cocok untuk anak-anak." isBot />
                </div>
                <button className="mt-6 w-full rounded-2xl border border-amber-400/40 bg-amber-400/10 py-4 font-bold text-amber-300 transition hover:bg-amber-400/20">
                  Mulai Chatting
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <h3 className="text-3xl font-bold text-white lg:text-4xl">{number}</h3>
      <p className="mt-1 text-sm text-slate-300">{label}</p>
    </div>
  );
}

function PlannerItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 text-white ring-1 ring-white/10">
      <div className="text-cyan-300">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function ChatBubble({ text, isUser, isBot }: { text: string; isUser?: boolean; isBot?: boolean }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-3 ${isUser ? "ml-auto max-w-[85%] bg-cyan-400/10 text-cyan-100" : "max-w-[85%] bg-white/5 text-slate-300 ring-1 ring-white/10"}`}>
      {isBot && <Bot size={14} className="mt-1 shrink-0 text-cyan-300" />}
      <span className="text-sm">{text}</span>
    </div>
  );
}