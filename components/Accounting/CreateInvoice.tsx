"use client";
import * as z from "zod";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, Save, Send, Plus, Trash2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
const laborChargeSchema = z.object({
  description: z.string().min(1, "Required"),
  unitPrice: z.number(),
  technicianName: z.string().min(1, "Required"),
  workingHour: z.number(),
  date: z.string().min(1, "Required"),
});

const materialItemSchema = z.object({
  description: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  quantity: z.number().min(1),
  unitPrice: z.number(),
});

export const invoiceSchema = z.object({
  // Header Info
  tenant: z.string().min(1, "Select a tenant"),
  propertyUnit: z.string().min(1, "Select a unit"),
  issueDate: z.string().min(1, "Required"),
  dueDate: z.string().min(1, "Required"),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  paymentTerms: z.string(),

  // Service Provider
  providerName: z.string().min(1, "Required"),
  providerAddress: z.string().min(1, "Required"),
  providerPhone1: z.string().min(1, "Required"),
  providerPhone2: z.string().optional(),

  // Bill To
  billToPropertyName: z.string().min(1, "Required"),
  billToAddress: z.string().min(1, "Required"),
  billToPhone1: z.string().min(1, "Required"),
  billToPhone2: z.string().optional(),

  // Work Order
  category: z.string(),
  priority: z.string(),
  woTechnicianName: z.string().optional(),
  woDescription: z.string().optional(),
  woServiceDate: z.string().optional(),
  woCompletionDate: z.string().optional(),

  // Dynamic Sections
  laborCharges: z.array(laborChargeSchema),
  materials: z.array(materialItemSchema),

  // Payment & Notes
  paymentMethod: z.string(),
  paymentAmount: z.number(),
  notes: z.string().optional(),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function CreateInvoiceForm() {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      laborCharges: [
        {
          description: "",
          unitPrice: 0,
          technicianName: "",
          workingHour: 1,
          date: "",
        },
      ],
      materials: [{ description: "", type: "Rent", quantity: 1, unitPrice: 0 }],
      paymentTerms: "Net 30",
    },
  });

  const {
    fields: laborFields,
    append: appendLabor,
    remove: removeLabor,
  } = useFieldArray({
    control: form.control,
    name: "laborCharges",
  });

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  const onSubmit = (data: InvoiceFormValues) => console.log(data);

  return (
    <div className=" mx-auto p-6 space-y-6 bg-slate-50">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Create New Invoice
            </h1>
            <p className="text-xs text-slate-500">
              Generate invoice for tenant
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" /> Save Draft
          </Button>
          <Button className="bg-[#f26522] hover:bg-[#d4561d] gap-2">
            <Send className="w-4 h-4" /> Save & Send
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Tenant & Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Tenant & Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <FormField
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant *</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50">
                          <SelectValue placeholder="Select tenant" />
                        </SelectTrigger>
                      </FormControl>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="propertyUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property / Unit *</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 2: Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1 */}
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Issue Date *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-50/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Due Date *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-50/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Row 2 */}
                <FormField
                  control={form.control}
                  name="periodStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Period Start
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-50/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="periodEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Period End
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-50/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Row 3 */}
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Payment Terms
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Net 30"
                          {...field}
                          className="bg-slate-50/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full bg-slate-100 text-slate-400 border border-dashed border-slate-300 hover:bg-slate-200 h-10">
                    Add Monthly Rent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Labor Charges (Dynamic) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base text-slate-800">
                Labor Charges
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendLabor({
                    description: "",
                    unitPrice: 0,
                    technicianName: "",
                    workingHour: 1,
                    date: "",
                  })
                }
                className="text-slate-600 border-slate-200">
                <Plus className="w-4 h-4 mr-1" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {laborFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 relative bg-slate-50/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-700">
                      Labor Charges {index + 1}
                    </h4>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLabor(index)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`laborCharges.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-slate-700">
                          Description *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter labor charges description"
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`laborCharges.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Unit Price ($)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Amount ($)
                      </FormLabel>
                      <FormControl>
                        <Input
                          value="$0.00"
                          disabled
                          className="bg-slate-100"
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  <FormField
                    control={form.control}
                    name={`laborCharges.${index}.technicianName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-slate-700">
                          Technician Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter technician name"
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`laborCharges.${index}.workingHour`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Working Hour
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                {...field}
                                className="bg-white pr-8"
                              />
                              <span className="absolute right-3 top-2.5 text-sm text-slate-400">
                                Hr
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`laborCharges.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Section 4: Materials & Parts (Dynamic) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base text-slate-800">
                Materials & Parts
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendMaterial({
                    description: "",
                    type: "Rent",
                    quantity: 1,
                    unitPrice: 0,
                  })
                }
                className="text-slate-600 border-slate-200">
                <Plus className="w-4 h-4 mr-1" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {materialFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 bg-slate-50/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-700">
                      Item {index + 1}
                    </h4>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMaterial(index)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`materials.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-slate-700">
                          Description *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter item description"
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`materials.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Type *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Rent">Rent</SelectItem>
                              <SelectItem value="Part">Part</SelectItem>
                              <SelectItem value="Service">Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`materials.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Quantity
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`materials.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Unit Price ($)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Amount ($)
                      </FormLabel>
                      <FormControl>
                        <Input
                          value="$0.00"
                          disabled
                          className="bg-slate-100"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Invoice Summary Section */}
          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 space-y-2">
              <h3 className="font-bold mb-4">Invoice Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discounts:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span>Taxes:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total Amount:</span>
                <span>$0.00</span>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormLabel>Notes</FormLabel>
              <Textarea
                placeholder="Enter any additional notes or terms..."
                className="bg-slate-50"
                {...form.register("notes")}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
