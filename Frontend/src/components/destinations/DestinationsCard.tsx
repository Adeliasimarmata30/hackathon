interface Props {
  image: string;
  title: string;
  location: string;
  rating: number;
  description: string;
}

export default function DestinationCard({
  image,
  title,
  location,
  rating,
  description,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-bold">
            {title}
          </h3>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            ⭐ {rating}
          </span>

        </div>

        <p className="mt-2 text-sm text-slate-500">
          📍 {location}
        </p>

        <p className="mt-4 line-clamp-3 text-slate-600">
          {description}
        </p>

        <button className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700">
          View Details
        </button>

      </div>

    </div>
  );
}