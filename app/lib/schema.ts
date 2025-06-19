import { z } from "zod";

export const completeProfileSchema = z.object({
  nationality: z.string({
    required_error: "Please select your nationality",
  }),
  currency: z.string(),
});

export const tripFormSchema = z.object({
  destination: z
    .string({
      required_error: "Please enter your dream destination.",
    })
    .min(1, "Please enter your dream destination."),
  dateRange: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      {
        required_error: "Please select a start and end date.",
      }
    )
    .refine(
      (data) => {
        if (!data.from) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return data.from > today;
      },
      {
        path: ["from"],
        message: "Start date must be in the future.",
      }
    )
    .refine(
      (data) => {
        if (!data.from || !data.to) return true;
        return data.from < data.to;
      },
      {
        path: ["to"],
        message: "End date must be after start date.",
      }
    ),
  travel_style: z.string().optional(),
  interests: z.string().optional(),
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
});
