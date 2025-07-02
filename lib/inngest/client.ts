import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "ryokou",
  name: "Ryokou",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
