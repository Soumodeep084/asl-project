"use server";

import { db } from "@/lib/prisma";

export async function getModuleCompletionDetails(userId, chapterId) {
  try {
    const completions = await db.moduleCompletion.findMany({
      where: {
        userId,
        chapterId,
      },
      select: {
        moduleId: true,
        points: true,
        completedAt: true,
      },
    });

    return completions; // Array of completed modules
  } catch (error) {
    console.error("Error fetching completions:", error);
    throw new Error("Could not fetch completions");
  }
}



export async function moduleCompleted(userId, chapterId, moduleId, points = 10) {
  try {
    const completion = await db.moduleCompletion.upsert({
      where: {
        userId_chapterId_moduleId: {
          userId,
          chapterId,
          moduleId,
        },
      },
      update: {
        points,
        completedAt: new Date(),
      },
      create: {
        userId,
        chapterId,
        moduleId,
        points,
      },
    });

    return true;;
  } catch (error) {
    console.error("Error marking module complete:", error);
    return false;
  }
}