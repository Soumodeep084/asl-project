import './globals.css'
import { ClerkProvider , SignedIn , SignedOut , UserButton , SignInButton , SignUpButton} from '@clerk/nextjs';
import { Toaster } from 'sonner'
import { Nunito, Inter } from "next/font/google";
import Navbar from '@/components/Navbars/Navbar.jsx'

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-inter",
});

export const metadata = {
  title: "SilentTalk",
  description: "A fun way to learn American Sign Language",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Patrick+Hand&display=swap" rel="stylesheet" />
        </head>
  <body className={`${nunito.variable} ${inter.variable} overflow-x-hidden layout-stable`}>
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white shadow-md flex-shrink-0">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
          <Navbar />

          {/* Add padding to prevent content being behind fixed navbars */}
          <div className="pt-0 pb-16 sm:pt-16 sm:pb-0">
            <Toaster position='top-right' />
            {children}
          </div>

        </body>
      </html>
    </ClerkProvider>
  )
}

