import {
  getDestinationImage,
  getRandomTravelImage,
} from "@/actions/destination-image";
import db from "../prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const scheduleWeeklyRecommendationsForUser = inngest.createFunction(
  { id: "schedule-weekly-recommendations-for-user" },
  { cron: "0 0 * * 0" },
  async ({ step, event }) => {
    const users = await step.run("Fetch all users", async () => {
      return await db.user.findMany({
        include: {
          Trip: true,
        },
      });
    });

    const batchSize = 3;
    const userBatches = [];

    for (let i = 0; i < users.length; i += batchSize) {
      userBatches.push(users.slice(i, i + batchSize));
    }

    await step.sendEvent(
      "schedule-batches",
      userBatches.map((batch, i) => ({
        name: "user.batch.process",
        data: {
          batch,
          batchNumber: i,
        },
        delay: `${i}h`,
      }))
    );

    return { totalUsers: users.length, batches: userBatches.length };
  }
);

function createPromptFromHistory(
  history: any[],
  numberOfTrips: number
): string {
  return `
Generate ${numberOfTrips} trips name for recommendation based on the destination, travel_style and interests mentioned in the user's history trips provided in json as ${history}.
    Add a fun title containing the destination.

    Return the response in this JSON format only, no additional text:
    [{
      "trip_title":"string",
      "destination":"string"
    },{
      "trip_title":"string",
      "destination":"string"
    }]
`.trim();
}

function getStaticPrompt(
  type: "APP" | "SURPRISE",
  numberOfTrips: number
): string {
  if (type === "APP") {
    return `
    As a passionate travel enthusiast looking for next adventure, suggest the top ${numberOfTrips} must-visit destinations around the world. Please include a mix of nature, culture, history, and unique experiences.
    Add a fun title containing the destination.

    Return the response in this JSON format only, no additional text:
    [{
      "trip_title":"string",
      "destination":"string"
    },{
      "trip_title":"string",
      "destination":"string"
    }]
`.trim();
  }

  return `
    Generate ${numberOfTrips} unique and surprising travel destinations that most people wouldn’t think of, but offers a perfect mix of adventure, culture, food, and natural beauty. Keep it off the beaten path and ideal for a memorable, unexpected getaway.
    Add a fun title containing the destination.

    Return the response in this JSON format only, no additional text:
    [{
      "trip_title":"string",
      "destination":"string"
    }]
`.trim();
}

async function generateTripsFromPrompt(prompt: string) {
  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .replace(/```(?:json)?\n?/g, "")
    .trim();
  const parsed = JSON.parse(text);

  return Promise.all(
    parsed.map(async (trip: { trip_title: string; destination: string }) => {
      const image = await getDestinationImage(trip.destination);
      return { ...trip, image };
    })
  );
}

export const processUserBatch = inngest.createFunction(
  { id: "process-user-batch" },
  { event: "user.batch.process" },
  async ({ event, step }) => {
    const users = event.data.batch;

    for (const user of users) {
      await step.run(
        `Generate recommendations for user ${user.id}`,
        async () => {
          const tripHistory = user.Trip.map(
            ({
              destination,
              travel_style,
              interests,
            }: {
              destination: string;
              travel_style: string;
              interests: string;
            }) => ({
              destination,
              travel_style,
              interests,
            })
          );

          let historyRecommendation = [];

          if (tripHistory.length > 0) {
            const prompt = createPromptFromHistory(tripHistory, 5);
            historyRecommendation = await generateTripsFromPrompt(prompt);
          } else {
            historyRecommendation = [];
          }

          const appPrompt = getStaticPrompt("APP", 5);
          const surprisePrompt = getStaticPrompt("SURPRISE", 2);

          const [appRecommendation, surpriseRecommendation, heroImage] =
            await Promise.all([
              generateTripsFromPrompt(appPrompt),
              generateTripsFromPrompt(surprisePrompt),
              getRandomTravelImage(),
            ]);

          await db.tripRecommendation.upsert({
            where: { userId: user.id },
            update: {
              historyRecommendation,
              appRecommendation,
              surpriseRecommendation,
              heroImage,
              lastUpdated: new Date(),
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            create: {
              userId: user.id,
              historyRecommendation,
              appRecommendation,
              surpriseRecommendation,
              heroImage,
              lastUpdated: new Date(),
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });

          console.log(`✅ Generated recommendations for user ${user.id}`);
        }
      );
    }

    return { processed: users.length };
  }
);
