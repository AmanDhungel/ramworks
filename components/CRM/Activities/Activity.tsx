"use client";
import React from "react";
import {
  Download,
  ChevronDown,
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  Mail,
  User,
  Eye,
  LayoutGrid,
  List,
  CalendarIcon,
  CirclePlus,
  PhoneCall,
  Webcam,
  ClipboardList,
  SquarePen,
  Loader,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { AddActivityDialog } from "./NewActivityDialog";
import { useDeleteActivity, useGetActivity } from "@/services/activity.service";
import useDialogOpen from "@/context/Dialog";
import { useUpdateParams } from "@/helper/removeparam";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeleteConfirmDialog } from "@/components/ui/DynamicDeleteButton";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ACTIVITIES = [
  {
    title: "We scheduled a meeting for next week",
    type: "Meeting",
    typeColor: "bg-pink-50 text-pink-500",
    due: "16/01/2024",
    owner: "Hendry",
    created: "14/01/2024",
  },
  {
    title: "Had conversation with Fred regarding task",
    type: "Calls",
    typeColor: "bg-purple-50 text-purple-500",
    due: "24/01/2024",
    owner: "Guilory",
    created: "21/01/2024",
  },
  {
    title: "Analysing latest time estimation for new project",
    type: "Tasks",
    typeColor: "bg-blue-50 text-blue-500",
    due: "23/02/2024",
    owner: "Jami",
    created: "20/02/2024",
  },
  {
    title: "Store and manage contact data",
    type: "Email",
    typeColor: "bg-yellow-50 text-yellow-600",
    due: "18/03/2024",
    owner: "Theresa",
    created: "15/03/2024",
  },
];

const ActivityTable = () => {
  const [date, setDate] = React.useState<
    { from: Date; to: Date } | undefined
  >();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activityType, setActivityType] = React.useState("all");
  const { setIsOpen } = useDialogOpen();
  const { data: activity, isFetching } = useGetActivity();
  const { setParams } = useUpdateParams();
  const { mutate } = useDeleteActivity();

  const queryClient = useQueryClient();
  const handleDelete = (id: string) => {
    mutate(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Activity deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["activity"] });
        },
        onError: (error) => {
          console.error("Error deleting Activity:", error);
        },
      },
    );
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* --- Filter Section --- */}
      <div className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal text-xs h-9 border-slate-200",
                    !date && "text-muted-foreground",
                  )}>
                  <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "dd/MM/yyyy")} -{" "}
                        {format(date.to, "dd/MM/yyyy")}
                      </>
                    ) : (
                      format(date.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>dd/mm/yyyy - dd/mm/yyyy</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={date} numberOfMonths={2} />
              </PopoverContent>
            </Popover>

            <Select onValueChange={setActivityType}>
              <SelectTrigger className="w-[140px] h-9 text-xs border-slate-200">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="calls">Calls</SelectItem>
                <SelectItem value="tasks">Tasks</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[120px] h-9 text-xs border-slate-200">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">owner</SelectItem>
                <SelectItem value="tenant">tenant</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="7days">
              <SelectTrigger className=" h-9 text-xs border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Sort By :</span>
                  <span>Last 7 Days</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- Search & Row Count Section --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Row Per Page</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>Entries</span>
          </div>

          <div className="relative w-full max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 border-slate-200 focus-visible:ring-orange-500"
            />
          </div>
        </div>
      </div>
      {isFetching ? (
        <div className="flex items-center justify-center h-96">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f8f9fa] border-b border-slate-200">
            <tr className="text-[11px] font-bold text-slate-500 uppercase">
              <th className="px-6 py-4">
                <input type="checkbox" className="rounded border-slate-300" />
              </th>
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4 text-center">Activity Type</th>
              <th className="px-4 py-4">
                Due Date <ChevronDown size={12} className="inline ml-1" />
              </th>
              <th className="px-4 py-4">Owner</th>
              <th className="px-4 py-4">
                Created Date <ChevronDown size={12} className="inline ml-1" />
              </th>
              <th className="px-4 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100 text-slate-600">
            {activity?.data.map((act, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-slate-300" />
                </td>
                <td className="px-4 py-4 font-semibold text-slate-700">
                  {act.title}
                </td>
                <td className="px-4 py-4 text-center ">
                  <span
                    className={cn(
                      "px-2 flex items-center w-fit m-auto gap-2 py-1 rounded text-[10px] font-bold uppercase",
                      act.activity_type === "call"
                        ? "bg-purple-600/10 text-purple-600"
                        : act.activity_type === "meeting"
                          ? "bg-pink-600/10 text-pink-600"
                          : act.activity_type === "tasks"
                            ? "bg-blue-600/10 text-blue-600"
                            : "bg-yellow-600/10 text-yellow-600",
                    )}>
                    {act.activity_type === "call" ? (
                      <PhoneCall size={15} />
                    ) : act.activity_type === "meeting" ? (
                      <Webcam size={15} />
                    ) : act.activity_type === "tasks" ? (
                      <ClipboardList size={15} />
                    ) : (
                      <Mail size={15} />
                    )}{" "}
                    {act.activity_type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(act.due_date))}
                </td>
                <td className="px-4 py-4">
                  {act?.owner?.name ? act.owner.name : "No Owner"}
                </td>
                <td className="px-4 py-4">
                  {" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(act.createdAt))}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-3 text-slate-400">
                    <SquarePen
                      size={16}
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => {
                        setIsOpen();
                        setParams({
                          activity_id: act._id,
                        });
                      }}
                    />
                    <DeleteConfirmDialog
                      text={act.title}
                      onConfirm={() => handleDelete(act._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <span>Showing 1 to 10 of 16 entries</span>
        <Pagination className="justify-end w-auto mx-0">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="h-7 w-7 p-0 border rounded hover:bg-slate-50 hover:shadow-md transition-all [&_span]:hidden"
              />
            </PaginationItem>

            {[1, 2, 3].map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  href="#"
                  className="h-7 w-7 border rounded hover:shadow-md transition-all">
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className={cn(
                  "h-7 w-7 border rounded shadow-md hover:shadow-lg transition-all",
                  "bg-[#ff6b35] text-white border-[#ff6b35] hover:bg-orange-600 hover:text-white",
                )}>
                4
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis className="h-7 w-7" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                className="h-7 w-7 border rounded hover:shadow-md transition-all">
                15
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                className="h-7 w-7 p-0 border rounded hover:bg-slate-50 hover:shadow-md transition-all [&_span]:hidden"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default function ComprehensiveCRM() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity</h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>CRM</span> / <span>Activity List</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2 px-3 py-2  border rounded-lg text-sm font-medium shadow-sm">
            <Download size={16} /> Export <ChevronDown size={14} />
          </Button>
          {/* <Button className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-orange-600 transition-colors">
            <CirclePlus size={18} /> Add New Activity
          </Button> */}
          <AddActivityDialog />
        </div>
      </div>

      <div>
        <ActivityTable />
      </div>
    </div>
  );
}
