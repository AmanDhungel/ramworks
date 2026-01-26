import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskFormValues } from "./schema";

export default function CustomFieldsTab() {
  const { control, register, watch } = useFormContext<TaskFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "custom_fields",
  });

  return (
    <TabsContent value="customfields" className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Custom Fields</h3>
          <p className="text-sm text-muted-foreground">
            Add specific data points for this task.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              field_name: "",
              field_type: "text",
              field_value: "",
              field_options: [],
            })
          }>
          <PlusCircle className="w-4 h-4 mr-2" /> Add Field
        </Button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
              onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Field Name */}
              <FormField
                control={control}
                name={`custom_fields.${index}.field_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase font-bold text-slate-500">
                      Field Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Material Type"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field Type */}
              <FormField
                control={control}
                name={`custom_fields.${index}.field_type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase font-bold text-slate-500">
                      Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="select">
                          Select (Dropdown)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field Value */}
              <FormField
                control={control}
                name={`custom_fields.${index}.field_value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase font-bold text-slate-500">
                      Value / Default
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={
                          watch(`custom_fields.${index}.field_type`) ===
                          "number"
                            ? "number"
                            : "text"
                        }
                        placeholder="Current value"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Nested Options Builder (Only for Select type) */}
            {watch(`custom_fields.${index}.field_type`) === "select" && (
              <OptionsBuilder parentIndex={index} />
            )}
          </div>
        ))}
      </div>
    </TabsContent>
  );
}

// 2. Sub-component for handling the 'field_options' array
function OptionsBuilder({ parentIndex }: { parentIndex: number }) {
  const { control, register } = useFormContext<TaskFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `custom_fields.${parentIndex}.field_options`,
  });

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-xs font-bold text-blue-600 uppercase">
          Dropdown Options
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => append({ label: "", value: "" })}>
          + Add Option
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-[10px] text-slate-400 italic">
          No options added yet.
        </p>
      )}

      <div className="space-y-2">
        {fields.map((optionField, optionIndex) => (
          <div key={optionField.id} className="flex gap-2 items-center">
            <Input
              {...register(
                `custom_fields.${parentIndex}.field_options.${optionIndex}.label`,
              )}
              placeholder="Label (e.g. Copper)"
              className="h-8 text-xs"
            />
            <Input
              {...register(
                `custom_fields.${parentIndex}.field_options.${optionIndex}.value`,
              )}
              placeholder="Value (e.g. copper)"
              className="h-8 text-xs"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-500"
              onClick={() => remove(optionIndex)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
