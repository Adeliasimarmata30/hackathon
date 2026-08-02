import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import Container from "../ui/Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050f1a] pt-20">
      {/* subtle top glow line */}
      <div
        className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-cyan-300/60
        to-transparent
      "
      />

      <Container>
        <div
          className="
          grid
          grid-cols-1
          gap-12
          pb-16
          md:grid-cols-2
          lg:grid-cols-5
        "
        >
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-white">
              TOBA <span className="text-cyan-300">INFINITY</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Platform pariwisata pintar untuk Danau Toba — memadukan
              kecerdasan buatan dengan kekayaan budaya Batak, agar setiap
              perjalanan terasa personal dan bermakna.
            </p>
          </div>

          {/* JELAJAH */}
          <FooterColumn
            title="Jelajah"
            links={["Destinasi", "Trip Planner", "Hotel", "Kuliner"]}
          />

          {/* BUDAYA */}
          <FooterColumn
            title="Budaya"
            links={["Sejarah Batak", "Ulos & Rumah Bolon", "Cerita Rakyat"]}
          />

          {/* KONTAK */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Kontak
            </h4>

            <div className="mt-5 space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-300" />
                Balige, Kabupaten Toba, Sumatera Utara
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-cyan-300" />
                hello@tobainfinity.id
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-cyan-300" />
                +62 812-3456-7890
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="
          flex
          flex-col
          gap-4
          border-t
          border-white/10
          py-8
          text-xs
          text-slate-500
          md:flex-row
          md:items-center
          md:justify-between
        "
        >
          <span>&copy; 2026 Toba Infinity. All rights reserved.</span>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-cyan-300">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-cyan-300">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        {title}
      </h4>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="
              group
              flex
              items-center
              gap-1
              text-sm
              text-slate-400
              transition
              hover:text-cyan-300
            "
            >
              {link}
              <ArrowUpRight
                size={13}
                className="
                opacity-0
                transition
                group-hover:opacity-100
              "
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}