"use server";

import { auth } from "@/auth";
import db from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

  const prompt = `Generate a detailed itinerary for  ${destination} from ${start_date} to ${end_date} for a resident of ${
    loggedInUser.nationality
  }. The budget should be within ${budget}  ${
    loggedInUser.currency
  } for ${number_of_persons} people. Add dates as keys in itinenaries. Create a short and fun trip_title with all the details available. ${
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
      "itinenaries": {
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

    const trip = await db.trip.create({
      data: {
        userId: loggedInUser.id,
        trip_name: itineraries.trip_title,
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
