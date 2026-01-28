"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useState } from "react";

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
import { MultipleFileUploadField } from "@/components/ui/MultipleFileUpload";
import { useGetContact } from "@/services/contact.service";
import { useUpdateParams } from "@/helper/removeparam";
import { useCreateTimeLine } from "@/services/timeline.service";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  board: z.string(),
  task_list: z.string(),
  task: z.string(),
  status: z.enum([
    "scheduled",
    "confirmed",
    "in_progress",
    "completed",
    "canceled",
  ]),
  date: z.string().min(1, "Date is required"),
  members: z.array(z.string()),
  description: z.string().optional(),
  attachment_file: z
    .array(z.union([z.string(), z.file()]))
    .refine(
      (files) => files.length > 0 && files.some((file) => file instanceof File),
      "At least one file is required",
    ),
});

export function AddTimelineDialog({
  board,
  taskListId,
  taskId,
}: {
  board: string;
  taskListId: string;
  taskId: string;
}) {
  const [open, setOpen] = useState(false);
  const [innerDialogOpen, setInnerDialogOpen] = useState(false);
  const { data: contact } = useGetContact();
  const queryClient = useQueryClient();

  const { mutate } = useCreateTimeLine();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "in_progress",
      date: "",
      members: [],
      description: "",
      task_list: taskListId ?? "",
      task: taskId ?? "",
      board: board ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("task_list", taskListId ?? "");
    formData.append("task", taskId ?? "");
    formData.append("board", board ?? "");
    formData.append("status", data.status);
    formData.append("date", data.date);
    formData.append("members", JSON.stringify(data.members));
    formData.append("description", data.description ?? "");
    if (data.attachment_file && data.attachment_file.length > 0) {
      data.attachment_file.forEach((file) => {
        formData.append("attachment_file", file);
      });
    }
    mutate(formData as FormData, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["dndboard"] });
      },
    });
  };

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
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-6">
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
                        <SelectTrigger className="bg-[#f8faff] border-slate-100 h-12 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
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
              <Dialog
                open={innerDialogOpen}
                onOpenChange={() => {
                  setInnerDialogOpen(!innerDialogOpen);
                }}>
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
                    {contact?.data.map((member) => (
                      <FormField
                        key={member._id}
                        control={form.control}
                        name="members"
                        render={({ field }) => (
                          <div className="flex items-center space-x-3 py-3 border-b border-slate-50 last:border-0">
                            <Checkbox
                              checked={field.value?.includes(member._id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, member._id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (v) => v !== member._id,
                                      ),
                                    );
                              }}
                              className="data-[state=checked]:bg-orange-500 border-slate-300"
                            />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.createdAt} />
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
              name="attachment_file"
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
                Add Timeline
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
