"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CirclePlus,
  X,
  Calendar as CalendarIcon,
  PlusCircle,
  Check,
} from "lucide-react";
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
import { useCreateDeals } from "@/services/deals.service";
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
import { useGetContact } from "@/services/contact.service";
import { cn } from "@/lib/utils";
import { useGetEmployee } from "@/services/employee.service";
import { useGetWorkspace } from "@/services/workspace.service";
import {
  useGetVendorWorkspace,
  useGetVendorWorkspaceDeals,
} from "@/services/vendorworkspace.service";
import { useGetBoard } from "@/services/board.service";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useDialogOpen from "@/context/Dialog";

export const dealSchema = z.object({
  name: z.string().min(1, "Deal Name is required"),
  pipeline: z.object({
    domain_workspace: z.string().min(1, "Domain Workspace is required"),
    vendor_workspace: z.string().min(1, "Vendor Workspace is required"),
    board: z.string().min(1, "Board is required"),
    tasklist: z.string().min(1, "Tasklist is required"),
  }),
  status: z.string().min(1, "Status is required"),
  value: z.number().min(1, "Value is required"),
  currency: z.string().min(1, "Currency is required"),
  contacts: z.array(z.string()).min(1, "At least one contact is required"),
  due_date: z.string().min(1, "Due date is required"),
  expected_close_date: z.string().min(1, "Closing date is required"),
  assignees: z.array(z.string()).min(1, "At least one assignee is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  followup_date: z.string().min(1, "Followup date is required"),
  source: z.string().min(1, "Source is required"),
  priority: z.string().min(1, "Priority is required"),
  description: z.string().min(1, "Description is required"),
});

export type DealFormValues = z.infer<typeof dealSchema>;

export function AddDealDialog() {
  const queryClient = useQueryClient();
  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      contacts: [],
      assignees: [],
      tags: [],
    },
  });
  const { mutate } = useCreateDeals();
  const { data: contacts } = useGetContact();
  const { data: employees } = useGetEmployee();
  const { data: domainWorkSpace } = useGetWorkspace();
  const { open, setIsOpen } = useDialogOpen();

  const { data: vendorWorkspace } = useGetVendorWorkspaceDeals(
    form.watch("pipeline.domain_workspace"),
  );

  const { data: boardData } = useGetBoard(
    form.watch("pipeline.vendor_workspace"),
  );

  const onSubmit = (data: DealFormValues) => {
    const payload = {
      ...data,
      contacts: JSON.stringify(data.contacts),
      assignees: JSON.stringify(data.assignees),
      tags: JSON.stringify(data.tags),
      value: Number(data.value),
      pipeline: JSON.stringify({
        domain_workspace: data.pipeline.domain_workspace,
        vendor_workspace: data.pipeline.vendor_workspace,
        board: data.pipeline.board,
        tasklist: data.pipeline.tasklist,
      }),
    };
    mutate(payload as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["deals"] });
        toast.success("Deal created successfully!");
        setIsOpen();
        form.reset();
      },
    });
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
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#ff6b35] hover:bg-orange-600 text-white font-bold h-9 gap-2 shadow-sm">
          <PlusCircle size={16} /> Add New Deal
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Name *</FormLabel>
                    <Input
                      {...field}
                      className="bg-slate-50/50"
                      placeholder="Enter Deal Name"
                    />
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
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pipeline.domain_workspace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pipeline Domain WorkSpace *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50/50 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {domainWorkSpace?.data.map((workspace) => (
                            <SelectItem
                              key={
                                workspace._id ? workspace._id : workspace._id
                              }
                              value={workspace._id}>
                              {workspace.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pipeline.vendor_workspace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pipeline Vendor WorkSpace *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!vendorWorkspace?.data?.length}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50/50 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {vendorWorkspace?.data &&
                            vendorWorkspace.data.length > 0 ? (
                              vendorWorkspace.data.map((workspace) => (
                                <SelectItem
                                  key={workspace._id}
                                  value={workspace._id ?? ""}>
                                  {workspace.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem
                                value="no-data"
                                disabled
                                className="text-slate-500">
                                Please Select Domain Workspace First
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pipeline.board"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pipeline Board *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!boardData?.data?.length}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50/50 w-full">
                            <SelectValue placeholder="Select Board" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {boardData?.data && boardData.data.length > 0 ? (
                            boardData.data.map((board) => (
                              <SelectItem
                                key={board._id}
                                value={board._id ?? ""}>
                                {board.title}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem
                              value="no-data"
                              disabled
                              className="text-slate-500 ">
                              No Boards Available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pipeline.tasklist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pipeline Tasklist *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!boardData?.data?.length}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50/50 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {boardData?.data &&
                            boardData.data.length > 0 &&
                            boardData.data.map((board) =>
                              board.task_lists.map((tasklist) => (
                                <SelectItem
                                  key={tasklist._id}
                                  value={tasklist._id ?? ""}>
                                  {tasklist.title}
                                </SelectItem>
                              )),
                            )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Value *</FormLabel>
                      <Input
                        {...field} // This spreads value, onChange, onBlur, etc.
                        className="bg-slate-50/50"
                        type="number"
                        placeholder="0.00"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                      <FormMessage />
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
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="NPR">NPR</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

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
                                  className="w-full"
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

              <FormField
                control={form.control}
                name="assignees"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Assignees</FormLabel>
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
                              ? `${field.value.length} assignees selected`
                              : "Select assignees..."}
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
                              {employees?.data.map((contact) => (
                                <CommandItem
                                  className="w-full"
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

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="due_date"
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
                  name="expected_close_date"
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
                label="Tags"
                placeholder="Add new tags"
                fieldName="tags"
                form={form}
              />

              <FormField
                control={form.control}
                name="followup_date"
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
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone_call">Phone Call</SelectItem>
                          <SelectItem value="social_media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="previous_contact">
                            Previous Contact
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
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
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
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
