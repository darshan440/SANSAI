"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";
import { generateAIInsights } from "../action/dashboard";
export async function updateUser(data) {
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
    const result = await db.$transaction(
      async (tx) => {
        //find if industry exist   find if industry exist
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });
        //   if industry doest exist, create it with default values - will replace it with ai letter
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);
          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }
        // update  the user
        const updatedUser = await tx.user.update({
          where: {
            clerkUserId: userId,
          },
          data: {
            industry: data.industry,
            expeience: data.expeience,
            bio: data.bio,
            skills: data.skills,
          },
        });
        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );
    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update Profile" + error.message);
  }
}

export async function getUserOnboardingStatus() {
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
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });
    return {
      isOnboarding: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}
