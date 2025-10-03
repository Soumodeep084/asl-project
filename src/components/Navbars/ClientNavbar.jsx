// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { MdDashboard, MdSettings } from "react-icons/md";
// import { SiDictionarydotcom } from "react-icons/si";
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { toast } from "sonner";
// import { useState, useEffect } from "react";
// import { ResetProgress } from "@/actions/resetActions.js"
// import { getUserIdByClerkId } from "@/actions/UserActions";


// const ClientNavbar = () => {
//     const pathname = usePathname();
//     const { user, isLoaded } = useUser();
//     const [loading, setLoading] = useState(false);
//     const [ready, setReady] = useState(false);

//     useEffect(() => {
//         if (isLoaded) setReady(true);
//     }, [isLoaded]);

//     if (!ready) {
//         // Render a minimal placeholder nav to match server output
//         return (
//             <nav className="h-16 bg-[#1E2235] border-b border-[#374151]"></nav>
//         );
//     }

//     const handleResetProgress = async () => {
//         if (!confirm("Are you sure you want to reset your progress?")) return;

//         try {
//             setLoading(true);
//             const clerkId = user?.id;
//             if (!clerkId) throw new Error("User not signed in");

//             const userId = await getUserIdByClerkId(clerkId);
//             if (!userId) throw new Error("User ID not found");

//             // Reset Progress
//             await ResetProgress(userId);
//             toast.success("Progress has been reset successfully!");
//         } catch (error) {
//             toast.error("Failed to reset progress.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* Mobile Navbar */}
//             <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[#1E2235]/90 backdrop-blur-md border-t border-gray-700 z-50">
//                 <ul className="flex justify-around items-center h-16 text-sm text-white">
//                     <SignedIn>
//                         <li>
//                             <Link href="/dashboard">
//                                 <div className={`flex flex-col items-center ${pathname === "/dashboard" ? "text-cyan-400 font-bold" : "text-white/60"}`}>
//                                     <MdDashboard size={24} />
//                                     <span className="font-serif font-semibold">Dashboard</span>
//                                 </div>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/dictionary">
//                                 <div className={`flex flex-col items-center ${pathname === "/dictionary" ? "text-cyan-400 font-bold" : "text-white/60"}`}>
//                                     <SiDictionarydotcom size={24} />
//                                     <span className="font-serif font-semibold">Dictionary</span>
//                                 </div>
//                             </Link>
//                         </li>
//                         <li>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button size="sm" variant="asl" className="flex flex-col items-center">
//                                         <MdSettings size={24} />
//                                         <span className="text-xs">Settings</span>
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent>
//                                     <DropdownMenuItem onClick={handleResetProgress} disabled={loading}>
//                                         Reset Progress
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </li>
//                         <li>
//                             <UserButton />
//                         </li>
//                     </SignedIn>

//                     <SignedOut>
//                         <li>
//                             <SignInButton>
//                                 <Button size="sm" variant="default" asChild>Sign In</Button>
//                             </SignInButton>
//                         </li>
//                         <li>
//                             <SignUpButton>
//                                 <Button size="sm" variant="secondary" asChild>Sign Up</Button>
//                             </SignUpButton>
//                         </li>
//                     </SignedOut>
//                 </ul>
//             </div>

//             {/* Desktop Navbar */}
//             <div className="hidden sm:flex fixed top-0 left-0 right-0 h-16 bg-[#1E2235] border-b border-[#374151] z-50 justify-between items-center px-6">
//                 {/* Logo */}
//                 <div className="text-cyan-400 font-bold text-xl">SilentTalk</div>

//                 {/* Links */}

//                 <ul className="flex gap-7 items-center text-white">
//                     <SignedIn>
//                         <li>
//                             <Link href="/dashboard" className={`text-sm flex items-center gap-1 ${pathname === "/dashboard" ? "text-cyan-400 font-semibold" : "text-white/60"}`}>
//                                 <MdDashboard size={20} />
//                                 <span className="font-semibold">Dashboard</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/dictionary" className={`text-sm flex items-center gap-1 ${pathname === "/dictionary" ? "text-cyan-400 font-semibold" : "text-white/60"}`}>
//                                 <SiDictionarydotcom size={20} />
//                                 <span className="font-semibold">Dictionary</span>
//                             </Link>
//                         </li>

//                         <li>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button size="sm" variant="asl" className="flex items-center gap-1">
//                                         <MdSettings size={20} />
//                                         Settings
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent>
//                                     <DropdownMenuItem onClick={handleResetProgress} disabled={loading}>
//                                         Reset Progress
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </li>
//                         <li>
//                             <UserButton />
//                         </li>
//                     </SignedIn>

