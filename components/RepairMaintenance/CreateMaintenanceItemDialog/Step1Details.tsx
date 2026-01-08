import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  { id: "HVAC", icon: "❄️" },
  { id: "Plumbing", icon: "🚰" },
  { id: "Electrical", icon: "⚡" },
  { id: "Painting", icon: "🎨" },
  { id: "Cleaning", icon: "🧹" },
  { id: "Landscaping", icon: "🌳" },
  { id: "Carpentry", icon: "🔨" },
  { id: "Elevator", icon: "🛗" },
  { id: "Roofing", icon: "🏠" },
  { id: "Flooring", icon: "📐" },
  { id: "Windows & Doors", icon: "🚪" },
  { id: "Appliance Repair", icon: "🔧" },
];

export default function Step1Details({ form }: { form: any }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="font-semibold mb-4 text-slate-700">Maintenance Type</h3>
        <div className="grid grid-cols-2 gap-4">
          {["Scheduled", "Recurring", "Reported", "Emergency"].map((type) => (
            <div
              key={type}
              onClick={() => form.setValue("maintenanceType", type)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                form.watch("maintenanceType") === type
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-slate-600"
              }`}>
              <p className="font-bold">{type}</p>
              <p className="text-xs opacity-80">One-time planned maintenance</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-4 text-slate-700">Service Category</h3>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => form.setValue("serviceCategory", cat.id)}
              className={`p-6 border rounded-lg flex flex-col items-center gap-2 cursor-pointer transition-all ${
                form.watch("serviceCategory") === cat.id
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}>
              <span className="text-xl">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.id}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-4 border-t pt-6">
        <h3 className="font-semibold text-slate-700">Details</h3>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <Input
                placeholder="e.g., HVAC Quarterly Maintenance"
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <Textarea
                placeholder="Provide detailed description..."
                {...field}
              />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {["Low", "Medium", "High", "Critical"].map((lvl) => (
            <Button
              key={lvl}
              type="button"
              variant={form.watch("priority") === lvl ? "default" : "outline"}
              className={
                form.watch("priority") === lvl
                  ? "bg-orange-500 flex-1"
                  : "flex-1"
              }
              onClick={() => form.setValue("priority", lvl)}>
              {lvl}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
