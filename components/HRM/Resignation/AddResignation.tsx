"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, AlertCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetEmployee } from "@/services/employee.service";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateRegisnation } from "@/services/regisnation.service";

// 1. Zod Schema
const resignationSchema = z
  .object({
    resigning_employee: z.string().min(1, "Please select an employee"),
    notice_date: z.string().min(1, "Notice date is required"),
    resignation_date: z.string().min(1, "Resignation date is required"),
    reason: z
      .string()
      .min(10, "Please provide a detailed reason (min 10 characters)"),
  })
  .refine(
    (data) => {
      return new Date(data.resignation_date) >= new Date(data.notice_date);
    },
    {
      message: "Last working day cannot be before the notice date",
      path: ["resignation_date"],
    },
  );

export type ResignationFormValues = z.infer<typeof resignationSchema>;

export default function AddResignationDialog() {
  const [open, setOpen] = React.useState(false);
  const { data: employees } = useGetEmployee();
  const { mutate } = useCreateRegisnation();
  const queryClient = useQueryClient();

  const form = useForm<ResignationFormValues>({
    resolver: zodResolver(resignationSchema),
    defaultValues: {
      resigning_employee: "",
      notice_date: new Date().toISOString().split("T")[0],
      resignation_date: "",
      reason: "",
    },
  });

  const onSubmit = (data: ResignationFormValues) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["resignation"] });
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 rounded-md px-5 h-10 font-bold shadow-sm text-white">
          <Plus className="h-4 w-4 border rounded-full p-0.5" />
          Add Resignation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Employee Resignation
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4">
            <FormField
              control={form.control}
              name="resigning_employee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resigning Employee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees?.data.map((emp) => (
                        <SelectItem key={emp._id} value={emp._id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Grid */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="notice_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resignation_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resignation Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription className="text-[10px]">
                      Last working day
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Resignation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the reason for leaving..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Warning Note */}
            <div className="flex gap-2 p-3 rounded-md bg-amber-50 border border-amber-100 text-amber-800 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>
                This action will initiate the offboarding process for the
                selected employee.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#FF6B35] hover:bg-[#E85A20] px-6">
                Submit Resignation
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
