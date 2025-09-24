import Image from "next/image";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

const Testimonials = () => {
  const testimonialData = [
    {
      name: "Alex Johnson",
      img: "https://randomuser.me/api/portraits/women/31.jpg",
      text: `“Learning sign language here has been a life-changing experience. The lessons were easy to follow, and I now feel confident communicating with the Deaf community.”`,
    },
    {
      name: "Daniel Lee",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      text: `“As a teacher, I wanted to include more inclusive practices in my classroom. This platform gave me the tools and confidence to do just that. Highly recommended!”`,
    },
    {
      name: "Samantha Rivera",
      img: "https://randomuser.me/api/portraits/women/34.jpg",
      text: `“The visual approach and real-life practice examples made learning sign language both fun and practical. I loved how engaging and supportive the instructors were.”`,
    },
  ];

  return (
    <section id="testimonials" className="bg-background w-full">
      {/* Background header */}
      <div className="relative bg-[url('/asset/bgwaves.png')] bg-cover bg-center py-24">
        <h2 className="text-5xl xl:text-6xl font-header font-bold text-foreground text-center">
          Testimonials
        </h2>

        {/* Testimonials grid */}
        <div className="grid gap-8 px-6 sm:grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto mt-24">
          {testimonialData.map((t, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-[#063731] to-[#063731]/50 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#0f766e] hover:ring-opacity-40"
            >
              <Image
                src={t.img}
                width={80}
                height={80}
                alt={t.name}
                className="rounded-full object-cover mb-4 border-4 border-no bg-blend-overlay"
              />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 text-yellow-400"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.684a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.2 3.684c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.784.57-1.838-.197-1.539-1.118l1.2-3.684a1 1 0 00-.364-1.118L2.45 9.11c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.684z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-100 text-sm mb-4 italic">{t.text}</p>
              <p className="font-semibold text-accent1">{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-action */}
      <div className="mt-20 min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-r from-[#063731] to-[#3DDC97] text-white py-20 px-4">
        <h3 className="text-3xl font-description mb-4 text-center">
          Let the learning begin!
        </h3>
        <p className="text-4xl xl:text-6xl font-extrabold font-header text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#0D1B2A] via-[#063731] to-white animate-[textShine_5s_linear_infinite]">
          Master Sign Language — take one sign at a time.
        </p>
        <div className="w-full max-w-md">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full py-4 rounded-xl text-3xl font-header bg-gradient-to-r from-[#0D1B2A] to-[#063731] hover:opacity-90 transition">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 w-full flex flex-col items-center justify-center text-sm text-red-50 bg-gradient-to-r from-[#063731] to-[#3DDC97] py-8">
        <p>&copy; {new Date().getFullYear()} SilentTalk. All rights reserved.</p>
        <div className="flex space-x-4 mt-2">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
        <p className="mt-2 text-xs">Made with ❤️ by SilentTalk</p>
      </footer>
    </section>
  );
};

export default Testimonials;
