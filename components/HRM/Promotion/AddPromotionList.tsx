"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, ArrowRight } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { useCreatePromotion } from "@/services/promotion.service";
import { useQueryClient } from "@tanstack/react-query";
import { useGetEmployee } from "@/services/employee.service";
import { useGetDesignation } from "@/services/designation.service";

const promotionSchema = z.object({
  promotion_for: z.string().min(1, "Please select an employee"),
  promotion_from: z.string().min(1, "Current position is required"),
  promotion_to: z.string().min(1, "New position is required"),
  promotion_date: z.string().min(1, "Promotion date is required"),
});

export type PromotionFormValues = z.infer<typeof promotionSchema>;

export default function AddPromotionDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}) {
  const { mutate } = useCreatePromotion();
  const queryClient = useQueryClient();
  const { data: employees } = useGetEmployee();
  const { data: degisnation } = useGetDesignation();

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      promotion_for: "",
      promotion_from: "",
      promotion_to: "",
      promotion_date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: PromotionFormValues) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["promotion"] });
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
          Add Promotion
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Promotion</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4">
            <FormField
              control={form.control}
              name="promotion_for"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50 w-full">
                        <SelectValue placeholder="Select employee to promote" />
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

            <div className="flex flex-col gap-4 p-4 border rounded-lg bg-slate-50/50">
              <FormField
                control={form.control}
                name="promotion_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase text-slate-500">
                      Promoted From
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50 w-full">
                          <SelectValue placeholder="Select employee to promote" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {degisnation?.data.map((emp) => (
                          <SelectItem key={emp._id} value={emp._id ?? ""}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center -my-2">
                <div className="bg-white p-1 rounded-full border shadow-sm z-10">
                  <ArrowRight className="h-4 w-4 text-orange-500 rotate-90 md:rotate-0" />
                </div>
              </div>

              <FormField
                control={form.control}
                name="promotion_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase text-slate-500">
                      Promoted To
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 w-full">
                            <SelectValue placeholder="Select employee to promote" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {degisnation?.data.map((emp) => (
                            <SelectItem key={emp._id} value={emp._id ?? ""}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="promotion_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#FF6B35] hover:bg-[#E85A20] px-6">
                Confirm Promotion
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
