"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Reusable sign-in prompt for unauthenticated pages.
 * Props:
 *  - message: string (required) specific instruction e.g. "Please sign in to view transactions."
 *  - title?: string default "Sign in required"
 *  - fullScreen?: boolean (default true) whether to take full viewport height with themed background
 *  - returnHref?: string link for a secondary action (default "/")
 *  - returnLabel?: string text for secondary link (default "Return Home")
 *  - className?: string additional wrapper classes (when not fullScreen)
 */
export default function SignInPrompt({
  message,
  title = "Sign in required",
  fullScreen = true,
  returnHref = "/",
  returnLabel = "Return Home",
  className,
}) {
  return (
    <main
      className={cn(
        fullScreen && "success-bg min-h-screen flex items-center justify-center px-4",
        !fullScreen && "success-bg w-full px-4 py-10",
        className
      )}
    >
      {fullScreen && (
        <>
          <div className="success-blob blob-a" />
          <div className="success-blob blob-b" />
          <div className="success-blob blob-c" />
          <div className="noise-overlay" />
        </>
      )}
      <div className="glass-panel max-w-md">
        <div className="gradient-ring" />
        <div className="shine" />
        <h1 className="text-xl font-bold mb-2 text-emerald-300 drop-shadow">{title}</h1>
        <p className="text-sm text-emerald-100/75 mb-5 leading-relaxed">{message}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-md text-sm font-semibold bg-emerald-500/80 hover:bg-emerald-500 text-white transition shadow shadow-emerald-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 rounded-md text-sm font-semibold bg-white/10 hover:bg-white/15 text-emerald-200 transition border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40">
              Create Account
            </button>
          </SignUpButton>
        </div>
        <div className="mt-5 text-center">
          <Link
            href={returnHref}
            className="text-xs text-emerald-300/80 hover:text-emerald-200 underline decoration-dotted transition"
          >
            {returnLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
