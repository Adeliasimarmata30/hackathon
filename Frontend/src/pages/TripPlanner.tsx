import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
    Compass,
    MapPin,
    X,
    Calendar,
    Wallet,
    Minus,
    Plus,
    Star,
    Loader2,
    Sparkles,
    Send,
} from "lucide-react";
import {
    generateTrip,
    getDestinationNames,
} from "../services/planner.service";

function normalize(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export default function TripPlanner() {

    const [destination, setDestination] = useState("");
    const [allDestinations, setAllDestinations] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loadingDestinations, setLoadingDestinations] = useState(true);

    const [duration, setDuration] = useState(1);

    const [budget, setBudget] = useState(700000);

    const [hotelRating, setHotelRating] = useState(4);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<any>(null);

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

        const tokens = normalize(value).split(" ").filter(Boolean);

        const filtered = allDestinations
            .filter((item) => {
                const spaced = normalize(item);
                const words = spaced.split(" ");
                const noSpace = spaced.replace(/\s+/g, "");

                return tokens.every((token) => {
                    const startsWord = words.some((w) => w.startsWith(token));

                    if (startsWord) return true;

                    // fallback untuk nama gabungan (mis. "Bul-Bul" diketik "bulbul")
                    if (token.length >= 4 && noSpace.includes(token)) return true;

                    return false;
                });
            })
            .sort((a, b) => {
                // nama yang KATA PERTAMA-nya cocok naik ke atas
                const aFirstWord = normalize(a).split(" ")[0] ?? "";
                const bFirstWord = normalize(b).split(" ")[0] ?? "";

                const aRank = aFirstWord.startsWith(tokens[0]) ? 0 : 1;
                const bRank = bFirstWord.startsWith(tokens[0]) ? 0 : 1;

                if (aRank !== bRank) return aRank - bRank;

                return a.localeCompare(b);
            })
            .slice(0, 8);

        setSuggestions(filtered);

    }

    const handleSubmit = async () => {

        if (!destination.trim()) {

            alert("Destination is required.");

            return;

        }

        setLoading(true);

        try {

            const response = await generateTrip({

                destination,

                duration,

                budget,

                hotel_rating: hotelRating,

            });

            setResult(response);

        } catch (err) {

            console.error(err);

            alert("Failed to generate itinerary.");

        }

        setLoading(false);

    };

    return (

        <div className="relative min-h-screen bg-[#080D1A] text-slate-100">

            {/* Ambient backdrop — matches the Destinations page */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[140px]" />
                <div className="absolute -right-40 top-96 h-[480px] w-[480px] rounded-full bg-emerald-500/[0.07] blur-[140px]" />
            </div>

            <div className="relative mx-auto max-w-3xl px-6 py-16 sm:px-8">

                {/* Hero */}
                <div className="mb-10">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        Disusun otomatis oleh AI
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        AI Trip{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                            Planner
                        </span>
                    </h1>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                        Pilih destinasi, durasi, dan budget hotelmu — biarkan AI menyusun itinerary
                        perjalanan yang siap dipakai.
                    </p>

                    {/* Route motif */}
                    <div className="mt-8 flex items-center gap-3 text-slate-600">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.5)]" />
                        <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#334155_0_6px,transparent_6px_12px)]" />
                        <Compass className="h-4 w-4 shrink-0 text-blue-300" />
                        <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#334155_0_6px,transparent_6px_12px)]" />
                        <MapPin className="h-4 w-4 shrink-0 text-sky-300" />
                    </div>
                </div>

                {/* Form card */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E1830]/80 p-6 backdrop-blur-sm sm:p-8">

                    <div className="grid gap-6">

                        {/* Destination */}
                        <div className="relative">

                            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                                Destination
                            </label>

                            <div className="relative">
                                <input
                                    value={destination}
                                    onChange={(e) =>
                                        handleDestinationChange(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-white/10 bg-[#0A1120] py-3 pl-4 pr-10 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-blue-500/40 transition focus:ring-2"
                                    placeholder="Pantai Bulbul"
                                />
                                {destination && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDestination("");
                                            setSuggestions([]);
                                        }}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                                        aria-label="Clear destination"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {loadingDestinations && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Loading destinations...
                                </p>
                            )}

                            {suggestions.length > 0 && (
                                <div className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0E1830] shadow-2xl shadow-black/50">
                                    {suggestions.map((place) => (
                                        <div
                                            key={place}
                                            onClick={() => {
                                                setDestination(place);
                                                setSuggestions([]);
                                            }}
                                            className="flex cursor-pointer items-center gap-2.5 border-b border-white/[0.06] px-4 py-3 text-sm text-slate-200 transition last:border-b-0 hover:bg-blue-500/10 hover:text-blue-200"
                                        >
                                            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                                            {place}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        {/* Duration */}
                        <div>
                            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                                Duration
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setDuration(n)}
                                        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                                            duration === n
                                                ? "border-blue-400/40 bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-950/40"
                                                : "border-white/10 bg-[#0A1120] text-slate-300 hover:border-white/20 hover:text-white"
                                        }`}
                                    >
                                        {n} Day{n > 1 ? "s" : ""}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                                <Wallet className="h-3.5 w-3.5 text-blue-400" />
                                Hotel Budget
                            </label>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setBudget(Math.max(0, budget - 50000))}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0A1120] text-slate-300 transition hover:border-white/20 hover:text-white"
                                    aria-label="Kurangi budget"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <div className="relative flex-1">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                        Rp
                                    </span>
                                    <input
                                        type="number"
                                        value={budget}
                                        onChange={(e) =>
                                            setBudget(Number(e.target.value))
                                        }
                                        className="w-full rounded-xl border border-white/10 bg-[#0A1120] py-3 pl-10 pr-4 text-sm text-slate-100 outline-none ring-blue-500/40 transition focus:ring-2 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setBudget(budget + 50000)}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0A1120] text-slate-300 transition hover:border-white/20 hover:text-white"
                                    aria-label="Tambah budget"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <p className="mt-1.5 text-xs text-slate-500">
                                {budget.toLocaleString("id-ID")} per malam
                            </p>
                        </div>

                        {/* Hotel Rating */}
                        <div>
                            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                                <Star className="h-3.5 w-3.5 text-blue-400" />
                                Hotel Rating
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {[3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setHotelRating(n)}
                                        className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                                            hotelRating === n
                                                ? "border-amber-400/40 bg-amber-500/10 text-amber-300"
                                                : "border-white/10 bg-[#0A1120] text-slate-300 hover:border-white/20 hover:text-white"
                                        }`}
                                    >
                                        {Array.from({ length: n }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3.5 w-3.5 ${
                                                    hotelRating === n
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "fill-slate-600 text-slate-600"
                                                }`}
                                            />
                                        ))}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {
                                loading
                                    ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    )
                                    : (
                                        <>
                                            Generate Itinerary
                                            <Send className="h-4 w-4" />
                                        </>
                                    )
                            }
                        </button>

                    </div>

                </div>

                {
                    result && (
                        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0E1830]/80 p-6 backdrop-blur-sm sm:p-8">

                            <div className="mb-5 flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10">
                                    <Sparkles className="h-4 w-4 text-blue-300" />
                                </div>
                                <h2 className="text-xl font-bold text-white">
                                    Your Itinerary
                                </h2>
                            </div>

                            <div
                                className="
                                    text-sm leading-relaxed text-slate-300
                                    [&_h1]:mb-3 [&_h1]:mt-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:first:mt-0
                                    [&_h2]:mb-2.5 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:first:mt-0
                                    [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-sky-300
                                    [&_p]:mb-3 [&_p]:leading-relaxed
                                    [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                                    [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5
                                    [&_li]:leading-relaxed
                                    [&_strong]:font-semibold [&_strong]:text-slate-100
                                    [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2
                                    [&_hr]:my-6 [&_hr]:border-white/10
                                    [&_blockquote]:border-l-2 [&_blockquote]:border-blue-400/40 [&_blockquote]:pl-4 [&_blockquote]:text-slate-400
                                    [&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-sky-300
                                "
                            >
                                <ReactMarkdown>

                                    {result.itinerary}

                                </ReactMarkdown>
                            </div>

                        </div>
                    )
                }

            </div>

        </div>

    );

}