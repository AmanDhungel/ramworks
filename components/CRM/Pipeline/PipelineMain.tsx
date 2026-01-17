import React from "react";
import {
  FileText,
  Search,
  PlusCircle,
  Download,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// --- Types ---
interface PipelineData {
  name: string;
  value: string;
  deals: number;
  stage: string;
  stageColor: string;
  createdDate: string;
  status: "Active" | "Inactive";
}

// --- Mock Data ---
const pipelineData: PipelineData[] = [
  {
    name: "Sales",
    value: "$4,50,000",
    deals: 315,
    stage: "Won",
    stageColor: "bg-green-500",
    createdDate: "14/01/2024",
    status: "Active",
  },
  {
    name: "Marketing",
    value: "$3,15,000",
    deals: 447,
    stage: "In Pipeline",
    stageColor: "bg-purple-500",
    createdDate: "21/01/2024",
    status: "Active",
  },
  {
    name: "Calls",
    value: "$8,40,000",
    deals: 654,
    stage: "Won",
    stageColor: "bg-green-500",
    createdDate: "20/02/2024",
    status: "Active",
  },
  {
    name: "Email",
    value: "$6,10,000",
    deals: 545,
    stage: "Conversation",
    stageColor: "bg-blue-500",
    createdDate: "15/03/2024",
    status: "Active",
  },
  {
    name: "Chats",
    value: "$4,70,000",
    deals: 787,
    stage: "Won",
    stageColor: "bg-green-500",
    createdDate: "12/04/2024",
    status: "Active",
  },
  {
    name: "Operational",
    value: "$5,50,000",
    deals: 142,
    stage: "Follow Up",
    stageColor: "bg-yellow-500",
    createdDate: "20/05/2024",
    status: "Active",
  },
  {
    name: "Collabrative",
    value: "$5,00,000",
    deals: 315,
    stage: "Won",
    stageColor: "bg-green-500",
    createdDate: "06/07/2024",
    status: "Active",
  },
  {
    name: "Differentiate",
    value: "$4,50,000",
    deals: 478,
    stage: "Schedule servise",
    stageColor: "bg-pink-500",
    createdDate: "02/09/2024",
    status: "Inactive",
  },
  {
    name: "Interact",
    value: "$6,20,000",
    deals: 664,
    stage: "Won",
    stageColor: "bg-green-500",
    createdDate: "15/11/2024",
    status: "Active",
  },
  {
    name: "Identify",
    value: "$7,40,000",
    deals: 128,
    stage: "Won",
    stageColor: "bg-red-500",
    createdDate: "10/12/2024",
    status: "Active",
  },
];

const PipelinePage = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* --- Breadcrumbs & Header --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
          <div className="flex items-center text-xs text-slate-500 mt-1 gap-1">
            <Home size={12} /> / CRM /{" "}
            <span className="text-slate-900">Pipeline List</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white border-slate-200 text-slate-700">
            <Download className="mr-2 h-4 w-4" /> Export{" "}
            <ChevronLeft className="ml-2 h-3 w-3 rotate-270" />
          </Button>
          <Button className="bg-[#FF6D33] hover:bg-[#e65a22] text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Pipeline
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-100 p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold">Pipeline List</CardTitle>
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Picker Mock */}
              <div className="flex items-center border rounded-md px-3 py-1.5 bg-white text-sm text-slate-400">
                dd/mm/yyyy - dd/mm/yyyy
              </div>

              <FilterSelect placeholder="Pipelines" />
              <FilterSelect placeholder="Stage" />
              <FilterSelect placeholder="Status" />

              <Select defaultValue="last7">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center text-sm text-slate-500 gap-2">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search" className="pl-9 h-9" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#F8F9FC]">
              <TableRow>
                <TableHead className="w-12">
                  <Input type="checkbox" className="w-4 h-4" />
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Pipeline Name
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Total Deal Value
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  No of Deals
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Stages
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Created Date ▾
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Status
                </TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelineData.map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-slate-50 border-slate-100">
                  <TableCell>
                    <Input type="checkbox" className="w-4 h-4" />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-600">{row.value}</TableCell>
                  <TableCell className="text-slate-600">{row.deals}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-1.5 w-12 rounded-full ${row.stageColor}`}
                      />
                      <span className="text-sm text-slate-500">
                        {row.stage}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {row.createdDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${row.status === "Active" ? "bg-[#22C55E]" : "bg-[#EF4444]"} hover:none border-none text-white px-3 py-0.5 rounded-md`}>
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white inline-block" />
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Edit2
                        size={16}
                        className="cursor-pointer hover:text-slate-600"
                      />
                      <Trash2
                        size={16}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* --- Pagination --- */}
          <div className="p-4 flex items-center justify-between border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Showing 1 to 10 of 16 entries
            </p>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="border-none hover:bg-transparent"
                  />
                </PaginationItem>
                {[1, 2, 3, 4].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === 4}
                      className={
                        page === 4
                          ? "bg-[#FF6D33] text-white hover:bg-[#FF6D33]"
                          : "text-slate-600"
                      }>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">15</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="border-none hover:bg-transparent"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FilterSelect = ({ placeholder }: { placeholder: string }) => (
  <Select>
    <SelectTrigger className="w-[120px] bg-white">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
    </SelectContent>
  </Select>
);

export default PipelinePage;
