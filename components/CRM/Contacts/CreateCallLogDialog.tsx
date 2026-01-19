import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const callLogSchema = z.object({
  status: z.string().min(1, "Status is required"),
  followupDate: z.string().min(1, "Followup date is required"),
  note: z.string().min(1, "Note is required"),
  createFollowupTask: z.boolean(),
});

export type CallLogFormValues = z.infer<typeof callLogSchema>;

export function CreateCallLogDialog() {
  const form = useForm<CallLogFormValues>({
    resolver: zodResolver(callLogSchema),
    defaultValues: {
      status: "Busy",
      note: "",
      createFollowupTask: true,
      followupDate: "",
    },
  });

  const onSubmit = (data: CallLogFormValues) => {
    console.log("Call Log Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-orange-600 font-medium">
          <PlusCircle className="w-4 h-4 mr-2" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1e293b]">
            Create Call Log
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4">
            {/* Row 1: Status and Followup Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Status *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#f8faff] border-slate-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Busy">Busy</SelectItem>
                        <SelectItem value="Connected">Connected</SelectItem>
                        <SelectItem value="No Answer">No Answer</SelectItem>
                        <SelectItem value="Wrong Number">
                          Wrong Number
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="followupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Followup Date *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-[#f8faff] border-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Note Field */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    Note *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter details..."
                      className="min-h-[120px] bg-[#f8faff] border-slate-200 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox Row */}
            <FormField
              control={form.control}
              name="createFollowupTask"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-orange-500 border-slate-300"
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel className="text-sm font-bold text-slate-700 cursor-pointer">
                      Create a follow up task
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="px-10 py-5 text-slate-600 border-slate-200 font-semibold"
                onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#f26522] hover:bg-[#d4561d] px-10 py-5 text-white font-semibold">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
