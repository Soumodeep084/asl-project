import { useState, useRef, useEffect } from "react";
import VideoBubble from "./VideoBubble";

const DialogueStepCard = ({ step, onStepComplete }) => {
  const [history, setHistory] = useState([]); // all rendered videos
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);
  const [endedVideos, setEndedVideos] = useState({}); // keeps track of ended videos

  const videoRefs = useRef({});
  const chatEndRef = useRef(null);

  const items = [...(step?.videos || []), step?.testing].filter(Boolean);
  const currentItem = items[currentIndex];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentIndex, checked]);

  const handleVideoEnd = (idx) => {
    const id = `video-${idx}`;
    setEndedVideos((prev) => ({ ...prev, [id]: true }));

    // add video to history if not already
    setHistory((prev) => {
      if (!prev.find((v) => v.id === id)) {
        return [...prev, { ...items[idx], id, autoPlay: false }];
      }
      return prev;
    });

    // move to next item
    const next = currentIndex + 1;
    if (next < items.length) {
      setCurrentIndex(next);
    } else {
      onStepComplete?.();
    }
  };

  const handleReplay = (id) => {
    const vid = videoRefs.current[id];
    if (vid) {
      Object.entries(videoRefs.current).forEach(([k, v]) => {
        if (v && k !== id) v.pause();
      });
      vid.currentTime = 0;
      vid.play().catch(() => { });
    }
    setEndedVideos((prev) => ({ ...prev, [id]: false }));
  };

  const handleCheckAnswer = (answer) => {
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
      setSelectedOption(null);
      const next = currentIndex + 1;
      if (next < items.length) {
        setCurrentIndex(next);
      } else {
        onStepComplete?.();
      }
    }, 3000);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Render history videos */}
      {history.map((item, idx) => (
        <VideoBubble
          key={idx}
          item={item} 
          videoRef={(el) => (videoRefs.current[item.id] = el)}
          showReplay={endedVideos[item.id]}
          onReplay={() => handleReplay(item.id)}
        />
      ))}

      {/* Render current video */}
      {currentItem && currentItem.type !== "mcq" && (
        <VideoBubble
          item={{ ...currentItem, autoPlay: true }}
          videoRef={(el) => (videoRefs.current[`video-${currentIndex}`] = el)}
          showReplay={endedVideos[`video-${currentIndex}`]}
          onReplay={() => handleReplay(`video-${currentIndex}`)}
          onEnd={() => handleVideoEnd(currentIndex)}
        />
      )}

      {/* Render MCQ */}
      {currentItem && currentItem.type === "mcq" && (
        <div className={`my-3 p-4 max-w-md shadow-lg rounded-2xl border ${checked ? (selectedOption === currentItem.answer ? "bg-emerald-600 border-emerald-400" : "bg-red-600 border-red-400") : "bg-gray-700 border-gray-600"} ml-6`}>
          <p className="text-amber-400 font-semibold mb-2">{currentItem.title}</p>
          <p className="text-gray-300 mb-3">{currentItem.Question}</p>
          <div className="space-y-2">
            {currentItem.options.map((opt) => (
              <label
                key={opt.id}
                className={`block px-3 py-2 rounded-lg border cursor-pointer ${selectedOption === opt.label ? "bg-gray-700 border-amber-400" : "bg-gray-800 border-gray-600 hover:bg-gray-700"} text-white transition-colors`}
              >
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  value={opt.label}
                  checked={selectedOption === opt.label}
                  onChange={() => setSelectedOption(opt.label)}
                  className="hidden"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {!checked && (
            <button
              onClick={() => handleCheckAnswer(currentItem.answer)}
              disabled={!selectedOption}
              className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
            >
              Check
            </button>
          )}
          {checked && (
            <p className="mt-2 text-sm text-white">
              {selectedOption === currentItem.answer ? `✅ Correct! ${currentItem.explanation || ""}` : `❌ Wrong! ${currentItem.explanation || ""}`}
            </p>
          )}
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
};

export default DialogueStepCard;
