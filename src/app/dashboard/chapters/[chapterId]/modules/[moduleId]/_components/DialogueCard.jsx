"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { moduleCompleted } from "@/actions/moduleActions.js";
import { chapterCompleted } from "@/actions/chapterActions.js";
import { getUserIdByClerkId } from "@/actions/UserActions.js";
import DialogueStepCard from "@/components/DialogueStepCard.jsx";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import ExitLearning from "@/components/ExitLearning";

const DialogueCard = ({ module, user, chapter }) => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleNext = async () => {
    if (stepIndex < module.steps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    try {
      const clerkUserId = user.id;
      const userId = await getUserIdByClerkId(clerkUserId);

      const success = await moduleCompleted(userId, chapter.id, module.id);

      if (success) {
        toast.success(`🎉 You completed the Module: ${module.title}`);

        // if this module is the last module in the chapter, mark chapter complete
        const lastModuleId = chapter.modules[chapter.modules.length - 1].id;
        if (module.id === lastModuleId) {
          await chapterCompleted(userId, chapter.id);
          toast.success(`🎉 You completed the whole ${chapter.title} Chapter!`);
          setIsRedirecting(true);
          router.push(`/dashboard`);
          return;
        }

        // else send back to chapter modules list
        setIsRedirecting(true);
        router.push(`/dashboard/chapters/${chapter.id}`);
      } else {
        toast.error(`❌ Failed to complete ${module.title} Module.`);
        router.push(`/dashboard/chapters/${chapter.id}`);
      }
    } catch (error) {
      console.error("Error completing module:", error);
      toast.error("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="py-6">
      {/* Redirecting Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-amber-400 w-12 h-12 mb-4" />
          <p className="text-white text-lg sm:text-xl font-semibold">Redirecting...</p>
        </div>
      )}

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {/* Show all conversations up to current */}
        {module.steps.slice(0, stepIndex + 1).map((step, idx) => (
          <DialogueStepCard
            key={step.id}
            step={step}
            isLastStep={idx === module.steps.length - 1}
            onStepComplete={handleNext}
          />
        ))}

        <div>
          <ExitLearning />
        </div>
      </div>
    </div>
  );
};

export default DialogueCard;
