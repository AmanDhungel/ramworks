"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// --- Mock Data ---
const DEPARTMENTS = [
  { id: 1, name: "Finance", employees: 20, status: "Active" },
  { id: 2, name: "Application Development", employees: 30, status: "Active" },
  { id: 3, name: "IT Management", employees: 15, status: "Active" },
  { id: 4, name: "Web Development", employees: 20, status: "Active" },
  { id: 5, name: "Sales", employees: 20, status: "Active" },
  { id: 6, name: "UI / UX", employees: 30, status: "Active" },
  { id: 7, name: "Account Management", employees: 15, status: "Active" },
  { id: 8, name: "Marketing", employees: 10, status: "Inactive" },
  { id: 9, name: "Administration", employees: 5, status: "Active" },
  { id: 10, name: "Business Development", employees: 7, status: "Active" },
  { id: 11, name: "Human Resources", employees: 4, status: "Active" },
];

export default function DesignationTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current state from URL
  const page = Number(searchParams.get("page")) || 1;
  const statusFilter = searchParams.get("status") || "all";
  const searchQuery = searchParams.get("search") || "";

  // Helper to update URL params
  const updateParams = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`?${params.toString()}`);
  };

  // Filter Logic
  const filteredData = DEPARTMENTS.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status.toLowerCase() === statusFilter;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div className="w-full p-6 space-y-4 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Designations</h1>
          <p className="text-sm text-slate-500">
            🏠 / Employee / <span className="text-slate-900">Designations</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export{" "}
            <span className="text-xs">▼</span>
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
            <Plus className="h-4 w-4" /> Add New Designation
          </Button>
        </div>
      </div>

      <div className="border rounded-lg shadow-sm bg-white">
        {/* Filter Bar */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-slate-800">Department List</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={statusFilter}
              onValueChange={(val) => updateParams({ status: val, page: 1 })}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="7days">
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Sort By : Last 7 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Sort By : Last 7 Days</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-9 h-9 w-[200px]"
                value={searchQuery}
                onChange={(e) =>
                  updateParams({ search: e.target.value, page: 1 })
                }
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Department
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                No of Employees
              </TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50/50">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-bold text-slate-800">
                  {item.name}
                </TableCell>
                <TableCell className="text-slate-500">
                  {String(item.employees).padStart(2, "0")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.status === "Active"
                        ? "bg-emerald-500 hover:bg-emerald-500 rounded-md px-3 font-normal"
                        : "bg-red-600 hover:bg-red-600 rounded-md px-3 font-normal"
                    }>
                    ● {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Section */}
        <div className="p-4 flex items-center justify-between border-t text-sm text-slate-500">
          <div>
            Showing {(page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateParams({ page: Math.max(1, page - 1) })}
              disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                className={`h-8 w-8 ${page === i + 1 ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                onClick={() => updateParams({ page: i + 1 })}>
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                updateParams({ page: Math.min(totalPages, page + 1) })
              }
              disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
