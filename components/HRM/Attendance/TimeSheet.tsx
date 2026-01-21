import React from "react";
import {
  Search,
  Plus,
  Download,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timesheetData = [
  {
    id: 1,
    name: "Anthony Lewis",
    dept: "UI/UX Team",
    date: "14 Jan 2024",
    project: "Office Management",
    assigned: 32,
    worked: 13,
  },
  {
    id: 2,
    name: "Brian Villalobos",
    dept: "Development",
    date: "21 Jan 2024",
    project: "Project Management",
    assigned: 45,
    worked: 14,
  },
  {
    id: 3,
    name: "Connie Waters",
    dept: "Management",
    date: "15 Nov 2024",
    project: "Project Management",
    assigned: 32,
    worked: 19,
  },
  {
    id: 4,
    name: "Connie Waters",
    dept: "Management",
    date: "15 Nov 2024",
    project: "Project Management",
    assigned: 32,
    worked: 19,
  },
  {
    id: 5,
    name: "Doglas Martini",
    dept: "Development",
    date: "12 Apr 2024",
    project: "Office Management",
    assigned: 36,
    worked: 45,
  },
  {
    id: 6,
    name: "Elliot Murray",
    dept: "Developer",
    date: "06 Jul 2024",
    project: "Video Calling App",
    assigned: 57,
    worked: 16,
  },
  {
    id: 7,
    name: "Harvey Smith",
    dept: "HR",
    date: "20 Feb 2024",
    project: "Project Management",
    assigned: 45,
    worked: 22,
  },
  {
    id: 8,
    name: "Linda Ray",
    dept: "UI/UX Team",
    date: "20 Apr 2024",
    project: "Hospital Administration",
    assigned: 49,
    worked: 14,
  },
  {
    id: 9,
    name: "Rebecca Smtih",
    dept: "UI/UX Team",
    date: "02 Sep 2024",
    project: "Office Management",
    assigned: 21,
    worked: 18,
  },
  {
    id: 10,
    name: "Stephan Peralt",
    dept: "Management",
    date: "15 Mar 2024",
    project: "Hospital Administration",
    assigned: 45,
    worked: 78,
  },
];

export default function TimesheetPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Timesheets</h1>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Home className="w-3 h-3" />
            <span>/</span>
            <span>Employee</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">Timesheets</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-10 gap-2 text-slate-600 border-slate-200">
            <Download className="w-4 h-4" /> Export{" "}
            <ChevronLeft className="w-3 h-3 -rotate-90" />
          </Button>
          <Button className="h-10 bg-[#f97316] hover:bg-[#ea580c] gap-2">
            <Plus className="w-4 h-4" /> Add Today`s Work
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-200">
            <ChevronLeft className="w-4 h-4 -rotate-90 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-sm overflow-hidden p-4">
        <CardContent className="p-0">
          {/* Filters Bar */}
          <div className="p-6 flex flex-wrap justify-between items-center gap-4">
            <h3 className="font-bold text-[#1e293b] text-lg">Timesheet</h3>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-[180px] h-10 bg-white">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Management</SelectItem>
                  <SelectItem value="project">Project Management</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="last7">
                <SelectTrigger className="w-[200px] h-10 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Entries Bar */}
          <div className="px-6 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-10 h-10 w-64 bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader className="bg-slate-100/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-slate-700 py-4">
                  Employee
                </TableHead>
                <TableHead className="font-bold text-slate-700">Date</TableHead>
                <TableHead className="font-bold text-slate-700">
                  Project
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Assigned Hours
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Worked Hours
                </TableHead>
                <TableHead className="text-right pr-6 font-bold text-slate-700">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 last:border-0">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${row.id + 50}`}
                        />
                        <AvatarFallback>AL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                          {row.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{row.dept}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {row.project}
                      </span>
                      <Info className="w-3.5 h-3.5 text-blue-400 cursor-pointer" />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.assigned}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.worked}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-600">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="p-6 flex items-center justify-between border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Showing 1 - 10 of 10 entries
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400"
                disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button className="h-8 w-8 bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-sm rounded-full">
                1
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400"
                disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
