"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  User,
  MapPin,
  Landmark,
  Users,
  GraduationCap,
  Briefcase,
  PlusCircle,
} from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const profileSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.email().min(1, "Required"),
  phone: z.string().min(10, "Invalid phone"),
  gender: z.string().min(1, "Required"),
  address: z.string().min(5, "Required"),
  bankName: z.string().min(1, "Required"),
  accountNo: z.string().min(1, "Required"),
});

export default function AddContactDialog() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      address: "",
      bankName: "",
      accountNo: "",
    },
  });

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log("Contact Data Submitted:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 font-bold shadow-md">
          <PlusCircle size={18} />
          Add Contacts
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-slate-50 border-b">
          <DialogTitle className="text-xl font-bold text-slate-800">
            Add Employee Information
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="w-full">
              {/* Tab Navigation */}
              <div className="px-6 bg-white border-b">
                <TabsList className="bg-transparent w-full justify-start rounded-none h-auto p-0 gap-6">
                  <TabTriggerItem
                    value="basic"
                    icon={<User size={16} />}
                    label="Basic"
                  />
                  <TabTriggerItem
                    value="address"
                    icon={<MapPin size={16} />}
                    label="Address"
                  />
                  <TabTriggerItem
                    value="bank"
                    icon={<Landmark size={16} />}
                    label="Bank"
                  />
                  <TabTriggerItem
                    value="family"
                    icon={<Users size={16} />}
                    label="Family"
                  />
                </TabsList>
              </div>

              <ScrollArea className="max-h-[60vh]">
                <div className="p-6">
                  {/* --- BASIC INFORMATION --- */}
                  <TabsContent value="basic" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-700">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John"
                                className="h-11 border-slate-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-700">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Doe"
                                className="h-11 border-slate-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="example@email.com"
                              className="h-11 border-slate-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Gender
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="h-11 border-slate-200">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* --- ADDRESS --- */}
                  <TabsContent value="address" className="mt-0">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Permanent Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="123 Street Name"
                              className="h-11 border-slate-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* --- BANK --- */}
                  <TabsContent
                    value="bank"
                    className="mt-0 grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Bank Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-11 border-slate-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-700">
                            Account No
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-11 border-slate-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>

            <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="px-6 font-bold">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 font-bold">
                Save Information
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function TabTriggerItem({
  value,
  icon,
  label,
}: {
  value: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 border-b-2 border-transparent rounded-none px-2 pb-4 pt-4 flex items-center gap-2 text-slate-400 font-bold transition-all">
      {icon}
      {label}
    </TabsTrigger>
  );
}
