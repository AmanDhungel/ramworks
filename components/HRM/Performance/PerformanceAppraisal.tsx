"use client";

import React from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Settings,
  LayoutGrid,
  List,
  CheckCircle2,
  CirclePlus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// --- Mock Data ---
const PERFORMANCE_DATA = [
  {
    id: 1,
    designation: "Web Designer",
    dept: "Designing",
    approvedBy: "Doglas Martini",
    role: "Manager",
    date: "14 Jan 2024",
    status: "Active",
  },
  {
    id: 2,
    designation: "Web Developer",
    dept: "Developer",
    approvedBy: "Doglas Martini",
    role: "Manager",
    date: "21 Jan 2024",
    status: "Active",
  },
  {
    id: 3,
    designation: "IOS Developer",
    dept: "Developer",
    approvedBy: "Doglas Martini",
    role: "Manager",
    date: "18 Feb 2024",
    status: "Active",
  },
  {
    id: 4,
    designation: "Android Developer",
    dept: "Developer",
    approvedBy: "Doglas Martini",
    role: "Manager",
    date: "24 Feb 2024",
    status: "Active",
  },
  {
    id: 5,
    designation: "DevOps Engineer",
    dept: "DevOps",
    approvedBy: "Doglas Martini",
    role: "Manager",
    date: "11 Mar 2024",
    status: "Active",
  },
];

export default function PerformanceAppraisalDashboard() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Performance Appraisal
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            🏠 / Performance /{" "}
            <span className="text-slate-900 font-medium">
              Performance Appraisal
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 rounded-md px-5 h-10 font-bold">
            <CirclePlus className="h-4 w-4 border rounded-full p-0.5" /> Add
            Appraisal
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-200">
            <Settings className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 flex flex-wrap justify-between items-center gap-4 border-b">
          <CardTitle className="text-base font-bold text-slate-800">
            Performance Appraisal List
          </CardTitle>
          <div className="flex items-center gap-3">
            <Select defaultValue="7">
              <SelectTrigger className="w-[180px] h-10 border-slate-200 text-slate-600 font-medium">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Sort By : Last 7 Days</SelectItem>
                <SelectItem value="30">Sort By : Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 bg-white">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-10 h-10 border-slate-100 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-md border border-slate-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#E9ECEF] text-slate-700 font-bold">
                <tr>
                  <th className="px-4 py-3 w-12">
                    <Checkbox className="border-slate-300" />
                  </th>
                  <th className="px-4 py-3 uppercase tracking-wider text-[11px]">
                    Name
                  </th>
                  <th className="px-4 py-3 uppercase tracking-wider text-[11px]">
                    Designation
                  </th>
                  <th className="px-4 py-3 uppercase tracking-wider text-[11px]">
                    Department
                  </th>
                  <th className="px-4 py-3 uppercase tracking-wider text-[11px]">
                    Appriasal Date
                  </th>
                  <th className="px-4 py-3 uppercase tracking-wider text-[11px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERFORMANCE_DATA.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 py-4">
                      <Checkbox className="border-slate-300" />
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback>DM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-slate-800 leading-none">
                            {item.approvedBy}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800">
                      {item.designation}
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-medium">
                      {item.dept}
                    </td>

                    <td className="px-4 py-4 text-slate-500 font-medium">
                      {item.date}
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant="secondary"
                        className="bg-[#10B981] hover:bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded gap-1 border-none">
                        <span className="h-1 w-1 rounded-full bg-white" />{" "}
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap justify-between items-center text-[13px] font-bold text-slate-400 px-2">
            <p>Showing 1 - 5 of 5 entries</p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full">
                <ChevronLeft size={16} />
              </Button>
              <div className="h-8 w-8 flex items-center justify-center bg-[#FF6B35] text-white rounded-full shadow-md shadow-orange-100">
                1
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
