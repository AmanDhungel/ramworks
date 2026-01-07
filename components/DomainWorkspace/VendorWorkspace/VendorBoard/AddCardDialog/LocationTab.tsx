import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";

export default function LocationTab() {
  const { register } = useFormContext();

  return (
    <TabsContent value="location" className="space-y-6">
      <h3 className="font-bold flex items-center gap-2">
        <MapPin className="w-4 h-4 text-orange-500" /> Location Details
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Address / Venue Name</Label>
          <div className="relative">
            <Input
              {...register("location.address")}
              placeholder="Enter street address"
              className="pl-10 bg-slate-50"
            />
            <Navigation className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              {...register("location.city")}
              placeholder="City"
              className="bg-slate-50"
            />
          </div>
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              {...register("location.zip")}
              placeholder="Zip Code"
              className="bg-slate-50"
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
