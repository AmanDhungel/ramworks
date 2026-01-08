import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export default function Step3Schedule({ form }: { form: any }) {
  const isRecurrenceEnabled = form.watch("enableRecurrence");

  return (
    <div className="space-y-6">
      {/* Date & Time Section */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-4 text-slate-800">
          Property & Location
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <div className="relative">
                  <Input
                    type="date"
                    {...field}
                    className="bg-slate-50/50 pr-10"
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time *</FormLabel>
                <div className="relative">
                  <Input type="time" {...field} className="bg-slate-50/50" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Duration</FormLabel>
                <Input
                  placeholder="e.g., 2-3 hours, 1 day, 2 weeks"
                  {...field}
                  className="bg-slate-50/50"
                />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Recurrence Settings Section */}
      <div className="p-4 border rounded-lg space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Recurrence Settings</h3>
          <FormField
            control={form.control}
            name="enableRecurrence"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-orange-500 border-slate-300"
                  />
                </FormControl>
                <FormLabel className="text-sm font-bold text-slate-700">
                  Enable Recurrence
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        {isRecurrenceEnabled && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="Annual">
                    <FormControl>
                      <SelectTrigger className="bg-slate-50/50">
                        <SelectValue placeholder="Select Frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Repeat Every</span>
              <Input
                className="w-20 bg-slate-50/50"
                type="number"
                defaultValue={1}
              />
              <span className="text-sm text-slate-400">year(s)</span>
            </div>

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurrence End Date (Optional)</FormLabel>
                  <div className="relative">
                    <Input type="date" {...field} className="bg-slate-50/50" />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Leave empty for indefinite recurrence
                  </p>
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-2">
              <p className="text-sm font-semibold text-slate-700">
                Custom Recurrence Pattern
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked
                    className="data-[state=checked]:bg-orange-500"
                  />
                  <span className="text-sm text-slate-600">
                    Same day of month (e.g., 15th of every month)
                  </span>
                </div>
                <div className="pl-8 flex items-center gap-2">
                  <Input
                    className="w-16 bg-slate-50/50 h-8 text-center"
                    defaultValue="15"
                  />
                  <span className="text-sm text-slate-400">th</span>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    checked
                    className="data-[state=checked]:bg-orange-500"
                  />
                  <span className="text-sm text-slate-600">
                    Same day of week (e.g., every Monday)
                  </span>
                </div>
                <div className="pl-8">
                  <Select defaultValue="Monday">
                    <SelectTrigger className="w-40 h-8 bg-slate-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
