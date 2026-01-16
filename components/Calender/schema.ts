import * as z from "zod";

export const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title is required"),
  category: z.enum(["activity", "meeting", "holiday", "lorem"]),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  color: z.string(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
