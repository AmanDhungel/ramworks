import * as z from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { CirclePlus, X, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { FileUploadField } from "../CreateDomainWorkspaceDialog";
import { CustomColorPicker } from "./CustomColorPicker";
import { useCreateVendorWorkspace } from "@/services/vendorworkspace.service";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const vendorSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Company name is required"),
  domain: z.string().min(1, "Please select a company type"),
  logo_file: z
    .custom<File>()
    .refine((file) => file instanceof File, "Logo is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted."
    )
    .optional(),
  labelColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
});

export type VendorFormValues = z.infer<typeof vendorSchema>;

export function CreateVendorWorkspace() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      domain: "",
      labelColor: "#4F46E5",
    },
  });

  useEffect(() => {
    if (id) {
      form.setValue("domain", id);
    }
  }, [id, form]);

  const { mutate, isPending } = useCreateVendorWorkspace();

  // const mutation = useMutation({
  //   mutationFn: async (values: VendorFormValues) => {
  //     console.log("Submitting:", values);
  //     return new Promise((resolve) => setTimeout(resolve, 1000));
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["vendors"] });
  //     setOpen(false);
  //     form.reset();
  //   },
  // });

  // const onSubmit = (values: WorkSpaceFormValues) => {
  //   const formData = new FormData();

  //   formData.append("title", values.title);

  //   if (values.icon_file) {
  //     formData.append("icon_file", values.icon_file);
  //   }

  //   if (values.image_file) {
  //     formData.append("image_file", values.image_file);
  //   }

  //   mutate(formData, {
  //     onSuccess: (msg) => {
  //       setIsOpen();
  //       toast.success(msg.message);
  //       queryClient.invalidateQueries({ queryKey: ["workspace"] });
  //       form.reset();
  //     },
  //     onError: (err: any) => {
  //       toast.error(
  //         err?.response?.data?.message || "Failed to create workspace"
  //       );
  //     },
  //   });
  // };

  const onSubmit = (data: VendorFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("domain", data.domain);
    formData.append("label_color", data.labelColor);

    if (data.logo_file) {
      if (data.logo_file instanceof FileList) {
        formData.append("logo_file", data.logo_file[0]);
      } else {
        formData.append("logo_file", data.logo_file);
      }
    }

    mutate(formData, {
      onSuccess: (msg) => {
        setOpen(false);
        toast.success(msg.message);
        queryClient.invalidateQueries({ queryKey: ["vendorworkspace"] });
        form.reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to create workspace"
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <CirclePlus className="w-4 h-4 mr-2" /> Create Vendor Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Vendors Workspace
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      placeholder="Enter company name"
                      {...field}
                      defaultValue={id ? id : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo_file"
              render={({ field: { value } }) => (
                <FormItem>
                  <FormLabel>Upload Logo</FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Add your Image here
                  </p>
                  <FormControl>
                    <div className="space-y-4">
                      <FileUploadField
                        name="logo_file"
                        control={form.control}
                        label="Only support .jpg, .png"
                      />

                      {value && (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                          <div className="flex items-center gap-3">
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                            <div className="text-sm">
                              <p className="font-medium truncate max-w-50">
                                {value.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(value.size / (1024 * 1024)).toFixed(1)}MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              form.setValue("logo_file", undefined)
                            }>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomColorPicker form={form} />
            {/* <ColorPicker
                        className={"rounded-md "}
                        value={field.value}
                        onChange={field.onChange}
                        hideControls={false}
                        hideInputs={false}
                        hideOpacity={true}
                        width={450}
                      /> */}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
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
