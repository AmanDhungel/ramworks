import * as React from "react";
import { Controller, Control, UseFormReturn } from "react-hook-form";
import { HexColorPicker, HexColorInput } from "react-colorful";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { VendorFormValues } from "./CreateVendorWorkspaceDialog";

const PRESET_COLORS = [
  "#F44336",
  "#FF9800",
  "#FFEB3B",
  "#4CAF50",
  "#26C6DA",
  "#2196F3",
  "#7E57C2",
  "#EC407A",
  "#FF5252",
  "#E040FB",
  "#5C6BC0",
  "#00ACC1",
  "#43A047",
  "#8BC34A",
];

interface CustomColorPickerProps {
  form: UseFormReturn<any>;
  label?: string;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  form,
  label = "Color",
}) => {
  return (
    <FormField
      control={form.control}
      name="labelColor"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vendor Label Color</FormLabel>
          <FormControl>
            <Card className="w-full rounded-xl">
              <CardContent className="p-4 space-y-4">
                {label && <Label>{label}</Label>}

                <div className="rounded-lg overflow-hidden border w-full">
                  <HexColorPicker
                    color={field.value}
                    onChange={field.onChange}
                    className="w-full h-[220px]"
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Hex Input */}
                <div className="flex items-center gap-2">
                  <Input disabled value="HEX" className="w-16 text-center" />

                  <HexColorInput
                    color={field.value}
                    onChange={field.onChange}
                    prefixed
                    className={cn(
                      "flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  />
                </div>

                {/* Preset Colors */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Saved colors
                  </Label>

                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((color) => (
                      <Button
                        key={color}
                        type="button" // ✅ prevents form submit
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full p-0"
                        style={{ backgroundColor: color }}
                        onClick={() => field.onChange(color)}
                      />
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full">
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
