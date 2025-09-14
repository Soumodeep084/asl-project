"use server";

import { db } from "@/lib/prisma";

export async function getUserIdByClerkId(clerkUserId) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUserId,
      },
      select: {
        id: true,
      },
    });
    return user ? user.id : null;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw new Error("Could not fetch user ID");
  }
}