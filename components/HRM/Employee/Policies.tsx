"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Download,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import PoliciesFormDialog from "./AddPoliciesDailog";
import { useDeletePolicy, useGetPolicy } from "@/services/policies.service";
import { DeleteConfirmDialog } from "@/components/ui/DynamicDeleteButton";
import { useQueryClient } from "@tanstack/react-query";

// Mock Data based on the provided image
const POLICIES_DATA = [
  {
    id: 1,
    name: "Employee",
    department: "All Department",
    description: "Guidelines regarding employee absences from work",
    createdDate: "14 Jan 2024",
  },
  {
    id: 2,
    name: "Permission Policy",
    department: "Marketing",
    description: "Guidelines for accessing and using company resources",
    createdDate: "21 Jan 2024",
  },
  {
    id: 3,
    name: "Privacy Policy",
    department: "All Department",
    description: "Ensure compliance with data protection",
    createdDate: "18 Feb 2024",
  },
];

export default function PoliciesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: policy } = useGetPolicy();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const deptFilter = searchParams.get("dept") || "all";

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
  const filteredData = policy?.data.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || item.name === deptFilter;
    return matchesSearch && matchesDept;
  });

  const { mutate, isPending } = useDeletePolicy();

  const handleDelete = (id: string) => {
    mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["policy"] });
        },
        onError: (error) => {
          console.error("Error deleting policy:", error);
        },
      },
    );
  };

  return (
    <div className="w-full p-6 space-y-4 bg-[#f8f9fa] min-h-screen font-sans">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Policies</h1>
          <nav className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <span>🏠</span> / <span>HR</span> /{" "}
            <span className="text-[#1e293b] font-medium">Policies</span>
          </nav>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white border-slate-200 text-slate-700 gap-2">
            <Download className="h-4 w-4" /> Export{" "}
            <span className="text-[10px]">▼</span>
          </Button>
          <PoliciesFormDialog />
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        {/* Toolbar Area */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#1e293b]">
              Policies List
            </h2>
            <div className="flex items-center gap-3">
              {/* Date Range Picker Placeholder */}
              <Select defaultValue="range">
                <SelectTrigger className="w-[200px] h-10 bg-white border-slate-200">
                  <SelectValue placeholder="01/01/2026 - 01/07/2026" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="range">01/01/2026 - 01/07/2026</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={deptFilter}
                onValueChange={(v) => updateParams({ dept: v, page: 1 })}>
                <SelectTrigger className="w-[140px] h-10 bg-white border-slate-200">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Department</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="last7">
                <SelectTrigger className="w-[180px] h-10 bg-white border-slate-200">
                  <SelectValue placeholder="Sort By : Last 7 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px] h-9 bg-white">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>

            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-10 h-10 border-slate-200"
                value={searchQuery}
                onChange={(e) =>
                  updateParams({ search: e.target.value, page: 1 })
                }
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <Table className="border-t border-slate-100">
          <TableHeader className="bg-[#f1f5f9]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px] pl-6">
                <Checkbox />
              </TableHead>
              <TableHead className="font-bold text-[#475569] uppercase text-xs tracking-wider">
                Name
              </TableHead>
              <TableHead className="font-bold text-[#475569] uppercase text-xs tracking-wider">
                Department
              </TableHead>
              <TableHead className="font-bold text-[#475569] uppercase text-xs tracking-wider">
                Appraisal Date
              </TableHead>
              <TableHead className="font-bold text-[#475569] uppercase text-xs tracking-wider">
                Created Date
              </TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((item) => (
              <TableRow
                key={item._id}
                className="border-b border-slate-100 hover:bg-slate-50/50">
                <TableCell className="pl-6">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-bold text-[#1e293b] py-4">
                  {item.name}
                </TableCell>
                <TableCell className="text-slate-500">
                  {item.department.name}
                </TableCell>
                <TableCell className="text-slate-500">
                  {item.appraisal_date?.split("T")[0]}
                </TableCell>
                <TableCell className="text-slate-500">
                  {item.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 justify-end pr-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmDialog
                      onConfirm={() => handleDelete(item._id ?? "")}
                      text={item.name}
                      isPending={isPending}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between bg-white text-sm text-slate-500">
          <div>
            Showing 1 - {filteredData?.length} of {filteredData?.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-200 text-slate-400">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className="h-8 w-8 bg-[#ff6b35] hover:bg-[#e85a20] rounded-full text-white p-0">
              1
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-200 text-slate-400">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
