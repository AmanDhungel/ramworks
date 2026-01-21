import React from "react";
import {
  Search,
  Plus,
  Download,
  FileText,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Home,
  ChevronUp,
  TrendingUp,
  TrendingDown,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Present", value: "250", trend: "+1%", isPositive: true },
  { label: "Late Login", value: "45", trend: "-1%", isPositive: false },
  { label: "Uninformed", value: "15", trend: "-12%", isPositive: false },
  { label: "Permisson", value: "03", trend: "+1%", isPositive: true },
  { label: "Absent", value: "12", trend: "-19%", isPositive: false },
];

const attendanceData = [
  {
    id: 1,
    name: "Anthony Lewis",
    dept: "UI/UX Team",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:45 PM",
    break: "30 Min",
    late: "32 Min",
    production: "8.55 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Brian Villalobos",
    dept: "Development",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:12 PM",
    break: "20 Min",
    late: "20 Min",
    production: "7.54 Hrs",
    color: "bg-red-500",
  },
  {
    id: 3,
    name: "Harvey Smith",
    dept: "HR",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:13 PM",
    break: "50 Min",
    late: "23 Min",
    production: "8.45 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Stephan Peralt",
    dept: "Management",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:23 PM",
    break: "41 Min",
    late: "50 Min",
    production: "8.35 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 5,
    name: "Doglas Martini",
    dept: "Development",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:43 PM",
    break: "23 Min",
    late: "10 Min",
    production: "8.22 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 6,
    name: "Linda Ray",
    dept: "UI/UX Team",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "07:15 PM",
    break: "03 Min",
    late: "30 Min",
    production: "8.32 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 7,
    name: "Elliot Murray",
    dept: "UI/UX Team",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "07:13 PM",
    break: "32 Min",
    late: "41 Min",
    production: "9.15 Hrs",
    color: "bg-blue-500",
  },
  {
    id: 8,
    name: "Rebecca Smtih",
    dept: "UI/UX Team",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "09:17 PM",
    break: "14 Min",
    late: "12 Min",
    production: "9.25 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 9,
    name: "Connie Waters",
    dept: "Management",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "08:15 PM",
    break: "12 Min",
    late: "03 Min",
    production: "8.35 Hrs",
    color: "bg-emerald-500",
  },
  {
    id: 10,
    name: "Lori Broaddus",
    dept: "Finance",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    break: "-",
    late: "-",
    production: "0.00 Hrs",
    color: "bg-red-500",
  },
];

export default function AttendanceAdmin() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">
            Attendance Admin
          </h1>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Home className="w-3 h-3" />
            <span>/</span>
            <span>Employee</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">Attendance Admin</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md bg-white overflow-hidden h-9">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none border-r h-full w-9">
              <Clock className="w-4 h-4 text-slate-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none bg-orange-500 h-full w-9">
              <Calendar className="w-4 h-4 text-white" />
            </Button>
          </div>
          <Button variant="outline" className="h-9 gap-2 text-slate-600">
            <Download className="w-4 h-4" /> Export{" "}
            <ChevronUp className="w-3 h-3 rotate-180" />
          </Button>
          <Button className="h-9 bg-[#f97316] hover:bg-[#ea580c] gap-2">
            <FileText className="w-4 h-4" /> Report
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-bold text-[#1e293b]">
                Attendance Details Today
              </CardTitle>
              <p className="text-sm text-slate-500">
                Data from the 800+ total no of employees
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Total Absenties today
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-white h-7 w-7">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                  </Avatar>
                ))}
                <div className="h-7 w-7 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  +1
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-5 divide-x border rounded-lg overflow-hidden">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white">
                <p className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-bold text-[#1e293b]">
                    {stat.value}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] font-bold h-5 px-1.5 ${stat.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                    {stat.isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="p-6 flex flex-wrap justify-between items-center gap-4">
            <h3 className="font-bold text-[#1e293b]">Admin Attendance</h3>
            <div className="flex gap-3">
              <Select defaultValue="jan-2026">
                <SelectTrigger className="w-[200px] h-10 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">
                    01/01/2026 - 01/07/2026
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] h-10 bg-white">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] h-10 bg-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
              </Select>
              <Select defaultValue="last7">
                <SelectTrigger className="w-[160px] h-10 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-6 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8 bg-white">
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

          <Table>
            <TableHeader className="bg-slate-100/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300" />
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Employee
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Status
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Check In
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Check Out
                </TableHead>
                <TableHead className="font-bold text-slate-700">
                  Break
                </TableHead>
                <TableHead className="font-bold text-slate-700">Late</TableHead>
                <TableHead className="font-bold text-slate-700">
                  Production Hours
                </TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-100">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${row.id + 10}`}
                        />
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                          {row.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{row.dept}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      ${row.status === "Present" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}
                      font-medium px-2 py-0.5 rounded-sm text-[11px] flex items-center gap-1.5 w-fit
                    `}>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${row.status === "Present" ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.checkIn}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.checkOut}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.break}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {row.late}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${row.color} text-white font-medium text-[11px] px-2 py-0.5 rounded-sm flex items-center gap-1 w-fit`}>
                      <Clock className="w-3 h-3" /> {row.production}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-slate-600">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer Pagination */}
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
              <Button className="h-8 w-8 bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-sm">
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
