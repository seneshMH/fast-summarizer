"use client";

import { useState } from "react";

export default function Summarizer() {
    const [text, setText] = useState("");
    const [percentage, setPercentage] = useState(0.5);
    const [summary, setSummary] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSummarize = async () => {
        setLoading(true);
        setError("");
        setSummary([]);

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

        try {
            const response = await fetch(`${backendUrl}/summarize`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, percentage }),
            });

            if (!response.ok) {
                throw new Error("Failed to summarize text");
            }

            const data = await response.json();
            setSummary(data.summary);
        } catch (err) {
            setError("An error occurred while summarizing. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-full backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 transition-all duration-300 hover:shadow-blue-500/10">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-3xl">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-pink-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>
                    <p className="mt-6 text-white text-lg font-semibold animate-pulse">Generating Summary...</p>
                    <p className="mt-2 text-blue-200/60 text-sm">Analyzing your text with AI</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-hidden">
                {/* Left Column: Input */}
                <div className="flex flex-col space-y-4 h-full min-h-0">
                    <div className="flex-grow flex flex-col space-y-2 min-h-0">
                        <div className="flex items-center space-x-2 text-blue-100 border-b border-white/10 pb-2 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <h2 className="text-base font-semibold uppercase tracking-wider">
                                Original Text
                            </h2>
                        </div>
                        <textarea
                            className="flex-grow w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white placeholder-white/30 focus:border-blue-400 focus:bg-black/30 resize-none transition-all duration-200 ease-in-out text-base leading-relaxed shadow-inner min-h-0 outline-none"
                            placeholder="Paste your article, essay, or document here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3 flex-shrink-0">
                        <div className="flex justify-between items-center text-blue-100">
                            <span className="text-xs font-semibold uppercase tracking-wider">Summary Length</span>
                            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold">
                                {Math.round(percentage * 100)}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="0.9"
                            step="0.1"
                            value={percentage}
                            onChange={(e) => setPercentage(parseFloat(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400 hover:accent-blue-300 transition-colors"
                        />
                        <div className="flex justify-between text-xs text-white/40 px-1">
                            <span>Short</span>
                            <span>Balanced</span>
                            <span>Detailed</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSummarize}
                        disabled={loading || !text}
                        className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] rounded-xl font-bold text-base shadow-lg shadow-blue-900/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center group flex-shrink-0"
                    >
                        <span className="flex items-center space-x-2">
                            <span>Generate Summary</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    {error && (
                        <div className="p-3 text-red-200 bg-red-900/30 border border-red-500/30 rounded-xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{error}</span>
                        </div>
                    )}
                </div>

                {/* Right Column: Summary Result */}
                <div className="flex flex-col space-y-2 h-full min-h-0">
                    <div className="flex items-center space-x-2 text-blue-100 border-b border-white/10 pb-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <h2 className="text-base font-semibold uppercase tracking-wider">
                            Summary Result
                        </h2>
                    </div>

                    <div className="flex-grow p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner overflow-y-auto min-h-0">
                        {summary.length > 0 ? (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {summary.map((sentence, index) => (
                                    <p key={index} className="text-gray-100 leading-relaxed text-base font-light">
                                        {sentence}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-base font-light">Your summary will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
