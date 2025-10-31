"use client";
import React, { useState } from "react";

const words = [
  { word: "CAN", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { word: "CAT", video: "https://www.w3schools.com/html/movie.mp4" },
  { word: "DO", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { word: "DOG", video: "https://www.w3schools.com/html/movie.mp4" },
  { word: "EAT", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { word: "RUN", video: "https://www.w3schools.com/html/movie.mp4" },
  { word: "JUMP", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function Dictionary() {
  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);

  const filteredWords = words.filter((w) =>
    w.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#16202a] text-[#eaf6fb] flex flex-col items-center font-sans py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Search for a word</h2>

      <input
        type="text"
        placeholder="Type a word..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full sm:w-[350px] md:w-[400px]
          bg-[#1c2733] text-[#eaf6fb]
          rounded-lg border-none shadow-[0_0_6px_#1de972]
          px-4 py-2.5 mb-8 outline-none
          focus:scale-105 focus:shadow-[0_0_10px_#1de972]
          transition-all duration-200
        "
      />

      <div className="w-full max-w-[1200px]">
        <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
          Most frequently searched words
        </h3>

        <div
          className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
            gap-4 sm:gap-5 justify-items-center
          "
        >
          {filteredWords.map((w) => (
            <div
              key={w.word}
              className="
                bg-[#1c2733] rounded-xl px-3 py-4
                w-[140px] sm:w-[150px] md:w-[160px]
                flex items-center justify-between
                shadow-[0_1px_8px_0_#10151b,0_0_0_1px_#1de9b6]
                transition-all duration-300
                hover:shadow-[0_4px_14px_0_#1de9b6,0_0_0_1px_#1de9b6]
                hover:-translate-y-1 hover:scale-105
              "
            >
              <span className="text-base font-semibold tracking-wide">
                {w.word}
              </span>
              <button
                onClick={() => setSelectedWord(w)}
                aria-label={`Play video for ${w.word}`}
                className="
                  bg-[#1de9b6] text-[#16202a] rounded-full w-8 h-8
                  flex items-center justify-center
                  shadow-[0_0_6px_#1de9b6]
                  transition-all duration-200
                  hover:bg-[#16202a] hover:text-[#1de9b6]
                  hover:border hover:border-[#1de9b6]
                  hover:scale-110 active:scale-95
                "
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedWord && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div
            className="
              bg-[#1c2733] border border-[#1de9b6] rounded-xl shadow-[0_0_12px_#1de9b6]
              p-5 flex flex-col items-center w-[85%] max-w-[320px]
              animate-[fadeIn_0.3s_ease-in-out]
            "
          >
            <h4 className="text-lg font-semibold mb-2">{selectedWord.word}</h4>
            <video
              controls
              className="w-[230px] sm:w-[260px] h-[140px] sm:h-[160px] rounded-md mb-3 shadow-[0_0_8px_#1de9b6]"
            >
              <source src={selectedWord.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setSelectedWord(null)}
              className="
                bg-[#1de9b6] text-[#16202a] rounded-md px-4 py-1.5 text-sm
                font-medium shadow-[0_0_5px_#1de9b6]
                transition-all duration-200
                hover:bg-[#16202a] hover:text-[#1de9b6]
                hover:border hover:border-[#1de9b6]
                active:scale-95
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
