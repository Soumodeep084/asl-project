"use client";

import { useState, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import { chapters } from "@/data/chapters.js";
import StepContentCard from "@/components/StepContentCard.jsx";
import { moduleCompleted } from "@/actions/moduleActions.js";
import { chapterCompleted } from "@/actions/chapterActions.js";
import { getUserIdByClerkId } from "@/actions/UserActions.js";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";


export default function ModulePage({ params }) {
  const router = useRouter();

  // Clerk Auth
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) return null;

  const { chapterId, moduleId } = use(params);

  // Validate Chapter
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) {
    return (
      <div className="p-4 sm:p-6 text-red-500 bg-[#0A0A10] text-sm sm:text-base">
        Chapter not found
      </div>
    );
  }

  // Validate Module
  const module = chapter.modules.find((m) => m.id === moduleId);
  if (!module) {
    return (
      <div className="p-4 sm:p-6 text-red-500 bg-[#0A0A10] text-sm sm:text-base">
        Module not found
      </div>
    );
  }

  const [stepIndex, setStepIndex] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const currentStep = module.steps[stepIndex];

  // Handle Step Navigation
  // const handleNext = async () => {
  //   if (stepIndex < module.steps.length - 1) {
  //     setStepIndex((prev) => prev + 1);
  //     return;
  //   }

  //   // If Finished Then only insert Data
  //   try {
  //     // Get userId from ClerkId
  //     const clerkUserId = user.id;
  //     const userId = await getUserIdByClerkId(clerkUserId);

  //     // Mark module as completed
  //     const success = await moduleCompleted(userId, chapterId, module.id);

  //     if (success) {
  //       toast.success(`🎉 You completed ${module.title} Module!`);

  //       // Redirect back to the chapter page (module list)
  //       router.push(`/dashboard/chapters/${chapterId}`);

  //     } else {
  //       toast.error(`❌ Failed to complete ${module.title} Module.`);

  //       // Redirect back to the chapter page (module list)
  //       router.push(`/dashboard/chapters/${chapterId}`);

  //     }
  //   } catch (error) {
  //     console.error("Error completing module:", error);
  //     alert("⚠️ Something went wrong. Please try again.");
  //   }
  // };

  // Handle Step Navigation
  const handleNext = async () => {
    if (stepIndex < module.steps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    try {
      // Get userId from ClerkId
      const clerkUserId = user.id;
      const userId = await getUserIdByClerkId(clerkUserId);

      // Mark module as completed
      const success = await moduleCompleted(userId, chapterId, module.id);

      if (success) {
        // ✅ Extra check: if this is the last module in the chapter
        toast.success(`🎉 You completed the Module : ${module.title}`);
        const lastModuleId = chapter.modules[chapter.modules.length - 1].id;
        if (module.id === lastModuleId) {
          await chapterCompleted(userId, chapterId);
          setIsRedirecting(true);  // show overlay
          toast.success(`🎉 You completed the whole ${chapter.title} Chapter!`);
          router.push(`/dashboard`);
          return;
        }

        // Redirect back to the chapter page (module list)
        setIsRedirecting(true);  // show overlay
        router.push(`/dashboard/chapters/${chapterId}`);
      } else {
        toast.error(`❌ Failed to complete ${module.title} Module.`);
        router.push(`/dashboard/chapters/${chapterId}`);
      }
    } catch (error) {
      console.error("Error completing module:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };


  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col items-center bg-[#1E2235] text-[#D4D4D4]">

      {/* Redirecting Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-amber-400 w-12 h-12 mb-4" />
          <p className="text-white text-lg sm:text-xl font-semibold">Redirecting...</p>
        </div>
      )}

      {/* Step Content */}
      <Suspense fallback={<LoaderCircle />}>
        <StepContentCard step={currentStep} />
      </Suspense>

      <div className="mt-6 flex justify-center gap-4 cursor-pointer">
        {/* Exit Button (outlined, subtle) */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className="border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              variant="outline"
            >
              Exit Learning
            </Button>
          </DrawerTrigger>

          <DrawerContent className="bg-[#1E2235] text-[#D4D4D4] p-4 sm:p-6">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-lg font-bold text-amber-400">
                  Are you sure you want to exit the lesson?
                </DrawerTitle>
                <DrawerDescription className="text-sm text-gray-400">
                  Any unsaved progress will be lost.
                </DrawerDescription>
              </DrawerHeader>

              <DrawerFooter className="flex justify-end gap-4">
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => router.push(`/dashboard/chapters/${chapterId}`)}
                >
                  Yes
                </Button>
                <DrawerClose asChild>
                  <Button className="bg-gray-700 text-white hover:bg-gray-600">
                    No
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>


        {/* Primary Next/Finish Button */}
        <Button className="bg-amber-400 text-[#1E2235] hover:bg-amber-500 hover:text-white font-semibold cursor-pointer" onClick={handleNext} >
          {stepIndex < module.steps.length - 1 ? "Next →" : "Finish ✅"}
        </Button>
      </div>

    </div>
  );
}
