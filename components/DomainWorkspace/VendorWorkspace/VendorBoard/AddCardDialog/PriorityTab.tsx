import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TaskFormValues } from "./schema";

const priorities: Array<{
  name:
    | "Emergency"
    | "Alert"
    | "Critical"
    | "Error"
    | "Warning"
    | "Notification"
    | "Informational";
  color: string;
}> = [
  { name: "Emergency", color: "bg-red-600" },
  { name: "Alert", color: "bg-rose-400" },
  { name: "Critical", color: "bg-orange-500" },
  { name: "Error", color: "bg-purple-500" },
  { name: "Warning", color: "bg-stone-800" },
  { name: "Notification", color: "bg-blue-500" },
  { name: "Informational", color: "bg-emerald-500" },
];

export default function PriorityTab() {
  const { setValue } = useFormContext<TaskFormValues>();

  return (
    <TabsContent value="priority" className="space-y-4">
      <h3 className="font-bold">Priority</h3>
      <div className="flex flex-wrap gap-2">
        {priorities.map((p) => (
          <Button
            key={p.name}
            type="button"
            onClick={() => setValue("priority", p.name)}
            className={`${p.color} text-white hover:opacity-90 min-w-[100px] capitalize`}>
            {p.name}
          </Button>
        ))}
      </div>
    </TabsContent>
  );
}