//                     <SignedOut>
//                         <li>
//                             <SignInButton>
//                                 <Button size="sm" variant="default" asChild>Sign In</Button>
//                             </SignInButton>
//                         </li>
//                         <li>
//                             <SignUpButton>
//                                 <Button size="sm" variant="secondary" asChild>Sign Up</Button>
//                             </SignUpButton>
//                         </li>
//                     </SignedOut>
//                 </ul>
//             </div>
//         </>
//     );
// };

// export default ClientNavbar;


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdSettings } from "react-icons/md";
import { MdHistory, MdRefresh } from "react-icons/md";
import { SiDictionarydotcom } from "react-icons/si";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ResetProgress } from "@/actions/resetActions.js";
import { getUserIdByClerkId } from "@/actions/UserActions";

const ClientNavbar = () => {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (isLoaded) setReady(true);
    }, [isLoaded]);

    if (!ready) {
        // Minimal placeholder to avoid SSR/CSR mismatch
        return <nav className="h-16 bg-[#1E2235] border-b border-[#374151]" />;
    }

    const handleResetProgress = async () => {
        if (!confirm("Are you sure you want to reset your progress?")) return;
        try {
            setLoading(true);
            const clerkId = user?.id;
            if (!clerkId) throw new Error("User not signed in");
            const userId = await getUserIdByClerkId(clerkId);
            if (!userId) throw new Error("User ID not found");
            await ResetProgress(userId);
            toast.success("Progress has been reset successfully!");
        } catch (error) {
            toast.error("Failed to reset progress.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Mobile Navbar */}
            <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[#1E2235]/90 backdrop-blur-md border-t border-gray-700 z-50 px-10">
                <ul className="flex justify-around items-center h-16 text-sm text-white">
                    <SignedIn>
                        <li>
                            <Link href="/dashboard">
                                <div
                                    className={`text-xs flex flex-col items-center ${pathname === "/dashboard"
                                        ? "text-cyan-400 font-bold"
                                        : "text-white/60"
                                        }`}
                                >
                                    <MdDashboard size={24} />
                                    <span className="font-serif font-semibold">Dashboard</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dictionary">
                                <div
                                    className={`text-xs flex flex-col items-center ${pathname === "/dictionary"
                                        ? "text-cyan-400 font-bold"
                                        : "text-white/60"
                                        }`}
                                >
                                    <SiDictionarydotcom size={24} />
                                    <span className="font-serif font-semibold">Dictionary</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="asl" className="flex flex-col items-center">
                                        <MdSettings size={26} />
                                        <span className="text-xs">Settings</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    sideOffset={8}
                                    className="min-w-56 p-2 rounded-xl bg-[#07151A]/95 backdrop-blur-xl border border-emerald-400/15 shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-300/10 animate-in fade-in zoom-in-95 transform-gpu will-change-transform isolate"
                                >
                                    <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-emerald-300/70">Account Settings</div>
                                    <DropdownMenuItem asChild className="relative group p-0">
                                        <Link href="/transactions" className="relative flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-emerald-200/80 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40 transition duration-200 overflow-hidden">
                                            <span className="text-emerald-300/70 group-hover:text-emerald-300 transition-colors"><MdHistory size={16} /></span>
                                            <span>Payment History</span>
                                            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-400/15 via-emerald-300/10 to-transparent transition-opacity" />
                                            <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/5 group-hover:ring-emerald-300/20 transition" />
                                        </Link>
                                    </DropdownMenuItem>
                                    <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
                                    <DropdownMenuItem
                                        onClick={handleResetProgress}
                                        disabled={loading}
                                        className="relative group p-0"
                                    >
                                        <button
                                            type="button"
                                            className="relative flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md text-red-200 hover:text-red-100 disabled:text-red-300/60 disabled:cursor-not-allowed
                                                                                bg-transparent hover:bg-red-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 transition-colors duration-200"
                                        >
                                            <span className="absolute left-0 top-1 bottom-1 w-1 rounded bg-gradient-to-b from-red-400/60 via-red-500/70 to-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                <MdRefresh size={16} className="text-red-300 group-hover:text-red-600 transition-colors" />
                                                <span className="tracking-wide hover:text-red-600">Reset Progress</span>
                                            </span>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <div className="text-xs flex flex-col items-center">
                                <UserButton />
                                <span>Profile</span>
                            </div>
                        </li>
                    </SignedIn>
                </ul>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="fixed top-0 left-0 right-0 sm:hidden bg-[#1E2235]/90 backdrop-blur-md border-t border-gray-700 z-50 flex justify-evenly items-center h-16">
                {/* Logo */}
                <div className="text-cyan-400 font-bold text-xl">SilentTalk</div>

                <ul className="flex justify-around items-center h-16 text-sm text-white">
                    <SignedOut>
                        <li>
                            <SignInButton mode="modal">
                                <Button size="sm" variant="default">Sign In</Button>
                            </SignInButton>
                        </li>
                        <li>
                            <SignUpButton mode="modal">
                                <Button size="sm" variant="secondary">Sign Up</Button>
                            </SignUpButton>
                        </li>
                    </SignedOut>
                </ul>
            </div>

            {/* Desktop Navbar */}
            <div className="hidden sm:flex fixed top-0 left-0 right-0 h-16 bg-[#1E2235] border-b border-[#374151] z-50 justify-between items-center px-6">
                {/* Logo */}
                <div className="text-cyan-400 font-bold text-xl">SilentTalk</div>

                {/* Links */}
                <ul className="flex gap-8 items-center text-white px-1">
                    <SignedIn>
                        <li>
                            <Link
                                href="/dashboard"
                                className={`text-sm flex items-center gap-1 ${pathname === "/dashboard"
                                    ? "text-cyan-400 font-semibold"
                                    : "text-white/60"
                                    }`}
                            >
                                <MdDashboard size={20} />
                                <span className="font-semibold">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dictionary"
                                className={`text-sm flex items-center gap-1 ${pathname === "/dictionary"
                                    ? "text-cyan-400 font-semibold"
                                    : "text-white/60"
                                    }`}
                            >
                                <SiDictionarydotcom size={20} />
                                <span className="font-semibold">Dictionary</span>
                            </Link>
                        </li>

                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="asl" className="flex items-center gap-1">
                                        <MdSettings size={20} />
                                        Settings
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    sideOffset={8}
                                    className="min-w-56 p-2 rounded-xl bg-[#07151A]/95 backdrop-blur-xl border border-emerald-400/15 shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-300/10 animate-in fade-in zoom-in-95 transform-gpu will-change-transform isolate"
                                >
                                    <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-emerald-300/70">Account Settings</div>
                                    <DropdownMenuItem asChild className="relative group p-0">
                                        <Link href="/transactions" className="relative flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-emerald-200/80 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40 transition duration-200 overflow-hidden">
                                            <span className="text-emerald-300/70 group-hover:text-emerald-300 transition-colors"><MdHistory size={16} /></span>
                                            <span>Transactions</span>
                                            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-400/15 via-emerald-300/10 to-transparent transition-opacity" />
                                            <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/5 group-hover:ring-emerald-300/20 transition" />
                                        </Link>
                                    </DropdownMenuItem>
                                    <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
                                    <DropdownMenuItem
                                        onClick={handleResetProgress}
                                        disabled={loading}
                                        className="relative group p-0"
                                    >
                                        <button
                                            type="button"
                                            className="relative flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md text-red-200 hover:text-red-100 disabled:text-red-300/60 disabled:cursor-not-allowed
                                                                                bg-transparent hover:bg-red-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 transition-colors duration-200"
                                        >
                                            <span className="absolute left-0 top-1 bottom-1 w-1 rounded bg-gradient-to-b from-red-400/60 via-red-500/70 to-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                <MdRefresh size={16} className="text-red-300 group-hover:text-red-600 transition-colors" />
                                                <span className="tracking-wide hover:text-red-600">Reset Progress</span>
                                            </span>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <div className="text-sm font-semibold flex items-center gap-1">
                                <UserButton />
                                <span>Profile</span>
                            </div>
                        </li>
                    </SignedIn>

                    <SignedOut>
                        <li>
                            <SignInButton mode="modal">
                                <Button size="sm" variant="default"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-white
                                      bg-cyan-600 shadow-sm transition
                                        hover:bg-cyan-700
                                        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                                        disabled:opacity-50 disabled:pointer-events-none
                                        dark:focus:ring-offset-0">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </li>
                        <li>
                            <SignUpButton mode="modal">
                                <Button size="sm" variant="secondary"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-white
                                    bg-indigo-600 shadow-sm transition
                                    hover:bg-indigo-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                                    disabled:opacity-50 disabled:pointer-events-none
                                    dark:focus:ring-offset-0">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </li>
                    </SignedOut>
                </ul>
            </div>
        </>
    );
};

export default ClientNavbar;

