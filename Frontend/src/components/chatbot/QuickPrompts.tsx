import {
  Hotel,
  Map,
  UtensilsCrossed,
  Landmark,
} from "lucide-react";

interface Props {
  onSelect: (question: string) => void;
}

const prompts = [
  {
    icon: Hotel,
    title: "Best Hotels",
    subtitle: "Recommend the best hotels in Balige",
    question: "Recommend the best hotels in Balige",
  },
  {
    icon: Map,
    title: "Trip Planner",
    subtitle: "Create a 3-day itinerary around Lake Toba",
    question: "Create a 3-day itinerary around Lake Toba",
  },
  {
    icon: UtensilsCrossed,
    title: "Local Culinary",
    subtitle: "Recommend Batak traditional foods",
    question: "Recommend Batak traditional foods around Lake Toba",
  },
  {
    icon: Landmark,
    title: "Batak Culture",
    subtitle: "Tell me about Batak culture",
    question: "Tell me about Batak culture and traditions",
  },
];

export default function QuickPrompts({
  onSelect,
}: Props) {
  return (
    <div className="mt-14">

      <div className="mb-8 text-center">

        <h2 className="text-4xl font-bold text-white">
          Welcome to TOBA INFINITY AI
        </h2>

        <p className="mt-3 text-white/60">
          Start by choosing one of the suggested questions
          or ask your own.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {prompts.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              onClick={() => onSelect(item.question)}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
                text-left
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-cyan-400/40
                hover:bg-white/10
                hover:shadow-[0_20px_60px_rgba(34,211,238,.15)]
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#2563EB]
                  to-[#22D3EE]
                  text-white
                  shadow-lg
                "
              >

                <Icon size={28} />

              </div>

              <h3
                className="
                  mt-6
                  text-xl
                  font-semibold
                  text-white
                  group-hover:text-cyan-300
                  transition
                "
              >
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">

                {item.subtitle}

              </p>

            </button>

          );

        })}

      </div>

    </div>
  );
}