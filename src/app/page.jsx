
// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
//       <h1 className="text-5xl font-bold mb-4">Welcome to SilentTalk</h1>
//       <p className="text-lg mb-8 text-gray-400">Your journey to learning American Sign Language starts here.</p>
//       <div className="space-x-4">
//         <a href="/dashboard" className="px-6 py-3 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition">
//           Go to Dashboard
//         </a>
//       </div>
//     </div>
//   );
// }

"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import homepage sections
import Features from "@/components/HomePageComponents/Features";
import Testimonials from "@/components/HomePageComponents/Testimonials";
import Photo from "@/components/HomePageComponents/Photo";

import {
  SignInButton,
  SignedOut,
  UserButton,
  SignedIn,
} from "@clerk/nextjs";

export default function HomePageWrapper() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [shouldShowPage, setShouldShowPage] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      setShouldShowPage(true);
    }
  }, [isLoaded, isSignedIn]);

  if (!shouldShowPage) return null; // Prevent flicker

  return (
    <section className="relative h-auto">

      {/* Hero Section */}
      <div
        id="home"
        className="relative w-full min-h-[70vh] md:min-h-[80vh] xl:min-h-[900px] bg-[url(/asset/bgwaves.png)] bg-cover bg-center"
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative container mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-8 md:gap-12 py-14 md:py-20 xl:py-24">
            
            {/* Text Content */}
            <div className="text-center xl:text-left z-10 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold capitalize text-white leading-tight">
                Learn <span className="text-accent1">ASL</span>
                <br />
                The fun way
              </h1>
              <h3 className="text-base sm:text-lg md:text-xl text-gray-300 pt-4 max-w-[500px] xl:max-w-[700px] mx-auto xl:mx-0">
                Master sign language step by step. Learn, practice, and confidently grow your ASL skills through an engaging and natural learning experience.
              </h3>

              {/* Buttons */}
              <div className="pt-8 flex flex-wrap justify-center xl:justify-start gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-6 py-3 rounded-3xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-500 transition">
                      Start Learning Now!
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>

            {/* Hero Image */}
            <Photo />
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <Features />
      <Testimonials />
    </section>
  );
}

