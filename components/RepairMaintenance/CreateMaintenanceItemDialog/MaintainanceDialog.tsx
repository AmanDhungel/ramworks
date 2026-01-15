import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  maintenanceSchema,
  MaintenanceFormValues,
  MaintenanceRequest,
  MaintenanceRequestSchema,
} from "./schema";

import Step1Details from "./Step1Details";
import Step2Assignment from "./Step2Assignment";
import Step3Schedule from "./Step3Schedule";
import Step4Summary from "./Step4Summary";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";
import { useCreateRAM } from "@/services/RAM.service";
import { toast } from "react-toastify";
import useDialogOpen from "@/context/Dialog";

export function CreateMaintenanceDialog() {
  const [step, setStep] = useState(1);
  const { open, setIsOpen } = useDialogOpen();
  const form = useForm<MaintenanceRequest>({
    resolver: zodResolver(MaintenanceRequestSchema),
    defaultValues: {
      priority: "Medium",
      tags: [],
    },
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const { mutate } = useCreateRAM();

  const onSubmit = (data: MaintenanceRequest) => {
    const payload = {
      ...data,
      tags: JSON.stringify(data.tags),
      cost_breakdown: JSON.stringify(data.cost_breakdown),
    };
    mutate(payload as any, {
      onSuccess: () => {
        form.reset();
        toast.success("Successfully created item");
        setStep(1);
        setIsOpen();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to create item");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Image
            src={icons.RoundedPlusIcon}
            alt="rentchain"
            className="w-4 h-4 mr-2"
          />{" "}
          New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col items-start gap-2">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Create Maintenance Item
          </DialogTitle>
          <Badge
            variant="outline"
            className="rounded-md font-normal text-slate-600">
            Scheduled
          </Badge>
        </DialogHeader>

        <div className="flex justify-between items-center px-20 py-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 relative">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold
                ${
                  step > i
                    ? "border-orange-500 text-orange-500"
                    : step === i
                    ? "text-white border-orange-500 bg-orange-500"
                    : "border-slate-300 text-slate-400"
                }`}>
                {i}
              </div>
              <span
                className={`text-xs font-medium ${
                  step > i
                    ? "text-orange-500"
                    : step === i
                    ? "text-orange-500"
                    : "text-slate-400"
                }`}>
                Step {i} Of 4
              </span>
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && <Step1Details form={form} />}
            {step === 2 && <Step2Assignment form={form} />}
            {step === 3 && <Step3Schedule form={form} />}
            {step === 4 && <Step4Summary form={form} />}

            <DialogFooter className="flex justify-between w-full border-t pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={step === 1}
                className="bg-slate-600 text-white hover:bg-slate-700">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    nextStep();
                    e.preventDefault();
                  }}
                  className="bg-orange-500 hover:bg-orange-600">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600">
                  <Check className="mr-2 h-4 w-4" /> Create Maintenance Item
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function getFieldsForStep(step: number) {
  switch (step) {
    case 1:
      return [
        "maintenanceType",
        "serviceCategory",
        "title",
        "description",
        "priority",
      ];
    case 2:
      return ["property", "unit", "serviceProvider"];
    case 3:
      return ["date", "time"];
    default:
      return [];
  }
}
