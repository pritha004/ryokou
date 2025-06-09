import { z } from "zod";

export const completeProfileSchema = z.object({
  nationality: z.string({
    required_error: "Please select your nationality",
  }),
  currency: z.string(),
});

export const tripFormSchema = z
  .object({
    destination: z
      .string({
        required_error: "Please enter your dream destination.",
      })
      .min(1, "Please enter your dream destination."),
    dateRange: z.object(
      {
        from: z.date(),
        to: z.date(),
      },
      {
        required_error: "Please select a date range.",
      }
    ),
    travel_style: z.string(),
    interests: z.string(),
    budget: z.preprocess(
      (val) => {
        if (typeof val === "string" && val.trim() === "") return undefined;
        return val;
      },
      z.coerce
        .number({
          required_error: "Please enter your budget.",
          invalid_type_error: "Please enter your budget.",
        })
        .refine((val) => val > 0, {
          message: "Budget must be greater than 0.",
        })
    ),
    number_of_persons: z.preprocess(
      (val) => {
        if (typeof val === "string" && val.trim() === "") return undefined;
        return val;
      },
      z.coerce
        .number({
          required_error: "Please enter number of persons in your trip.",
          invalid_type_error: "Please enter number of persons in your trip.",
        })
        .refine((val) => val > 0, {
          message: "Number of persons must be greater than 0.",
        })
    ),
  })
  .refine((data) => data.dateRange.from < data.dateRange.to, {
    path: ["dateRange"],
    message: "Start date must be before end date.",
  })
  .refine((data) => data.dateRange.from > new Date(), {
    path: ["dateRange", "from"],
    message: "Start date must be in the future.",
  });
