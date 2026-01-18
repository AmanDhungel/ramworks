"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  ChevronDown,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const ATTENDANCE_DATA = [
  {
    date: "14/01/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "06:45 PM",
    break: "30 Min",
    late: "32 Min",
    overtime: "20 Min",
    production: "8.55 Hrs",
  },
  {
    date: "21/01/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "06:12 PM",
    break: "20 Min",
    late: "-",
    overtime: "45 Min",
    production: "7.54 Hrs",
    prodColor: "bg-red-500",
  },
  {
    date: "20/02/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "06:13 PM",
    break: "50 Min",
    late: "-",
    overtime: "33 Min",
    production: "8.45 Hrs",
  },
  {
    date: "15/03/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "06:23 PM",
    break: "41 Min",
    late: "-",
    overtime: "50 Min",
    production: "8.35 Hrs",
  },
  {
    date: "12/04/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "06:43 PM",
    break: "23 Min",
    late: "-",
    overtime: "10 Min",
    production: "8.22 Hrs",
  },
  {
    date: "20/05/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "07:15 PM",
    break: "03 Min",
    late: "-",
    overtime: "-",
    production: "8.32 Hrs",
  },
  {
    date: "06/07/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "07:13 PM",
    break: "32 Min",
    late: "-",
    overtime: "-",
    production: "9.15 Hrs",
    prodColor: "bg-blue-500",
  },
  {
    date: "02/09/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "09:17 PM",
    break: "14 Min",
    late: "12 Min",
    overtime: "-",
    production: "9.25 Hrs",
  },
  {
    date: "15/11/2024",
    checkIn: "09:00 AM",
    status: "Present",
    checkOut: "08:15 PM",
    break: "12 Min",
    late: "-",
    overtime: "-",
    production: "8.35 Hrs",
  },
  {
    date: "10/12/2024",
    checkIn: "09:00 AM",
    status: "Absent",
    checkOut: "09:23 PM",
    break: "10 Min",
    late: "-",
    overtime: "-",
    production: "8.22 Hrs",
    statusColor: "text-red-500 bg-red-50 border-red-100",
  },
];

