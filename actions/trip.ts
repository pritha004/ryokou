"use server";

import { auth } from "@/auth";
import db from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDestinationImage } from "./destination-image";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAndSaveTripDetails(tripData: any) {
  const {
    destination,
    dateRange,
    travel_style,
    interests,
    budget,
    number_of_persons,
  } = tripData;

  const start_date = dateRange.from;
  const end_date = dateRange.to;

  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const loggedInUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!loggedInUser) throw new Error("User not found");

  const prompt = `Generate a detailed itinerary for  ${destination} from ${start_date} to ${end_date} in ascending order of date for a resident of ${
    loggedInUser.nationality
  }. The budget should be within ${budget}  ${
    loggedInUser.currency
  } for ${number_of_persons} people. Add dates as keys in itineraries. Create a short and fun "trip_title". Give me a publicly available, copyright-free image URL of ${destination} that is free to use commercially and without attribution and store in "image_url". ${
    travel_style && `The travel style of the planner is ${travel_style}.`
  } Incorporate interests of the planner which are ${
    interests || "food, rare attractions"
  } while planning each day and adding the attractions. Give a detailed summary of the day incorporating the interests. Also add suggested accomodations, transportation, food and activities according to ${travel_style} travel style. Check if the ${destination} is a place in ${
    loggedInUser.nationality
  }, if yes do not add basic_info. If ${destination} is a place outside ${
    loggedInUser.nationality
  } add basic_info like currency, exchange rate, sim card details with few options, useful apps, emergency contacts. If ${destination} is a place outside ${
    loggedInUser.nationality
  },set "visa_required" to true else false. Add a budget breakdown in ${
    loggedInUser.currency
  }.
    
    Return the response in this JSON format only, no additional text:
    {
      "trip_title":"string",
      "image_url":"string",
      "itineraries": {
        "date":{
          "title": "string",
          "summary": "string"
          "transportation": "string",
          "attractions":"string",
          "accomodations":"string"
        }
      },

    "basic_info":{
        "currency":"string",
        "sim_card_details":"string",
        "useful_apps":"string",
        "emergency_contacts":"string"
      },

    "visa_required":"boolean",
    "budget_breakdown":{
        "accomodation":"number",
        "food":"number",
        "transportation":"number",
        "activities":"number",
        "misc":"number"
      }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const itineraries = JSON.parse(cleanedText);

    const image = await getDestinationImage(destination);

    const trip = await db.trip.create({
      data: {
        userId: loggedInUser.id,
        trip_name: itineraries.trip_title,
        image,
        destination,
        start_date,
        end_date,
        budget,
        is_visa_required: itineraries.visa_required,
        travel_style,
        interests,
        number_of_persons,
        itineraries,
      },
    });
    return { success: true, id: trip.id };
  } catch (error) {
    console.error("Error generating itinerary", error);
    throw new Error("Failed to generate itinerary");
  }
}

export async function getTrips() {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const loggedInUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!loggedInUser) throw new Error("User not found");

  try {
    const trips = await db.trip.findMany({
      where: {
        userId: loggedInUser.id,
      },
      select: {
        id: true,
        trip_name: true,
        image: true,
        travel_style: true,
        interests: true,
        destination: true,
        createdAt: true,
      },
    });
    return {
      success: true,
      trips,
    };
  } catch (error) {
    console.error("Error fetching trips", error);
    throw new Error("Failed to fetch trips");
  }
}

export async function getTrip(tripId: string) {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const loggedInUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!loggedInUser) throw new Error("User not found");

  try {
    const trip = await db.trip.findUnique({
      where: {
        userId: loggedInUser.id,
        id: tripId,
      },
    });

    if (trip) {
      return {
        success: true,
        trip,
      };
    } else {
      throw new Error("Failed to fetch trip");
    }
  } catch (error) {
    console.error("Error fetching trip", error);
    throw new Error("Failed to fetch trip");
  }
}

export async function deleteTrip(tripId: string) {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const loggedInUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!loggedInUser) throw new Error("User not found");

  try {
    const trip = await db.trip.delete({
      where: {
        userId: loggedInUser.id,
        id: tripId,
      },
    });

    if (trip) {
      return {
        success: true,
      };
    } else {
      throw new Error("Failed to delete trip");
    }
  } catch (error) {
    console.error("Error deleting trip", error);
    throw new Error("Failed to delete trip");
  }
}

export async function generateRecommendationTrips(
  type: "HISTORY" | "SURPRISE" | "APP",
  numberOfTrips: number
) {
  let prompt = "";

  if (type === "HISTORY") {
    const trips = await getTrips();

    if (trips.trips.length <= 0) {
      return { success: true, trips: [] };
    }

    const tripsHistory = trips.trips.map(
      ({ destination, travel_style, interests }) => ({
        destination,
        travel_style,
        interests,
      })
    );

    prompt = `
    Generate ${numberOfTrips} trips name for recommendation based on the destination, travel_style and interests mentioned in the user's history trips provided in json as ${tripsHistory}.
    Add a fun title containing the destination.

    Return the response in this JSON format only, no additional text:
    [{
      "trip_title":"string",
      "destination":"string"
    },{
      "trip_title":"string",
      "destination":"string"
    }]`;
  } else if (type === "APP") {
    prompt = `As a passionate travel enthusiast looking for next adventure, suggest the top ${numberOfTrips} must-visit destinations around the world. Please include a mix of nature, culture, history, and unique experiences.
    Add a fun title containing the destination.

    Return the response in this JSON format only, no additional text:
    [{
      "trip_title":"string",
      "destination":"string"
    },{
      "trip_title":"string",
      "destination":"string"
    }]`;
  } else {
    prompt = `
    Generate ${numberOfTrips} unique and surprising travel destinations that most people wouldn’t think of, but offers a perfect mix of adventure, culture, food, and natural beauty. Keep it off the beaten path and ideal for a memorable, unexpected getaway.
    Add a fun title containing the destination.

    Return the response in this JSON format only, no additional text:
    [{
      "trip_title":"string",
      "destination":"string"
    }]`;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const trips = JSON.parse(cleanedText);

    const updatedTrips = await Promise.all(
      trips.map(async (trip: { trip_title: string; destination: string }) => {
        const image = await getDestinationImage(trip.destination);
        return {
          ...trip,
          image,
        };
      })
    );

    return updatedTrips;
  } catch (error) {
    console.error("Error generating recommended trips", error);
    throw new Error("Failed to generate recommended trips");
  }
}

export async function getRecommendedTrips() {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const loggedInUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
    include: {
      tripRecommendation: true,
    },
  });

  if (!loggedInUser) throw new Error("User not found");

  // If no recommendations exist, generate them
  try {
    if (!loggedInUser.tripRecommendation) {
      const historyRecommendation = await generateRecommendationTrips(
        "HISTORY",
        5
      );
      const appRecommendation = await generateRecommendationTrips("APP", 8);
      const surpriseRecommendation = await generateRecommendationTrips(
        "SURPRISE",
        2
      );

      const tripRecommendation = await db.tripRecommendation.upsert({
        where: {
          userId: loggedInUser.id,
        },

        update: {
          appRecommendation,
          historyRecommendation,
          surpriseRecommendation,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        create: {
          userId: loggedInUser.id,
          appRecommendation,
          historyRecommendation,
          surpriseRecommendation,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return { success: true, tripRecommendation };
    } else {
      const tripRecommendation = await db.tripRecommendation.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      return { success: true, tripRecommendation };
    }
  } catch (error) {
    console.error("Error getting recommended trips", error);
    throw new Error("Failed to get recommended trips");
  }
}
