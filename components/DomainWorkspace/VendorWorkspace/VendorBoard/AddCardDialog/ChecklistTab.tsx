import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Paperclip, Clock, Users, Plus } from "lucide-react";
import { TaskFormValues } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactsData = [
  { _id: "1", name: "John Doe" },
  { _id: "2", name: "Jane Smith" },
];

export default function ChecklistTab() {
  const { control, watch } = useFormContext<TaskFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "checklists",
  });

  return (
    <TabsContent value="checklists" className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Checklists</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", items: [] })}>
          <Plus className="w-4 h-4 mr-2" /> New Checklist
        </Button>
      </div>

      {fields.map((field, index) => (
        <ChecklistGroup
          key={field.id}
          nestIndex={index}
          onRemove={() => remove(index)}
        />
      ))}
    </TabsContent>
  );
}

function ChecklistGroup({
  nestIndex,
  onRemove,
}: {
  nestIndex: number;
  onRemove: () => void;
}) {
  const { control, register, watch } = useFormContext<TaskFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `checklists.${nestIndex}.items`,
  });

  const items = watch(`checklists.${nestIndex}.items`) ?? [];
  const completedCount = items.filter((i) => i.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1">
          <Input
            {...register(`checklists.${nestIndex}.title`)}
            placeholder="Checklist Title"
            className="font-bold border-none px-0 focus-visible:ring-0 text-lg"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs font-medium text-slate-500">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-3">
        {fields.map((item, k) => (
          <div
            key={item.id}
            className="group flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <FormField
                control={control}
                name={`checklists.${nestIndex}.items.${k}.completed`}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Input
                {...register(`checklists.${nestIndex}.items.${k}.text`)}
                placeholder="What needs to be done?"
                className={`border-none bg-transparent focus-visible:ring-0 p-0 h-auto ${
                  items[k]?.completed ? "line-through text-slate-400" : ""
                }`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(k)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center gap-4 ml-7 mt-1">
              <div className="flex items-center gap-1">
                <FormField
                  name={`checklists.${nestIndex}.items.${k}.deadline`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> Due
                        Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className=" text-[10px] bg-transparent border-none text-slate-500 focus:outline-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <label className="flex items-center gap-1 cursor-pointer hover:text-blue-500 text-slate-400 transition-colors">
                <Paperclip className="w-3.5 h-3.5" />
                <span className="text-[10px]">Attach</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).filter(
                      (f) => f.size <= 1024 * 1024,
                    );
                  }}
                />
              </label>

              {/* Contacts */}
              <div className="flex items-center gap-1 flex-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <FormField
                  control={control}
                  name={`checklists.${nestIndex}.items.${k}.contacts`}
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) =>
                        field.onChange([...(field.value || []), val])
                      }>
                      <SelectTrigger className="h-6 border-none bg-transparent text-[10px] p-0 shadow-none w-fit gap-1">
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactsData.map((c) => (
                          <SelectItem key={c._id} value={c._id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full justify-start text-slate-500 hover:text-orange-500"
        onClick={() =>
          append({
            text: "",
            completed: false,
            attachments: [],
            contacts: [],
          })
        }>
        <Plus className="w-4 h-4 mr-2" /> Add an item
      </Button>
    </div>
  );
}
