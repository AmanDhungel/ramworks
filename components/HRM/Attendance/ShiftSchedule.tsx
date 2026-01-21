import React from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronUp,
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

const scheduleData = [
  {
    id: 1,
    name: "Anthony Lewis",
    jobTitle: "Accountant",
    image: "https://i.pravatar.cc/150?u=1",
    timings: [
      "11-03-2020 - 11:00 AM-12:00 PM",
      "12-03-2020 - 10:00 AM-11:00 AM",
      "01-01-1970 - 10:00 AM-11:00 AM",
    ],
  },
  {
    id: 2,
    name: "Brian Villalobos",
    jobTitle: "Accountant",
    image: "https://i.pravatar.cc/150?u=2",
    timings: [
      "11-03-2020 - 11:00 AM-12:00 PM",
      "12-03-2020 - 10:00 AM-11:00 AM",
      "01-01-1970 - 10:00 AM-11:00 AM",
    ],
  },
  {
    id: 3,
    name: "Harvey Smith",
    jobTitle: "Accountant",
    image: "https://i.pravatar.cc/150?u=3",
    timings: [
      "11-03-2020 - 11:00 AM-12:00 PM",
      "12-03-2020 - 10:00 AM-11:00 AM",
      "01-01-1970 - 10:00 AM-11:00 AM",
    ],
  },
];

export default function ScheduleTiming() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Schedule Timing</h1>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Home className="w-3 h-3" />
            <span>/</span>
            <span>Administration</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">Schedule Timing</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-10 gap-2 text-slate-600 border-slate-200">
            <Download className="w-4 h-4" /> Export{" "}
            <ChevronUp className="w-3 h-3 rotate-180" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-200">
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Top Filters Bar */}
          <div className="p-6 flex flex-wrap justify-between items-center gap-4">
            <h3 className="font-bold text-[#1e293b] text-lg">
              Schedule Timing List
            </h3>
            <div className="flex gap-3">
              <Select defaultValue="jan-2026">
                <SelectTrigger className="w-[200px] h-10 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">
                    01/01/2026 - 01/07/2026
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="last7">
                <SelectTrigger className="w-[180px] h-10 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Row Limit Bar */}
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
                <TableHead className="w-12 text-center py-4">
                  <input type="checkbox" className="rounded border-slate-300" />
                </TableHead>
                <TableHead className="font-bold text-slate-700">Name</TableHead>
                <TableHead className="font-bold text-slate-700">
                  Job Title
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  User Available Timings
                </TableHead>
                <TableHead className="text-right pr-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                    />
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={row.image} />
                        <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold text-slate-900">
                        {row.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-500 font-medium">
                      {row.jobTitle}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 py-4">
                      {row.timings.map((time, index) => (
                        <p key={index} className="text-sm text-slate-500">
                          {time}
                        </p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button className="bg-[#1e293b] hover:bg-slate-800 text-white font-bold py-2 px-6 rounded-md text-sm transition-colors">
                      Schedule Timing
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="p-6 flex items-center justify-between border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Showing 1 - 3 of 3 entries
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
