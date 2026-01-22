"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, X, PlusCircle } from "lucide-react";
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

import { useGetContact } from "@/services/contact.service";
import { useGetWorkspace } from "@/services/workspace.service";
import { useGetVendorWorkspaceDeals } from "@/services/vendorworkspace.service";
import { useGetBoard } from "@/services/board.service";
import { SelectGroup } from "@radix-ui/react-select";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useDialogOpen from "@/context/Dialog";
import { useGetCompany } from "@/services/company.service";
import { useCreateLeads } from "@/services/lead.service";

export const LEAD_CURRENCY = ["USD", "NPR"] as const;
export const LEAD_INDUSTRY = [
  "retail_industry",
  "banking_finance",
  "it_software",
  "healthcare",
  "manufacturing",
  "education",
] as const;
export const LEAD_SOURCE = [
  "phone_call",
  "social_media",
  "referral",
  "previous_contact",
  "other",
] as const;
export const LEAD_STATUS = ["active", "inactive"] as const;

export const leadSchema = z.object({
  name: z.string().min(1, "Lead Name is required"),
  pipeline: z.object({
    domain_workspace: z.string().min(1, "Domain Workspace is required"),
    vendor_workspace: z.string().min(1, "Vendor Workspace is required"),
    board: z.string().min(1, "Board is required"),
    tasklist: z.string().min(1, "Tasklist is required"),
  }),
  company: z.string().min(1, "Company is required"),
  currency: z.enum(LEAD_CURRENCY),
  phone: z.string().min(1, "Phone is required"),
  email: z.email().min(1, "Email is required"),
  industry: z.enum(LEAD_INDUSTRY),
  source: z.enum(LEAD_SOURCE),
  owner: z.string().min(1, "Owner is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  status: z.enum(LEAD_STATUS),
  description: z.string().min(1, "Description is required"),
});
export type LeadFormValues = z.infer<typeof leadSchema>;

export function AddLeadDialog() {
  const queryClient = useQueryClient();
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      tags: [],
    },
  });
  const { mutate } = useCreateLeads();
  const { data: contacts } = useGetContact();
  const { data: company } = useGetCompany();
  const { data: domainWorkSpace } = useGetWorkspace();
  const { open, setIsOpen } = useDialogOpen();

  const { data: vendorWorkspace } = useGetVendorWorkspaceDeals(
    form.watch("pipeline.domain_workspace"),
  );

  const { data: boardData } = useGetBoard(
    form.watch("pipeline.vendor_workspace"),
  );

  console.log("Board Data:", boardData);

  const onSubmit = (data: LeadFormValues) => {
    const payload = {
      ...data,
      tags: JSON.stringify(data.tags),
      pipeline: JSON.stringify({
        domain_workspace: data.pipeline.domain_workspace,
        vendor_workspace: data.pipeline.vendor_workspace,
        board: data.pipeline.board,
        tasklist: data.pipeline.tasklist,
      }),
    };
    mutate(payload as any, {
      onSuccess: (response) => {
        console.log("Lead created successfully:", response);
        queryClient.invalidateQueries({ queryKey: ["leads"] });
        toast.success("Lead created successfully!");
        setIsOpen();
        form.reset();
      },
    });
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
    fieldName: keyof LeadFormValues;
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
          <PlusCircle size={16} /> Add New Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Add New Lead
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Name *</FormLabel>
                    <Input
                      {...field}
                      className="bg-slate-50/50"
                      placeholder="Enter Lead Name"
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
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
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {contacts?.data &&
                            contacts?.data.map((contact) => (
                              <SelectItem key={contact._id} value={contact._id}>
                                {contact.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="bg-slate-50/50 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {company?.data &&
                            company?.data.map((company) => (
                              <SelectItem key={company._id} value={company._id}>
                                {company.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <div className="relative">
                        <Input
                          type="number"
                          {...field}
                          className="bg-slate-50/50"
                          placeholder="8112345678"
                        />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Closing Date *</FormLabel>
                      <Input
                        type="text"
                        {...field}
                        className="bg-slate-50/50"
                        placeholder="john@email.com"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="bg-slate-50/50 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail_industry">
                          Retail Industry
                        </SelectItem>
                        <SelectItem value="banking_finance">
                          Banking & Finance
                        </SelectItem>
                        <SelectItem value="it_software">
                          IT & Software
                        </SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <MultiTagInput
                label="Tags"
                placeholder="Add new tags"
                fieldName="tags"
                form={form}
              />

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
                  Add Lead
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
