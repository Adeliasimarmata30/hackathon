export default function ChatLoading() {

  return (

    <div className="mb-6 flex justify-start">

      <div className="flex items-end gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 text-white">

          🤖

        </div>

        <div className="rounded-3xl rounded-bl-md border bg-white px-6 py-5 shadow">

          <div className="flex gap-2">

            <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-500"></span>

            <span
              className="h-3 w-3 animate-bounce rounded-full bg-cyan-500"
              style={{ animationDelay: "0.2s" }}
            ></span>

            <span
              className="h-3 w-3 animate-bounce rounded-full bg-cyan-500"
              style={{ animationDelay: "0.4s" }}
            ></span>

          </div>

        </div>

      </div>

    </div>

  );

}