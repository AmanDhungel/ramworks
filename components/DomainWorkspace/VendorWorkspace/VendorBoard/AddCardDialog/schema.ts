import * as z from "zod";

export const AddTaskPayloadSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.string(),
  labels: z.object({
    label: z.string(),
    color_code: z.string(),
  }),

  checklists: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          text: z.string(),
          completed: z.boolean(),
          attachments: z.array(z.instanceof(Blob)).optional(),
          deadline: z.string().optional(),
          contacts: z.array(z.string()),
        }),
      ),
    }),
  ),
  contacts: z.array(z.string()),
  deadline: z.string().optional(),
  invoices: z.array(z.string()),
  custom_fields: z
    .array(
      z.object({
        field_name: z.string(),
        field_type: z.string(),
        field_value: z.union([z.string(), z.number()]),
        field_options: z.optional(
          z.array(
            z.object({
              label: z.string(),
              value: z.string(),
            }),
          ),
        ),
      }),
    )
    .optional(),
  location: z
    .object({
      type: z.string(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      date: z.string().optional(),
      time: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      zip_code: z.string().optional(),
    })
    .optional(),
  attachments: z.array(z.instanceof(Blob)).optional(),
  location_photos: z.array(z.instanceof(Blob)).optional(),
});

export type TaskFormValues = z.infer<typeof AddTaskPayloadSchema>;
