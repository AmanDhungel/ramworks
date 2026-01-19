import React, { useCallback, useEffect, useState } from "react";
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
import {
  useCreateWorkspace,
  useGetSingleWorkSpace,
  useGetWorkspace,
} from "@/services/workspace.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useDialogOpen from "@/context/Dialog";
import { useSearchParams } from "next/navigation";
import { useUpdateParams } from "@/helper/removeparam";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Workspace title is required"),
  image_file: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file?.size <= 1024 * 1024, "Max file size is 1MB"),
      z.string(),
    ])
    .optional()
    .nullable(),
  icon_file: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file?.size <= 1024 * 1024, "Max file size is 1MB"),
      z.string(),
    ])
    .optional()
    .nullable(),
  imageUrl: z.url().optional().or(z.literal("")),
});

export type WorkSpaceFormValues = z.infer<typeof formSchema>;

export default function CreateWorkspaceDialog() {
  const { open, setIsOpen } = useDialogOpen();
  const { mutate, isPending } = useCreateWorkspace();
  const { data: singleWorkSpace } = useGetSingleWorkSpace();
  const { removeParam } = useUpdateParams();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const id = params.get("id");

  const form = useForm<WorkSpaceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      image_file: null,
      icon_file: null,
    },
  });

  useEffect(() => {
    if (params.get("id")) {
      form.reset({
        title: singleWorkSpace?.data?.title,
        image_file: singleWorkSpace?.data?.image,
        icon_file: singleWorkSpace?.data?.icon,
      });
    } else {
      form.reset({
        title: "",
        image_file: null,
        icon_file: null,
      });
    }
  }, [params.get("id"), singleWorkSpace, form]);

  // const {} = useUpdateDomainWorkspace();

  const onSubmit = (values: WorkSpaceFormValues) => {
    const formData = new FormData();

    formData.append("title", values.title);

    if (values.icon_file) {
      formData.append("icon_file", values.icon_file);
    }

    if (values.image_file) {
      formData.append("image_file", values.image_file);
    }
    if (params.get("id")) {
      formData.append("_id", params.get("id")!);
    }

    mutate(formData, {
      onSuccess: (msg) => {
        setIsOpen();
        toast.success(msg.message);
        queryClient.invalidateQueries({ queryKey: ["workspace"] });
        form.reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to create workspace",
        );
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setIsOpen();
        form.reset();
        removeParam("id");
      }}>
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
                name="image_file"
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

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold">Upload Icon</h3>
                <p className="text-xs text-muted-foreground">
                  Add your Image here
                </p>
              </div>
              <FileUploadField
                name="icon_file"
                control={form.control}
                label="Only support .jpg, .png"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen()}
                className="w-32">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 w-32"
                disabled={isPending}>
                {isPending ? "Creating..." : "Done"}
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
  name: any;
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
  onFileChange: (file: File | null) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFileChange(acceptedFiles[0]);
    },
    [onFileChange],
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
        Max 1 MB files are allowed
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
