"use client";

import React from "react";
import {
  ChevronLeft,
  Plus,
  Download,
  Search,
  MoreVertical,
  Clock,
  Calendar,
  Laptop,
  ArrowUpRight,
  ArrowDownRight,
  Coffee,
  Timer,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AttendanceDashboard() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Employee Attendance</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            🏠 / Employee /{" "}
            <span className="text-slate-900 font-medium">Leaves</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white gap-2 border-slate-200">
            <Download size={16} /> Export{" "}
            <ChevronLeft size={14} className="-rotate-90" />
          </Button>
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2">
            <ShieldCheck size={16} /> Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Punch In/Out Card */}
        <Card className="col-span-12 lg:col-span-3 border-none shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Good Morning, Adrian
            </p>
            <h2 className="text-xl font-bold mt-1 mb-4">
              08:35 AM, 11 Mar 2025
            </h2>

            <div className="relative inline-block mb-4">
              <div className="h-32 w-32 rounded-full border-[6px] border-emerald-500 p-1">
                <Avatar className="h-full w-full">
                  <AvatarImage src="/api/placeholder/128/128" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                Production : 3.45 hrs
              </div>
            </div>

            <p className="text-xs text-slate-400 flex items-center justify-center gap-2 mb-6">
              <span className="text-[#FF6B35]">
                <Timer size={14} />
              </span>{" "}
              Punch In at 10.00 AM
            </p>

            <Button className="w-full bg-[#2D2F39] hover:bg-slate-800 h-12 font-bold text-white rounded-md">
              Punch Out
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              icon={<Timer size={18} />}
              label="Total Hours Today"
              val="8.36"
              total="/ 9"
              trend="+ 15%"
              trendDir="up"
              color="text-orange-500 bg-orange-50"
            />
            <StatCard
              icon={<Clock size={18} />}
              label="Total Hours Week"
              val="8.36"
              total="/ 40"
              trend="+ 15%"
              trendDir="up"
              color="text-slate-700 bg-slate-100"
            />
            <StatCard
              icon={<Calendar size={18} />}
              label="Total Hours Month"
              val="126"
              total="/ 160"
              trend="- 21%"
              trendDir="down"
              color="text-blue-500 bg-blue-50"
            />
            <StatCard
              icon={<UserCheck size={18} />}
              label="Overtime this Month"
              val="16"
              total="/ 28"
              trend="- 8%"
              trendDir="down"
              color="text-pink-500 bg-pink-50"
            />
          </div>

          {/* Productivity Timeline */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <TimelineStat
                  label="Total Working hours"
                  time="12h 36m"
                  color="bg-emerald-500"
                />
                <TimelineStat
                  label="Productive Hours"
                  time="08h 36m"
                  color="bg-emerald-500"
                />
                <TimelineStat
                  label="Break hours"
                  time="22m 15s"
                  color="bg-amber-400"
                />
                <TimelineStat
                  label="Overtime"
                  time="02h 15m"
                  color="bg-blue-500"
                />
              </div>

              {/* Visual Timeline Bar */}
              <div className="relative pt-2 pb-6">
                <div className="h-4 w-full bg-slate-100 rounded-full flex overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[15%]" />
                  <div className="h-full bg-amber-400 w-[5%]" />
                  <div className="h-full bg-emerald-500 w-[20%]" />
                  <div className="h-full bg-amber-400 w-[10%]" />
                  <div className="h-full bg-emerald-500 w-[25%]" />
                  <div className="h-full bg-amber-400 w-[3%]" />
                  <div className="h-full bg-blue-500 w-[5%]" />
                  <div className="h-full bg-slate-300 w-[2%]" />
                  <div className="h-full bg-blue-500 w-[2%]" />
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-medium">
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
                  ].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Attendance Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
          <CardTitle className="text-base font-bold text-slate-800">
            Employee Attendance
          </CardTitle>
          <div className="flex gap-3">
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                placeholder="dd/mm/yyyy"
                className="h-9 w-40 pl-9 text-xs border-slate-200"
              />
            </div>
            <Select>
              <SelectTrigger className="h-9 w-32 text-xs border-slate-200">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
            </Select>
            <Select defaultValue="7">
              <SelectTrigger className="h-9 w-40 text-xs border-slate-200">
                <SelectValue placeholder="Sort By : Last 7 Days" />
              </SelectTrigger>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Break</th>
                <th className="px-6 py-4">Late</th>
                <th className="px-6 py-4">Overtime</th>
                <th className="px-6 py-4 text-right">Production Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ATTENDANCE_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {row.in}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`font-bold border-none py-0 px-2 ${row.status === "Present" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"}`}>
                      ● {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {row.out}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {row.break}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {row.late}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {row.overtime}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge
                      className={`border-none font-bold py-1 px-3 ${row.prodColor === "blue" ? "bg-blue-500" : row.prodColor === "red" ? "bg-red-500" : "bg-emerald-500"}`}>
                      {row.prod}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 border-t flex justify-between items-center text-xs text-slate-400 font-bold">
            <p>Showing 1 to 10 of 16 entries</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, "...", 15].map((n, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 flex items-center justify-center rounded-full cursor-pointer ${n === 4 ? "bg-[#FF6B35] text-white shadow-md shadow-orange-200" : "hover:bg-slate-100"}`}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Specialized Sub-components ---

const StatCard = ({ icon, label, val, total, trend, trendDir, color }: any) => (
  <Card className="border-none shadow-sm">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`h-8 w-8 rounded-md flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div
          className={`flex items-center text-[10px] font-bold ${trendDir === "up" ? "text-emerald-500" : "text-red-500"}`}>
          {trendDir === "up" ? (
            <ArrowUpRight size={12} className="mr-0.5" />
          ) : (
            <ArrowDownRight size={12} className="mr-0.5" />
          )}
          {trend} by Last {trendDir === "up" ? "Week" : "Month"}
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-xl font-bold text-slate-800">{val}</h3>
        <span className="text-sm font-bold text-slate-400">{total}</span>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
        {label}
      </p>
    </CardContent>
  </Card>
);

const TimelineStat = ({ label, time, color }: any) => (
  <div>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-2 mb-1">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} /> {label}
    </p>
    <p className="text-lg font-bold text-slate-800 leading-none">{time}</p>
  </div>
);

// --- Mock Data ---
const ATTENDANCE_DATA = [
  {
    date: "14/01/2024",
    in: "09:00 AM",
    status: "Present",
    out: "06:45 PM",
    break: "30 Min",
    late: "32 Min",
    overtime: "20 Min",
    prod: "8.55 Hrs",
    prodColor: "emerald",
  },
  {
    date: "21/01/2024",
    in: "09:00 AM",
    status: "Present",
    out: "06:12 PM",
    break: "20 Min",
    late: "-",
    overtime: "45 Min",
    prod: "7.54 Hrs",
    prodColor: "red",
  },
  {
    date: "20/02/2024",
    in: "09:00 AM",
    status: "Present",
    out: "06:13 PM",
    break: "50 Min",
    late: "-",
    overtime: "33 Min",
    prod: "8.45 Hrs",
    prodColor: "emerald",
  },
  {
    date: "15/03/2024",
    in: "09:00 AM",
    status: "Present",
    out: "06:23 PM",
    break: "41 Min",
    late: "-",
    overtime: "50 Min",
    prod: "8.35 Hrs",
    prodColor: "emerald",
  },
  {
    date: "12/04/2024",
    in: "09:00 AM",
    status: "Present",
    out: "06:43 PM",
    break: "23 Min",
    late: "-",
    overtime: "10 Min",
    prod: "8.22 Hrs",
    prodColor: "emerald",
  },
  {
    date: "20/05/2024",
    in: "09:00 AM",
    status: "Present",
    out: "07:15 PM",
    break: "03 Min",
    late: "30 Min",
    overtime: "-",
    prod: "8.32 Hrs",
    prodColor: "emerald",
  },
  {
    date: "06/07/2024",
    in: "09:00 AM",
    status: "Present",
    out: "07:13 PM",
    break: "32 Min",
    late: "-",
    overtime: "-",
    prod: "9.15 Hrs",
    prodColor: "blue",
  },
  {
    date: "02/09/2024",
    in: "09:00 AM",
    status: "Present",
    out: "09:17 PM",
    break: "14 Min",
    late: "12 Min",
    overtime: "-",
    prod: "9.25 Hrs",
    prodColor: "emerald",
  },
  {
    date: "15/11/2024",
    in: "09:00 AM",
    status: "Present",
    out: "08:15 PM",
    break: "12 Min",
    late: "-",
    overtime: "-",
    prod: "8.35 Hrs",
    prodColor: "emerald",
  },
  {
    date: "10/12/2024",
    in: "09:00 AM",
    status: "Absent",
    out: "09:23 PM",
    break: "10 Min",
    late: "-",
    overtime: "-",
    prod: "8.22 Hrs",
    prodColor: "emerald",
  },
];
