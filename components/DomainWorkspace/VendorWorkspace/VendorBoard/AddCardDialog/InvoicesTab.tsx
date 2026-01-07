import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReceiptText, Plus } from "lucide-react";

export default function InvoicesTab() {
  const { control, register, watch } = useFormContext();
  const { fields, append } = useFieldArray({ control, name: "invoiceItems" });

  const items = watch("invoiceItems") || [];
  const total = items.reduce(
    (acc: number, item: any) => acc + (Number(item.amount) || 0),
    0
  );

  return (
    <TabsContent value="invoices" className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <ReceiptText className="w-4 h-4 text-emerald-500" /> Billing Items
        </h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => append({ description: "", amount: 0 })}>
          <Plus className="w-4 h-4 mr-1" /> Add Line Item
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-8">
              <Input
                {...register(`invoiceItems.${index}.description`)}
                placeholder="Item description"
              />
            </div>
            <div className="col-span-4">
              <Input
                type="number"
                {...register(`invoiceItems.${index}.amount`)}
                placeholder="$ 0.00"
                className="text-right"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t flex justify-between items-center">
        <span className="text-sm font-bold text-slate-500">Total Amount:</span>
        <span className="text-xl font-bold text-emerald-600">
          ${total.toFixed(2)}
        </span>
      </div>
    </TabsContent>
  );
}
