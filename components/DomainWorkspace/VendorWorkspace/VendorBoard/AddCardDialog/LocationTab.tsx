import { useFormContext, useWatch } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Navigation,
  Loader2,
  Crosshair,
  ImagePlus,
  X,
  FileText,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LocationTab() {
  const { register, setValue, control } = useFormContext();
  const [isLocating, setIsLocating] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lat = useWatch({ control, name: "location.lat" });
  const lng = useWatch({ control, name: "location.lng" });
  const attachedImages = useWatch({ control, name: "location.images" }) || [];

  const defaultPos: [number, number] = [51.505, -0.09];
  const currentPos: [number, number] = lat && lng ? [lat, lng] : defaultPos;

  // --- Geolocation & Reverse Geocode Logic ---
  const handleReverseGeocode = async (latitude: number, longitude: number) => {
    setIsLocating(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.address) {
        setValue("location.address", data.display_name.split(",")[0]);
        setValue("location.city", data.address.city || data.address.town || "");
        setValue("location.zip", data.address.postcode || "");
      }
    } finally {
      setIsLocating(false);
    }
  };

  const requestUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setValue("location.lat", latitude);
      setValue("location.lng", longitude);
      handleReverseGeocode(latitude, longitude);
    });
  };

  // --- File Upload Logic ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
      setValue("location.images", [...attachedImages, ...files]);
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = attachedImages.filter(
      (_: any, i: number) => i !== index
    );
    setPreviews(updatedPreviews);
    setValue("location.images", updatedFiles);
  };

  // --- Map Logic ---
  function ClickHandler() {
    useMapEvents({
      click(e) {
        setValue("location.lat", e.latlng.lat);
        setValue("location.lng", e.latlng.lng);
        handleReverseGeocode(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 15);
    }, [center]);
    return null;
  }

  return (
    <TabsContent value="location" className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-500" /> Location Details
        </h3>
        <button
          type="button"
          onClick={requestUserLocation}
          className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline">
          <Crosshair className="w-3 h-3" /> Use My Location
        </button>
      </div>

      <div className="space-y-6 border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
        {/* Map Header Section */}
        <div className="h-64 w-full rounded-lg border border-slate-200 overflow-hidden z-0">
          <MapContainer center={currentPos} zoom={13} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ClickHandler />
            <ChangeView center={currentPos} />
            {lat && lng && <Marker position={[lat, lng]} icon={icon} />}
          </MapContainer>
        </div>

        {/* Attendance Fields (Styled after provided image) */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800">Attendance</h4>

          <div className="space-y-4">
            {/* Clock-in */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-500">
                Clock-in
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="date"
                    {...register("location.attendance.clockInDate")}
                    className="bg-slate-50/50 "
                  />
                </div>
                <div className="relative">
                  <Input
                    type="time"
                    {...register("location.attendance.clockInTime")}
                    className="bg-slate-50/50 "
                  />
                </div>
              </div>
            </div>

            {/* Clock-out */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-500">
                Clock-out
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="date"
                    {...register("location.attendance.clockOutDate")}
                    className="bg-slate-50/50 "
                  />
                </div>
                <div className="relative">
                  <Input
                    type="time"
                    {...register("location.attendance.clockOutTime")}
                    className="bg-slate-50/50 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="md:col-span-2 space-y-2">
            <Label className="text-xs text-slate-500">Street Address</Label>
            <Input
              {...register("location.address")}
              placeholder="Address fetched from map..."
              className="bg-slate-50/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-slate-500">City</Label>
            <Input {...register("location.city")} className="bg-slate-50/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-slate-500">Zip Code</Label>
            <Input {...register("location.zip")} className="bg-slate-50/50" />
          </div>
        </div>

        {/* Image Attachment */}
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-medium text-slate-500 flex items-center gap-2">
            <ImagePlus className="w-4 h-4" /> Location Photos
          </Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <FileText className="w-6 h-6 text-slate-300 mb-2" />
            <p className="text-xs text-slate-500">
              Click to upload site photos
            </p>
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 pt-2">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded border border-slate-100 overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={src}
                    alt={src}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 shadow-sm">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
}
