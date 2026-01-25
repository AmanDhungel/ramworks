"use client";
import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserMinus,
  UserPlus,
  List,
  LayoutGrid,
  Download,
  PlusCircle,
  MoreVertical,
  RefreshCcw,
  Search,
  ChevronDown,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import AddProfileDialog from "./CreateNewEmployeDialog";
import { Button } from "../../ui/button";
import Image from "next/image";
import { EmployeeType, useGetEmployee } from "@/services/employee.service";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// --- Shadcn/UI Style Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const DESIGNATIONS = [
  "Software Developer",
  "Developer",
  "Full Stack Developer",
  "Tester",
  "Trainee",
];

// const EMPLOYEES = [
//   {
//     id: 1,
//     name: "Anthony Lewis",
//     designation: "Software Developer",
//     projects: 20,
//     done: 13,
//     progress: 7,
//     productivity: 65,
//     avatar: "https://i.pravatar.cc/150?u=1",
//     barColor: "bg-purple-500",
//     prodColor: "text-purple-500",
//   },
//   {
//     id: 2,
//     name: "Brian Villalobos",
//     designation: "Developer",
//     projects: 30,
//     done: 10,
//     progress: 20,
//     productivity: 30,
//     avatar: "https://i.pravatar.cc/150?u=2",
//     barColor: "bg-orange-400",
//     prodColor: "text-orange-400",
//   },
//   {
//     id: 3,
//     name: "Harvey Smith",
//     designation: "Developer",
//     projects: 25,
//     done: 7,
//     progress: 18,
//     productivity: 20,
//     avatar: "https://i.pravatar.cc/150?u=3",
//     barColor: "bg-red-500",
//     prodColor: "text-red-500",
//   },
//   {
//     id: 4,
//     name: "Stephan Peralt",
//     designation: "Software Developer",
//     projects: 15,
//     done: 13,
//     progress: 2,
//     productivity: 90,
//     avatar: "https://i.pravatar.cc/150?u=4",
//     barColor: "bg-emerald-500",
//     prodColor: "text-emerald-500",
//   },
//   {
//     id: 5,
//     name: "Doglas Martini",
//     designation: "Full Stack Developer",
//     projects: 15,
//     done: 2,
//     progress: 13,
//     productivity: 10,
//     avatar: "https://i.pravatar.cc/150?u=5",
//     barColor: "bg-red-600",
//     prodColor: "text-red-600",
//   },
//   {
//     id: 6,
//     name: "Linda Ray",
//     designation: "Software Developer",
//     projects: 20,
//     done: 10,
//     progress: 10,
//     productivity: 50,
//     avatar: "https://i.pravatar.cc/150?u=6",
//     barColor: "bg-purple-400",
//     prodColor: "text-purple-400",
//   },
//   {
//     id: 7,
//     name: "Elliot Murray",
//     designation: "Developer",
//     projects: 40,
//     done: 35,
//     progress: 5,
//     productivity: 93,
//     avatar: "https://i.pravatar.cc/150?u=7",
//     barColor: "bg-emerald-500",
//     prodColor: "text-emerald-500",
//   },
//   {
//     id: 8,
//     name: "Rebecca Smith",
//     designation: "Tester",
//     projects: 30,
//     done: 22,
//     progress: 8,
//     productivity: 80,
//     avatar: "https://i.pravatar.cc/150?u=8",
//     barColor: "bg-pink-500",
//     prodColor: "text-pink-500",
//   },
// ];

const SummaryCard = ({ label, value, change, color, icon }: any) => (
  <div className="bg-white p-4 border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white",
          color,
        )}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-500">{label}</p>
        <h4 className="text-lg font-bold text-slate-800 leading-tight">
          {value}
        </h4>
      </div>
    </div>
    <div className="flex items-center gap-1 bg-purple-50 text-purple-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-purple-100">
      {change}
    </div>
  </div>
);

