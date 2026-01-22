import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReceiptText, Plus, Check } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useGetInvoices } from "@/services/invoices.service";
import { TaskFormValues } from "./schema";

export default function InvoicesTab() {
  const { control, register, watch } = useFormContext<TaskFormValues>();
  const { data: invoices } = useGetInvoices();

  const items = watch("invoices") || [];
  const total = items.reduce(
    (acc: number, item: any) => acc + (Number(item.amount) || 0),
    0,
  );

  return (
    <TabsContent value="invoices" className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <ReceiptText className="w-4 h-4 text-emerald-500" /> Billing Items
        </h3>
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="invoices"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select Invoice</FormLabel>
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
                      {field?.value?.length > 0
                        ? `${field?.value.length} members selected`
                        : "Select members..."}
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
                        {invoices?.data.map((invoice) => (
                          <CommandItem
                            key={invoice._id}
                            value={invoice._id}
                            onSelect={() => {
                              const currentValue = field.value || [];
                              const newValue = currentValue.includes(
                                invoice._id,
                              )
                                ? currentValue.filter(
                                    (v: string) => v !== invoice._id,
                                  )
                                : [...currentValue, invoice._id];
                              field.onChange(newValue);
                            }}>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(invoice._id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {invoice.invoice_number}
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
      </div>

      {/* <div className="pt-4 border-t flex justify-between items-center">
        <span className="text-sm font-bold text-slate-500">Total Amount:</span>
        <span className="text-xl font-bold text-emerald-600">
          ${total.toFixed(2)}
        </span>
      </div> */}
    </TabsContent>
  );
}
