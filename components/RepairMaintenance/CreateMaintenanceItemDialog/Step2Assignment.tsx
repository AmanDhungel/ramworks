import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Step2Assignment({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      {/* Property & Location Section */}
      <div className="p-4 border rounded-lg space-y-4">
        <h3 className="font-semibold text-slate-800">Property & Location</h3>

        <FormField
          control={form.control}
          name="property"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50/50">
                    <SelectValue placeholder="Select Property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="prop-1">Sunset Apartments</SelectItem>
                  <SelectItem value="prop-2">Parkview Towers</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit / Location *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50/50">
                    <SelectValue placeholder="Select Unit/Location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="unit-101">Unit 101</SelectItem>
                  <SelectItem value="lobby">Main Lobby</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      {/* Service Provider Section */}
      <div className="p-4 border rounded-lg space-y-4">
        <h3 className="font-semibold text-slate-800">
          Service Provider Assignment
        </h3>

        <FormField
          control={form.control}
          name="serviceProvider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Provider *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50/50">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="provider-1">Rapid Fix Plumbing</SelectItem>
                  <SelectItem value="provider-2">
                    Elite HVAC Services
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technician"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Technician (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50/50">
                    <SelectValue placeholder="Auto-assign or select technician" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tech-1">John Doe</SelectItem>
                  <SelectItem value="tech-2">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Leave empty to let the service provider assign
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
