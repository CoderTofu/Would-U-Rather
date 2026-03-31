import { prisma } from "@/lib/db";

export async function getQuestions() {
  try {
    return prisma.question.findMany();
  } catch (e) {
    console.log("Get Questions Error: " + e);
  }
}

export async function getQuestionsToday() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return prisma.question.findMany({
      where: { postedAt: { gte: today, lt: tomorrow } },
    });
  } catch (e) {
    console.log("Get Questions Error: " + e);
  }
}

export async function getChoices(id: string) {
  try {
    return prisma.choice.findMany({
      where: { questionId: id },
    });
  } catch (e) {
    console.log("Get Choices Error: " + e);
  }
}
