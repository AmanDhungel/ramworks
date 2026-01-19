import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, PlusCircle } from "lucide-react";
import { FileUploadField } from "@/components/DomainWorkspace/CreateDomainWorkspaceDialog";
import { MultipleFileUploadField } from "@/components/ui/MultipleFileUpload";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  note: z.string().min(1, "Note content is required"),
  attachments: z
    .array(z.instanceof(File))
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Each file must be under 1MB`,
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    )
    .optional(),
});

export type NoteFormValues = z.infer<typeof noteSchema>;

export function AddNoteDialog() {
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", note: "" },
  });

  const onSubmit = (data: NoteFormValues) => {
    console.log("Submitting Note:", data);
  };

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-orange-600 hover:text-orange-700 font-medium">
          <PlusCircle className="w-4 h-4 mr-2" /> Add New
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold border-b pb-4">
            Add New Note
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your note here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MultipleFileUploadField
              name="attachments"
              control={form.control}
              label="Attachments*"
            />

            <div className="flex justify-end gap-3 pt-6">
              <Button type="button" variant="outline" className="px-6">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-6">
                Add Note
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
