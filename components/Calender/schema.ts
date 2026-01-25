import { id } from "date-fns/locale";
import * as z from "zod";

export const eventSchema = z.object({
  _id: z.string().optional(),
  date: z.string(),
  description: z.string(),
  end_time: z.string(),
  location: z.string(),
  name: z.string(),
  start_time: z.string(),
  type: z.string(),
});

// export type EventType = {
//   _id?: string;
//   name: string;
//   type: string;
//   date: string;
//   start_time: string;
//   end_time: string;
//   description: string;
//   location: string;
// };

export type EventFormValues = z.infer<typeof eventSchema>;
