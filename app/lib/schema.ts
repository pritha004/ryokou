import { z } from "zod";

export const completeProfileSchema = z.object({
  nationality: z.string({
    required_error: "Please select ayour nationality",
  }),
  currency: z.string({
    required_error: "Please select a currency",
  }),
});
