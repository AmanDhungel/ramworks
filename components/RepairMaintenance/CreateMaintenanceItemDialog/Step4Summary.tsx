import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Upload, Check } from "lucide-react";
import { Path, UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues, MaintenanceRequest } from "./schema";
import { Label } from "@/components/ui/label";
import { useGetSingleWorkSpaceForRAM } from "@/services/workspace.service";

const PRESET_TAGS = [
  "preventive",
  "urgent",
  "warranty",
  "seasonal",
  "inspection",
];

export default function Step4Final({
  form,
}: {
  form: UseFormReturn<MaintenanceRequest>;
}) {
  const [tagInput, setTagInput] = useState("");
  const selectedTags = form.watch("tags") || [];

  const { data: workspace } = useGetSingleWorkSpaceForRAM(
    form.watch().domain_workspace
  );

  const addTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase();
    if (cleanTag && !selectedTags.includes(cleanTag)) {
      form.setValue("tags", [...selectedTags, cleanTag]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      selectedTags.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <div className="space-y-8">
      <section className="p-6 border rounded-xl space-y-6 bg-white">
        <h3 className="text-lg font-bold text-slate-800">Cost Estimation</h3>
        <FormField
          control={form.control}
          name="total_estimated_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-semibold">
                Total Estimated Cost *
              </FormLabel>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  $
                </span>
                <Input
                  {...field}
                  className="pl-7 bg-slate-50/50 border-slate-200"
                  placeholder="0.00"
                />
              </div>
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-600">
            Cost Breakdown (Optional)
          </h4>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cost_breakdown.labor"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-slate-500">
                    Labor
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                      $
                    </span>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7 bg-slate-50/50 border-slate-200 h-9"
                        {...field}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value);
                          field.onChange(isNaN(val) ? 0 : val);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost_breakdown.materials"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-slate-500">
                    Materials
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                      $
                    </span>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7 bg-slate-50/50 border-slate-200 h-9"
                        {...field}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value);
                          field.onChange(isNaN(val) ? 0 : val);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost_breakdown.additional_charges"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-slate-500">
                    Additional Charges
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                      $
                    </span>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7 bg-slate-50/50 border-slate-200 h-9"
                        {...field}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value);
                          field.onChange(isNaN(val) ? 0 : val);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </section>

      <section className="p-6 border rounded-xl space-y-6 bg-white">
        <h3 className="text-lg font-bold text-slate-800">
          Additional Information
        </h3>

        <div className="space-y-4">
          <FormLabel className="text-slate-700 font-semibold">Tags *</FormLabel>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
              placeholder="Add tag and press Enter"
              className="bg-slate-50/50"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag(tagInput))
              }
            />
            <Button
              type="button"
              onClick={() => addTag(tagInput)}
              className="bg-orange-500 hover:bg-orange-600 px-6">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2].map((i) => (
              <Badge
                key={`lorem-${i}`}
                variant="outline"
                className="text-slate-400 font-normal border-slate-200">
                <Check className="w-3 h-3 mr-1 opacity-50" /> lorem
              </Badge>
            ))}
            {PRESET_TAGS.map((tag) => (
              <Badge
                key={tag}
                onClick={() => addTag(tag)}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-slate-700 text-white"
                    : "bg-white text-slate-600 border-slate-300"
                }`}
                variant="outline">
                <Check className="w-3 h-3 mr-1" /> {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-4 border-t border-dashed">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Added Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag: any) => (
                <Badge
                  key={tag}
                  className="bg-slate-700 text-white px-3 py-1 flex items-center gap-1">
                  {tag}{" "}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="internal_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-semibold">
                Internal Notes
              </FormLabel>
              <Textarea
                {...field}
                placeholder="Add any internal notes, special instructions, or important details..."
                className="bg-slate-50/50 min-h-[100px]"
              />
            </FormItem>
          )}
        />
        {/* 
        <div className="space-y-3">
          <FormLabel className="text-slate-700 font-semibold">
            Attachments
          </FormLabel>
          <Label htmlFor="">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/30">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-sm font-bold text-slate-700">
                Click to upload
              </p>
              <p className="text-[10px] text-slate-400 mb-4 uppercase">
                PDF, JPG, PNG up to 10MB
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-white">
                Browse File
              </Button>
            </div>
          </Label>
          <Input
            type="file"
            className="hidden"
            name=""
            onChange={(e) => console.log(e.target.files)}
          />
        </div> */}

        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="notify"
              className="data-[state=checked]:bg-orange-500 border-slate-300"
              checked={form.watch().notify_affected_tenants}
              onCheckedChange={(e) =>
                form.setValue("notify_affected_tenants", e as boolean)
              }
            />
            <label
              htmlFor="notify"
              className="text-sm font-bold text-slate-700">
              Notify affected tenants
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="approval"
              className="data-[state=checked]:bg-orange-500 border-slate-300"
              checked={form.watch().require_approval_before_starting_work}
              onCheckedChange={(e) =>
                form.setValue(
                  "require_approval_before_starting_work",
                  e as boolean
                )
              }
            />
            <label
              htmlFor="approval"
              className="text-sm font-bold text-slate-700">
              Require approval before starting work
            </label>
          </div>
        </div>
      </section>

      <section className="p-6 border rounded-xl bg-white space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Summary</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Type:</span>
            <Badge className="bg-blue-50 text-blue-600 border-blue-100 uppercase text-[10px] font-bold">
              {form.watch().type}
            </Badge>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Category:</span>
            <span className="font-bold text-slate-800">
              {workspace?.data.title}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Priority:</span>
            <Badge className="bg-green-500 text-white border-none text-[10px] font-bold px-3">
              {form.watch().priority}
            </Badge>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Scheduled:</span>
            <span className="font-bold text-slate-800">
              {form.watch().date} at {form.watch().time}
            </span>
          </div>
          {/* <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Recurrence:</span>
            <span className="font-bold text-slate-800">Annual</span>
          </div> */}

          <div className="pt-4 border-t flex justify-between items-center">
            <span className="text-slate-700 font-bold">Total Amount:</span>
            <span className="text-orange-500 text-xl font-bold">
              ${form.watch().total_estimated_cost}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
