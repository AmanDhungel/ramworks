"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateContact, useGetContact } from "@/services/contact.service";
import useDialogOpen from "@/context/Dialog";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useCreateCompany } from "@/services/company.service";

const TAG_OPTIONS = ["VIP", "Lead", "Customer"] as const;

const companyformschema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email(),
  phone: z.string().min(7, "Phone is required"),
  owner: z.string().min(3, "Phone is required"),
  about: z.string().min(15, "Phone is required"),
  secondary_phone: z.string().min(0).optional(),
  rating: z.enum(["1", "2", "3", "4", "5"]),
  industry: z.enum([
    "retail_industry",
    "banking_finance",
    "it_software",
    "healthcare",
    "manufacturing",
    "education",
  ]),
  currency: z.enum(["USD", "NPR"]),
  contacts: z.array(z.string()),
  language: z.enum(["English", "Nepali"]),
  tags: z.array(z.string()),
  source: z.enum([
    "phone_call",
    "social_media",
    "referral",
    "previous_contact",
    "other",
  ]),
  address: z.object({
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zip_code: z.string().min(1, "Zip code is required"),
  }),
  social_accounts: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    whatsapp: z.string().optional(),
  }),
  status: z.enum(["active", "inactive"]),
});

export type CompanyFormPayload = z.infer<typeof companyformschema>;

export function CompanyFormDialog() {
  const queryClient = useQueryClient();
  const form = useForm<CompanyFormPayload>({
    resolver: zodResolver(companyformschema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      about: "",
      contacts: [],
      owner: "",
      secondary_phone: "",
      rating: "3",
      industry: "it_software",
      currency: "USD",
      language: "English",
      tags: [],
      source: "other",
      status: "active",
      address: { address: "", country: "", state: "", city: "", zip_code: "" },
      social_accounts: {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        whatsapp: "",
      },
    },
  });

  const { mutate, isPending } = useCreateCompany();
  const { data: contacts } = useGetContact();
  const { open, setIsOpen } = useDialogOpen();

  function onSubmit(data: CompanyFormPayload) {
    const payload = {
      ...data,
      tags: JSON.stringify(data.tags),
      address: JSON.stringify(data.address),
      social_accounts: JSON.stringify(data.social_accounts),
      contacts: JSON.stringify(data.contacts),
    };
    mutate(payload as any, {
      onSuccess: (msg) => {
        setIsOpen();
        toast.success(msg.message);
        queryClient.invalidateQueries({ queryKey: ["company"] });
        form.reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to create workspace"
        );
      },
    });
  }

  console.log("forms", form.formState.errors);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-9 bg-orange-500 hover:bg-orange-600 gap-2">
          <CirclePlus className="w-4 h-4" /> Add New Company
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-w-3xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            Contact Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company`s Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company`s Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="facebook@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Owner..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contacts?.data.map((i) => (
                              <SelectItem key={i._id} value={i._id}>
                                {i.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* SECTION: PROFESSIONAL */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Details</h3>
                <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="This Company is among the best...."
                            {...field}
                          />
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
                        <FormLabel>Contacts</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between font-normal",
                                  !field.value?.length &&
                                    "text-muted-foreground"
                                )}>
                                {field.value?.length > 0
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
                                      value={contact.name} // Search matches by name
                                      onSelect={() => {
                                        const currentValue = field.value || [];
                                        const newValue = currentValue.includes(
                                          contact._id
                                        )
                                          ? currentValue.filter(
                                              (v: string) => v !== contact._id
                                            )
                                          : [...currentValue, contact._id];
                                        field.onChange(newValue);
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value?.includes(contact._id)
                                            ? "opacity-100"
                                            : "opacity-0"
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
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "retail_industry",
                              "banking_finance",
                              "it_software",
                              "healthcare",
                              "manufacturing",
                              "education",
                            ].map((i) => (
                              <SelectItem key={i} value={i}>
                                {i.replace("_", " ").toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (1-5)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["1", "2", "3", "4", "5"].map((r) => (
                              <SelectItem key={r} value={r}>
                                {r} Stars
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* SECTION: CONTACT & PREFERENCES */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact & Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="secondary_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Nepali">Nepali</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="NPR">NPR</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "phone_call",
                              "social_media",
                              "referral",
                              "previous_contact",
                              "other",
                            ].map((s) => (
                              <SelectItem key={s} value={s}>
                                {s.replace("_", " ").toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* TAGS SECTION (Clickable Buttons) */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Tags</FormLabel>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {TAG_OPTIONS.map((tag) => {
                            const isSelected = field.value.includes(tag);
                            return (
                              <Button
                                key={tag}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                  "rounded-full transition-all",
                                  isSelected &&
                                    "bg-primary text-primary-foreground"
                                )}
                                onClick={() => {
                                  const newValue = isSelected
                                    ? field.value.filter((t) => t !== tag)
                                    : [...field.value, tag];
                                  field.onChange(newValue);
                                }}>
                                {tag}
                                {isSelected && (
                                  <Check className="ml-2 h-3 w-3" />
                                )}
                              </Button>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* SECTION: ADDRESS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <FormField
                  control={form.control}
                  name="address.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* SECTION: SOCIALS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Accounts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(
                    [
                      "facebook",
                      "twitter",
                      "linkedin",
                      "instagram",
                      "whatsapp",
                    ] as const
                  ).map((platform) => (
                    <FormField
                      key={platform}
                      control={form.control}
                      name={`social_accounts.${platform}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {platform}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`${platform} link`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pb-10">
                <Button type="submit" size="lg" className="w-full">
                  {isPending ? "Saving..." : "Save"} Company
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
