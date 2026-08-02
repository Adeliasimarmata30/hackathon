interface ChatBubbleProps {
  role: "user" | "assistant";
  message: string;
}

export default function ChatBubble({
  role,
  message,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] items-end gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl text-white ${
            isUser
              ? "bg-gradient-to-r from-[#2563EB] to-[#22D3EE]"
              : "bg-white/10"
          }`}
        >
          {isUser ? "👤" : "🤖"}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-3xl px-5 py-4 shadow-md ${
            isUser
              ? "rounded-br-md bg-gradient-to-r from-[#2563EB] to-[#22D3EE] text-white"
              : "rounded-bl-md border border-white/10 bg-white/5 text-white backdrop-blur-xl"
          }`}
        >
          <p className="whitespace-pre-line leading-7">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}