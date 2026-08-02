export default function DestinationHero() {
  return (
    <section
      className="relative h-[420px] overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1589308454676-22a0d7c0b7e5?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-cyan-900/40" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-8">

        <div>

          <h1 className="text-6xl font-extrabold text-white">

            Explore Lake Toba

          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-200">

            Discover destinations, nature,
            culture, culinary, and unforgettable
            experiences around Lake Toba.

          </p>

        </div>

      </div>
    </section>
  );
}