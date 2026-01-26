import * as z from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, X, Image as ImageIcon, Plus, Check } from "lucide-react";

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
import { useSearchParams } from "next/navigation";
import { useCreateBoard } from "@/services/board.service";
import { toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useGetContact } from "@/services/contact.service";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const vendorSchema = z.object({
  title: z.string().min(2, "Company name is required"),
  Visibility: z.string().min(1, "Please select a company type"),
  vendor: z.string().min(1, "Please select a vendor type"),
  workspace: z.string().min(1, "Please select a workspace type"),
  background_images: z
    .custom<File>()
    .refine((file) => file instanceof File, "Logo is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted.",
    )
    .optional(),
  contacts: z
    .array(z.string())
    .min(1, "Please select a contact type")
    .optional(),
  backgroundColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  labelColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
});

export type VendorFormValues = z.infer<typeof vendorSchema>;

export function CreateNewBoard() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const vendor = searchParams.get("vendor");
  const workspace = searchParams.get("workspace");
  const { mutate, isPending } = useCreateBoard();
  const { data: contacts } = useGetContact();

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      title: "",
      Visibility: "",
      backgroundColor: "#4F46E5",
      vendor: vendor ?? "",
      labelColor: "#4F46E5",
      workspace: workspace ?? "",
    },
  });

  useEffect(() => {
    if (vendor && workspace) {
      form.setValue("vendor", vendor);
      form.setValue("workspace", workspace);
    }
  }, [searchParams, form]);

  useEffect(() => {
    if (form.getValues("labelColor")) {
      form.setValue("backgroundColor", form.getValues("labelColor"));
    }
  }, [open]);

  const onSubmit = (data: VendorFormValues) => {
    const payload = {
      ...data,
      workspace: workspace,
      vendor: vendor,
    };
    mutate(payload as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vendors"] });
        setOpen(false);
        form.reset();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to create board");
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}>
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
              name="title"
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
              name="contacts"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Visibility</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between font-normal",
                            !field.value?.length && "text-muted-foreground",
                          )}>
                          {field?.value && field?.value?.length > 0
                            ? `${field.value.length} contacts selected`
                            : "Select contacts..."}
                          <span className="ml-2 opacity-50">▼</span>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search contacts..." />
                        <CommandList>
                          <CommandEmpty>No contact found.</CommandEmpty>
                          <CommandGroup>
                            {contacts?.data.map((contact) => (
                              <CommandItem
                                key={contact._id}
                                value={contact.name}
                                onSelect={() => {
                                  const currentValue = field.value || [];
                                  const newValue = currentValue.includes(
                                    contact._id,
                                  )
                                    ? currentValue.filter(
                                        (v: string) => v !== contact._id,
                                      )
                                    : [...currentValue, contact._id];
                                  field.onChange(newValue);
                                }}>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(contact._id)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {contact.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
              name="background_images"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Upload Background Image</FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Add your Image here
                  </p>
                  <FormControl>
                    <div className="space-y-4">
                      <FileUploadField
                        name="background_images"
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
                            onClick={() =>
                              form.setValue("background_images", undefined)
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
