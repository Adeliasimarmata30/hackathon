import { Plus, MessageSquare } from "lucide-react";

interface Props {
  onNewChat?: () => void;
}

export default function ChatSidebar({ onNewChat }: Props) {
  return (
    <aside className="hidden w-72 bg-[#0A2540] text-white border-r border-white/10 lg:flex lg:flex-col">

      <div className="p-5">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#22D3EE] py-3 font-semibold hover:opacity-90 transition"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="px-5 mt-6">
        <p className="text-xs uppercase tracking-wider text-white/40">
          Recent Chats
        </p>
      </div>

      <div className="flex-1 px-3 py-4 space-y-2">

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-white/70 hover:bg-white/10 transition">

          <MessageSquare size={18} className="text-white/40" />

          <span className="truncate">
            Hotel terbaik di Balige
          </span>

        </button>

      </div>

    </aside>
  );
}