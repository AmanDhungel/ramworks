"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateDepartment,
  useGetDepartment,
} from "@/services/departments.service";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useCreateDesignation } from "@/services/designation.service";
import useDialogOpen from "@/context/Dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  department: z.string().min(1, {
    message: "Department is required.",
  }),
  status: z.enum(["active", "inactive"], {
    message: "Status must be either 'active' or 'inactive'.",
  }),
  no_of_employees: z.number().min(1, {
    message: "Number of employees must be at least 1.",
  }),
});

export default function DesignationFormDialog() {
  const { mutate } = useCreateDesignation();
  const { open, setIsOpen } = useDialogOpen();
  const { data: department } = useGetDepartment();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["designation"] });
        setIsOpen();
        form.reset();
      },
    });
  }

  console.log("departments", form.formState.errors);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setIsOpen();
        form.reset();
      }}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
          <Plus className="h-4 w-4" /> Add New Designation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Designation</DialogTitle>
          <DialogDescription>
            Fill in the details below. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_of_employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {department?.data.map((dept) => (
                        <SelectItem key={dept._id} value={dept._id!}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
