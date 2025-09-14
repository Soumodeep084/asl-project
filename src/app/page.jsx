// import Link from "next/link";
// import { chapters } from "@/data/datas.js";

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-[#1E2235] text-[#F3F4F6] p-8 font-sans">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-5xl font-extrabold mb-6 text-emerald-400 drop-shadow">
//           👋 Welcome to SilentTalk!
//         </h1>
//         <p className="text-lg mb-12 text-gray-400">
//           Start your ASL learning journey. Pick a chapter and unlock new skills!
//         </p>

//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {chapters.map((chapter) => (
//             <div
//               key={chapter.id}
//               className="bg-[#2A2F45] border border-[#374151] rounded-2xl shadow-lg p-8 hover:border-emerald-400 transition duration-200 relative group"
//             >
//               <h2 className="text-2xl font-bold mb-2 text-emerald-400 group-hover:text-amber-400 transition">
//                 {chapter.title}
//               </h2>
//               <p className="text-gray-400 text-base mb-6">
//                 {chapter.modules.length} Modules
//               </p>

//               {/* Progress Bar Example */}
//               <div className="w-full bg-[#374151] rounded-full h-3 mb-6">
//                 <div
//                   className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
//                   style={{ width: `${Math.floor(Math.random() * 100)}%` }}
//                 ></div>
//               </div>

//               <Link
//                 href={`/dashboard/chapters/${chapter.id}`}
//                 className="inline-block px-6 py-2.5 bg-emerald-400 text-[#1E2235] rounded-xl font-semibold shadow-lg hover:bg-emerald-500 hover:text-white transition duration-200"
//               >
//                 Start Chapter →
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState } from 'react';
// import styles from './Dictionary.module.css';

// // Placeholder data
// const words = [
//   { word: 'CAN', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
//   { word: 'CAT', video: 'https://www.w3schools.com/html/movie.mp4' },
//   { word: 'DO', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
//   { word: 'DOG', video: 'https://www.w3schools.com/html/movie.mp4' },
//   { word: 'EAT', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
// ];

// export default function Dictionary() {
//   const [search, setSearch] = useState('');
//   const [selectedWord, setSelectedWord] = useState(null);

//   const filteredWords = words.filter(w =>
//     w.word.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Search for a word</h2>
//       <input
//         className={styles.search}
//         type="text"
//         placeholder="Type a word..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <div className={styles.listSection}>
//         <h3 className={styles.subtitle}>Most frequently searched words</h3>
//         <div className={styles.wordList}>
//           {filteredWords.map(w => (
//             <button
//               key={w.word}
//               className={styles.wordBtn}
//               onClick={() => setSelectedWord(w)}
//             >
//               {w.word}
//               <span className={styles.playIcon}>▶</span>
//             </button>
//           ))}
//         </div>
//       </div>
//       {selectedWord && (
//         <div className={styles.videoModal}>
//           <h4 className={styles.modalTitle}>{selectedWord.word}</h4>
//           <video controls className={styles.video}>
//             <source src={selectedWord.video} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button className={styles.closeBtn} onClick={() => setSelectedWord(null)}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to SilentTalk</h1>
      <p className="text-lg mb-8 text-gray-400">Your journey to learning American Sign Language starts here.</p>
      <div className="space-x-4">
        <a href="/dashboard" className="px-6 py-3 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}