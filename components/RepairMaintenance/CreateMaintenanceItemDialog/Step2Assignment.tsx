import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceRequest } from "./schema";
import { UseFormReturn } from "react-hook-form";
import { useGetVendorWorkspaceForRAM } from "@/services/vendorworkspace.service";
import { useGetBoard } from "@/services/board.service";
import { useEffect, useState } from "react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

export default function Step2Assignment({
  form,
}: {
  form: UseFormReturn<MaintenanceRequest>;
}) {
  const { data: vendorWorkspace } = useGetVendorWorkspaceForRAM({
    id: form.getValues().domain_workspace,
  });

  const { data: board, isFetching } = useGetBoard(
    form.watch().vendor_workspace
  );

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg space-y-4">
        <h3 className="font-semibold text-slate-800">Property & Location</h3>
        <FormField
          control={form.control}
          name="property"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50/50">
                    <SelectValue placeholder="Select Property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="prop-1">Sunset Apartments</SelectItem>
                  <SelectItem value="prop-2">Parkview Towers</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit / Location *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50/50">
                    <SelectValue placeholder="Select Unit/Location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="unit-101">Unit 101</SelectItem>
                  <SelectItem value="lobby">Main Lobby</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="p-4 border rounded-lg space-y-4">
        <h3 className="font-semibold text-slate-800">
          Service Provider Assignment
        </h3>
        <FormField
          control={form.control}
          name="vendor_workspace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Provider *</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value} // Change this from defaultValue
              >
                <FormControl>
                  <SelectTrigger className="w-full bg-slate-50/50">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendorWorkspace?.data?.map((vw) => (
                    <SelectItem key={vw._id} value={vw._id ?? ""}>
                      {vw.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Board</FormLabel>

              <Select value={field.value || ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full bg-slate-50/50">
                    <SelectValue
                      placeholder={
                        isFetching
                          ? "Loading..."
                          : "Auto-assign or select technician"
                      }
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    {isFetching && (
                      <div className="p-2 text-sm text-muted-foreground text-center">
                        Fetching boards...
                      </div>
                    )}
                    {!isFetching &&
                      board &&
                      board?.data?.length > 0 &&
                      board.data.map((b) => (
                        <SelectItem key={b._id} value={b._id}>
                          {b.title}
                        </SelectItem>
                      ))}

                    {!isFetching &&
                      (!board?.data || board.data.length === 0) && (
                        <SelectLabel className="p-2 text-sm text-muted-foreground text-center">
                          No boards found
                        </SelectLabel>
                      )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormDescription className="text-xs">
                Leave empty to let the service provider assign
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
