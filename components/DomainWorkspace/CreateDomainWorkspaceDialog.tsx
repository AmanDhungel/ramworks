import React, { useCallback, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import {
  CloudUpload,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  CirclePlus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(2, "Workspace title is required"),
  imageFile: z.instanceof(File).optional().nullable(),
  imageUrl: z.url().optional().or(z.literal("")),
  iconFile: z.instanceof(File).optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      imageFile: null,
      iconFile: null,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      console.log("Submitting:", values);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <CirclePlus className="w-4 h-4 mr-2" /> Create Domain Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Create Domain Workspace
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Workspace Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Workspace Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter board title"
                      {...field}
                      className="bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Image Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold">Upload Image</h3>
                <p className="text-xs text-muted-foreground">
                  Add your Image here
                </p>
              </div>

              <FileUploadField
                name="imageFile"
                control={form.control}
                label="Only support .jpg, .png"
              />

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">
                      Upload from URL
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Add file URL" {...field} />
                      </FormControl>
                      <Button type="button" variant="outline">
                        Upload
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Upload Icon Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold">Upload Icon</h3>
                <p className="text-xs text-muted-foreground">
                  Add your Image here
                </p>
              </div>
              <FileUploadField
                name="iconFile"
                control={form.control}
                label="Only support .jpg, .png"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-32">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 w-32"
                disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Done"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function FileUploadField({
  name,
  control,
  label,
}: {
  name: "imageFile" | "iconFile";
  control: any;
  label: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormItem>
          <FormControl>
            <div className="space-y-3">
              {!value ? (
                <DropzoneArea onFileChange={onChange} />
              ) : (
                <FilePreview file={value} onClear={() => onChange(null)} />
              )}
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DropzoneArea({
  onFileChange,
}: {
  onFileChange: (file: File) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFileChange(acceptedFiles[0]);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-white"
        }`}>
      <input {...getInputProps()} />
      <CloudUpload className="w-10 h-10 text-blue-500 mb-2" />
      <p className="text-sm font-medium">
        Drag your file(s) or{" "}
        <span className="text-blue-600 underline">browse</span>
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        Max 10 MB files are allowed
      </p>
    </div>
  );
}

function FilePreview({ file, onClear }: { file: File; onClear: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white border rounded">
          <ImageIcon className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium truncate max-w-[200px]">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {(file.size / (1024 * 1024)).toFixed(1)}MB
          </p>
        </div>
      </div>
      <Button type="button" variant="ghost" size="icon" onClick={onClear}>
        <X className="w-4 h-4 text-slate-400" />
      </Button>
    </div>
  );
}
