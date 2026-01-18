"use client";

import React from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
  MoreVertical,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Mock Data based on Promotion Design ---
const PROMOTION_DATA = [
  {
    id: 1,
    name: "Anthony Lewis",
    role: "Web Designer",
    from: "Web Designer",
    to: "Web Developer",
    date: "14 Jan 2024",
  },
  {
    id: 2,
    name: "Brian Villalobos",
    role: "Web Developer",
    from: "Web Developer",
    to: "Senior Web Developer",
    date: "21 Jan 2024",
  },
  {
    id: 3,
    name: "Harvey Smith",
    role: "IOS Developer",
    from: "IOS Developer",
    to: "Lead IOS Developer",
    date: "18 Feb 2024",
  },
  {
    id: 4,
    name: "Stephan Peralt",
    role: "Android Developer",
    from: "Android Developer",
    to: "Lead Android Developer",
    date: "24 Feb 2024",
  },
  {
    id: 5,
    name: "Doglas Martini",
    role: "DevOps Engineer",
    from: "DevOps Engineer",
    to: "Senior DevOps Engineer",
    date: "11 Mar 2024",
  },
];

export default function PromotionList() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Promotion</h1>
          <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
            🏠 / Performance /{" "}
            <span className="text-slate-900 font-medium">Promotion</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 font-bold px-5 h-11">
            <Plus size={18} className="border rounded-full p-0.5" /> Add
            Promotion
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 bg-white border-slate-200">
            <Settings size={18} className="text-slate-400" />
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        {/* Card Header with Filter */}
        <div className="p-5 flex justify-between items-center border-b">
          <h3 className="font-bold text-slate-800">Promotion List</h3>
          <Select defaultValue="7">
            <SelectTrigger className="w-[200px] h-10 border-slate-200 text-slate-500 font-semibold bg-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Sort By : Last 7 Days</SelectItem>
              <SelectItem value="30">Sort By : Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-6">
          {/* Search and Row Count */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-9 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-10 h-11 border-slate-100 bg-[#F9FAFB] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Promotion Table */}
          <div className="rounded-md border border-slate-100">
            <Table>
              <TableHeader className="bg-[#E9ECEF]">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-12 px-4">
                    <Checkbox className="border-slate-300" />
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700 py-4">
                    Promoted Employee
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700 py-4">
                    Department
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700 py-4">
                    Promotion Designation From
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700 py-4">
                    Promotion Designation To
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700 py-4">
                    Promotion Date
                  </TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PROMOTION_DATA.map((item) => (
                  <TableRow
                    key={item.id}
                    className="group hover:bg-slate-50/50 border-slate-100">
                    <TableCell className="px-4">
                      <Checkbox className="border-slate-300" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/api/placeholder/36/36?id=${item.id}`}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 font-semibold text-sm">
                      Designing
                    </TableCell>
                    <TableCell className="text-slate-500 font-semibold text-sm">
                      {item.from}
                    </TableCell>
                    <TableCell className="text-slate-500 font-semibold text-sm">
                      {item.to}
                    </TableCell>
                    <TableCell className="text-slate-500 font-semibold text-sm whitespace-nowrap">
                      {item.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-[13px] font-bold text-slate-400">
              Showing 1 - 5 of 5 entries
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100">
                <ChevronLeft size={18} className="text-slate-400" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-100">
                1
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100">
                <ChevronRight size={18} className="text-slate-400" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
