import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, X, Calendar as CalendarIcon, Check } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useGetContact } from "@/services/contact.service";

export const dealSchema = z.object({
  dealName: z.string().min(1, "Deal Name is required"),
  pipeline: z.string().min(1, "Pipeline is required"),
  status: z.string().min(1, "Status is required"),
  dealValue: z.string().min(1, "Value is required"),
  currency: z.string().min(1, "Currency is required"),
  period: z.string().optional(),
  periodValue: z.string().optional(),
  contacts: z.array(z.string()).min(1, "At least one contact is required"),
  projects: z.array(z.string()).min(1, "At least one project is required"),
  dueDate: z.string().min(1, "Due date is required"),
  expectedClosingDate: z.string().min(1, "Closing date is required"),
  assignees: z.array(z.string()).min(1, "At least one assignee is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  followupDate: z.string().min(1, "Followup date is required"),
  source: z.string().min(1, "Source is required"),
  priority: z.string().min(1, "Priority is required"),
  description: z.string().min(1, "Description is required"),
});

export type DealFormValues = z.infer<typeof dealSchema>;

export function AddDealDialog() {
  const { data: contacts } = useGetContact();
  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      contacts: [],
      projects: [],
      assignees: [],
      tags: [],
    },
  });

  const onSubmit = (data: DealFormValues) => {
    console.log("Form Data:", data);
  };

  const MultiTagInput = ({
    label,
    placeholder,
    fieldName,
    form,
  }: {
    label: string;
    placeholder: string;
    fieldName: keyof DealFormValues;
    form: any;
  }) => {
    const [inputValue, setInputValue] = React.useState("");
    const items = (form.watch(fieldName) as string[]) || [];

    const addItem = () => {
      if (inputValue.trim()) {
        form.setValue(fieldName, [...items, inputValue.trim()]);
        setInputValue("");
      }
    };

    const removeItem = (index: number) => {
      form.setValue(
        fieldName,
        items.filter((_, i) => i !== index),
      );
    };

    return (
      <div className="space-y-2">
        <FormLabel className="text-slate-700">{label} *</FormLabel>
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-slate-50/50"
            // Allow adding on Enter key
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
          />
          <Button
            type="button"
            onClick={addItem}
            className="bg-orange-500 hover:bg-orange-600">
            <CirclePlus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {items.map((item, idx) => (
            <Badge
              key={`${fieldName}-${idx}`}
              variant="secondary"
              className="bg-slate-700 text-white flex gap-1 items-center px-3 py-1">
              {item}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-400"
                onClick={() => removeItem(idx)}
              />
            </Badge>
          ))}
        </div>
        <FormMessage />
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white border-none">
          <CirclePlus className="mr-2 h-4 w-4" /> Add Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Add New Deals
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Deal Name */}
              <FormField
                control={form.control}
                name="dealName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Name *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="deal1">Deal 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Pipeline & Status */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pipeline"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Pipeline *</FormLabel>
                        <span className="text-[10px] text-orange-500 cursor-pointer flex items-center">
                          <CirclePlus className="w-3 h-3 mr-1" /> Add New
                        </span>
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50/50">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sales">Sales Pipeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50/50">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Value & Currency */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dealValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Value *</FormLabel>
                      <Input {...field} className="bg-slate-50/50" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Multi-add Fields */}
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
                              !field.value?.length && "text-muted-foreground",
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
                                      contact._id,
                                    )
                                      ? currentValue.filter(
                                          (v: string) => v !== contact._id,
                                        )
                                      : [...currentValue, contact._id];
                                    field.onChange(newValue);
                                  }}>
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.includes(contact._id)
                                        ? "opacity-100"
                                        : "opacity-0",
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

              <MultiTagInput
                label="Project"
                placeholder="Add new"
                fieldName="projects"
                form={form}
              />

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date *</FormLabel>
                      <div className="relative">
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-50/50"
                        />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expectedClosingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Closing Date *</FormLabel>
                      <Input
                        type="date"
                        {...field}
                        className="bg-slate-50/50"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <MultiTagInput
                label="Assignee"
                placeholder="Add new"
                fieldName="assignees"
                form={form}
              />

              <MultiTagInput
                label="Tags"
                placeholder="Add new tags"
                fieldName="tags"
                form={form}
              />

              {/* Followup & Priority */}
              <FormField
                control={form.control}
                name="followupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Followup Date *</FormLabel>
                    <Input type="date" {...field} className="bg-slate-50/50" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <Textarea
                      {...field}
                      className="bg-slate-50/50 min-h-[100px]"
                    />
                  </FormItem>
                )}
              />

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" className="px-8">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 px-8">
                  Add Deal
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
