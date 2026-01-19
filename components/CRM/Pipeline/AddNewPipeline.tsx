"use client";
import * as z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CirclePlus,
  GripVertical,
  Pencil,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const stageSchema = z.object({
  name: z.string().min(1, "Stage name is required"),
});

export const pipelineSchema = z.object({
  name: z.string().min(1, "Pipeline name is required"),
  stages: z.array(z.string()).min(1, "At least one stage is required"),
  access: z.enum(["all", "select"]),
  allowedPeople: z.array(z.string()).optional(),
});

export type PipelineFormValues = z.infer<typeof pipelineSchema>;
export type StageFormValues = z.infer<typeof stageSchema>;

export function AddPipelineDialog() {
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);

  const form = useForm<PipelineFormValues>({
    resolver: zodResolver(pipelineSchema),
    defaultValues: {
      name: "",
      stages: ["Inpipeline", "Follow Up", "Schedule Service"],
      access: "select",
      allowedPeople: [
        "Michael Walker",
        "Doglas Martini",
        "Thomas Bordelon",
        "Harvey Smith",
      ],
    },
  });

  const onSubmit = (data: PipelineFormValues) => {
    console.log("Pipeline Created:", data);
  };

  const removeStage = (index: number) => {
    const currentStages = form.getValues("stages");
    form.setValue(
      "stages",
      currentStages.filter((_, i) => i !== index),
    );
  };

  const removePerson = (name: string) => {
    const currentPeople = form.getValues("allowedPeople") || [];
    form.setValue(
      "allowedPeople",
      currentPeople.filter((p) => p !== name),
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FF6D33] hover:bg-[#e65a22] text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Pipeline
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Add New Pipeline
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6">
            {/* Pipeline Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Pipeline Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pipeline name"
                      {...field}
                      className="bg-slate-50/50"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Pipeline Stages Header */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <FormLabel className="font-bold">Pipeline Stages *</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-orange-500 hover:text-orange-600 flex items-center gap-1"
                  onClick={() => setIsStageDialogOpen(true)}>
                  <CirclePlus className="w-4 h-4" /> Add New
                </Button>
              </div>

              {/* Stages List */}
              <div className="space-y-2">
                {form.watch("stages").map((stage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                      <span className="text-sm font-medium">{stage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-500"
                        onClick={() => removeStage(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Control */}
            <div className="space-y-4 border rounded-lg p-4 bg-white shadow-sm">
              <FormField
                control={form.control}
                name="access"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-bold">Access</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <label htmlFor="all" className="text-sm font-medium">
                            All
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="select"
                            id="select"
                            className="border-orange-500 text-orange-500"
                          />
                          <label
                            htmlFor="select"
                            className="text-sm font-medium">
                            Select People
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* People List */}
              <div className="space-y-2">
                {form.watch("allowedPeople")?.map((person, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 overflow-hidden">
                        {/* Placeholder for Avatar */}
                        {person
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium">{person}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => removePerson(person)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" className="px-8">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-8">
                Add Pipeline
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>

      {/* Nested Add Stage Dialog */}
      <AddStageDialog
        isOpen={isStageDialogOpen}
        onClose={() => setIsStageDialogOpen(false)}
        onAdd={(newStage) => {
          const current = form.getValues("stages");
          form.setValue("stages", [...current, newStage]);
        }}
      />
    </Dialog>
  );
}

function AddStageDialog({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}) {
  const stageForm = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: { name: "" },
  });

  const onSubmitStage = (data: StageFormValues) => {
    onAdd(data.name);
    stageForm.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Stage
          </DialogTitle>
        </DialogHeader>

        <Form {...stageForm}>
          <form
            onSubmit={stageForm.handleSubmit(onSubmitStage)}
            className="space-y-6 pt-4">
            <FormField
              control={stageForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Stage Name *</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-slate-50/50" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-8">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-8">
                Add Stage
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
