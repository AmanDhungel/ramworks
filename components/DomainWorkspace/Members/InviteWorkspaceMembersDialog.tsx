import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const inviteSchema = z.object({
  identifier: z.string().min(1, "Email or name is required"),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

export default function InviteMemberDialog() {
  const mutation = useMutation({
    mutationFn: async (data: InviteFormValues) => {
      return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
    },
    onSuccess: () => {
      alert("Invite link created successfully!");
    },
  });

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const onSubmit = (values: InviteFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white">
          <UserPlus /> Invite Workspace members
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] p-10 gap-6">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-3xl font-bold text-[#1F2937]">
            Invite Workspace members
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email address or name"
                      className="h-14 text-lg border-slate-200 focus-visible:ring-[#FF6B35]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-slate-500 text-sm">
                  Invite someone to this Workspace with link:
                </p>
                <button
                  type="button"
                  className="text-blue-500 text-xs font-medium hover:underline">
                  Disable link
                </button>
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white h-12 px-6 gap-2">
                <Link size={18} />
                {mutation.isPending ? "Creating..." : "Create link"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
