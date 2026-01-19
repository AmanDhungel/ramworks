import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CirclePlus, Eye, EyeOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const createFileSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    chooseDeal: z.string().min(1, "Deal is required"),
    documentType: z.string().min(1, "Type is required"),
    owner: z.string().min(1, "Owner is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(1, "Phone is required"),
    company: z.string().min(1, "Company is required"),
    pipeline: z.string().min(1, "Pipeline is required"),
    status: z.string().min(1, "Status is required"),
    signatureType: z.enum(["none", "e-signature"]),
    content: z.string().min(1, "Content is required"),

    // Add Recipient
    documentSigners: z
      .array(z.string())
      .min(1, "At least one signer is required"),
    messageSubject: z.string().min(1, "Subject is required"),
    messageText: z.string().min(1, "Message text is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CreateFileFormValues = z.infer<typeof createFileSchema>;

export function CreateNewFileDialog() {
  const [activeTab, setActiveTab] = useState("basic");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CreateFileFormValues>({
    resolver: zodResolver(createFileSchema),
    defaultValues: {
      signatureType: "e-signature",
      documentSigners: [],
    },
  });

  const onSubmit = (data: CreateFileFormValues) => {
    console.log("Final Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Create Document
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-[80vh] sm:max-w-[800px] px-6 p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Create New File
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-11/12 m-auto">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12 ">
                <TabsTrigger
                  value="basic"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-orange-500 data-[state=active]:bg-transparent data-[state=active]:text-orange-500 px-8">
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="recipient"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-orange-500 data-[state=active]:bg-transparent data-[state=active]:text-orange-500 px-8">
                  Add Recipient
                </TabsTrigger>
              </TabsList>

              <ScrollArea>
                <div className="p-6">
                  <TabsContent value="basic" className="space-y-4 mt-0">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <Input {...field} className="bg-slate-50" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="chooseDeal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose Deal *</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="bg-slate-50">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Document Type *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="bg-slate-50">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="owner"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="bg-slate-50">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username *</FormLabel>
                            <Input {...field} className="bg-slate-50" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <Input {...field} className="bg-slate-50" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password *</FormLabel>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                                className="bg-slate-50"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password *</FormLabel>
                            <Input
                              type="password"
                              {...field}
                              className="bg-slate-50"
                            />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pipeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pipeline *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="bg-slate-50">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="bg-slate-50">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="signatureType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Signature</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="none" />
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">
                                    No Signature
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    Document doesn`t require signature
                                  </span>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem
                                  value="e-signature"
                                  className="border-orange-500 text-orange-500"
                                />
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">
                                    Use e-signature
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    Document requires e-signature
                                  </span>
                                </div>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content *</FormLabel>
                          <Textarea
                            {...field}
                            className="bg-slate-50 min-h-[100px]"
                          />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* --- TAB 2: ADD RECIPIENT --- */}
                  <TabsContent value="recipient" className="space-y-4 mt-0">
                    <SignerInput form={form} />

                    <FormField
                      control={form.control}
                      name="messageSubject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Subject *</FormLabel>
                          <Input {...field} className="bg-slate-50" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="messageText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Text *</FormLabel>
                          <Textarea
                            {...field}
                            className="bg-slate-50 min-h-[150px]"
                          />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      className="bg-slate-900 text-white w-full py-6">
                      Send Now
                    </Button>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-600 text-sm flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border border-emerald-600 flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      Document Sent successfully to the Selected Recipients
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
            <DialogFooter>
              <div className=" flex justify-end gap-3 p-6 border-t bg-white">
                <Button type="button" variant="outline" className="px-8">
                  Cancel
                </Button>
                {activeTab === "basic" ? (
                  <Button
                    type="button"
                    onClick={() => setActiveTab("recipient")}
                    className="bg-orange-500 px-8">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-orange-500 px-8">
                    Save
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Sub-component for the Signers Tag Input
function SignerInput({ form }: { form: any }) {
  const [val, setVal] = useState("");
  const signers = form.watch("documentSigners") || [];

  const add = () => {
    if (val) {
      form.setValue("documentSigners", [...signers, val]);
      setVal("");
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Document Signers *</FormLabel>
      <div className="flex gap-2">
        <Input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Add"
          className="bg-slate-50"
        />
        <Button type="button" onClick={add} className="bg-orange-500">
          <CirclePlus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {signers.map((s: string, i: number) => (
          <Badge
            key={i}
            className="bg-slate-700 text-white flex gap-1 px-3 py-1">
            {s}{" "}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() =>
                form.setValue(
                  "documentSigners",
                  signers.filter((_: any, idx: number) => idx !== i),
                )
              }
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
