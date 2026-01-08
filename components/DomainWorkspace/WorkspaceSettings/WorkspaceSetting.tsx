"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Globe, Plus, Pencil, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { WorkspaceSettingsSchema, WorkspaceSettingsValues } from "./schema";

export default function WorkspaceSettingsPage() {
  const { data: initialData, isLoading } = useQuery({
    queryKey: ["workspaceSettings"],
    queryFn: async () => {
      // Replace with your actual API call
      return {
        aiEnabled: true,
        visibility: "private",
        membershipRestrictions: { type: "anybody" },
        boardCreation: {
          public: "any",
          workspaceVisible: "any",
          private: "any",
        },
        boardDeletion: {
          public: "any",
          workspaceVisible: "any",
          private: "any",
        },
        guestSharing: "anybody",
      };
    },
  });

  const form = useForm<WorkspaceSettingsValues>({
    resolver: zodResolver(WorkspaceSettingsSchema),
    defaultValues: {},
  });

  const mutation = useMutation({
    mutationFn: async (values: WorkspaceSettingsValues) => {
      console.log("Saving to server:", values);
    },
  });

  const onSubmit = (values: WorkspaceSettingsValues) => mutation.mutate(values);

  if (isLoading)
    return <div className="p-10 text-center">Loading Workspace...</div>;

  return (
    <div className=" mx-auto p-8 space-y-12 pb-32 bg-white">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 rounded-md">
          <AvatarImage src="https://github.com/nutlope.png" />
          <AvatarFallback>WS</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Workspace</h1>
            <Pencil className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
            <span className="text-orange-600">Premium</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" /> Private
            </span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
          {/* AI SECTION */}
          <section className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold">AI</span>
              <span className="text-[10px] px-1.5 py-0.5 border border-orange-400 text-orange-600 rounded font-semibold uppercase">
                Premium
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800">
                  AI is activated for all boards in this Workspace.
                </p>
                <p className="text-xs text-slate-500">
                  AI is an artificial intelligence tool to help generate,
                  improve, and summarize content while writing on Trello.
                </p>
                <p className="text-[11px] text-orange-500 font-semibold cursor-pointer hover:underline">
                  Learn About AI
                </p>
              </div>
              <FormField
                control={form.control}
                name="aiEnabled"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-center py-2 bg-slate-50/50 border-y">
              Workspace visibility
            </h2>
            <div className="text-sm flex items-center gap-2 text-orange-600 font-medium">
              <Lock className="w-4 h-4" />
              {form.watch("visibility") === "private"
                ? "Private – This Workspace is private. It's not indexed or visible to those outside the Workspace."
                : "Public – This Workspace is public and visible to anyone with the link."}
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                Select Workspace visibility
              </p>
              <VisibilityOption
                id="private"
                label="Private"
                description="This Workspace is private. It's not indexed or visible to those outside the Workspace."
                icon={<Lock className="w-3.5 h-3.5 text-red-500" />}
                form={form}
              />
              <VisibilityOption
                id="public"
                label="Public"
                description="This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards."
                icon={<Globe className="w-3.5 h-3.5 text-green-500" />}
                form={form}
              />
            </div>
            <SaveButton isSaving={mutation.isPending} />
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-center py-2 bg-slate-50/50 border-y">
              Workspace membership restrictions
            </h2>
            <p className="text-xs font-semibold text-orange-600">
              {form.watch("membershipRestrictions.type") === "anybody"
                ? "Anyone can be added to this Workspace."
                : "Restrictions are active for specific domains."}
            </p>

            <div className="space-y-6">
              <SimpleSelection
                name="membershipRestrictions.type"
                id="anybody"
                label="Anybody"
                description="Anybody can be added to this Workspace."
                form={form}
              />
              <div className="space-y-4">
                <SimpleSelection
                  name="membershipRestrictions.type"
                  id="specific_domains"
                  label="Only specific email domains"
                  description="Only members with email addresses in specified domains can be added to this Workspace."
                  form={form}
                />
                {form.watch("membershipRestrictions.type") ===
                  "specific_domains" && (
                  <div className="ml-8 space-y-3 bg-slate-50/50 p-4 rounded-lg">
                    <Label className="text-[11px] font-bold text-blue-900 uppercase">
                      Allowed domains and addresses
                    </Label>
                    <p className="text-xs text-slate-500">
                      Choose which email domains and addresses can be added to
                      Workspaces. For example, if you only wanted users with
                      trello.com email addresses to be able to be added to
                      Workspaces, enter trello.com.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a domain or address..."
                        className="bg-white h-10 border-slate-200"
                      />
                      <Button
                        size="sm"
                        className="bg-orange-500 h-10 px-6 font-bold">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <SaveButton isSaving={mutation.isPending} />
          </section>

          {/* BOARD CREATION RESTRICTIONS */}
          <section className="space-y-8">
            <h2 className="text-xl font-bold text-center py-2 bg-slate-50/50 border-y">
              Board creation restrictions
            </h2>
            <RestrictionGroup
              title="Public boards"
              name="boardCreation.public"
              icon={<Globe className="w-3.5 h-3.5 text-green-500" />}
              form={form}
            />
            <RestrictionGroup
              title="Workspace visible boards"
              name="boardCreation.workspaceVisible"
              icon={<Users className="w-3.5 h-3.5 text-orange-400" />}
              form={form}
            />
            <RestrictionGroup
              title="Private boards"
              name="boardCreation.private"
              icon={<Lock className="w-3.5 h-3.5 text-red-500" />}
              form={form}
            />
            <SaveButton isSaving={mutation.isPending} />
          </section>

          {/* BOARD DELETION RESTRICTIONS */}
          <section className="space-y-8">
            <h2 className="text-xl font-bold text-center py-2 bg-slate-50/50 border-y">
              Board deletion restrictions
            </h2>
            <RestrictionGroup
              title="Public boards"
              name="boardDeletion.public"
              icon={<Globe className="w-3.5 h-3.5 text-green-500" />}
              form={form}
            />
            <RestrictionGroup
              title="Workspace visible boards"
              name="boardDeletion.workspaceVisible"
              icon={<Users className="w-3.5 h-3.5 text-orange-400" />}
              form={form}
            />
            <RestrictionGroup
              title="Private boards"
              name="boardDeletion.private"
              icon={<Lock className="w-3.5 h-3.5 text-red-500" />}
              form={form}
            />
            <SaveButton isSaving={mutation.isPending} />
          </section>

          {/* GUEST SHARING SECTION */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-center py-2 bg-slate-50/50 border-y">
              Sharing boards with guests
            </h2>
            <p className="text-xs font-semibold text-orange-600">
              Anybody can send or receive invitations to boards in this
              Workspace.
            </p>
            <div className="space-y-6">
              <SimpleSelection
                name="guestSharing"
                id="anybody"
                label="Anybody"
                description="Workspace boards can be shared with anybody."
                form={form}
              />
              <SimpleSelection
                name="guestSharing"
                id="members_only"
                label="Only Workspace members"
                description="Workspace boards can only be shared with members of this Workspace."
                form={form}
              />
            </div>
            <SaveButton isSaving={mutation.isPending} />
          </section>
        </form>
      </Form>
    </div>
  );
}

function VisibilityOption({ id, label, description, icon, form }: any) {
  const currentValue = form.watch("visibility");
  const isSelected = currentValue === id;

  const handleSelect = () =>
    form.setValue("visibility", id, { shouldValidate: true });

  return (
    <div className="flex items-start space-x-3 group cursor-pointer">
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleSelect}
        className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
      />
      <div className="space-y-1">
        <Label className="font-bold flex items-center gap-2 cursor-pointer text-blue-950">
          {icon} {label}
        </Label>
        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}

function SimpleSelection({ name, id, label, description, form }: any) {
  const currentValue = form.watch(name);

  const handleSelect = () => form.setValue(name, id);

  return (
    <div className="flex items-start space-x-3 group ">
      <Checkbox
        checked={currentValue === id}
        onCheckedChange={handleSelect}
        className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 cursor-pointer"
      />
      <div className="space-y-1">
        <Label className="font-bold cursor-pointer text-blue-950">
          {label}
        </Label>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function RestrictionGroup({ title, name, icon, form }: any) {
  const currentValue = form.watch(name);

  const options = [
    { id: "any", label: "Any Workspace member" },
    { id: "admin", label: "Only Workspace admins" },
    { id: "nobody", label: "Nobody" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-[11px] font-bold text-orange-600">
          Any Workspace member can{" "}
          {name.includes("create") ? "create" : "delete"}{" "}
          <span className="inline-flex items-center gap-1">
            {icon} {title}.
          </span>
        </p>
        <h4 className="text-sm font-bold text-slate-800">
          Who can {name.includes("create") ? "create" : "delete"} {icon} {title}
          ?
        </h4>
      </div>
      <div className="space-y-3">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={currentValue === opt.id}
              onCheckedChange={() => form.setValue(name, opt.id)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label className="text-xs font-medium text-slate-700 cursor-pointer">
              {opt.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaveButton({ isSaving }: { isSaving: boolean }) {
  return (
    <Button
      type="submit"
      className="w-fit mx-auto block bg-orange-500 hover:bg-orange-600 px-10 h-10 font-bold transition-transform active:scale-95">
      {isSaving ? "Saving..." : "Save Changes"}
    </Button>
  );
}