export default function AttendanceDashboard() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Employee Attendance
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            🏠 / Employee /{" "}
            <span className="text-slate-900 font-medium">Leaves</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white gap-2 shadow-sm border-slate-200">
            <Download size={16} /> Export <ChevronDown size={14} />
          </Button>
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 px-6">
            <FileText size={16} /> Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        <Card className="col-span-12 lg:col-span-3 border-none shadow-sm text-center p-6">
          <p className="text-slate-400 text-sm font-medium">
            Good Morning, Adrian
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            08:35 AM, 11 Mar 2025
          </h2>

          <div className="my-6 flex justify-center">
            <div className="relative p-1 rounded-full border-2 border-emerald-500 border-dashed">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/api/placeholder/100/100" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] hover:bg-[#FF6B35]/10 border-none rounded-md px-4 py-1 mb-6">
            Production : 3.45 hrs
          </Badge>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
            <span className="bg-orange-100 p-1 rounded">
              <Clock size={14} className="text-orange-500" />
            </span>
            Punch In at{" "}
            <span className="font-bold text-slate-800 ml-1">10.00 AM</span>
          </div>

          <Button className="w-full bg-[#2D3339] hover:bg-slate-800 h-12 text-lg">
            Punch Out
          </Button>
        </Card>

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Hours Today",
                val: "8.36",
                total: "9",
                icon: <Clock />,
                color: "text-orange-500 bg-orange-50",
                trend: "15% by Yesterday",
              },
              {
                label: "Total Hours Week",
                val: "8.36",
                total: "40",
                icon: <Clock />,
                color: "text-slate-700 bg-slate-100",
                trend: "15% by Last Week",
              },
              {
                label: "Total Hours Month",
                val: "126",
                total: "160",
                icon: <CalendarIcon />,
                color: "text-blue-500 bg-blue-50",
                trend: "21% by Last Month",
                trendDown: true,
              },
              {
                label: "Overtime this Month",
                val: "16",
                total: "28",
                icon: <CalendarIcon />,
                color: "text-pink-500 bg-pink-50",
                trend: "8% by Last Month",
                trendDown: true,
              },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">
                    {stat.val}{" "}
                    <span className="text-slate-300 font-normal text-lg">
                      / {stat.total}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-4">
                  {stat.label}
                </p>
                <div
                  className={`text-[10px] flex items-center gap-1 font-bold ${stat.trendDown ? "text-red-500" : "text-emerald-500"}`}>
                  <span
                    className={`h-4 w-4 rounded-full flex items-center justify-center ${stat.trendDown ? "bg-red-100" : "bg-emerald-100"}`}>
                    {stat.trendDown ? "↓" : "↑"}
                  </span>
                  {stat.trend}
                </div>
              </Card>
            ))}
          </div>

          {/* Productivity Timeline Card */}
          <Card className="border-none shadow-sm p-6">
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div>
                <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                  ● Total Working hours
                </p>
                <p className="text-xl font-bold">12h 36m</p>
              </div>
              <div>
                <p className="text-xs text-emerald-500 flex items-center gap-1 mb-1">
                  ● Productive Hours
                </p>
                <p className="text-xl font-bold">08h 36m</p>
              </div>
              <div>
                <p className="text-xs text-amber-500 flex items-center gap-1 mb-1">
                  ● Break hours
                </p>
                <p className="text-xl font-bold">22m 15s</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 flex items-center gap-1 mb-1">
                  ● Overtime
                </p>
                <p className="text-xl font-bold">02h 15m</p>
              </div>
            </div>

            {/* Visual Timeline Bar */}
            <div className="relative pt-2">
              <div className="h-6 w-full bg-slate-100 rounded-full flex overflow-hidden">
                <div className="h-full bg-emerald-500 w-[20%] mr-1 rounded-sm" />
                <div className="h-full bg-amber-400 w-[5%] mr-1 rounded-sm" />
                <div className="h-full bg-emerald-500 w-[30%] mr-1 rounded-sm" />
                <div className="h-full bg-amber-400 w-[10%] mr-1 rounded-sm" />
                <div className="h-full bg-emerald-500 w-[20%] mr-1 rounded-sm" />
                <div className="h-full bg-blue-500 w-[4%] mr-1 rounded-sm" />
                <div className="h-full bg-amber-400 w-[2%] mr-1 rounded-sm" />
                <div className="h-full bg-blue-500 w-[3%] rounded-sm" />
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-medium">
                {[
                  "06:00",
                  "07:00",
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "01:00",
                  "02:00",
                  "03:00",
                  "04:00",
                  "05:00",
                  "06:00",
                  "07:00",
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                ].map((time, i) => (
                  <span key={i}>{time}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">
            Employee Attendance
          </h2>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-10 text-slate-400 gap-2 border-slate-200">
              <CalendarIcon size={16} /> dd/mm/yyyy
            </Button>
            <Select>
              <SelectTrigger className="w-[140px] border-slate-200">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="7">
              <SelectTrigger className="w-[180px] border-slate-200">
                <SelectValue placeholder="Sort By : Last 7 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Row Per Page
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-9">
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
              className="pl-10 h-10 border-slate-200"
            />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">Date</TableHead>
              <TableHead className="font-bold text-slate-700">
                Check In
              </TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="font-bold text-slate-700">
                Check Out
              </TableHead>
              <TableHead className="font-bold text-slate-700">Break</TableHead>
              <TableHead className="font-bold text-slate-700">Late</TableHead>
              <TableHead className="font-bold text-slate-700">
                Overtime
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Production Hours
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {ATTENDANCE_DATA.map((row, i) => (
              <TableRow
                key={i}
                className="hover:bg-slate-50/50 border-slate-100">
                <TableCell className="text-sm text-slate-500">
                  {row.date}
                </TableCell>
                <TableCell className="text-sm text-slate-500 font-medium">
                  {row.checkIn}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`font-normal px-3 ${row.statusColor || "text-emerald-500 bg-emerald-50 border-emerald-100"}`}>
                    ● {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {row.checkOut}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {row.break}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {row.late}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {row.overtime}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`px-4 py-1.5 rounded-md font-bold text-white border-none ${row.prodColor || "bg-emerald-500"}`}>
                    {row.production}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between bg-white text-sm text-slate-500 border-t">
          <div>Showing 1 to 10 of 16 entries</div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-300">
              <ChevronLeft size={18} />
            </Button>
            {[1, 2, 3].map((n) => (
              <Button
                key={n}
                variant="outline"
                className="h-8 w-8 p-0 border-slate-200">
                {n}
              </Button>
            ))}
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
