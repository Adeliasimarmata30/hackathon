import { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/chatbot/ChatBubble";
import ChatSidebar from "../components/chatbot/ChatSidebar";
import { askAI } from "../services/chatbot";
import QuickPrompts from "../components/chatbot/QuickPrompts";
import {
  Sparkles,
  Send,
  Waves,
  Cpu,
  Bot,
  Clock,
  Database,
  CornerDownLeft,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  message: string;
}

const STARTER_PROMPTS = [
  "Rekomendasi hotel terbaik di Balige",
  "Air terjun apa saja di sekitar Danau Toba?",
  "Susun itinerary 3 hari di Pulau Samosir",
  "Kuliner khas Batak yang wajib dicoba",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [retrievedDocuments, setRetrievedDocuments] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userQuestion = question;
    setMessages((prev) => [...prev, { role: "user", message: userQuestion }]);
    setQuestion("");
    setLoading(true);

    try {
      const result = await askAI(userQuestion);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: result.answer },
      ]);
      setProvider(result.provider);
      setModel(result.model);
      setResponseTime(result.response_time);
      setRetrievedDocuments(result.retrieved_documents);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: "Maaf, terjadi kesalahan saat menghubungi server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuestion("");
    setProvider("");
    setModel("");
    setResponseTime(null);
    setRetrievedDocuments(0);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#080D1A]">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-cyan-400/[0.08] blur-[140px]" />
      </div>

      <div className="relative flex h-full">
        <ChatSidebar onNewChat={handleNewChat} />

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="flex h-full max-h-[900px] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0E1830]/80 shadow-2xl shadow-black/40 backdrop-blur-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-950/40">
                  <Waves className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    TOBA INFINITY AI
                  </h1>
                  <p className="mt-0.5 text-sm text-slate-400">
                    Ask anything about Lake Toba Tourism
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" />
                Online
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  {/* Ripple motif — echoes Toba's crater lake */}
                  <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-cyan-400/20" />
                    <span className="absolute inset-2 rounded-full border border-cyan-400/15" />
                    <span className="absolute inset-4 rounded-full border border-cyan-400/10" />
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-950/40">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Selamat datang 👋
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
                    Tanyakan apa saja seputar wisata, hotel, destinasi, budaya Batak, kuliner,
                    hingga rencana perjalananmu.
                  </p>

                  <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => setQuestion(prompt)}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left text-xs text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-200 sm:text-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <ChatBubble key={index} role={msg.role} message={msg.message} />
              ))}

              {loading && (
                <div className="mb-6 flex justify-start">
                  <div className="flex items-end gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-lg shadow-lg shadow-blue-950/30">
                      🤖
                    </div>
                    <div className="rounded-3xl rounded-bl-md border border-white/10 bg-white/[0.06] px-6 py-4">
                      <div className="flex gap-2">
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400" />
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "0.2s" }} />
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.08] p-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <textarea
                    rows={2}
                    value={question}
                    disabled={loading}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything about Lake Toba..."
                    className="w-full resize-none rounded-2xl border border-white/[0.1] bg-[#0A1120] p-4 pr-4 text-sm text-white placeholder-slate-500 outline-none ring-cyan-400/30 transition focus:border-cyan-400/40 focus:ring-2"
                  />
                  <span className="pointer-events-none absolute bottom-2.5 right-4 hidden items-center gap-1 text-[11px] text-slate-600 sm:flex">
                    <CornerDownLeft className="h-3 w-3" />
                    to send
                  </span>
                </div>
                <button
                  disabled={loading}
                  onClick={handleSend}
                  className="flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    "Thinking..."
                  ) : (
                    <>
                      Send
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              {provider && (
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
                    <Cpu className="h-3 w-3 text-cyan-400" />
                    <strong className="font-medium text-slate-200">{provider}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
                    <Bot className="h-3 w-3 text-cyan-400" />
                    <strong className="font-medium text-slate-200">{model}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
                    <Clock className="h-3 w-3 text-cyan-400" />
                    <strong className="font-medium text-slate-200">{responseTime}s</strong>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
                    <Database className="h-3 w-3 text-cyan-400" />
                    <strong className="font-medium text-slate-200">{retrievedDocuments}</strong>
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}