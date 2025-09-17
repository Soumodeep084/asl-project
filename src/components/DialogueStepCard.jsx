"use client";
import { useState, useRef } from "react";

const DialogueStepCard = ({ step, onStepComplete, isLastStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track videos + testing
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setAnswered(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedOption(null);
    }, 1500);
  };

  const items = [...step.videos, step.testing].filter(Boolean);
  const currentItem = items[currentIndex];

  return (
    <div className="mb-6">
      {/* Show conversation messages as history */}
      {items.slice(0, currentIndex).map((item, idx) =>
        item.type === "mcq" ? (
          <div key={idx} className="my-3 p-3 border rounded-lg bg-[#2A2F45]">
            <p className="text-amber-400 font-semibold mb-2">{item.title}</p>
            <p className="text-gray-300">✅ Question answered</p>
          </div>
        ) : (
          <div
            key={idx}
            className={`flex my-2 ${item.type === "sender" ? "justify-start" : "justify-end"
              }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${item.type === "sender"
                  ? "bg-gray-700 border border-gray-500"
                  : "bg-amber-700 border border-amber-400"
                }`}
            >
              <p className="text-sm text-white mb-1">{item.label}</p>
              <video
                src={item.url}
                controls
                className="rounded-md w-56"
              />
            </div>
          </div>
        )
      )}

      {/* Current Item (video or mcq) */}
      {currentItem && currentItem.type !== "mcq" && (
        <div
          className={`flex my-2 ${currentItem.type === "sender" ? "justify-start" : "justify-end"
            }`}
        >
          <div
            className={`p-2 rounded-lg max-w-xs ${currentItem.type === "sender"
                ? "bg-gray-700 border border-gray-500"
                : "bg-amber-700 border border-amber-400"
              }`}
          >
            <p className="text-sm text-white mb-1">{currentItem.label}</p>
            <video
              ref={videoRef}
              src={currentItem.url}
              playsInline
              autoPlay
              onEnded={handleVideoEnd}
              className="rounded-md w-56"
            />
          </div>
        </div>
      )}

      {currentItem && currentItem.type === "mcq" && (
        <div className="my-3 p-3 border rounded-lg bg-[#2A2F45]">
          <p className="text-amber-400 font-semibold mb-2">
            {currentItem.title}
          </p>
          <p className="text-gray-300 mb-2">{currentItem.Question}</p>
          <div className="space-y-2">
            {currentItem.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt.label)}
                disabled={answered}
                className={`block w-full text-left px-3 py-2 rounded-lg border 
                  ${answered && opt.label === currentItem.answer
                    ? "bg-emerald-600 border-emerald-400"
                    : answered && selectedOption === opt.label
                      ? "bg-red-600 border-red-400"
                      : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                  }
                  text-white`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {answered && (
            <p className="mt-2 text-sm text-gray-300">
              {selectedOption === currentItem.answer
                ? "✅ Correct!"
                : `❌ Wrong! ${currentItem.explanation || ""}`}
            </p>
          )}
        </div>
      )}

      {/* Finish button after last step */}
      {!currentItem && (
        <div className="flex justify-center mt-4">
          {isLastStep ? (
            <button
              onClick={onStepComplete}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
            >
              Finish Module
            </button>
          ) : (
            <button
              onClick={onStepComplete}
              className="px-5 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600"
            >
              Next Conversation
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DialogueStepCard;
