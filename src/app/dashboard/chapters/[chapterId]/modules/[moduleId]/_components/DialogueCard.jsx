"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { moduleCompleted } from "@/actions/moduleActions.js";
import { chapterCompleted } from "@/actions/chapterActions.js";
import { getUserIdByClerkId } from "@/actions/UserActions.js";
import { toast } from "sonner";
import LearningStepCard from '@/components/LearningStepCard.jsx';
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import ExitLearning from "@/components/ExitLearning";

const DialogueCard = ({ module, user, chapter }) => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const currentStep = module.steps[stepIndex];

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
      const chapterId = chapter.id;
      const success = await moduleCompleted(userId, chapterId, module.id);

      if (success) {
        toast.success(`🎉 You completed the Module : ${module.title}`);

        // Check If it is the Last Module in the Chapter
        const lastModuleId = chapter.modules[chapter.modules.length - 1].id;
        if (module.id === lastModuleId) {
          await chapterCompleted(userId, chapterId);
          setIsRedirecting(true);  // show overlay
          toast.success(`🎉 You completed the whole ${chapterTitle} Chapter!`);
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
    <div>
      dialogue step
    </div>
  )
}

export default DialogueCard;
