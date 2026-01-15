import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function DateTab() {
  const { watch, setValue, control } = useFormContext();
  const deadline = watch("deadline") || {};

  return (
    <TabsContent value="date" className="space-y-6">
      <h3 className="font-bold">Deadline</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label>Date</Label>
          <FormField
            control={control}
            name="deadline"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    type="date"
                    name="date"
                    onChange={onChange}
                    value={value || ""}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input
            type="time"
            value={deadline.time || "12:00"}
            // onChange={(e) =>
            //   setValue("deadline", `${deadline} at ${e.target.value}`)
            // }
            className="bg-slate-50 border-none"
          />
        </div>
      </div>
    </TabsContent>
  );
}
