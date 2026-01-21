import React from "react";
import {
  Calendar,
  Syringe,
  Copy,
  MoreHorizontal,
  Search,
  Plus,
  Download,
  Info,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
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

// Mock Data
const leaveStats = [
  {
    title: "Annual Leaves",
    taken: "05",
    remaining: "07",
    icon: <Calendar className="w-6 h-6 text-white" />,
    bgColor: "bg-slate-900",
    accent: "bg-slate-100",
  },
  {
    title: "Medical Leaves",
    taken: "11",
    remaining: "01",
    icon: <Syringe className="w-6 h-6 text-white" />,
    bgColor: "bg-blue-500",
    accent: "bg-blue-50",
  },
  {
    title: "Casual Leaves",
    taken: "02",
    remaining: "10",
    icon: <Copy className="w-6 h-6 text-white" />,
    bgColor: "bg-purple-500",
    accent: "bg-purple-50",
  },
  {
    title: "Other Leaves",
    taken: "07",
    remaining: "05",
    icon: <span className="text-white font-bold text-xl">痰</span>,
    bgColor: "bg-pink-500",
    accent: "bg-pink-50",
  },
];

const leaveData = [
  {
    id: 1,
    type: "Medical Leave",
    from: "14 Jan 2024",
    to: "15 Jan 2024",
    days: "2 Days",
    approvedBy: "Doglas Martini",
    role: "Manager",
    status: "Approved",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    type: "Annual Leave",
    from: "21 Jan 2024",
    to: "25 Jan 2024",
    days: "5 Days",
    approvedBy: "Doglas Martini",
    role: "Manager",
    status: "Approved",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    type: "Medical Leave",
    from: "20 Jan 2024",
    to: "22 Feb 2024",
    days: "3 Days",
    approvedBy: "Warren Morales",
    role: "Admin",
    status: "Approved",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    type: "Annual Leave",
    from: "15 Mar 2024",
    to: "17 Mar 2024",
    days: "3 Days",
    approvedBy: "Doglas Martini",
    role: "Manager",
    status: "Approved",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 5,
    type: "Casual Leave",
    from: "12 Apr 2024",
    to: "16 Apr 2024",
    days: "5 Days",
    approvedBy: "Doglas Martini",
    role: "Manager",
    status: "Declined",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 6,
    type: "Medical Leave",
    from: "20 May 2024",
    to: "21 Mar 2024",
    days: "2 Days",
    approvedBy: "Warren Morales",
    role: "Admin",
    status: "Declined",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 7,
    type: "Casual Leave",
    from: "06 Jul 2024",
    to: "06 Jul 2024",
    days: "1 Days",
    approvedBy: "Doglas Martini",
    role: "Manager",
    status: "Approved",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 8,
    type: "Medical Leave",
    from: "02 Sep 2024",
    to: "04 Sep 2024",
    days: "3 Days",
    approvedBy: "Doglas Martini",
    role: "Manager",
    status: "New",
    avatar: "https://github.com/shadcn.png",
  },
];

export default function LeaveEmployeeDashboard() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leaves</h1>
          <p className="text-sm text-slate-500">
            🏠 / Employee /{" "}
            <span className="text-slate-900 font-medium">Leaves</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white flex gap-2">
            <Plus className="w-4 h-4" /> Add Leave
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveStats.map((stat, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-0 flex h-24">
              <div className="p-4 flex-1">
                <p className="text-sm text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.taken}</p>
                <p className="text-[10px] text-blue-600 bg-blue-50 inline-block px-1 rounded">
                  Remaining Leaves : {stat.remaining}
                </p>
              </div>
              <div
                className={`${stat.bgColor} w-24 flex items-center justify-center rounded-l-[40px]`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex gap-2 items-center">
              <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                Total Leaves : 48
              </span>
              <span className="text-xs font-semibold text-teal-500 bg-teal-50 px-2 py-1 rounded">
                Total Remaining Leaves : 23
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="jan-2026">
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">
                    01/01/2026 - 01/07/2026
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[130px] h-9">
                  <SelectValue placeholder="Leave Type" />
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger className="w-[130px] h-9">
                  <SelectValue placeholder="Approved By" />
                </SelectTrigger>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-8 h-9 w-64 bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-10">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>To</TableHead>
                <TableHead>No of Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveData.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {leave.type}{" "}
                      <Info className="w-3 h-3 text-blue-400 cursor-pointer" />
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{leave.from}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={leave.avatar} />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-none">
                          {leave.approvedBy}
                        </p>
                        <p className="text-xs text-slate-500">{leave.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{leave.to}</TableCell>
                  <TableCell className="text-slate-600">{leave.days}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      ${leave.status === "Approved" ? "text-teal-600 bg-teal-50 border-teal-100" : ""}
                      ${leave.status === "Declined" ? "text-red-600 bg-red-50 border-red-100" : ""}
                      ${leave.status === "New" ? "text-purple-600 bg-purple-50 border-purple-100" : ""}
                      flex items-center gap-1 w-fit px-3 py-1
                    `}>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          leave.status === "Approved"
                            ? "bg-teal-500"
                            : leave.status === "Declined"
                              ? "bg-red-500"
                              : "bg-purple-500"
                        }`}
                      />
                      {leave.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-500">
              Showing 1 - 10 of 10 entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-slate-400"
                disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button className="h-8 w-8 bg-orange-500 text-white hover:bg-orange-600">
                1
              </Button>
              <Button
                variant="outline"
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
