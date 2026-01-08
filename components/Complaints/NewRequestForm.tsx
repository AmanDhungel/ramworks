"use client";
import React, { useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Video, Mic, FileText, Eye, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  property: z.string().min(1, "Property is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.string(),
  issueTitle: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  contactTime: z.string().optional(),
  attachments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(["photo", "video", "audio", "document"]),
      file: z.any(), // Actual file object
      previewUrl: z.string(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function MaintenanceRequestForm() {
  // Ref to handle hidden file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeType, setActiveType] = React.useState<
    FormValues["attachments"][0]["type"] | null
  >(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "Medium - Within 48 hours",
      attachments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attachments",
  });

  // Function to trigger the file picker
  const triggerPicker = (type: FormValues["attachments"][0]["type"]) => {
    setActiveType(type);
    if (fileInputRef.current) {
      // Set appropriate accept attributes dynamically
      if (type === "photo") fileInputRef.current.accept = "image/*";
      else if (type === "video") fileInputRef.current.accept = "video/*";
      else if (type === "audio") fileInputRef.current.accept = "audio/*";
      else fileInputRef.current.accept = ".pdf,.doc,.docx,.txt";

      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && activeType) {
      const file = files[0];
      append({
        id: crypto.randomUUID(),
        name: file.name,
        type: activeType,
        file: file,
        previewUrl: URL.createObjectURL(file), // Create local URL for the Eye icon preview
      });
      // Reset input so the same file can be picked again if removed
      e.target.value = "";
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
    alert(`Submitted with ${data.attachments.length} attachments`);
  };

  return (
    <div className=" mx-auto p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">
          Submit New Maintenance Request
        </h1>
        <p className="text-sm text-slate-500">
          Report issues or repair needs. We`ll respond promptly.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Property, Category, Priority fields remain same... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="property"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Property & Unit *</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50/50 border-slate-200">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sunset-304">
                        Sunset Apartments - Unit 304
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Category *</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50/50 border-slate-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="issueTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Issue Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief description"
                    {...field}
                    className="bg-slate-50/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Detailed Description *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Details..."
                    className="min-h-24 bg-slate-50/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- Attachments Section --- */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Attachments</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-slate-200"
                onClick={() => triggerPicker("photo")}>
                <Camera className="mr-2 h-4 w-4" /> Take Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-slate-200"
                onClick={() => triggerPicker("video")}>
                <Video className="mr-2 h-4 w-4" /> Record Video
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-slate-200"
                onClick={() => triggerPicker("audio")}>
                <Mic className="mr-2 h-4 w-4" /> Record Audio
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-slate-200"
                onClick={() => triggerPicker("document")}>
                <FileText className="mr-2 h-4 w-4" /> Add Document
              </Button>
            </div>

            {/* Attached Files List - Only shows after files are selected */}
            {fields.length > 0 && (
              <div className="border border-slate-100 rounded-lg p-4 bg-white shadow-sm space-y-3">
                <p className="text-sm font-semibold text-slate-700">
                  Attached Files ({fields.length})
                </p>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border border-blue-200 rounded-md bg-white">
                    <div className="flex items-center gap-3">
                      {item.type === "photo" && (
                        <Camera className="h-4 w-4 text-slate-500" />
                      )}
                      {item.type === "video" && (
                        <Video className="h-4 w-4 text-slate-500" />
                      )}
                      {item.type === "audio" && (
                        <Mic className="h-4 w-4 text-slate-500" />
                      )}
                      {item.type === "document" && (
                        <FileText className="h-4 w-4 text-slate-500" />
                      )}
                      <span className="text-sm text-slate-600 truncate max-w-[250px]">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400"
                        onClick={() => window.open(item.previewUrl, "_blank")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400"
                        onClick={() => remove(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-orange-600">
              Response Time Guidelines
            </h4>
            <ul className="text-sm text-slate-600 list-disc list-inside">
              <li>Emergency: Within 2 hours</li>
              <li>Medium Priority: Within 48 hours</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg">
            Submit Complaint
          </Button>
        </form>
      </Form>
    </div>
  );
}
