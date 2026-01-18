"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Download,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar as CalendarIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Mock Data ---
const STAT_CARDS = [
  { label: "Total Present", value: "180/200", color: "bg-emerald-500" },
  { label: "Planned Leaves", value: "10", color: "bg-pink-500" },
  { label: "Unplanned Leaves", value: "10", color: "bg-amber-400" },
  { label: "Pending Requests", value: "15", color: "bg-cyan-400" },
];

const LEAVE_DATA = [
  {
    id: 1,
    name: "Anthony Lewis",
    role: "Finance",
    type: "Medical Leave",
    from: "14/01/2024",
    to: "15/01/2024",
    days: "2 Days",
  },
  {
    id: 2,
    name: "Brian Villalobos",
    role: "Developer",
    type: "Casual Leave",
    from: "21/01/2024",
    to: "25/01/2024",
    days: "5 Days",
  },
  {
    id: 3,
    name: "Harvey Smith",
    role: "Developer",
    type: "Medical Leave",
    from: "20/02/2024",
    to: "22/02/2024",
    days: "3 Days",
  },
  {
    id: 4,
    name: "Stephan Peralt",
    role: "Executive Officer",
    type: "Annual Leave",
    from: "15/03/2024",
    to: "17/03/2024",
    days: "3 Days",
  },
  {
    id: 5,
    name: "Doglas Martini",
    role: "Manager",
    type: "Casual Leave",
    from: "12/04/2024",
    to: "16/04/2024",
    days: "5 Days",
  },
  {
    id: 6,
    name: "Linda Ray",
    role: "Finance",
    type: "Medical Leave",
    from: "20/05/2024",
    to: "21/05/2024",
    days: "2 Days",
  },
];

export default function LeavesDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const updatePage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leaves</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            🏠 / Employee /{" "}
            <span className="text-slate-900 font-medium">Leaves</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white gap-2 shadow-sm border-slate-200">
            <Download size={16} /> Export <span>▼</span>
          </Button>
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2">
            <Plus size={16} className="border rounded-full p-0.5" /> Add New
            Leave
          </Button>
        </div>
      </div>

      {/* Analytics Section (Upper Section) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STAT_CARDS.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0 flex h-24">
              <div
                className={`w-20 flex items-center justify-center ${stat.color}`}>
                <div className="bg-white/20 p-2 rounded-full border border-white/30">
                  <UserIcon className="text-white h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center px-6 bg-white relative">
                {/* Decorative background curve effect matching design */}
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                  {stat.label}
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                  {stat.value}
                </h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section (Lower Section) */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-white space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Leave List</h2>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-10 text-slate-500 gap-2 border-slate-200">
                <CalendarIcon size={16} /> dd/mm/yyyy - dd/mm/yyyy
              </Button>
              <Select>
                <SelectTrigger className="w-[140px] h-10 border-slate-200">
                  <SelectValue placeholder="Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="7">
                <SelectTrigger className="w-[180px] h-10 border-slate-200">
                  <SelectValue placeholder="Sort By : Last 7 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px] h-9 bg-white">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-10 h-10 border-slate-200 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px] pl-6">
                <Checkbox className="border-slate-300" />
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Employee
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Leave Type
              </TableHead>
              <TableHead className="font-bold text-slate-700">From ▼</TableHead>
              <TableHead className="font-bold text-slate-700">To ▼</TableHead>
              <TableHead className="font-bold text-slate-700">
                No of Days
              </TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {LEAVE_DATA.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50/50">
                <TableCell className="pl-6">
                  <Checkbox className="border-slate-300" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>EH</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    {item.type}{" "}
                    <Info size={14} className="text-blue-500 cursor-pointer" />
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {item.from}
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {item.to}
                </TableCell>
                <TableCell className="text-slate-500 text-sm font-medium">
                  {item.days}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 justify-end pr-4 text-slate-400">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-blue-600">
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer Pagination */}
        <div className="p-4 flex items-center justify-between bg-white text-sm text-slate-500 border-t">
          <div>Showing 1 to 10 of 16 entries</div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-300">
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0 border-slate-200">
              1
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0 border-slate-200">
              2
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0 border-slate-200">
              3
            </Button>
            <Button
              variant="default"
              className="h-8 w-8 p-0 bg-[#FF6B35] hover:bg-[#E85A20]">
              4
            </Button>
            <span className="px-1 text-slate-300">...</span>
            <Button variant="outline" className="h-8 w-8 p-0 border-slate-200">
              15
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400">
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
