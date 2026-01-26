"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, UploadCloud, Search } from "lucide-react";
import React, { useState } from "react";

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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUploadField } from "@/components/DomainWorkspace/CreateDomainWorkspaceDialog";
import { MultipleFileUploadField } from "@/components/ui/MultipleFileUpload";

// Schema for the main form
const formSchema = z.object({
  status: z.string().min(1, "Status is required"),
  date: z.string().min(1, "Date is required"),
  memberIds: z.array(z.string()),
  description: z.string().optional(),
});

const MEMBERS = [
  { id: "1", name: "Michael Walker", img: "/avatar1.png" },
  { id: "2", name: "Thomas Bordelon", img: "/avatar2.png" },
  { id: "3", name: "Doglas Martini", img: "/avatar3.png" },
  { id: "4", name: "Cameron Drake", img: "/avatar4.png" },
  { id: "5", name: "Harvey Smith", img: "/avatar5.png" },
  { id: "6", name: "Doris Crowley", img: "/avatar6.png" },
];

export function AddTimelineDialog() {
  const [open, setOpen] = useState(false);
  const [innerDialogOpen, setInnerDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: "", date: "", memberIds: ["1"], description: "" },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Add Timeline
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] p-0 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-2xl font-bold text-[#1e293b]">
            Add Timeline
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((v) => console.log(v))}
            className="space-y-4 p-6">
            {/* Status & Date Fields */}
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-semibold">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#f8faff] border-slate-100 h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-semibold">
                      Date
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="mm/dd/yyyy"
                          type="date"
                          {...field}
                          className="bg-[#f8faff] border-none h-12"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-xl bg-[#f8faff] p-1">
              <Dialog open={innerDialogOpen} onOpenChange={setInnerDialogOpen}>
                <DialogTrigger asChild>
                  <div className="p-4 cursor-pointer">
                    <FormLabel className="text-slate-600 font-semibold cursor-pointer">
                      Add Member
                    </FormLabel>
                    <div className="mt-2 text-sm text-slate-400">
                      Click to select members...
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[400px] p-6 shadow-2xl border-orange-100">
                  <DialogHeader>
                    <DialogTitle>Select Members</DialogTitle>
                  </DialogHeader>

                  <div className="relative my-4">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search members..." className="pl-9" />
                  </div>

                  <ScrollArea className="h-[300px] pr-4">
                    {MEMBERS.map((member) => (
                      <FormField
                        key={member.id}
                        control={form.control}
                        name="memberIds"
                        render={({ field }) => (
                          <div className="flex items-center space-x-3 py-3 border-b border-slate-50 last:border-0">
                            <Checkbox
                              checked={field.value?.includes(member.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, member.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (v) => v !== member.id,
                                      ),
                                    );
                              }}
                              className="data-[state=checked]:bg-orange-500 border-slate-300"
                            />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.img} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-slate-700">
                              {member.name}
                            </span>
                          </div>
                        )}
                      />
                    ))}
                  </ScrollArea>

                  <Button
                    type="button"
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => setInnerDialogOpen(false)}>
                    Confirm Selection
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            {/* Description & Attachment (Same as previous) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-semibold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#f8faff] border-none h-16"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <MultipleFileUploadField
              label="Attachments"
              name="attachment"
              control={form.control}
            />

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600">
                Add Policy
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
