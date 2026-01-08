import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  complete: z.boolean(),
  labels: z.array(
    z.object({
      id: z.string(),
      color: z.string(),
      name: z.string().optional(),
    })
  ),
  priority: z
    .enum([
      "Emergency",
      "Alert",
      "Critical",
      "Error",
      "Warning",
      "Notification",
      "Informational",
    ])
    .nullable(),
  checklists: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
    })
  ),
  members: z.array(z.string()),
  deadline: z
    .object({
      date: z.date().optional(),
      time: z.string().optional(),
    })
    .optional(),

  forms: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      isRequired: z.boolean(),
      isHidden: z.boolean(),
    })
  ),
  attachments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.string(),
      url: z.string(),
    })
  ),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "Zip code is required"),
    lat: z.number(),
    lng: z.number(),
    images: z.array(z.any()).optional(),
    attendance: z.object({
      clockInDate: z.string().min(1, "Clock-in date is required"),
      clockInTime: z.string().min(1, "Clock-in time is required"),
      clockOutDate: z.string().min(1, "Clock-out date is required"),
      clockOutTime: z.string().min(1, "Clock-out time is required"),
    }),
  }),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
