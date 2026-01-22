import React from "react";
import {
  Download,
  Printer,
  Mail,
  FileText,
  CheckCircle2,
  Star,
  Phone,
  Mail as MailIcon,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RAMResponse } from "@/services/RAM.service";

const InvoiceTab = ({ data }: { data?: RAMResponse }) => {
  return (
    <div className="mx-auto p-6  min-h-screen space-y-6 font-sans text-slate-900">
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="bg-orange-100/50 p-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Maintenance Service Invoice
            </h1>
            <p className="text-sm text-slate-500">
              Detailed billing for maintenance services
            </p>
          </div>
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1">
            PAID
          </Badge>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Invoice Number
              </p>
              <p className="text-sm font-medium">INV-2025-001</p>
            </div>
            <div className="text-right md:text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Invoice Date
              </p>
              <p className="text-sm font-medium">Jan 21, 2025, 05:00 PM</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Due Date
              </p>
              <p className="text-sm font-medium">Feb 5, 2025, 11:59 PM</p>
            </div>
            <div className="text-right md:text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Work Order
              </p>
              <p className="text-sm font-medium uppercase">Maint-2025-042</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase">
              Service Provider
            </h3>
            <div>
              <p className="font-bold text-slate-800">QuickFix Plumbing LLC</p>
              <p className="text-sm text-slate-500">
                QuickFix Plumbing Services
              </p>
            </div>
            <div className="text-sm text-slate-600">
              <p>456 Service Lane, Suite 200</p>
              <p>New York, NY 10001</p>
            </div>
            <div className="space-y-1 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Phone size={14} /> +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <MailIcon size={14} /> lorem@email.com
              </p>
            </div>
            <div className="pt-2 text-xs text-slate-400">
              <p>EIN: 12-3456789</p>
              <p>License: PL-2024-5678</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase">
              Bill To
            </h3>
            <div>
              <p className="font-bold text-slate-800">Sunset Apartments</p>
              <p className="text-sm text-slate-500">Property Owner</p>
            </div>
            <div className="text-sm text-slate-600">
              <p>123 Main St, Building A</p>
              <p>Unit: Unit 301</p>
            </div>
            <div className="space-y-1 text-sm text-slate-600 pt-4">
              <p className="flex items-center gap-2">
                <Phone size={14} /> +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <MailIcon size={14} /> lorem@email.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Order Details */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase">
              Work Order Details
            </h3>
            <Badge className="bg-orange-500 text-white border-none text-[10px]">
              MEDIUM
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                Category
              </p>
              <p className="text-sm font-medium">Plumbing</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                Technician
              </p>
              <p className="text-sm font-medium">Mike Wilson</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                Technician ID
              </p>
              <p className="text-sm font-medium">TECH-1001</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
              Description
            </p>
            <p className="text-sm font-medium">
              Leaking Pipe in Building A - Unit 301
            </p>
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Service Date
              </p>
              <p className="text-sm font-medium">Jan 20, 2025, 02:15 PM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Completion Date
              </p>
              <p className="text-sm font-medium">Jan 21, 2025, 04:30 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Labor Charges */}
      <Card className="border-none shadow-sm">
        <div className="p-4 flex justify-between items-center border-b border-slate-50">
          <h3 className="text-sm font-bold text-slate-700">Labor Charges</h3>
          <span className="text-blue-600 font-bold">$425.00</span>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {[
              {
                title: "Emergency Diagnostic & Inspection",
                time: "1.5 hours × $85/hr",
                price: "127.50",
              },
              {
                title: "Pipe Connection Repair & Replacement",
                time: "3 hours × $85/hr",
                price: "255.00",
              },
              {
                title: "Ceiling Damage Assessment",
                time: "3 hours × $85/hr",
                price: "42.50",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    Technician: Mike Wilson • Date: 2025-01-20
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                </div>
                <p className="text-sm font-bold text-slate-800">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Materials & Parts */}
      <Card className="border-none shadow-sm">
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-700">
            Materials & Parts
          </h3>
          <span className="text-blue-600 font-bold">$88.50</span>
        </div>
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="text-[10px] uppercase">Item Code</TableHead>
              <TableHead className="text-[10px] uppercase">
                Description
              </TableHead>
              <TableHead className="text-[10px] uppercase">Qty</TableHead>
              <TableHead className="text-[10px] uppercase">
                Unit Price
              </TableHead>
              <TableHead className="text-[10px] uppercase text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                code: "PC-3/4-BR",
                desc: '3/4" Brass Pipe Connector',
                qty: "2 pcs",
                unit: "18.50",
                total: "37.00",
              },
              {
                code: "TP-SEAL-HD",
                desc: "Heavy Duty Thread Seal Tape",
                qty: "1 roll",
                unit: "8.75",
                total: "8.75",
              },
              {
                code: "CP-1/2-90",
                desc: '1/2" Copper Pipe (90cm)',
                qty: "1 pc",
                unit: "24.00",
                total: "24.00",
              },
              {
                code: "EP-FLEX",
                desc: "Flexible Epoxy Sealant",
                qty: "1 tube",
                unit: "12.50",
                total: "12.50",
              },
              {
                code: "CL-MULTI",
                desc: "Multi-purpose Cleaning Solution",
                qty: "1 bottle",
                unit: "6.25",
                total: "6.25",
              },
            ].map((item, i) => (
              <TableRow key={i} className="text-xs">
                <TableCell>
                  <input type="checkbox" className="rounded border-slate-300" />
                </TableCell>
                <TableCell className="text-slate-500">{item.code}</TableCell>
                <TableCell className="font-medium">{item.desc}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>${item.unit}</TableCell>
                <TableCell className="text-right">${item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Financial Summary & Total Section */}
      <div className="space-y-6">
        <Card className="border-none shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-700">
              Financial Summary
            </h3>
            <span className="text-blue-600 font-bold">$110.00</span>
          </div>
          <CardContent className="space-y-3 p-4">
            <div className="flex justify-between text-sm">
              <div className="flex gap-2 items-center">
                <Badge variant="outline" className="text-[10px] h-5 py-0">
                  Service Fee
                </Badge>
                <span className="text-slate-500">Emergency Call-Out Fee</span>
              </div>
              <span className="font-bold">$50.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex gap-2 items-center">
                <Badge variant="outline" className="text-[10px] h-5 py-0">
                  Surcharge
                </Badge>
                <span className="text-slate-500">
                  After-Hours Service Surcharge
                </span>
              </div>
              <span className="font-bold">$35.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex gap-2 items-center">
                <Badge
                  variant="outline"
                  className="text-[10px] h-5 py-0 text-slate-500">
                  Equipment
                </Badge>
                <span className="text-slate-500">Equipment & Tools Usage</span>
              </div>
              <span className="font-bold">$25.00</span>
            </div>
          </CardContent>
        </Card>

        {/* Totals and Discounts */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-700 mb-4">
              Additional Charges
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Labor Subtotal</span>
                <span className="font-bold text-slate-700">$425.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Materials Subtotal</span>
                <span className="font-bold text-slate-700">$88.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Additional Charges</span>
                <span className="font-bold text-slate-700">$110.00</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t font-bold">
                <span>Subtotal</span>
                <span>$562.50</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-emerald-500">
                <span>Repeat Customer Discount (5%)</span>
                <span>$-28.13</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Tax (8.875%)</span>
                <span className="font-bold text-slate-700">$47.43</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-bold text-slate-800">Total Amount</span>
                <span className="text-xl font-bold text-blue-600">$581.80</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Confirmation */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4">
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Payment Method
                </p>
                <p className="text-sm font-bold flex items-center gap-2 mt-1">
                  <CreditCard size={14} /> Credit Card
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Transaction ID
                </p>
                <p className="text-sm font-medium mt-1">TXN-20250121-4567</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Payment Date
                </p>
                <p className="text-sm font-medium mt-1">
                  Jan 21, 2025, 06:30 PM
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Amount Paid
                </p>
                <p className="text-sm font-bold mt-1 text-slate-800">$581.80</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Card Details
                </p>
                <p className="text-sm font-medium mt-1">**** **** **** 4242</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Amount Paid
                </p>
                <p className="text-sm font-bold mt-1 text-slate-800">$581.80</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terms & Bank Details */}
      <Card className="border-none shadow-sm text-xs text-slate-500">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="font-bold text-slate-700 mb-1">
                Terms, Conditions & Warranty
              </p>
              <p className="font-semibold text-slate-600">Payment Terms</p>
              <p>
                Payment due within 15 days. Late payments subject to 1.5%
                monthly interest charge.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-600">
                Warranty Information
              </p>
              <p>90-day warranty on all parts and labor</p>
            </div>
            <div>
              <p className="font-semibold text-slate-600">Notes</p>
              <p>
                Thank you for choosing QuickFix Plumbing Services. All work is
                guaranteed for 90 days from completion date. For questions about
                this invoice, please contact our billing department.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-600">
                Payment Instructions
              </p>
              <p>
                Payment can be made via credit card, bank transfer, or check.
                Please include invoice number with payment.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
            <div className="space-y-1">
              <p className="font-bold text-slate-700 uppercase">
                Bank Transfer Details
              </p>
              <p>
                <span className="font-semibold">Bank:</span> Community Bank
              </p>
              <p>
                <span className="font-semibold">Account:</span> QuickFix
                Plumbing LLC
              </p>
            </div>
            <div className="text-right space-y-1">
              <p>
                <span className="font-semibold text-slate-400">Account #:</span>{" "}
                ****5678
              </p>
              <p>
                <span className="font-semibold text-slate-400">Routing #:</span>{" "}
                021000021
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Download size={16} /> Download PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Printer size={16} /> Print Invoice
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Mail size={16} /> Email Invoice
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <FileText size={16} /> View Details
        </Button>
      </div>

      {/* Rating Section */}
      <Card className="border-none shadow-sm py-10">
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 border border-orange-100">
            <CheckCircle2 size={28} />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-700">Maintenance Completed</p>
            <p className="text-xs text-slate-400">
              Please rate the service provided
            </p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-8 h-9 text-xs">
            <Star size={14} className="fill-white" /> Rate Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceTab;
