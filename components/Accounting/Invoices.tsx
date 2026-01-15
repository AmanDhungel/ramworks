"use client";
import React from "react";
import {
  FileText,
  Download,
  PlusCircle,
  Search,
  ChevronDown,
  Edit2,
  Trash2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetInvoices } from "@/services/invoices.service";
import Link from "next/link";

// --- Mock Data ---
const INVOICES = [
  {
    id: "Inv-001",
    client: "Michael Walker",
    role: "CEO",
    company: "BrightWave Innovations",
    created: "14/01/2024",
    due: "15/01/2024",
    amount: "$3000",
    status: "Paid",
    img: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "Inv-002",
    client: "Sophie Headrick",
    role: "Manager",
    company: "Stellar Dynamics",
    created: "21/01/2024",
    due: "25/01/2024",
    amount: "$2500",
    status: "Sent",
    img: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "Inv-003",
    client: "Cameron Drake",
    role: "Director",
    company: "Quantum Nexus",
    created: "20/02/2024",
    due: "22/02/2024",
    amount: "$2800",
    status: "Partially Paid",
    img: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "Inv-004",
    client: "Doris Crowley",
    role: "Consultant",
    company: "EcoVision Enterprises",
    created: "15/03/2024",
    due: "17/03/2024",
    amount: "$3300",
    status: "Sent",
    img: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "Inv-005",
    client: "Thomas Bordelon",
    role: "Manager",
    company: "Aurora Technologies",
    created: "12/04/2024",
    due: "16/04/2024",
    amount: "$3600",
    status: "Paid",
    img: "https://i.pravatar.cc/150?u=5",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-emerald-50 text-emerald-500 hover:bg-emerald-50 border-none font-bold text-[10px] px-2 py-0.5">
          Paid
        </Badge>
      );
    case "Sent":
      return (
        <Badge className="bg-purple-50 text-purple-500 hover:bg-purple-50 border-none font-bold text-[10px] px-2 py-0.5">
          Sent
        </Badge>
      );
    case "Partially Paid":
      return (
        <Badge className="bg-orange-50 text-orange-500 hover:bg-orange-50 border-none font-bold text-[10px] px-2 py-0.5">
          Partially Paid
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function InvoicesListPage() {
  const { data: invoices } = useGetInvoices();

  return (
    <div className="min-h-screen  p-4 md:p-6 font-sans text-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Invoices</h1>
          <nav className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            / <span>FINANCE & ACCOUNTS</span> /{" "}
            <span className="text-slate-600 font-medium">Invoices</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-white border-slate-200 h-9 gap-2 text-xs font-bold text-slate-600 shadow-sm">
            <Download size={14} /> Export <ChevronDown size={14} />
          </Button>
          <Link href={"/finance/create-new-invoice"}>
            <Button className="bg-[#FF6B35] hover:bg-orange-600 text-white font-bold h-9 gap-2 shadow-sm rounded-lg">
              <PlusCircle size={16} /> Add New Invoice
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-bold text-slate-800 text-sm">Invoice List</h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Button
                  variant="outline"
                  className="h-9 text-[11px] border-slate-200 gap-2 font-medium text-slate-500">
                  <Calendar size={14} className="text-slate-400" /> dd/mm/yyyy -
                  dd/mm/yyyy
                </Button>
              </div>
              <Select>
                <SelectTrigger className="w-[140px] h-9 text-[11px] border-slate-200 text-slate-500 font-medium">
                  <SelectValue placeholder="$0.00 - $0.00" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">$0 - $1000</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] h-9 text-[11px] border-slate-200 text-slate-500 font-medium">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="7days">
                <SelectTrigger className="w-[160px] h-9 text-[11px] border-slate-200">
                  <div className="flex items-center gap-1 font-medium">
                    <span className="text-slate-400">Sort By :</span>
                    <span className="text-slate-600">Last 7 Days</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8 text-[11px] border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
            <div className="relative w-64">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <Input
                placeholder="Search"
                className="h-9 pl-9 text-[11px] border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* The Table */}
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-12 px-4">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 accent-orange-500"
                />
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight py-4">
                Invoice ID{" "}
                <ChevronDown size={12} className="inline ml-1 text-slate-400" />
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                Client Name
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                Company Name
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                Created Date{" "}
                <ChevronDown size={12} className="inline ml-1 text-slate-400" />
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                Due Date{" "}
                <ChevronDown size={12} className="inline ml-1 text-slate-400" />
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                Amount
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                Status
              </TableHead>
              <TableHead className="text-right px-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.data.map((invoice) => (
              <TableRow
                key={invoice._id}
                className="border-slate-100 hover:bg-slate-50/30 transition-colors">
                <TableCell className="px-4">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 accent-orange-500"
                  />
                </TableCell>
                <TableCell className="text-[11px] font-bold text-sky-500 cursor-pointer">
                  {invoice.invoice_number}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={"https://github.com/shadc12312n.png"} />
                      <AvatarFallback>
                        {invoice.note.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-tight">
                        {invoice.contact.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                        {invoice.contact.job_title}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[11px] font-medium text-slate-500">
                  {invoice.note}
                </TableCell>
                <TableCell className="text-[11px] font-medium text-slate-500">
                  {invoice.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-[11px] font-medium text-slate-500">
                  {invoice.due_date ?? "No Due Date"}
                </TableCell>
                <TableCell className="text-[11px] font-bold text-slate-800">
                  {invoice.amount}
                </TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="text-right px-4">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <Edit2
                      size={14}
                      className="cursor-pointer hover:text-slate-600"
                    />
                    <Trash2
                      size={14}
                      className="cursor-pointer hover:text-slate-600"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <div className="p-4 flex items-center justify-between border-t">
          <p className="text-[11px] text-slate-400 font-medium">
            Showing 1 to 10 of 16 entries
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400">
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 text-[11px] font-bold border-slate-200">
              1
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 text-[11px] font-medium text-slate-400">
              2
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 text-[11px] font-medium text-slate-400">
              3
            </Button>
            <Button className="h-8 w-8 text-[11px] font-bold bg-[#FF6B35] hover:bg-orange-600 text-white">
              4
            </Button>
            <span className="text-slate-300 mx-1">...</span>
            <Button
              variant="ghost"
              className="h-8 w-8 text-[11px] font-medium text-slate-400">
              15
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
