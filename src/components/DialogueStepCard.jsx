// import { useState, useRef, useEffect } from "react";
// import { RotateCcw } from "lucide-react";

// const DialogueStepCard = ({ step, onStepComplete }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [checked, setChecked] = useState(false);
//   const [finished, setFinished] = useState(false);

//   const videoRefs = useRef({});
//   const chatEndRef = useRef(null);

//   const items = [...step.videos, step.testing].filter(Boolean);
//   const currentItem = items[currentIndex];

//   // Scroll to bottom on new item
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentIndex, checked]);

//   // Notify parent when step is finished
//   useEffect(() => {
//     if (finished) onStepComplete();
//   }, [finished, onStepComplete]);

//   const handleVideoEnd = () => setCurrentIndex((prev) => prev + 1);

//   const handleReplay = (id) => {
//     const video = videoRefs.current[id];
//     if (video) {
//       video.currentTime = 0;
//       video.play();
//     }
//   };

//   const handleCheckAnswer = (answer) => {
//     setChecked(true);

//     setTimeout(() => {
//       setChecked(false);
//       setSelectedOption(null);

//       setCurrentIndex((prev) => {
//         const nextIndex = prev + 1;
//         if (nextIndex >= items.length) {
//           setFinished(true);
//           return prev;
//         }
//         return nextIndex;
//       });
//     }, 3000);
//   };

//   const getVideoCardClasses = (type) =>
//     type === "sender"
//       ? "bg-gray-400 text-black rounded-2xl rounded-tl-none"
//       : "bg-amber-400 border-2 border-amber-400 rounded-2xl rounded-tr-none";

//   return (
//     <div className="mb-2 space-y-2">
//       {/* History Videos */}
//       {items.slice(0, currentIndex).map(
//         (item, idx) =>
//           item.type !== "mcq" && (
//             <div
//               key={idx}
//               className={`flex ${
//                 item.type === "sender"
//                   ? "justify-start mr-6"
//                   : "justify-end ml-6"
//               }`}
//             >
//               <div
//                 className={`relative p-2 max-w-md shadow-lg ${getVideoCardClasses(
//                   item.type
//                 )}`}
//               >
//                 <video
//                   ref={(el) => (videoRefs.current[`history-${idx}`] = el)}
//                   src={item.url}
//                   className="rounded-xl w-80 shadow-md"
//                   muted
//                 />
//                 <div className="flex items-center justify-between mt-1">
//                   <p className="text-xs text-gray-100 font-medium">
//                     {item.label}
//                   </p>
//                   <button
//                     onClick={() => handleReplay(`history-${idx}`)}
//                     className="ml-2 p-1 text-[10px] bg-gray-800 text-white rounded-lg shadow-sm hover:bg-gray-900 transition-colors"
//                   >
//                     <RotateCcw size={12} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )
//       )}

//       {/* Current Video */}
//       {currentItem && currentItem.type !== "mcq" && (
//         <div
//           className={`flex ${
//             currentItem.type === "sender"
//               ? "justify-start mr-6"
//               : "justify-end ml-6"
//           }`}
//         >
//           <div
//             className={`relative p-2 max-w-md shadow-lg ${getVideoCardClasses(
//               currentItem.type
//             )}`}
//           >
//             <video
//               ref={(el) =>
//                 (videoRefs.current[`current-${currentIndex}`] = el)
//               }
//               src={currentItem.url}
//               autoPlay
//               muted
//               onEnded={handleVideoEnd}
//               className="rounded-xl w-80 shadow-md"
//             />
//             <div className="flex items-center justify-between mt-1">
//               <button
//                 onClick={() => handleReplay(`current-${currentIndex}`)}
//                 className="ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded-lg shadow-sm hover:bg-gray-900 transition-colors"
//               >
//                 Replay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Current Question (MCQ) */}
//       {currentItem && currentItem.type === "mcq" && (
//         <div
//           className={`my-3 p-4 max-w-md shadow-lg transition-transform transform hover:scale-105 rounded-2xl border ${
//             checked
//               ? selectedOption === currentItem.answer
//                 ? "bg-emerald-600 border-emerald-400"
//                 : "bg-red-600 border-red-400"
//               : "bg-gray-700 border-gray-600"
//           }`}
//         >
//           <p className="text-amber-400 font-semibold mb-2">
//             {currentItem.title}
//           </p>
//           <p className="text-gray-300 mb-3">{currentItem.Question}</p>

//           <div className="space-y-2">
//             {currentItem.options.map((opt) => (
//               <label
//                 key={opt.id}
//                 className={`block px-3 py-2 rounded-lg border cursor-pointer ${
//                   selectedOption === opt.label
//                     ? "bg-gray-700 border-amber-400"
//                     : "bg-gray-800 border-gray-600 hover:bg-gray-700"
//                 } text-white transition-colors`}
//               >
//                 <input
//                   type="radio"
//                   name="answer"
//                   value={opt.label}
//                   checked={selectedOption === opt.label}
//                   onChange={() => setSelectedOption(opt.label)}
//                   className="hidden"
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>

//           {!checked && (
//             <button
//               onClick={() => handleCheckAnswer(currentItem.answer)}
//               disabled={!selectedOption}
//               className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
//             >
//               Check
//             </button>
//           )}

//           {checked && (
//             <p className="mt-2 text-sm text-white">
//               {selectedOption === currentItem.answer
//                 ? `✅ Correct! ${currentItem.explanation || ""}`
//                 : `❌ Wrong! ${currentItem.explanation || ""}`}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Scroll target */}
//       <div ref={chatEndRef} />
//     </div>
//   );
// };

