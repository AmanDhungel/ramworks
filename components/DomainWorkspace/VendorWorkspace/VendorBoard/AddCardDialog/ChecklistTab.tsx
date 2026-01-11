import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ChecklistTab() {
  const [inputValue, setInputValue] = useState("");
  const { control, watch, setValue } = useFormContext();
  const checklists: { id: string; title: string; completed: boolean }[] =
    watch("checklists");

  const progress = checklists?.length
    ? (checklists.filter((i) => i.completed).length / checklists.length) * 100
    : 0;

  return (
    <TabsContent value="checklists" className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-bold">Checklist</span>
          <span className="text-slate-500">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-slate-100" />
      </div>

      {checklists?.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 bg-slate-50 rounded">
          <Checkbox checked={item.completed} />
          <span className={item.completed ? "line-through text-slate-400" : ""}>
            {item.title}
          </span>
        </div>
      ))}

      <div className="space-y-2">
        <p className="text-sm font-bold">Add an item</p>
        <div className="flex gap-2">
          <Input
            placeholder="Add an item"
            className="bg-slate-50 border-none"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            className="bg-orange-500"
            onClick={() => {
              setValue("checklists", [
                ...checklists,
                {
                  id: `list-${checklists.length + 1}`,
                  title: inputValue,
                  completed: false,
                },
              ]);
              setInputValue("");
            }}>
            + Add
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}
