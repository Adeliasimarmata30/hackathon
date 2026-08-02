import { motion } from "framer-motion";
import {
  Shirt,
  Music,
  Home as HomeIcon,
  PersonStanding,
  PlayCircle,
  ExternalLink,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import Container from "../components/ui/container";

export default function Culture() {
  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-[#050f1a] pb-16 pt-40">
        <div
          className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <span
              className="
              inline-block
              rounded-full
              border
              border-amber-300/40
              bg-white/5
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-amber-300
            "
            >
              Warisan Batak
            </span>

            <h1
              className="
              mt-6
              max-w-3xl
              text-4xl
              font-extrabold
              leading-tight
              text-white
              md:text-6xl
            "
            >
              Budaya Batak Toba
            </h1>

            <p
              className="
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-300
            "
            >
              Di sekitar Danau Toba, kehidupan masyarakat Batak masih kental
              dengan adat: kain ulos yang sarat makna, dentuman gondang yang
              menghidupkan tarian tor-tor, ukiran gorga di dinding rumah
              bolon, hingga legenda patung Sigale-gale yang menari. Kenali
              warisan ini sebelum kamu menjelajah Toba.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ULOS */}
      <CultureSection
        icon={<Shirt />}
        eyebrow="Kain Tenun"
        title="Ulos"
        image="https://placehold.co/900x600/0e2338/22d3ee?text=Ulos+Batak"
        imageAlt="Kain ulos Batak"
      >
        <p>
          Ulos adalah kain tenun tradisional Batak yang diperkirakan mulai
          dikenal sejak abad ke-14. Ditenun dengan alat tenun bukan mesin,
          ulos didominasi warna merah, hitam, dan putih yang masing-masing
          melambangkan keberanian, keteguhan, dan kesucian.
        </p>
        <p>
          Lebih dari sekadar kain, ulos adalah simbol kehangatan, restu, dan
          perlindungan. Tradisi{" "}
          <span className="text-cyan-300">mangulosi</span> — menyampirkan
          ulos ke tubuh seseorang — dilakukan pada momen-momen penting
          kehidupan: kelahiran, pernikahan, hingga kematian. Setiap jenis
          ulos punya aturannya sendiri; Ulos Ragi Hotang misalnya dikenakan
          dalam pernikahan sebagai simbol ikatan kasih yang kuat, sementara
          Ulos Saput dipakai untuk membungkus jenazah sebagai penghormatan
          terakhir.
        </p>
      </CultureSection>

      {/* TOR-TOR & GONDANG */}
      <CultureSection
        icon={<Music />}
        eyebrow="Tari & Musik"
        title="Tor-Tor & Gondang"
        image="https://placehold.co/900x600/0e2338/22d3ee?text=Tari+Tor-Tor"
        imageAlt="Tari tor-tor Batak"
        reverse
      >
        <p>
          Namanya berasal dari bunyi hentakan kaki penari di atas lantai
          kayu rumah adat: tor... tor... tor.... Awalnya bukan sekadar
          hiburan, tor-tor adalah tarian ritual yang mengiringi upacara
          pernikahan, kelahiran, hingga kematian — sebuah bahasa tubuh yang
          menyampaikan doa, syukur, dan penghormatan.
        </p>
        <p>
          Tor-tor tidak pernah berdiri sendiri. Ia selalu diiringi{" "}
          <span className="text-cyan-300">gondang</span>, ansambel musik
          yang terdiri dari taganing (gendang bernada), gordang (gendang
          besar penentu ritme), ogung (gong), sarune (alat tiup), dan hesek
          sebagai perkusi. Ritme gondang bahkan menentukan gerakan penari —
          keduanya berdialog sepanjang pertunjukan berlangsung.
        </p>
      </CultureSection>

      {/* RUMAH BOLON & GORGA */}
      <CultureSection
        icon={<HomeIcon />}
        eyebrow="Arsitektur"
        title="Rumah Bolon & Gorga"
        image="https://placehold.co/900x600/0e2338/22d3ee?text=Rumah+Bolon"
        imageAlt="Rumah Bolon Batak"
      >
        <p>
          Rumah Bolon adalah rumah panggung khas Batak yang dulunya bisa
          dihuni lima hingga enam keluarga sekaligus. Atapnya yang menjulang
          dari ijuk dan daun rumbia dibentuk menyerupai punggung kerbau,
          dipercaya membawa doa kesuksesan bagi penghuninya.
        </p>
        <p>
          Yang membuatnya istimewa adalah ukiran{" "}
          <span className="text-cyan-300">gorga</span> di dinding luar —
          motif cicak melambangkan kemampuan orang Batak beradaptasi di
          mana pun mereka merantau, motif kerbau sebagai ucapan terima
          kasih atas jasanya membantu manusia, sementara motif payudara
          melambangkan kesuburan dan kehidupan yang bersumber dari ibu.
          Setiap goresan gorga bukan hiasan semata, tapi pesan turun-temurun
          dari leluhur.
        </p>
      </CultureSection>

      {/* SIGALE-GALE */}
      <CultureSection
        icon={<PersonStanding />}
        eyebrow="Legenda & Patung"
        title="Sigale-Gale"
        image="https://placehold.co/900x600/0e2338/22d3ee?text=Sigale-Gale"
        imageAlt="Patung Sigale-gale"
        reverse
      >
        <p>
          Di Pulau Samosir, ada patung kayu yang bisa "menari" — Sigale-gale.
          Legenda menyebut asal-usulnya dari kesedihan Raja Rahat yang
          kehilangan putra semata wayangnya, Manggale, dalam sebuah
          pertempuran. Untuk menghibur raja yang jatuh sakit, seorang tabib
          menyarankan dibuatkan patung kayu menyerupai sang putra sebagai
          media pemanggilan roh.
        </p>
        <p>
          Dahulu, Sigale-gale dipentaskan dalam ritual{" "}
          <span className="text-cyan-300">papurpur sapata</span> — upacara
          kematian bagi mereka yang tidak memiliki keturunan, diiringi
          gondang dan tor-tor. Kini, pertunjukannya lebih dikenal sebagai
          atraksi budaya di Desa Tomok, Samosir, di mana patung digerakkan
          seorang dalang dari balik panggung, tetap diiringi tabuhan gondang
          yang sama seperti ratusan tahun lalu.
        </p>
      </CultureSection>

      {/* EXPLORE MORE */}
      <section className="bg-[#050f1a] py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="
              rounded-full
              border
              border-cyan-300/40
              bg-white/10
              px-4
              py-2
              text-sm
              text-cyan-100
              backdrop-blur-md
            "
            >
              Jelajahi Lebih Lanjut
            </span>

            <h2
              className="
              mt-6
              max-w-xl
              text-3xl
              font-extrabold
              leading-tight
              text-white
              md:text-4xl
            "
            >
              Saksikan langsung lewat video & referensi
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              <ResourceLink
                icon={<PlayCircle size={18} />}
                title="Tari Tor-Tor & Gondang Sabangunan"
                desc="Cari pertunjukan tor-tor dan musik gondang di YouTube"
                href="https://www.youtube.com/results?search_query=tari+tor-tor+gondang+sabangunan+batak+toba"
              />

              <ResourceLink
                icon={<PlayCircle size={18} />}
                title="Pertunjukan Patung Sigale-Gale"
                desc="Cari video pertunjukan Sigale-gale di Tomok, Samosir"
                href="https://www.youtube.com/results?search_query=pertunjukan+patung+sigale-gale+tomok+samosir"
              />

              <ResourceLink
                icon={<ExternalLink size={18} />}
                title="Tari Tor-Tor — UNESCO Indonesia"
                desc="Artikel mendalam tentang sejarah dan filosofi tor-tor"
                href="https://unesco.or.id/budaya/tari-tor-tor-simbol-kebersamaan/"
              />

              <ResourceLink
                icon={<ExternalLink size={18} />}
                title="Sigalegale — Wikipedia"
                desc="Referensi bahasa Inggris tentang legenda Sigale-gale"
                href="https://en.wikipedia.org/wiki/Sigalegale"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

function CultureSection({
  icon,
  eyebrow,
  title,
  image,
  imageAlt,
  children,
  reverse = false,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="bg-[#050f1a] py-20">
      <Container>
        <div
          className={`
          grid
          grid-cols-1
          items-center
          gap-12
          lg:grid-cols-2
          ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
        `}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-72 w-full object-cover md:h-96"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/900x600/0e2338/22d3ee?text=Toba+Infinity";
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300">
              {icon}
            </div>

            <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-amber-300">
              {eyebrow}
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-white">
              {title}
            </h2>

            <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
              {children}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ResourceLink({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
      group
      flex
      items-start
      gap-4
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-6
      backdrop-blur-md
      transition
      hover:border-cyan-300/40
    "
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-1 text-xs text-slate-400">{desc}</p>
      </div>
    </a>
  );
}