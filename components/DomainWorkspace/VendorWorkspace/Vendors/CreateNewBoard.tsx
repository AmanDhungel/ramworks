import * as z from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CirclePlus,
  X,
  Image as ImageIcon,
  Plus,
  Check,
  Loader,
} from "lucide-react";

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
import { useCreateBoard, useGetSingleBoard } from "@/services/board.service";
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
import useDialogOpen from "@/context/Dialog";
import { useUpdateParams } from "@/helper/removeparam";
import { MultipleFileUploadField } from "@/components/ui/MultipleFileUpload";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const vendorSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(2, "Company name is required"),
  visibility: z.string().min(1, "Please select a company type"),
  vendor: z.string().min(1, "Please select a vendor type"),
  workspace: z.string().min(1, "Please select a workspace type"),
  background_image_file: z
    .array(
      z
        .union([
          z
            .custom<File>()
            .refine((file) => file instanceof File, "Logo is required"),
          z.string(),
        ])
        .refine((fileOrString) => {
          if (typeof fileOrString === "string") return true;
          return fileOrString?.size <= MAX_FILE_SIZE;
        }, `Max file size is 10MB.`)
        .refine((fileOrString) => {
          if (typeof fileOrString === "string") return true;
          return ACCEPTED_IMAGE_TYPES.includes(fileOrString?.type);
        }, ".jpg, .jpeg and .png files are accepted."),
    )
    .optional(),
  contacts: z
    .array(z.string())
    .min(1, "Please select a contact type")
    .optional(),
  background_color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
});

export type VendorFormValues = z.infer<typeof vendorSchema>;

export function CreateNewBoard() {
  const queryClient = useQueryClient();
  const { open, setIsOpen } = useDialogOpen();
  const { removeParam, getParam } = useUpdateParams();
  const vendor = getParam("vendor");
  const workspace = getParam("workspace");
  const board = getParam("board");
  const { mutate, isPending } = useCreateBoard();
  const { data: contacts } = useGetContact();
  const { data: SingleBorad, isFetching: isLoadingSingleData } =
    useGetSingleBoard(board ?? "");

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      title: "",
      visibility: "",
      background_color: "#4F46E5",
      vendor: vendor ?? "",
      workspace: workspace ?? "",
    },
  });

  useEffect(() => {
    if (vendor && workspace) {
      form.setValue("vendor", vendor);
      form.setValue("workspace", workspace);
    }
  }, [vendor, workspace, form]);

  useEffect(() => {
    if (board) {
      form.reset({
        background_color: SingleBorad?.data?.background_color,
        background_image_file: SingleBorad?.data?.background_images ?? [],
        title: SingleBorad?.data?.title,
        visibility: SingleBorad?.data?.visibility,
        vendor: SingleBorad?.data?.vendor,
        workspace: SingleBorad?.data?.workspace,
        _id: SingleBorad?.data?._id,
      });
    }
  }, [board, SingleBorad?.data]);

  const onSubmit = (data: VendorFormValues) => {
    const formData = new FormData();
    if (data._id) {
      formData.append("_id", data._id);
    }
    formData.append("title", data.title);
    formData.append("visibility", data.visibility);
    formData.append("background_color", data.background_color);
    if (data.background_image_file && data.background_image_file.length > 0) {
      data.background_image_file.forEach((item) => {
        if (item instanceof File) {
          formData.append("background_image_file", item);
        } else if (typeof item === "string") {
          formData.append("existing_images", item);
        }
      });
    }
    formData.append("vendor", vendor ?? "");
    formData.append("workspace", workspace ?? "");
    // const payload = {
    //   ...data,
    //   workspace: workspace,
    //   vendor: vendor,
    // };
    mutate(formData as FormData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["board"] });
        setIsOpen();
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
        form.reset();
        setIsOpen();
        removeParam("board");
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
            Create New Board
          </DialogTitle>
        </DialogHeader>
        {board && isLoadingSingleData ? (
          <Loader className="animate-spin" />
        ) : (
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
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select {...field}>
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("visibility") === "employee" && (
                <FormField
                  control={form.control}
                  name="contacts"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select Employee</FormLabel>
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
              )}

              <FormField
                control={form.control}
                name="background_image_file"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Upload Background Image</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Add your Image here
                    </p>
                    <FormControl>
                      <div className="space-y-4">
                        <MultipleFileUploadField
                          name="background_image_file"
                          control={form.control}
                          label="Only support .jpg, .png"
                        />
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

              <CustomColorPicker form={form} name="background_color" />

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1">
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
        )}
      </DialogContent>
    </Dialog>
  );
}
