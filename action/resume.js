"use server";

import { revalidatePath } from "next/cache";

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauhorized");
  }
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });
    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume", error.message);

    throw new Error("Error saving resume");
  }
}
