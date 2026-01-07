import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export default function CustomFieldsTab() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  return (
    <TabsContent value="customfields" className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Custom Fields</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ label: "", value: "" })}>
          + Add Field
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 items-end bg-slate-50 p-3 rounded-lg border">
            <div className="flex-1 space-y-1">
              <Label className="text-[10px] uppercase text-slate-500">
                Field Name
              </Label>
              <Input
                {...register(`customFields.${index}.label`)}
                placeholder="e.g. Department"
                className="bg-white"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-[10px] uppercase text-slate-500">
                Value
              </Label>
              <Input
                {...register(`customFields.${index}.value`)}
                placeholder="e.g. Marketing"
                className="bg-white"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50"
              onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}
