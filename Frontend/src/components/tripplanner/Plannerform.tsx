import { useEffect, useState } from "react";
import { getDestinationNames } from "../../services/planner.service";
import type { TripRequest } from "../../types/planner";

interface PlannerFormProps {
  onSubmit: (data: TripRequest) => void;
  loading: boolean;
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function PlannerForm({
  onSubmit,
  loading,
}: PlannerFormProps) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(1);
  const [budget, setBudget] = useState(700000);
  const [hotelRating, setHotelRating] = useState(4);

  const [allDestinations, setAllDestinations] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDestinationNames();
        setAllDestinations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDestinations(false);
      }
    }

    load();
  }, []);

  function handleDestinationChange(value: string) {
    setDestination(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const keyword = normalize(value);

    const filtered = allDestinations
      .filter((item) => normalize(item).includes(keyword))
      .slice(0, 8);

    setSuggestions(filtered);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!destination.trim()) {
      alert("Please select a destination.");
      return;
    }

    onSubmit({
      destination,
      duration,
      budget,
      hotel_rating: hotelRating,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">

      <div className="relative">
        <label>Destination</label>

        <input
          type="text"
          value={destination}
          onChange={(e) =>
            handleDestinationChange(e.target.value)
          }
          placeholder="Search destination..."
          className="w-full rounded-lg border p-3"
        />

        {loadingDestinations && (
          <p className="mt-2 text-sm text-gray-500">
            Loading destinations...
          </p>
        )}

        {suggestions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">

            {suggestions.map((place) => (
              <div
                key={place}
                onClick={() => {
                  setDestination(place);
                  setSuggestions([]);
                }}
                className="cursor-pointer border-b p-3 hover:bg-cyan-50"
              >
                {place}
              </div>
            ))}

          </div>
        )}
      </div>

      <div>
        <label>Duration</label>

        <select
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days</option>
          <option value={4}>4 Days</option>
          <option value={5}>5 Days</option>
        </select>
      </div>

      <div>
        <label>Maximum Hotel Budget (Rp)</label>

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label>Minimum Hotel Rating</label>

        <select
          value={hotelRating}
          onChange={(e) =>
            setHotelRating(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        >
          <option value={1}>1 ★</option>
          <option value={2}>2 ★</option>
          <option value={3}>3 ★</option>
          <option value={4}>4 ★</option>
          <option value={5}>5 ★</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-cyan-600 py-3 text-white"
      >
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>

    </form>
  );
}