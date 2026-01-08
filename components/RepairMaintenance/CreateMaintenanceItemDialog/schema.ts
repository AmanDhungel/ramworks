import * as z from "zod";

export const maintenanceSchema = z.object({
  // Step 1: Details
  maintenanceType: z.enum(["Scheduled", "Recurring", "Reported", "Emergency"]),
  serviceCategory: z.string().min(1, "Select a category"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),

  // Step 2: Assignment
  property: z.string().min(1, "Property is required"),
  unit: z.string().min(1, "Unit is required"),
  serviceProvider: z.string().min(1, "Service provider is required"),
  technician: z.string().optional(),

  // Step 3: Schedule & Recurrence
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().optional(),
  enableRecurrence: z.boolean(),
  frequency: z.string().optional(),
  repeatEvery: z.number().optional(),
  endDate: z.string().optional(),
  recurrenceDayOfMonth: z.string().optional(),
  recurrenceDayOfWeek: z.string().optional(),

  // Step 4: Costs & Extras
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
