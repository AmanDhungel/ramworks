import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormValues } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import LabelTab from "./LabelTab";
import PriorityTab from "./PriorityTab";
import ChecklistTab from "./ChecklistTab";
import MembersTab, { MOCK_USERS } from "./MembersTab";
import CommentsSection from "./CommentsSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BadgeDollarSign,
  LayoutPanelTop,
  Paperclip,
  Pin,
  Plus,
} from "lucide-react";
import DateTab from "./DateTab";
import FormsTab from "./FormsTab";
import AttachmentsTab from "./AttachmentsTab";
import LocationTab from "./LocationTab";
import CustomFieldsTab from "./CustomFieldsTab";
import InvoicesTab from "./InvoicesTab";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export default function TaskManagerForm() {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      labels: [],
      checklists: [],
      complete: false,
      priority: null,
    },
  });

  //Watching Value from the form
  const selectedMembers = form.watch("members") || [];
  const checklists = form.watch("checklists");
  const deadline = form.watch("deadline");

  const toggleMember = (id: string) => {
    const next = selectedMembers.includes(id)
      ? selectedMembers.filter((m: string) => m !== id)
      : [...selectedMembers, id];
    form.setValue("members", next);
  };

  const mutation = useMutation({
    mutationFn: async (data: TaskFormValues) => {
      // API Call here
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-600 hover:bg-white/50 mt-2 h-10 px-2 border border-transparent hover:border-slate-300">
          <Plus className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Add a card</span>
          <LayoutPanelTop className="h-4 w-4 ml-auto text-slate-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* LEFT SECTION */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <span className="p-1 border rounded">📋</span> Lorem
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">Complete</span>
                  <Switch
                    checked={form.watch("complete")}
                    onCheckedChange={(val) => form.setValue("complete", val)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-slate-500">Title</Label>
                  <Input
                    {...form.register("title")}
                    placeholder="Enter action title"
                    className="bg-slate-50 border-none"
                  />
                </div>
                <div>
                  <Label className="text-slate-500">Description</Label>
                  <Textarea
                    {...form.register("description")}
                    placeholder="Add a more detailed description..."
                    className="bg-slate-50 border-none min-h-[100px]"
                  />
                </div>
              </div>

              <SelectedFieldsPreview />
              {MOCK_USERS.filter((u) => selectedMembers.includes(u.id)).map(
                (user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.img} />
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => toggleMember(user.id)}>
                      Remove
                    </Button>
                  </div>
                )
              )}

              {checklists?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      form.setValue(
                        "checklists",
                        form
                          .getValues("checklists")
                          .map((list) =>
                            list.id === item.id
                              ? { ...list, completed: checked === true }
                              : list
                          )
                      );
                    }}
                  />
                  <span className={"line-through text-slate-400"}>
                    {item.title}
                  </span>
                </div>
              ))}

              {deadline && (
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                  <h1>DeadLine:</h1>
                  <Input
                    disabled
                    value={
                      deadline.date
                        ? deadline.date instanceof Date
                          ? deadline.date.toISOString().split("T")[0]
                          : deadline.date
                        : ""
                    }
                    type="date"
                  />
                  <Input disabled value={deadline.time} />
                </div>
              )}

              <Tabs defaultValue="" className="w-full">
                <TabsList className="flex flex-wrap h-auto bg-transparent gap-2 justify-start">
                  <TabsTrigger
                    value="label"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    🏷️ Label
                  </TabsTrigger>
                  <TabsTrigger
                    value="priority"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    ⚖️ Priority
                  </TabsTrigger>
                  <TabsTrigger
                    value="checklists"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    ✅ Checklists
                  </TabsTrigger>
                  <TabsTrigger
                    value="members"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    👥 Members
                  </TabsTrigger>
                  <TabsTrigger
                    value="date"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    🕒 Date
                  </TabsTrigger>
                  <TabsTrigger
                    value="forms"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    🕒 Forms
                  </TabsTrigger>
                  <TabsTrigger
                    value="attachments"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Paperclip />
                    Attachments
                  </TabsTrigger>
                  <TabsTrigger
                    value="customfields"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    🕒 Custom Fields
                  </TabsTrigger>
                  <TabsTrigger
                    value="invoices"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <BadgeDollarSign /> Invoices
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="border px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Pin /> Location
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 border-t pt-6">
                  <LabelTab />
                  <PriorityTab />
                  <ChecklistTab />
                  <MembersTab />
                  <DateTab />
                  <FormsTab />
                  <AttachmentsTab />
                  <CustomFieldsTab />
                  <InvoicesTab />
                  <LocationTab />
                </div>
              </Tabs>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Done
                </Button>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="md:col-span-5 border-l pl-8">
              <CommentsSection />
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function SelectedFieldsPreview() {
  const { watch, setValue } = useFormContext<TaskFormValues>();
  const labels = watch("labels");
  const priority = watch("priority");

  return (
    <div className="space-y-4">
      {labels.length > 0 && (
        <div className="space-y-2">
          <Label className="font-bold">Labels</Label>
          <div className="flex flex-wrap gap-2">
            {labels.map((l) => (
              <div
                key={l.id}
                className="h-8 w-full rounded-md flex items-center px-3 text-white"
                style={{ backgroundColor: l.color }}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setValue(
                      "labels",
                      labels.filter((x) => x.id !== l.id)
                    )
                  }
                  className="ml-auto text-white hover:bg-white/20">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {priority && (
        <div className="space-y-2">
          <Label className="font-bold">Priority</Label>
          <div
            className={`h-10 w-full ${
              priority === "Emergency"
                ? "bg-red-500"
                : priority === "Alert"
                ? "bg-pink-300"
                : priority === "Critical"
                ? "bg-orange-500"
                : priority === "Error"
                ? "bg-purple-500"
                : priority === "Warning"
                ? "bg-stone-800"
                : priority === "Notification"
                ? "bg-blue-500"
                : priority === "Informational"
                ? "bg-emerald-500"
                : "bg-green-500"
            } rounded flex items-center px-4 text-white font-bold uppercase text-sm`}>
            {priority}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setValue("priority", null)}
              className="ml-auto text-white hover:bg-white/20">
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
