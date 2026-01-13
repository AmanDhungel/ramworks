import * as z from "zod";

export const maintenanceSchema = z.object({
  maintenanceType: z.enum(["Scheduled", "Recurring", "Reported", "Emergency"]),
  serviceCategory: z.string().min(1, "Select a category"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),

  property: z.string().min(1, "Property is required"),
  unit: z.string().min(1, "Unit is required"),
  serviceProvider: z.string().min(1, "Service provider is required"),
  technician: z.string().optional(),

  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().optional(),
  enableRecurrence: z.boolean(),
  frequency: z.string().optional(),
  repeatEvery: z.number().optional(),
  endDate: z.string().optional(),
  recurrenceDayOfMonth: z.string().optional(),
  recurrenceDayOfWeek: z.string().optional(),

  totalCost: z.string().min(1, "Total cost is required"),
  laborCost: z.string().optional(),
  materialsCost: z.string().optional(),
  additionalCharges: z.string().optional(),
  tags: z.array(z.string()),
  internalNotes: z.string().optional(),
  notifyTenants: z.boolean(),
  requireApproval: z.boolean(),
});

export type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;

export const MaintenanceAttachmentSchema = z.object({
  attachment_file: z.array(z.object({ id: z.string(), url: z.string() })),
});

export type MaintenanceAttachment = z.infer<typeof MaintenanceAttachmentSchema>;

export const MaintenanceCostBreakdownSchema = z.object({
  labor: z.number(),
  materials: z.number(),
  additional_charges: z.number(),
});

export type MaintenanceCostBreakdown = z.infer<
  typeof MaintenanceCostBreakdownSchema
>;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const MaintenanceRequestSchema = z.object({
  type: z.string(),
  attachment_file: z
    .custom<File>()
    .refine((file) => file instanceof File, "Logo is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted."
    )
    .optional(),
  domain_workspace: z.string(),
  vendor_workspace: z.string(),
  board: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  property: z.string(),
  location: z.string(),
  date: z.string(),
  time: z.string(),
  estimated_duration: z.string(),
  total_estimated_cost: z.string(),
  cost_breakdown: MaintenanceCostBreakdownSchema.optional(),
  tags: z.array(z.string()),
  internal_notes: z.string(),
  notify_affected_tenants: z.boolean().optional(),
  require_approval_before_starting_work: z.boolean(),
  enableRecurrence: z.boolean().optional(),
});

export type MaintenanceRequest = z.infer<typeof MaintenanceRequestSchema>;
