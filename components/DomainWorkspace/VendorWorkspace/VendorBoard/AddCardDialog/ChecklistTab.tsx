import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useId, useState } from "react";
import { TaskFormValues } from "./schema";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

type ChecklistItem = {
  text: string;
  completed: boolean;
};

export default function ChecklistTab() {
  const { control, watch, setValue, getValues } =
    useFormContext<TaskFormValues>();

  const checklists = watch("checklists") ?? [];

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [currentItems, setCurrentItems] = useState<ChecklistItem[]>([]);

  const addItem = () => {
    if (!currentItem.trim()) return;

    setCurrentItems((prev) => [
      ...prev,
      { text: currentItem, completed: false },
    ]);

    setCurrentItem("");
  };

  const addAll = () => {
    if (!currentTitle.trim() || currentItems.length === 0) return;

    setValue("checklists", [
      ...checklists,
      {
        title: currentTitle,
        items: currentItems,
      },
    ]);

    setCurrentTitle("");
    setCurrentItems([]);
  };

  return (
    <TabsContent value="checklists" className="space-y-6">
      {checklists.map((list, index) => (
        <div key={`list-${index}`} className="bg-slate-100 p-2 rounded text-sm">
          <p className="font-bold">{list.title || "Untitled"}</p>
          <ul className="list-none pl-4">
            {list.items.map((i, idx) => (
              <li
                key={idx}
                className={`flex gap-2 items-center -ml-4 mt-2 ${
                  i.completed ? "line-through" : ""
                }`}>
                <FormField
                  control={control}
                  name={`checklists.${index}.items.${idx}.completed`}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                {i.text}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="space-y-2">
        <Input
          placeholder="Checklist title"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
        />

        <div className="flex gap-2">
          <Input
            placeholder="Checklist item"
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
          />
          <Button
            className="bg-orange-500 text-white"
            onClick={(e) => {
              addItem();
              e.preventDefault();
            }}>
            + Add
          </Button>
        </div>

        {currentItems.length > 0 && (
          <div className="bg-slate-100 p-2 rounded text-sm">
            <p className="font-bold">{currentTitle || "Untitled"}</p>
            <ul className="list-disc pl-4">
              {currentItems.map((i, idx) => (
                <li key={idx}>{i.text}</li>
              ))}
            </ul>
          </div>
        )}

        <Button
          className="w-full bg-orange-500 text-white"
          onClick={(e) => {
            addAll();
            e.preventDefault();
          }}>
          + Add All
        </Button>
      </div>
    </TabsContent>
  );
}
