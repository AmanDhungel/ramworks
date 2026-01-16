import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventSchema, EventFormValues } from "./schema";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EventFormValues) => void;
  initialData?: EventFormValues | null;
}

export function EventDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: EventDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || { category: "holiday", color: "#4F46E5" },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
    else
      reset({
        category: "holiday",
        color: "#4F46E5",
        date: "",
        title: "",
        startTime: "",
        endTime: "",
      });
  }, [initialData, reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1e293b]">
            {initialData ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Event Name</Label>
            <Input {...register("title")} placeholder="Enter event name" />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              onValueChange={(v) => setValue("category", v as any)}
              defaultValue={watch("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activity">Activity Schedule</SelectItem>
                <SelectItem value="meeting">Meeting Schedule</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
                <SelectItem value="lorem">Lorem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" {...register("date")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input type="time" {...register("startTime")} />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input type="time" {...register("endTime")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...register("location")} placeholder="Location" />
          </div>

          <div className="space-y-2">
            <Label>Descriptions</Label>
            <Input {...register("description")} placeholder="Add description" />
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#f97316] hover:bg-[#ea580c]">
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
