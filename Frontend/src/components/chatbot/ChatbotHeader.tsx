import { Bot } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b bg-white px-8 py-5">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg">
          <Bot size={26} />
        </div>

        <div>

          <h1 className="text-xl font-bold text-slate-800">
            TOBA INFINITY AI
          </h1>

          <p className="text-sm text-slate-500">
            Smart Tourism Assistant
          </p>

        </div>

      </div>

      <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        ● Online
      </div>

    </div>
  );
}