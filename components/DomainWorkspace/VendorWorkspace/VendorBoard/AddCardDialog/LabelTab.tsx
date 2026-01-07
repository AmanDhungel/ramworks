import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LabelTab() {
  const { watch, setValue } = useFormContext();
  const [selectedColor, setSelectedColor] = useState("#4F46E5");
  const currentLabels = watch("labels") || [];

  const addLabel = () => {
    const newLabel = {
      id: Math.random().toString(36).substr(2, 9),
      color: selectedColor,
      name: "New Label",
    };
    setValue("labels", [...currentLabels, newLabel]);
  };

  return (
    <TabsContent value="label" className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Labels</h3>
        <Button
          type="button"
          size="sm"
          onClick={addLabel}
          className="bg-orange-500">
          + Add
        </Button>
      </div>

      <div className="p-4 border rounded-lg space-y-4 bg-white">
        {/* Color Gradient/Picker Area */}
        <div
          className="h-40 w-full rounded-md"
          style={{
            background: `linear-gradient(to right, #ffffff, ${selectedColor})`,
          }}
        />

        <Input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="h-10 w-full cursor-pointer"
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

        <Button
          type="button"
          onClick={addLabel}
          className="w-full bg-orange-500">
          Create a new label
        </Button>
      </div>
    </TabsContent>
  );
}
