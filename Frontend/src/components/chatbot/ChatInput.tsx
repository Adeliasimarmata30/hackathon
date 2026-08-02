interface Props {

  value: string;

  loading: boolean;

  onChange: (value: string) => void;

  onSend: () => void;

}

export default function ChatInput({

  value,

  loading,

  onChange,

  onSend,

}: Props) {

  return (

    <div className="border-t bg-white p-6">

      <div className="flex gap-4">

        <textarea

          rows={2}

          value={value}

          disabled={loading}

          placeholder="Ask anything about Lake Toba..."

          onChange={(e) => onChange(e.target.value)}

          onKeyDown={(e) => {

            if (e.key === "Enter" && !e.shiftKey) {

              e.preventDefault();

              onSend();

            }

          }}

          className="flex-1 resize-none rounded-2xl border border-slate-300 p-4 outline-none focus:border-cyan-500"

        />

        <button

          onClick={onSend}

          disabled={loading}

          className="rounded-2xl bg-cyan-500 px-8 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50"

        >

          {loading ? "Thinking..." : "Send"}

        </button>

      </div>

    </div>

  );

}