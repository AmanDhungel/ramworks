"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Download,
  Printer,
  Mail,
  Eye,
  Phone,
  Mail as MailIcon,
} from "lucide-react";
import { useGetSingleInvoice } from "@/services/invoices.service";
import { useParams } from "next/navigation";

const MaintenanceInvoice = () => {
  const { id } = useParams();
  const idString = Array.isArray(id) ? id[0] : id || "";
  const { data } = useGetSingleInvoice(idString);

  return (
    <div className="mx-auto p-6 min-h-screen space-y-6 font-sans">
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="bg-[#FDF0E9] p-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b]">
              Maintenance Service Invoice
            </h1>
            <p className="text-sm text-slate-500">
              Detailed billing for maintenance services
            </p>
          </div>
          <Badge className="bg-[#10b981] hover:bg-[#10b981] text-white px-4 py-1 rounded-md">
            {data?.data.status}
          </Badge>
        </div>
      </Card>

      {/* Invoice Meta Data */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-slate-500 text-sm">Invoice Number</p>
            <p className="font-bold text-slate-900">
              {data?.data.invoice_number}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-sm">Invoice Date</p>
            <p className="font-bold text-slate-900">
              {data?.data.invoice_date}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Due Date</p>
            <p className="font-bold text-slate-900">{data?.data.due_date}</p>
          </div>
          {/* <div className="text-right">
            <p className="text-slate-500 text-sm">Work Order</p>
            <p className="font-bold text-slate-900">MAINT-2025-042</p>
          </div> */}
        </CardContent>
      </Card>

      {/* Service Provider & Bill To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-[#334155] border-b pb-2">
              Service Provider
            </h3>
            <div className="space-y-1">
              <p className="font-bold">{data?.data.contact.name}</p>
              <p className="text-slate-500 text-sm">
                {data?.data.contact.job_title}
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <p>{data?.data.contact.address.address}</p>
              <p>
                {data?.data.contact.address.city},{" "}
                {data?.data.contact.address.state}{" "}
              </p>
            </div>
            <div className="space-y-1 text-sm text-slate-500 pt-2">
              <div className="flex items-center gap-2">
                <Phone size={14} /> {data?.data.contact.phone}
              </div>
              <div className="flex items-center gap-2">
                <MailIcon size={14} /> {data?.data.contact.email}
              </div>
            </div>
            {/* <div className="text-xs text-slate-400 pt-2">
              <p>EIN: 12-3456789</p>
              <p>License: PL-2024-5678</p>
            </div> */}
          </CardContent>
        </Card>

        {/* <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-[#334155] border-b pb-2">Bill To</h3>
            <div className="space-y-1">
              <p className="font-bold">Sunset Apartments</p>
              <p className="text-slate-500 text-sm">Property Owner</p>
            </div>
            <div className="text-sm text-slate-500">
              <p>123 Main St, Building A</p>
              <p>Unit: Unit 301</p>
            </div>
            <div className="space-y-1 text-sm text-slate-500 pt-6">
              <div className="flex items-center gap-2">
                <Phone size={14} /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MailIcon size={14} /> lorem@email.com
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Work Order Details */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-bold text-[#334155] border-b pb-2 mb-4">
            Work Order Details
          </h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Category
              </p>
              <p className="font-semibold text-slate-800">Plumbing</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Priority
              </p>
              <Badge className="bg-orange-500 text-white border-none text-[10px] h-5 uppercase">
                Medium
              </Badge>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Technician
              </p>
              <p className="font-semibold text-slate-800">Mike Wilson</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Technician ID
              </p>
              <p className="font-semibold text-slate-800">TECH-1001</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Description
              </p>
              <p className="font-semibold text-slate-800">
                Leaking Pipe in Building A - Unit 301
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Service Date
              </p>
              <p className="font-semibold text-slate-800 text-sm">
                Jan 20, 2025, 02:15 PM
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Completion Date
              </p>
              <p className="font-semibold text-slate-800 text-sm">
                Jan 21, 2025, 04:30 PM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Labor Charges */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#334155]">Labor Charges</h3>
            <p className="font-bold text-blue-600">$425.00</p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Emergency Diagnostic & Inspection",
                price: "127.50",
                desc: "1.5 hours × $85/hr",
              },
              {
                title: "Pipe Connection Repair & Replacement",
                price: "255.00",
                desc: "3 hours × $85/hr",
              },
              {
                title: "Ceiling Damage Assessment",
                price: "42.50",
                desc: "3 hours × $85/hr",
              },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    Technician: Mike Wilson • Date: 2025-01-20
                  </p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <p className="font-bold text-sm text-slate-700">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Materials & Parts */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#334155]">Materials & Parts</h3>
            <p className="font-bold text-blue-600">$88.50</p>
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-10">
                  <input type="checkbox" disabled />
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  Item Code
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  Description
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  Qty
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  Unit Price
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.items.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <input type="checkbox" disabled />
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 font-mono">
                    {row.description} - 3/4`` PVC
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {row.description}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {row.quantity}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {row.price}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 text-right">
                    {row.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#334155]">Financial Summary</h3>
            <p className="font-bold text-blue-600">$110.00</p>
          </div>
          <div className="space-y-3">
            {[
              {
                label: "Service Fee",
                text: "Emergency Call-Out Fee",
                price: "$50.00",
              },
              {
                label: "Surcharge",
                text: "After-Hours Service Surcharge",
                price: "$35.00",
              },
              {
                label: "Equipment",
                text: "Equipment & Tools Usage",
                price: "$25.00",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm">
                <div className="flex gap-3 items-center">
                  <Badge
                    variant="outline"
                    className="font-normal text-[10px] text-slate-500">
                    {item.label}
                  </Badge>
                  <span className="text-slate-600">{item.text}</span>
                </div>
                <span className="font-bold text-slate-700">{item.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Charges / Grand Total */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 space-y-3">
          <h3 className="font-bold text-[#334155] border-b pb-2">
            Additional Charges
          </h3>
          <div className="space-y-2 text-sm pt-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Labor Subtotal</span>
              <span className="font-bold">$425.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Materials Subtotal</span>
              <span className="font-bold">$88.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Additional Charges</span>
              <span className="font-bold">$110.00</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold">$562.50</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Repeat Customer Discount (5%)</span>
              <span className="font-bold">$-28.13</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tax (8.875%)</span>
              <span className="font-bold">$47.43</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-lg">
              <span className="font-bold text-slate-800">Total Amount</span>
              <span className="font-bold text-blue-600">$581.80</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-bold text-[#334155] border-b pb-4 mb-4">
            Payment Information
          </h3>
          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-slate-500 text-sm">Payment Method</p>
              <p className="font-bold">Credit Card</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-sm">Transaction ID</p>
              <p className="font-bold">TXN-20250121-4567</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Payment Date</p>
              <p className="font-bold">Jan 21, 2025, 06:30 PM</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-sm">Amount Paid</p>
              <p className="font-bold">$581.80</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Card Details</p>
              <p className="font-bold">**** **** **** 4242</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-sm">Amount Paid</p>
              <p className="font-bold">$581.80</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms, Conditions & Warranty */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 space-y-6 text-sm">
          <h3 className="font-bold text-[#334155] border-b pb-2">
            Terms, Conditions & Warranty
          </h3>

          <section className="space-y-1">
            <p className="text-slate-500 font-semibold">Payment Terms</p>
            <p className="text-slate-500">
              Payment due within 15 days. Late payments subject to 1.5% monthly
              interest charge.
            </p>
          </section>

          <section className="space-y-1">
            <p className="text-slate-500 font-semibold">Warranty Information</p>
            <p className="text-slate-500">
              90-day warranty on all parts and labor
            </p>
          </section>

          <section className="space-y-1">
            <p className="text-slate-500 font-semibold">Notes</p>
            <p className="text-slate-500">
              Thank you for choosing QuickFix Plumbing Services. All work is
              guaranteed for 90 days from completion date. For questions about
              this invoice, please contact our billing department.
            </p>
          </section>

          <section className="space-y-1">
            <p className="text-slate-500 font-semibold">Payment Instructions</p>
            <p className="text-slate-500">
              Payment can be made via credit card, bank transfer, or check.
              Please include invoice number with payment.
            </p>
          </section>

          <div className="flex justify-between pt-4">
            <div className="space-y-1">
              <p className="text-slate-500 font-bold">Bank Transfer Details</p>
              <p className="text-slate-500">Bank: Community Bank</p>
              <p className="text-slate-500">Account: QuickFix Plumbing LLC</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-slate-500">Account #: ****5678</p>
              <p className="text-slate-500">Routing #: 021000021</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
        <Button
          variant="outline"
          className="w-full py-6 flex gap-2 text-slate-600 border-slate-200">
          <Download size={18} /> Download PDF
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 flex gap-2 text-slate-600 border-slate-200">
          <Printer size={18} /> Print Invoice
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 flex gap-2 text-slate-600 border-slate-200">
          <Mail size={18} /> Email Invoice
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 flex gap-2 text-slate-600 border-slate-200">
          <Eye size={18} /> View Details
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceInvoice;
