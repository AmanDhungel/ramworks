import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploadField } from "../CreateDomainWorkspaceDialog";
import { CustomColorPicker } from "./CustomColorPicker";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const vendorSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyType: z.string().min(1, "Please select a company type"),
  logo: z
    .custom<File>()
    .refine((file) => file instanceof File, "Logo is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
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
  const queryClient = useQueryClient();

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      companyName: "",
      companyType: "Maintenance",
      labelColor: "#4F46E5",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: VendorFormValues) => {
      console.log("Submitting:", values);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = (data: VendorFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <CirclePlus className="w-4 h-4 mr-2" /> Create Vendor Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Vendors Workspace
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
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
              name="companyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="SaaS">SaaS</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Upload Logo</FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Add your Image here
                  </p>
                  <FormControl>
                    <div className="space-y-4">
                      <FileUploadField
                        name="imageFile"
                        control={form.control}
                        label="Only support .jpg, .png"
                      />

                      {value && (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                          <div className="flex items-center gap-3">
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                            <div className="text-sm">
                              <p className="font-medium truncate max-w-[200px]">
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
                            onClick={() => form.setValue("logo", undefined)}>
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
