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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export const connectAccountSchema = z.object({
  accountType: z.string().min(1, "Account type is required"),
  syncDuration: z.enum(["now", "1_month", "3_months", "6_months"]),
});

export type ConnectAccountValues = z.infer<typeof connectAccountSchema>;

export function ConnectAccountDialog() {
  const form = useForm<ConnectAccountValues>({
    resolver: zodResolver(connectAccountSchema),
    defaultValues: {
      syncDuration: "now",
    },
  });

  const onSubmit = (data: ConnectAccountValues) => {
    console.log("Connect Account Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 px-6">
          Connect Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[#1e293b] mb-6">
            Connect Account
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Account Type Select */}
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1e293b] font-semibold text-base">
                    Account Type *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#f8faff] border-slate-200 h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="google">Google Workspace</SelectItem>
                      <SelectItem value="outlook">Microsoft Outlook</SelectItem>
                      <SelectItem value="imap">Other (IMAP)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sync Emails Radio Group */}
            <FormField
              control={form.control}
              name="syncDuration"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-[#1e293b] font-semibold text-base">
                    Sync emails from
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3">
                      {[
                        { label: "Now", value: "now" },
                        { label: "1 month ago", value: "1_month" },
                        { label: "3 months ago", value: "3_months" },
                        { label: "6 months ago", value: "6_months" },
                      ].map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value={option.value}
                              className="border-slate-300 text-orange-500 focus-visible:ring-orange-500"
                            />
                          </FormControl>
                          <FormLabel className="font-medium text-slate-700 cursor-pointer">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="px-12 h-12 text-slate-600 border-slate-200 font-semibold text-base"
                onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#f26522] hover:bg-[#d4561d] px-12 h-12 text-white font-semibold text-base">
                Connect Account
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
