"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCreateTraining,
  useGetTrainers,
  useGetTrainingType,
} from "@/services/training.service";
import { useGetEmployee } from "@/services/employee.service";
import { useQueryClient } from "@tanstack/react-query";

// 1. Zod Schema
const trainingSchema = z.object({
  training_type: z.string().min(1, "Training type is required"),
  trainer: z.string().min(1, "Please select a trainer"), // Storing ID
  employees: z.array(z.string()).min(1, "Select at least one employee"), // Storing IDs
  training_cost: z.number().min(0, "Cost must be a positive number"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["scheduled", "in_progress", "completed", "canceled"]),
});

export type TrainingFormValues = z.infer<typeof trainingSchema>;

export default function AddTrainingDialog() {
  const [open, setOpen] = React.useState(false);
  const { data: trainers } = useGetTrainers();
  const { data: employees } = useGetEmployee();
  const { data: trainingType } = useGetTrainingType();
  const { mutate } = useCreateTraining();
  const queryClient = useQueryClient();

  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      training_type: "",
      trainer: "",
      employees: [],
      training_cost: 0,
      start_date: "",
      end_date: "",
      description: "",
      status: "scheduled",
    },
  });

  const onSubmit = (data: TrainingFormValues) => {
    const payload = {
      ...data,
      employees: JSON.stringify(data.employees),
    };
    mutate(payload as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["training"] });
        setOpen(false);
        form.reset();
      },
      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 rounded-md px-5 h-10 font-bold shadow-sm text-white">
          <Plus className="h-4 w-4 border rounded-full p-0.5" />
          Add Training
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">
            Schedule Training Session
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[85vh] px-6 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-6">
              {/* Training Type & Cost */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="training_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a trainer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {trainingType?.data.map((t) => (
                              <SelectItem key={t._id} value={t._id ?? ""}>
                                {t.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="training_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Cost ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="trainer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Trainer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a trainer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trainers?.data.map((t) => (
                          <SelectItem key={t._id} value={t._id ?? ""}>
                            {t.first_name} {t.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employees"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel>Participants (Employees)</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border rounded-md p-3 bg-slate-50/50">
                      {employees?.data.map((emp) => (
                        <FormField
                          key={emp._id}
                          control={form.control}
                          name="employees"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(emp._id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            emp._id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== emp._id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {emp.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Training objectives..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF6B35] hover:bg-[#E85A20] px-6">
                  Save Training Session
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
