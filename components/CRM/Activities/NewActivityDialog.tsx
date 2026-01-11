import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, CirclePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useGetContact } from "@/services/contact.service";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetCompany } from "@/services/company.service";
import {
  useCreateActivity,
  useGetSingleActivity,
} from "@/services/activity.service";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useDialogOpen from "@/context/Dialog";
import { useUpdateParams } from "@/helper/removeparam";
import { useSearchParams } from "next/navigation";

const activitySchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  activity_type: z.string().min(1, "Please select an activity type"),
  due_date: z.date(),
  owner: z.string().min(1, "Please select an owner"),
  guests: z.array(z.string()),
  deals: z.array(z.string()).optional(),
  contacts: z.array(z.string()),
  companies: z.array(z.string()),
});

export type ActivityFormValues = z.infer<typeof activitySchema>;

export function AddActivityDialog() {
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      activity_type: "",
      owner: "",
      guests: [],
      contacts: [],
      companies: [],
    },
  });

  const { data: contacts } = useGetContact();
  const { data: company } = useGetCompany();
  const { mutate, isPending } = useCreateActivity();
  const queryClient = useQueryClient();
  const { open, setIsOpen } = useDialogOpen();
  const { removeParam } = useUpdateParams();
  const params = useSearchParams();
  const activityId = params.get("activity_id");
  const { data: singleActivity } = useGetSingleActivity(
    activityId ? activityId : ""
  );

  useEffect(() => {
    if (activityId && singleActivity?.data) {
      const {
        title,
        description,
        activity_type,
        due_date,
        owner,
        guests,
        contacts,
        companies,
      } = singleActivity.data;

      form.reset({
        title,
        description,
        activity_type,
        due_date: due_date ? new Date(due_date) : new Date(),
        owner: owner?._id,
        guests: guests.map((guest) => guest._id).filter(Boolean),
        contacts: contacts?.map((contact) => contact._id).filter(Boolean),
        companies: companies?.map((company) => company._id).filter(Boolean),
      });
    } else {
      form.reset({
        title: "",
        description: "",
        activity_type: "",
        due_date: new Date(),
        owner: "",
        guests: [],
        contacts: [],
        companies: [],
      });
    }
  }, [activityId, singleActivity?.data]);

  console.log(form.getValues());
  const onSubmit = (data: ActivityFormValues) => {
    const payload = {
      ...data,
      guests: JSON.stringify(data.guests),
      companies: JSON.stringify(data.companies),
      contacts: JSON.stringify(data.contacts),
      deals: "",
    };

    //   const payload = {
    //   ...data,
    //   tags: JSON.stringify(data.tags),
    //   address: JSON.stringify(data.address),
    //   social_accounts: JSON.stringify(data.social_accounts),
    //   contacts: JSON.stringify(data.contacts),
    // };
    // mutate(payload as any, {
    mutate(payload as any, {
      onSuccess: (msg) => {
        toast.success(msg.message);
        queryClient.invalidateQueries({ queryKey: ["activity"] });
        removeParam("activity_id");
        form.reset();
        setIsOpen();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to create activity"
        );
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setIsOpen();
        removeParam("activity_id");
        form.reset();
      }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-orange-600 transition-colors">
          <CirclePlus size={18} /> Add New Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold text-slate-800">
            Add New Activity
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter activity title" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter activity description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="activity_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Activity Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="call">Calls</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="task">Tasks</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Due Date */}
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-semibold mb-2">
                      Due Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-slate-200",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-[#ff6b35]" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Owner..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contacts?.data.map((i) => (
                          <SelectItem key={i._id} value={i._id}>
                            {i.name}
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
                name="contacts"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Contacts</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between font-normal",
                              !field.value?.length && "text-muted-foreground"
                            )}>
                            {field.value?.length > 0
                              ? `${field.value.length} contacts selected`
                              : "Select contacts..."}
                            <span className="ml-2 opacity-50">▼</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search contacts..." />
                          <CommandList>
                            <CommandEmpty>No contact found.</CommandEmpty>
                            <CommandGroup>
                              {contacts?.data.map((contact) => (
                                <CommandItem
                                  key={contact._id}
                                  value={contact.name}
                                  onSelect={() => {
                                    const currentValue = field.value || [];
                                    const newValue = currentValue.includes(
                                      contact._id
                                    )
                                      ? currentValue.filter(
                                          (v: string) => v !== contact._id
                                        )
                                      : [...currentValue, contact._id];
                                    field.onChange(newValue);
                                  }}>
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.includes(contact._id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {contact.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companies"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Companies</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between font-normal",
                              !field.value?.length && "text-muted-foreground"
                            )}>
                            {field.value?.length > 0
                              ? `${field.value.length} contacts selected`
                              : "Select contacts..."}
                            <span className="ml-2 opacity-50">▼</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search contacts..." />
                          <CommandList>
                            <CommandEmpty>No contact found.</CommandEmpty>
                            <CommandGroup>
                              {company?.data.map((contact) => (
                                <CommandItem
                                  key={contact._id}
                                  value={contact.name}
                                  onSelect={() => {
                                    const currentValue = field.value || [];
                                    const newValue = currentValue.includes(
                                      contact._id
                                    )
                                      ? currentValue.filter(
                                          (v: string) => v !== contact._id
                                        )
                                      : [...currentValue, contact._id];
                                    field.onChange(newValue);
                                  }}>
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.includes(contact._id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {contact.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="border-t pt-5 mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen()}
                className="text-slate-500">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#ff6b35] hover:bg-orange-600 text-white font-bold px-8 shadow-md">
                {isPending ? "Creating..." : "Create"} Activity
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
