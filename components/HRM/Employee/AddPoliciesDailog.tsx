"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  useCreateDepartment,
  useGetDepartment,
} from "@/services/departments.service";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import useDialogOpen from "@/context/Dialog";
import { useCreatePolicy } from "@/services/policies.service";
import { MultipleFileUploadField } from "@/components/ui/MultipleFileUpload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  appraisal_date: z.string().min(1, {
    message: "Status must be either 'active' or 'inactive'.",
  }),
  department: z.string().min(1, {
    message: "Number of employees must be at least 1.",
  }),
  files: z
    .array(z.file())
    .refine((files) => files.every((file) => file.size <= 1024 * 1024), {
      message: "Each file must be under 1MB.",
    }),
});

export default function PoliciesFormDialog() {
  const { mutate } = useCreatePolicy();
  const queryClient = useQueryClient();
  const { data: departments } = useGetDepartment();
  const { open, setIsOpen } = useDialogOpen();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // const onSubmit = (values: WorkSpaceFormValues) => {
  //   const formData = new FormData();

  //   formData.append("title", values.title);

  //   if (values.icon_file) {
  //     formData.append("icon_file", values.icon_file);
  //   }

  //   if (values.image_file) {
  //     formData.append("image_file", values.image_file);
  //   }
  //   if (params.get("id")) {
  //     formData.append("_id", params.get("id")!);
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
  //         err?.response?.data?.message || "Failed to create workspace",
  //       );
  //     },
  //   });
  // };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("appraisal_date", values.appraisal_date);
    formData.append("department", values.department);

    if (values.files) {
      values.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    console.log(formData);

    mutate(formData as any, {
      onSuccess: () => {
        setIsOpen();
        queryClient.invalidateQueries({ queryKey: ["policy"] });
        form.reset();
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setIsOpen();
        form.reset();
      }}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
          <Plus className="h-4 w-4" /> Add Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Fill in the details below. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appraisal_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appraisal Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments?.data.map((department) => (
                        <SelectItem
                          key={department._id}
                          value={department._id ?? ""}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MultipleFileUploadField
              control={form.control}
              label="Policy Files"
              name="files"
            />

            <div className="flex justify-end pt-4">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
