import { motion } from "framer-motion";
import { Shirt, Home, Music, Users, Heart } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const CULTURE_ITEMS = [
  {
    icon: <Shirt size={32} />,
    title: "Ulos",
    subtitle: "Kain Tenun Sakral",
    description: "Kain tradisional yang ditenun dengan penuh doa dan makna. Setiap corak memiliki filosofi tersendiri - Ulos Ragidup untuk kelahiran, Ulos Sadum untuk pernikahan, dan Ulos Tumtuman untuk kematian. Ulos bukan sekadar kain, tapi simbol kasih sayang dan restu.",
    color: "amber",
  },
  {
    icon: <Home size={32} />,
    title: "Rumah Bolon",
    subtitle: "Rumah Adat Batak",
    description: "Rumah tradisional berbentuk panggung dengan arsitektur unik. Atapnya yang melengkung seperti pelana kuda disebut 'Jabu'. Rumah ini dihuni secara bersama oleh beberapa keluarga, mencerminkan nilai kekeluargaan dan gotong royong masyarakat Batak.",
    color: "cyan",
  },
  {
    icon: <Music size={32} />,
    title: "Gondang Sabangunan",
    subtitle: "Musik Tradisional",
    description: "Ensemble musik sakral yang terdiri dari taganing (gendang), ogung (gong), sarune (serunai), dan hesek (alat perkusi). Gondang mengiringi upacara adat penting seperti pernikahan, kematian, dan pesta panen. Setiap irama memiliki makna spiritual yang mendalam.",
    color: "cyan",
  },
  {
    icon: <Users size={32} />,
    title: "Sigale-gale",
    subtitle: "Patung Kayu Penghibur",
    description: "Patung kayu yang dapat 'menari' dan 'menangis' dengan iringan gondang. Tradisi unik dari Pulau Samosir ini awalnya diciptakan untuk menghibur Raja Humalim yang berduka. Sigale-gale menjadi simbol kearifan lokal dalam menghadapi kesedihan dan kematian.",
    color: "amber",
  },
  {
    icon: <Heart size={32} />,
    title: "Dalihan Na Tolu",
    subtitle: "Filosofi Tiga Tungku",
    description: "Falsafah hidup Batak yang berarti 'tungku tiga batu'. Melambangkan tiga hubungan sosial: Hula-hula (pihak istri), Dongan Sabutuha (teman semarga), dan Boru (pihak suami). Ketiganya harus seimbang untuk menciptakan harmoni dalam masyarakat.",
    color: "amber",
  },
];

export default function CultureSpotlight() {
  return (
    <section className="relative overflow-hidden bg-[#050f1a] py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,164,74,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.1),_transparent_50%)]" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-amber-300/20 bg-gradient-to-br from-[#0e2338] via-[#153049] to-[#0f2a44] p-8 md:p-12 lg:p-16"
        >
          {/* Decorative Gradient Line */}
          <div
            className="absolute left-0 top-0 h-full w-2 hidden md:block"
            style={{
              background: "repeating-linear-gradient(180deg, #d9a44a 0 10px, #8a2f2f 10px 20px, #22d3ee 20px 30px, #d9a44a 30px 40px)",
            }}
          />

          <div className="relative z-10">
            {/* Header Section */}
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300">
                <Heart size={14} />
                Warisan Leluhur
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Lebih dari sekadar danau —{" "}
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  ini tanah leluhur Batak.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
                Setiap rekomendasi Toba Infinity menyelipkan konteks budaya: filosofi ulos, 
                arsitektur rumah Bolon, hingga cerita rakyat di balik setiap desa. AI kami 
                dilatih untuk mengenali nilai ini, bukan cuma koordinat GPS.
              </p>

              <div className="mt-8">
                <Button variant="gold">
                  <div className="flex items-center gap-2">
                    Jelajahi Budaya Batak
                  </div>
                </Button>
              </div>
            </div>

            {/* Culture Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CULTURE_ITEMS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-${item.color}-300/40 hover:shadow-[0_0_30px_rgba(${item.color === "amber" ? "217,164,74" : "34,211,238"},0.15)]`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-${item.color}-400/10 blur-3xl transition group-hover:bg-${item.color}-400/20`} />

                  {/* Icon */}
                  <div className={`relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${item.color}-400/10 text-${item.color}-300 transition group-hover:scale-110`}>
                    {item.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`relative text-xl font-bold text-${item.color}-300`}>
                    {item.title}
                  </h3>
                  <p className="relative mt-1 text-sm font-medium text-slate-400">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="relative mt-4 text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className={`absolute bottom-0 right-0 h-20 w-20 rounded-tl-full border-t border-r border-${item.color}-300/10`} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}