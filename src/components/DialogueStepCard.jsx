import { LoaderCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DialogueStepCard = ({ step, onStepComplete, isLastStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);

  const videoRefs = useRef({});
  const chatEndRef = useRef(null); // Auto-scroll target

  // Auto-scroll whenever currentIndex or checked changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentIndex, checked]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReplay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const items = [...step.videos, step.testing].filter(Boolean);
  const currentItem = items[currentIndex];

  const handleCheckAnswer = (answer) => {
    setChecked(true);

    setTimeout(() => {
      setChecked(false);
      setSelectedOption(null);

      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= items.length) {
          onStepComplete();
          return prev;
        }

        // Small delay to ensure DOM updates before scrolling
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);

        return nextIndex;
      });
    }, 3000); // wait 3 sec
  };

  return (
    <div className="mb-6 space-y-4">
      {/* History Videos */}
      {items.slice(0, currentIndex).map((item, idx) =>
        item.type === "mcq" ? null : (
          <div
            key={idx}
            className={`flex ${item.type === "sender" ? "justify-start mr-6" : "justify-end ml-6"
              }`}
          >
            <div
              className={`relative p-2 max-w-md shadow-lg transition-transform transform hover:scale-105 ${item.type === "sender"
                  ? "bg-gray-500 text-black rounded-2xl rounded-tl-none"
                  : "bg-amber-500 border-2 border-amber-400 rounded-2xl rounded-tr-none"
                }`}
            >
              <video
                ref={(el) => (videoRefs.current[`history-${idx}`] = el)}
                src={item.url}
                className="rounded-xl w-80 shadow-md"
                muted
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-100 font-medium">{item.label}</p>
                <button
                  onClick={() => handleReplay(`history-${idx}`)}
                  className="ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded-lg shadow-sm hover:bg-gray-900 transition-colors"
                >
                  <LoaderCircle />
                </button>
              </div>
            </div>
          </div>
        )
      )}

      {/* Current Video */}
      {currentItem && currentItem.type !== "mcq" && (
        <div
          className={`flex ${currentItem.type === "sender" ? "justify-start mr-6" : "justify-end ml-6"
            }`}
        >
          <div
            className={`relative p-2 max-w-md shadow-lg transition-transform transform hover:scale-105 ${currentItem.type === "sender"
                ? "bg-gray-500 text-white rounded-2xl rounded-tl-none"
                : "bg-amber-500 border-2 border-amber-400 rounded-2xl rounded-tr-none"
              }`}
          >
            <video
              ref={(el) => (videoRefs.current[`current-${currentIndex}`] = el)}
              src={currentItem.url}
              autoPlay
              muted
              onEnded={handleVideoEnd}
              className="rounded-xl w-80 shadow-md"
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-200 font-medium">{currentItem.label}</p>
              <button
                onClick={() => handleReplay(`current-${currentIndex}`)}
                className="ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded-lg shadow-sm hover:bg-gray-900 transition-colors"
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Question (MCQ) */}
      {currentItem && currentItem.type === "mcq" && (
        <div
          className={`my-3 p-4 max-w-md shadow-lg transition-transform transform hover:scale-105 rounded-2xl border ${checked
              ? selectedOption === currentItem.answer
                ? "bg-emerald-600 border-emerald-400"
                : "bg-red-600 border-red-400"
              : "bg-gray-700 border-gray-600"
            } ${currentItem.type === "sender" ? "ml-6" : "mr-6"}`}
        >
          <p className="text-amber-400 font-semibold mb-2">{currentItem.title}</p>
          <p className="text-gray-300 mb-3">{currentItem.Question}</p>

          <div className="space-y-2">
            {currentItem.options.map((opt) => (
              <label
                key={opt.id}
                className={`block px-3 py-2 rounded-lg border cursor-pointer ${selectedOption === opt.label
                    ? "bg-gray-700 border-amber-400"
                    : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                  } text-white transition-colors`}
              >
                <input
                  type="radio"
                  name="answer"
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
              {selectedOption === currentItem.answer
                ? `✅ Correct! ${currentItem.explanation || ""}`
                : `❌ Wrong! ${currentItem.explanation || ""}`}
            </p>
          )}
        </div>
      )}

      {/* Scroll target */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default DialogueStepCard;





// import { useState, useEffect } from "react";
// import { chapter4 } from "@/data/chapter4";

// export default function ConversationFlow({ }) {
//   const steps = chapter4.modules[0].steps; // For now, showing module 1
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [checked, setChecked] = useState(false);

//   const step = steps[currentStep];

//   // Auto move to next step after explanation
//   useEffect(() => {
//     if (checked) {
//       const timer = setTimeout(() => {
//         if (currentStep < steps.length - 1) {
//           setCurrentStep((prev) => prev + 1);
//           setSelected(null);
//           setChecked(false);
//         }
//       }, 2000); // wait 2 secs

//       return () => clearTimeout(timer);
//     }
//   }, [checked, currentStep, steps.length]);

//   const handleCheck = () => setChecked(true);

//   return (
//     <div className="min-h-screen bg-[#1a1f36] flex flex-col items-center py-8">
//       <div className="w-full max-w-2xl space-y-6">
//         {/* Render conversation videos */}
//         {step.videos.map((vid, idx) => (
//           <div
//             key={idx}
//             className={`flex ${vid.type === "sender" ? "justify-start" : "justify-end"
//               }`}
//           >
//             <div
//               className={`relative rounded-lg p-3 max-w-xs shadow-md ${vid.type === "sender"
//                   ? "bg-gray-200 text-black"
//                   : "bg-orange-300 text-black"
//                 }`}
//             >
//               <video src={vid.url} controls className="rounded-md w-56" />
//               {vid.label && <p className="mt-2 text-sm">{vid.label}</p>}

//               {/* Tail */}
//               {vid.type === "sender" ? (
//                 <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-r-gray-200"></div>
//               ) : (
//                 <div className="absolute right-[-8px] top-4 w-0 h-0 border-t-8 border-b-8 border-l-8 border-l-orange-300"></div>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* Testing Section */}
//         {step.testing && (
//           <div className="bg-gray-800 text-white rounded-lg p-4 shadow-md">
//             <p className="font-semibold mb-3">{step.testing.Question}</p>
//             <div className="space-y-2">
//               {step.testing.options.map((opt) => (
//                 <div
//                   key={opt.id}
//                   onClick={() => !checked && setSelected(opt.label)}
//                   className={`p-2 rounded cursor-pointer transition ${selected === opt.label
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-600 hover:bg-gray-700"
//                     }`}
//                 >
//                   {opt.label}
//                 </div>
//               ))}
//             </div>

//             {!checked && (
//               <button
//                 onClick={handleCheck}
//                 disabled={!selected}
//                 className="mt-3 bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
//               >
//                 Check
//               </button>
//             )}

//             {checked && (
//               <div
//                 className={`mt-3 p-3 rounded ${selected === step.testing.answer ? "bg-green-600" : "bg-red-600"
//                   }`}
//               >
//                 {selected === step.testing.answer ? "✅ Correct!" : "❌ Wrong!"}
//                 {step.testing.explanation && (
//                   <p className="mt-2 text-sm">{step.testing.explanation}</p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