// export default DialogueStepCard;


import { useState, useRef, useEffect } from "react";
import VideoBubble from "./VideoBubble";
import { Button } from "./ui/button";
import { Lightbulb, HelpCircle, CheckCircle2, Circle, XCircle } from "lucide-react";

const DialogueStepCard = ({ step, onStepComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const videoRefs = useRef({});
  const chatEndRef = useRef(null);

  // Build the ordered list of step items: all videos, then optional testing, then optional suggestions
  const items = [...(step.videos || []), step.testing, step.suggestions].filter(Boolean);
  const currentItem = items[currentIndex];
  console.log("Current Item:", currentItem);

  // Only treat sender/receiver as videos
  const isVideoType = (t) => t === "sender" || t === "receiver" || t === "reciever";

  // Scroll to bottom on new content
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentIndex, checked]);

  // Notify parent when finished
  useEffect(() => {
    if (finished) onStepComplete();
  }, [finished, onStepComplete]);

  const handleVideoEnd = () => setCurrentIndex((prev) => prev + 1);

  const handleReplay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const handleCheckAnswer = (answer) => {
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
      setSelectedOption(null);

      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= items.length) {
          setFinished(true);
          return prev;
        }
        return nextIndex;
      });
    }, 2000);
  };

  // If current item is "suggestions", auto-advance (or finish if last)
  useEffect(() => {
    if (!currentItem) return;
    if (currentItem.type !== "suggestions") return;
  
    const isLast = currentIndex >= items.length - 1;
    const delay = isLast ? 6500 : 1800;
    const t = setTimeout(() => {
      if (isLast) {
        setFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [currentItem, currentIndex, items.length]);

  return (
    <div className="mb-2 space-y-2">
      {/* History Videos */}
      {items.slice(0, currentIndex).map(
        (item, idx) =>
          isVideoType(item.type) && (
            <VideoBubble
              key={idx}
              ref={(el) => (videoRefs.current[`history-${idx}`] = el)}
              id={`history-${idx}`}
              videoType={"history"}
              type={item.type}
              url={item.url}
              label={item.label}
              autoPlay={false}
              onReplay={handleReplay}
            />
          )
      )}

      {/* Current Video */}
      {currentItem && isVideoType(currentItem.type) && (
        <VideoBubble
          ref={(el) => (videoRefs.current[`current-${currentIndex}`] = el)}
          id={`current-${currentIndex}`}
          videoType={"current"}
          type={currentItem.type}
          url={currentItem.url}
          label={currentItem.label}
          autoPlay
          onEnded={handleVideoEnd}
          onReplay={handleReplay}
        />
      )}


      {/* Current Question (MCQ) */}
      {currentItem && currentItem.type === "mcq" && (
        <div className="relative my-3 p-4 max-w-md rounded-2xl bg-[#2A2F45] border border-[#374151] shadow-lg ring-1 ring-amber-400/20">
          {/* Left accent bar */}
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-emerald-400 rounded-l-2xl" />

          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 rounded-md bg-amber-400/15 text-amber-300">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-300 tracking-wide">{currentItem.title}</p>
              <p className="text-gray-300 mt-1 leading-relaxed">{currentItem.Question}</p>
            </div>
          </div>

          {/* Options */}
          <div className={`flex flex-wrap gap-2 ${currentItem.options.length <= 4 ? "flex-row" : "flex-col"}`}>
            {currentItem.options.map((opt) => {
              const isSelected = selectedOption === opt.label;
              const isCorrect = checked && opt.label === currentItem.answer;
              const isWrongSelection = checked && isSelected && !isCorrect;

              const base = "flex-1 min-w-[46%] sm:min-w-[48%] md:min-w-[46%] text-left flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors";
              const preCheck = isSelected
                ? "bg-[#1E2235] border-amber-400 text-amber-300"
                : "bg-[#1E2235] border-[#374151] hover:bg-[#262b41] text-white/90";
              const postCheck = isCorrect
                ? "bg-emerald-500/15 border-emerald-400 text-emerald-300"
                : isWrongSelection
                ? "bg-red-500/15 border-red-400 text-red-300"
                : "bg-[#1E2235] border-[#374151] text-white/90";

              const cls = `${base} ${checked ? postCheck : preCheck}`;

              return (
                <label key={opt.id} className={cls}>
                  <input
                    type="radio"
                    name="answer"
                    value={opt.label}
                    checked={isSelected}
                    onChange={() => setSelectedOption(opt.label)}
                    className="hidden"
                  />
                  <span className="flex-shrink-0">
                    {checked ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isWrongSelection ? (
                        <XCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-500" />
                      )
                    ) : isSelected ? (
                      <Circle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-500" />
                    )}
                  </span>
                  <span className="whitespace-pre-wrap leading-snug">{opt.label}</span>
                </label>
              );
            })}
          </div>

          {/* Action & feedback */}
          <div className="mt-3 flex items-center justify-between">
            {!checked ? (
              <Button
                variant="check"
                onClick={() => handleCheckAnswer(currentItem.answer)}
                disabled={!selectedOption}
              >
                Check
              </Button>
            ) : (
              <div className={`text-sm font-semibold ${selectedOption === currentItem.answer ? "text-emerald-400" : "text-red-400"}`}>
                {selectedOption === currentItem.answer ? "Correct!" : `Wrong! ${currentItem.explanation || ""}`}
              </div>
            )}
          </div>
        </div>
      )}

