const categories = [
  "All",
  "Nature",
  "Culture",
  "Waterfall",
  "Village",
  "Museum",
];

export default function DestinationFilter() {
  return (
    <div className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-4 px-6">

      {categories.map((item) => (

        <button
          key={item}
          className="rounded-full border px-6 py-3 transition hover:bg-cyan-500 hover:text-white"
        >

          {item}

        </button>

      ))}

    </div>
  );
}