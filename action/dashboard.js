import { auth } from "@clerk/nextjs/dist/types/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../lib/prisma";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const generateAIInsights = async (industry) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "High" | "Medium" | "Low",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "Positive" | "Neutral" | "Negative",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 5 common roles for salary ranges.
    Growth rate should be a percentage.
    Include at least 5 skills and trends.
  `;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanText = text.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleanText);
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized By Clerk");
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found At Database");

  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);
    const industryInsights = await db.industryInsight.create({
      data: {
        insights: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return industryInsights;
  }
  return user.industryInsight;
}
