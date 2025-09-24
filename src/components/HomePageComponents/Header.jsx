// "use client";

// import Link from "next/link";
// import Nav from "./Nav";
// import {
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

// const Header = () => {
//   return (
//     <header className="px-4 py-4 lg:py-8 bg-background text-foreground">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="font-header font-bold text-3xl">
//           Silent<span className="text-accent2">Talk</span>
//         </Link>

//         {/* Desktop nav and user actions */}
//         <div className="hidden xl:flex items-center gap-8">
//           <Nav />

//           <SignedOut>
//             <SignInButton mode="modal">
//               <button className="px-4 py-2 bg-accent1 text-white rounded-md hover:opacity-90 transition">
//                 Sign In
//               </button>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>

//         {/* Mobile nav */}
//         <div className="xl:hidden">
//           <Nav />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
