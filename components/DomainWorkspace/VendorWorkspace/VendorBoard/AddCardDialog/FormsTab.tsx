import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function FormsTab() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "forms",
  });

  return (
    <TabsContent value="forms" className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">📋 Forms</h3>
        <Button
          type="button"
          onClick={() =>
            append({ id: Date.now().toString(), title: "", isRequired: false })
          }
          className="bg-orange-500">
          + Add form field
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border rounded-lg bg-white relative space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Form Title</Label>
              <Input
                {...register(`forms.${index}.title`)}
                placeholder="Enter form title"
                className="bg-slate-50 border-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Form Description</Label>
              <Input
                {...register(`forms.${index}.description`)}
                placeholder="Form description"
                className="bg-slate-50 border-none"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  {...register(`forms.${index}.isRequired`)}
                  id={`req-${index}`}
                />
                <label htmlFor={`req-${index}`} className="text-sm">
                  Required field
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  {...register(`forms.${index}.isHidden`)}
                  id={`hide-${index}`}
                />
                <label htmlFor={`hide-${index}`} className="text-sm">
                  Hide Field
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}