const EmployeeCard = ({ emp }: { emp: EmployeeType }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 relative shadow-sm hover:shadow-md transition-all group">
    <div className="absolute top-4 left-4">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-slate-300 accent-orange-500 cursor-pointer"
      />
    </div>
    <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-600">
      <MoreVertical size={18} />
    </button>

    <div className="flex flex-col items-center mb-4">
      <div className="relative mb-3">
        <Avatar>
          <AvatarImage
            src={`https://logo.clearbit.com/${emp.name}.com`}
            alt={emp.name}
          />
          <AvatarFallback>{emp.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-[-3px] w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
      </div>
      <h3 className="font-bold text-slate-800 text-sm mb-0.5">{emp.name}</h3>
      <span className="bg-pink-50 text-pink-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-100 uppercase tracking-tighter">
        {emp.about}
      </span>
    </div>

    <div className="grid grid-cols-3 text-center border-t border-b py-3 border-slate-100 mb-4 bg-slate-50/30 rounded-lg">
      <div>
        <p className="text-[10px] text-slate-400 uppercase font-medium">
          Projects
        </p>
        {/* <p className="text-sm font-bold text-slate-700">{emp.projects}</p> */}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 uppercase font-medium">Done</p>
        {/* <p className="text-sm font-bold text-slate-700">{emp.done}</p> */}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 uppercase font-medium">
          Progress
        </p>
        {/* <p className="text-sm font-bold text-slate-700">{emp.progress}</p> */}
      </div>
    </div>

    {/* <div className="space-y-2">
      <div className="flex justify-center gap-1 text-[11px]">
        <span className="text-slate-400">Productivity :</span>
        <span className={cn("font-bold", emp.prodColor)}>
          {emp.productivity}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", emp.barColor)}
          style={{ width: `${emp.productivity}%` }}
        />
      </div>
    </div> */}
  </div>
);

const ninetyDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).getTime();

export default function EmployeeManagement() {
  const [designationFilter, setDesignationFilter] = useState("All");
  const { data } = useGetEmployee();

  console.log("Employee Data:", data);

  const filteredEmployees = useMemo(() => {
    if (designationFilter === "All") return data?.data;
    return data?.data.filter((emp) => emp.about === designationFilter);
  }, [designationFilter, data]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee</h1>
          <nav className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>CRM</span> / <span>Employee</span> /{" "}
            <span className="text-slate-600 font-medium">Employee Grid</span>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border rounded bg-white overflow-hidden shadow-sm">
            <button className="p-2 border-r hover:bg-slate-50 text-slate-400">
              <List size={18} />
            </button>
            <button className="p-2 bg-slate-100 text-slate-600">
              <LayoutGrid size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
            <Download size={16} /> Export <ChevronDown size={14} />
          </button>

          <AddProfileDialog />
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          label="Total Employee"
          value={data?.data.length || "0"}
          change="+19.01%"
          color="bg-orange-500"
          icon={<Users size={18} />}
        />
        <SummaryCard
          label="Active"
          value={
            data?.data.filter((emp) => emp.company.status === "active")
              .length || "0"
          }
          change="+19.01%"
          color="bg-emerald-500"
          icon={<UserCheck size={18} />}
        />
        <SummaryCard
          label="InActive"
          value={
            data?.data.filter((emp) => emp.company.status != "active").length ||
            "0"
          }
          change="+19.01%"
          color="bg-red-500"
          icon={<UserMinus size={18} />}
        />
        <SummaryCard
          label="New Joiners"
          value={
            data?.data.filter(
              (emp) => new Date(emp.join_date).getTime() >= ninetyDaysAgo,
            ).length || "0"
          }
          change="+19.01%"
          color="bg-blue-500"
          icon={<UserPlus size={18} />}
        />
      </div>

      <div className="bg-white p-4 border border-slate-200 rounded-xl mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-bold text-slate-800 text-[15px]">Employees Grid</h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-1.5 pr-8 text-xs font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer shadow-sm min-w-[160px]"
              value={designationFilter}
              onChange={(e) => setDesignationFilter(e.target.value)}>
              <option value="All">All Designations</option>
              {DESIGNATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={14}
            />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-1.5 pr-8 text-xs font-medium text-slate-600 focus:outline-none cursor-pointer shadow-sm">
              <option>Sort By : Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <ChevronDown
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={14}
            />
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {filteredEmployees?.map((emp) => (
          <EmployeeCard key={emp._id} emp={emp} />
        ))}
      </div>

      {/* Footer / Load More */}
      <div className="flex flex-col items-center gap-8 mb-12">
        <button className="flex items-center gap-2 px-8 py-2.5 bg-[#ff6b35] text-white rounded-lg text-sm font-bold shadow-lg hover:bg-orange-600 transition-all hover:scale-105 active:scale-95">
          <RefreshCcw size={16} /> Load More
        </button>

        <div className="w-full pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between text-[11px] text-slate-400 font-medium italic gap-2">
          <p>© 2024 - 2025 SmartHR.</p>
          <p>
            Designed & Developed By{" "}
            <span className="text-orange-500 font-bold not-italic">Dreams</span>
          </p>
        </div>
      </div>
    </div>
  );
}
