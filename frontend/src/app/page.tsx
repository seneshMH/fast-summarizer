import Summarizer from "@/components/Summarizer";

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div className="w-full max-w-7xl h-full flex flex-col">
        <div className="text-center mb-6 space-y-2 flex-shrink-0">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200 drop-shadow-lg">
            Fast Summarizer
          </h1>
          <p className="text-base md:text-lg text-blue-100/80 font-light tracking-wide max-w-2xl mx-auto">
            Transform long text into concise insights with our advanced extractive summarization engine.
          </p>
        </div>
        <div className="flex-grow overflow-hidden">
          <Summarizer />
        </div>
      </div>
    </main>
  );
}
