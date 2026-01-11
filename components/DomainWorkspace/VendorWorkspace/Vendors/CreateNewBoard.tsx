import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, X, Image as ImageIcon, Plus } from "lucide-react";

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
import { FileUploadField } from "../../CreateDomainWorkspaceDialog";
import { CustomColorPicker } from "../CustomColorPicker";
import { Card, CardContent } from "@/components/ui/card";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const vendorSchema = z.object({
  boardTitle: z.string().min(2, "Company name is required"),
  Visibility: z.string().min(1, "Please select a company type"),
  bgImage: z
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

export function CreateNewBoard() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      boardTitle: "",
      Visibility: "",
      labelColor: "#4F46E5",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: VendorFormValues) => {
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
        <Card className="flex h-50 cursor-pointer items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/30 hover:bg-slate-50 transition-all rounded-2xl shadow-none">
          <CardContent className="flex items-center gap-2 font-semibold text-slate-800">
            Create New Board <Plus className="h-5 w-5" />
          </CardContent>
        </Card>
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
              name="boardTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bgImage"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Upload Background Image</FormLabel>
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
                            onClick={() => form.setValue("bgImage", undefined)}>
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
