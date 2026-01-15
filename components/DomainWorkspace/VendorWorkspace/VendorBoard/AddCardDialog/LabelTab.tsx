import { useFormContext, UseFormReturn } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TaskFormValues } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowDown } from "lucide-react";

export default function LabelTab() {
  const { control } = useFormContext<TaskFormValues>();
  const [selectedColor, setSelectedColor] = useState("#4F46E5");

  return (
    <TabsContent value="label" className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Labels</h3>
      </div>

      <div className="p-4 border rounded-lg space-y-4 bg-white">
        <div
          className="h-40 w-full rounded-md"
          style={{
            background: `linear-gradient(to right, #ffffff, ${selectedColor})`,
          }}
        />

        <FormField
          control={control}
          name="labels.label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Name*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="labels.color_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Label Color* (click below) <ArrowDown />
              </FormLabel>
              <FormControl>
                <Input
                  type="color"
                  {...field}
                  className="h-10 w-full cursor-pointer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-2">
          {[
            "#EF4444",
            "#F97316",
            "#EAB308",
            "#22C55E",
            "#3B82F6",
            "#6366F1",
            "#A855F7",
          ].map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
    </TabsContent>
  );
}
