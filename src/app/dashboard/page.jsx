// // dashboard/page.jsx
// import { chapters } from "@/data/chapters.js";
// import ChapterCard from "@/components/ChapterCard.jsx";
// import { getModuleCompletionDetails } from "@/actions/moduleActions";
// import { currentUser } from "@clerk/nextjs/server";
// import { getUserIdByClerkId } from "@/actions/UserActions";
// import { getChapterCompletionDetails } from "@/actions/chapterActions";

// export default async function DashboardPage() {
//   const user = await currentUser();
//   const clerkUserId = user ? user.id : null;

//   const userId = await getUserIdByClerkId(clerkUserId);
//   if (!userId) {
//     return (
//       <div className="p-4 sm:p-6 text-red-500 bg-[#0A0A10] text-sm sm:text-base">
//         User not found. Please sign in again.
//       </div>
//     );
//   }

//   const chapterStatus = await getChapterCompletionDetails(userId);

//   // Preload completions for all modules for each chapters
//   const completionsMap = {};
//   for (const chapter of chapters) {
//     completionsMap[chapter.id] = await getModuleCompletionDetails(
//       userId,
//       chapter.id
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#1E2235] text-[#D4D4D4] p-8 font-sans">
//       <div className="max-w-4xl mx-auto">
//         {/* Heading */}
//         <h1 className="text-2xl text-center font-extrabold mb-3 text-emerald-300 drop-shadow font-mono">
//           Welcome to SilentTalk!
//         </h1>
//         <p className="text-sm text-center my-2 text-gray-400">
//           Begin your ASL learning journey — unlock new skills one chapter at a
//           time!
//         </p>

//         {/* Chapter Cards */}
//         <div className="flex flex-col gap-8">
//           {chapters.map((chapter, idx) => {
//             const moduleDetails = completionsMap[chapter.id] || [];

//             // derive chapterStatus from moduleDetails
//             let chapterStatus = "locked";

//             return (
//               <ChapterCard
//                 key={chapter.id}
//                 chapter={chapter}
//                 chapterStatus={chapterStatus}
//                 moduleDetails={moduleDetails}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


// dashboard/page.jsx
import { chapterMap } from "@/data/chapterDetails.js";
import ChapterCard from "@/components/Cards/ChapterCard.jsx";
import { getModuleCompletionDetails } from "@/actions/moduleActions";
import { currentUser } from "@clerk/nextjs/server";
import { getUserIdByClerkId } from "@/actions/UserActions";
import { getChapterCompletionDetails } from "@/actions/chapterActions"

export default async function DashboardPage() {
  const user = await currentUser();
  const clerkUserId = user ? user.id : null;

  const userId = await getUserIdByClerkId(clerkUserId);
  if (!userId) {
    return (
      <div className="p-4 sm:p-6 text-red-500 bg-[#0A0A10] text-sm sm:text-base">
        User not found. Please sign in again.
      </div>
    );
  }

  // Fetch all completed chapters
  const completedChapters = await getChapterCompletionDetails(userId);
  const completedChapterIds = completedChapters.map((c) => c.chapterId);

  // Convert chapterMap → array for iteration
  const chapterDetails = Object.values(chapterMap);

  // Preload module completions
  const completionsMap = {};
  for (const chapter of chapterDetails) {
    completionsMap[chapter.id] = await getModuleCompletionDetails(
      userId,
      chapter.id
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2235] text-[#D4D4D4] p-4 sm:p-3 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl text-center font-extrabold mb-3 text-emerald-300 drop-shadow font-mono">
          Welcome to SilentTalk!
        </h1>
        <p className="text-sm text-center mt-2 mb-3 text-gray-400">
          Begin your ASL learning journey — unlock new skills one chapter at a
          time!
        </p>

        {/* Chapter Cards */}
        <div className="flex flex-col items-center gap-y-6 sm:p-0">
          {chapterDetails.map((chapter, idx) => {
            const moduleDetails = completionsMap[chapter.id] || [];

            // ✅ Figure out chapter status
            let chapterStatus = "locked";

            if (completedChapterIds.includes(chapter.id)) {
              chapterStatus = "completed";
            } else if (
              idx === 0 || // first chapter is always available
              completedChapterIds.includes(chapterDetails[idx - 1]?.id) // unlock if previous chapter is completed
            ) {
              chapterStatus = "current";
            }

            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                chapterStatus={chapterStatus}
                moduleDetails={moduleDetails}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
