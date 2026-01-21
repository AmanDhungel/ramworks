"use client";
import React, { useState, useMemo } from "react";
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
  Clock,
  User,
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
import { Badge } from "@/components/ui/badge";

// Mock Data based on design
const initialData = [
  {
    id: 1,
    name: "Anthony Lewis",
    dept: "UI/UX Team",
    date: "14 Jan 2024",
    hours: 32,
    project: "Office Management",
    approvedBy: "Michael Walker",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=1",
    approverAvatar: "https://i.pravatar.cc/150?u=11",
  },
  {
    id: 2,
    name: "Brian Villalobos",
    dept: "Development",
    date: "21 Jan 2024",
    hours: 45,
    project: "Project Management",
    approvedBy: "Sophie Headrick",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=2",
    approverAvatar: "https://i.pravatar.cc/150?u=12",
  },
  {
    id: 3,
    name: "Connie Waters",
    dept: "Management",
    date: "15 Nov 2024",
    hours: 32,
    project: "Project Management",
    approvedBy: "Stephen Dias",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=3",
    approverAvatar: "https://i.pravatar.cc/150?u=13",
  },
  {
    id: 4,
    name: "Connie Waters",
    dept: "Management",
    date: "15 Nov 2024",
    hours: 66,
    project: "Ware house developement",
    approvedBy: "Angela Thomas",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=3",
    approverAvatar: "https://i.pravatar.cc/150?u=14",
  },
  {
    id: 5,
    name: "Doglas Martini",
    dept: "Development",
    date: "12 Apr 2024",
    hours: 36,
    project: "Office Management",
    approvedBy: "Thomas Bordelon",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=5",
    approverAvatar: "https://i.pravatar.cc/150?u=15",
  },
  {
    id: 6,
    name: "Elliot Murray",
    dept: "Developer",
    date: "06 Jul 2024",
    hours: 57,
    project: "Video Calling App",
    approvedBy: "Bruce Wright",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=6",
    approverAvatar: "https://i.pravatar.cc/150?u=16",
  },
  {
    id: 7,
    name: "Harvey Smith",
    dept: "HR",
    date: "20 Feb 2024",
    hours: 31,
    project: "Project Management",
    approvedBy: "Cameron Drake",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=7",
    approverAvatar: "https://i.pravatar.cc/150?u=17",
  },
  {
    id: 8,
    name: "Linda Ray",
    dept: "UI/UX Team",
    date: "20 Apr 2024",
    hours: 49,
    project: "Hospital Administration",
    approvedBy: "Kathleen Gutierrez",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=8",
    approverAvatar: "https://i.pravatar.cc/150?u=18",
  },
  {
    id: 9,
    name: "Rebecca Smtih",
    dept: "UI/UX Team",
    date: "02 Sep 2024",
    hours: 21,
    project: "Office Management",
    approvedBy: "Estelle Morgan",
    status: "Rejected",
    avatar: "https://i.pravatar.cc/150?u=9",
    approverAvatar: "https://i.pravatar.cc/150?u=19",
  },
  {
    id: 10,
    name: "Stephan Peralt",
    dept: "Management",
    date: "15 Mar 2024",
    hours: 45,
    project: "Hospital Administration",
    approvedBy: "Doris Crowley",
    status: "Rejected",
    avatar: "https://i.pravatar.cc/150?u=10",
    approverAvatar: "https://i.pravatar.cc/150?u=20",
  },
];

export default function OvertimePage() {
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Derived unique lists for filters
  const employees = Array.from(new Set(initialData.map((d) => d.name)));
  const projects = Array.from(new Set(initialData.map((d) => d.project)));

  // Filter Logic
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchEmployee =
        employeeFilter === "all" || item.name === employeeFilter;
      const matchProject =
        projectFilter === "all" || item.project === projectFilter;
      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.project.toLowerCase().includes(searchTerm.toLowerCase());

      return matchEmployee && matchProject && matchStatus && matchSearch;
    });
  }, [employeeFilter, projectFilter, statusFilter, searchTerm]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Overtime</h1>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Home className="w-3 h-3" />
            <span>/</span>
            <span>Employee</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">Overtime</span>
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
            <Plus className="w-4 h-4" /> Add Overtime
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-200">
            <ChevronLeft className="w-4 h-4 -rotate-90 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Overtime Employee",
            val: "12",
            icon: <User className="text-orange-500" />,
            bg: "bg-orange-50",
          },
          {
            label: "Overtime Hours",
            val: "118",
            icon: <Clock className="text-pink-500" />,
            bg: "bg-pink-50",
          },
          {
            label: "Pending Request",
            val: "23",
            icon: <User className="text-purple-500" />,
            bg: "bg-purple-50",
          },
          {
            label: "Rejected",
            val: "5",
            icon: <User className="text-cyan-500" />,
            bg: "bg-cyan-50",
          },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-[#1e293b]">{stat.val}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Filters Bar */}
          <div className="p-6 flex flex-wrap justify-end items-center gap-3">
            <h3 className="mr-auto font-bold text-[#1e293b] text-lg">
              Overtime
            </h3>

            <Select onValueChange={setEmployeeFilter} defaultValue="all">
              <SelectTrigger className="w-[140px] h-10 bg-white">
                <SelectValue placeholder="Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setProjectFilter} defaultValue="all">
              <SelectTrigger className="w-[140px] h-10 bg-white">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="w-[140px] h-10 bg-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="last7">
              <SelectTrigger className="w-[180px] h-10 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader className="bg-slate-100/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-slate-700 py-4">
                  Employee
                </TableHead>
                <TableHead className="font-bold text-slate-700">Date</TableHead>
                <TableHead className="font-bold text-slate-700">
                  Overtime Hours
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Project
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Approved By
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Status
                </TableHead>
                <TableHead className="text-right pr-6 font-bold text-slate-700">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 last:border-0">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={row.avatar} />
                        <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
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
                  <TableCell className="text-sm text-slate-600">
                    {row.hours}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {row.project}
                      </span>
                      <Info className="w-3.5 h-3.5 text-blue-400 cursor-pointer" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={row.approverAvatar} />
                      </Avatar>
                      <span className="text-sm text-slate-700 font-medium">
                        {row.approvedBy}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      ${row.status === "Accepted" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}
                      font-bold px-3 py-1 rounded-sm text-[10px] flex items-center gap-1.5 w-fit
                    `}>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${row.status === "Accepted" ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      {row.status}
                    </Badge>
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
              Showing 1 - {filteredData.length} of {initialData.length} entries
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
