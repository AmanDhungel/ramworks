"use client";

import React from "react";
import {
  Plus,
  Download,
  LayoutGrid,
  List,
  Search,
  MoreVertical,
  MessageSquare,
  Phone,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useGetTicket } from "@/services/ticket.service";
import TicketDialog from "./AddTicketDialog";

const TICKETS = [
  {
    id: "Tic - 001",
    title: "Laptop Issue",
    category: "Hardware Issues",
    status: "Open",
    priority: "Low",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 002",
    title: "Payment Issue",
    category: "Software Issues",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 003",
    title: "Bug Report",
    category: "IT Support",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 004",
    title: "Access Denied",
    category: "IT Support",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 005",
    title: "Display Glitch",
    category: "Hardware Issues",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 006",
    title: "Security Alert",
    category: "IT Support",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 007",
    title: "Connectivity Issue",
    category: "Connectivity",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
  {
    id: "Tic - 008",
    title: "Update Error",
    category: "IT Support",
    status: "Open",
    priority: "High",
    user: "/api/placeholder/40/40",
  },
];

export default function TicketsDashboard() {
  const { data } = useGetTicket();
  const [todayDate] = React.useState(
    () => new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000),
  );
  const STATS = [
    {
      label: "New Tickets",
      count: data?.data.filter((t) => new Date(t.createdAt ?? "") > todayDate)
        .length,
      trend: "+19.01%",
      color: "orange",
    },
    {
      label: "Open Tickets",
      count: data?.data.filter((t) => t.status === "open").length,
      trend: "+19.01%",
      color: "purple",
    },
    {
      label: "Solved Tickets",
      count: data?.data.filter((t) => t.status === "resolved").length,
      trend: "+19.01%",
      color: "green",
    },
    {
      label: "Pending Tickets",
      count: data?.data.filter((t) => t.status === "in_progress").length,
      trend: "+19.01%",
      color: "cyan",
    },
  ];

  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tickets</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            🏠 / Employee / <span className="text-slate-900">Tickets</span>
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex border rounded-md bg-white overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none border-r">
              <List size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none bg-slate-50">
              <LayoutGrid size={18} className="text-orange-500" />
            </Button>
          </div>
          <Button variant="outline" className="gap-2 bg-white border-slate-200">
            <Download size={16} /> Export <span>▼</span>
          </Button>
          <TicketDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-sm relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-full bg-${stat.color}-50 text-${stat.color}-500 border border-dashed border-${stat.color}-200`}>
                  <div className="w-5 h-5 border-2 border-current rounded-sm opacity-50" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-purple-50 text-purple-600 font-normal py-0.5 px-2">
                  <ArrowUpRight size={12} className="mr-1" /> {stat.trend}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {stat.count}
              </h2>
              <div className="absolute bottom-4 right-4 flex items-end gap-1 h-12">
                {[40, 70, 45, 90, 65, 80, 55].map((h, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${h}%` }}
                    className={`w-1.5 rounded-full bg-${stat.color}-500/30`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6 border-none shadow-sm">
        <CardContent className="p-4 flex flex-wrap justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800">Ticket Grid</h3>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-[120px] bg-white border-slate-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px] bg-white border-slate-200">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[160px] bg-white border-slate-200">
                <SelectValue placeholder="Sort By : Last 7 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Grid (Lower Section) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data.map((ticket, i) => (
          <Card
            key={i}
            className="border-none shadow-sm group hover:ring-1 hover:ring-orange-200 transition-all">
            <CardContent className="p-6 relative">
              <Checkbox className="absolute top-4 left-4 rounded-sm border-slate-200" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-2 text-slate-400">
                <MoreVertical size={18} />
              </Button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="relative mb-4">
                  <Link href={`/hrm/tickets/tickets/${ticket._id}`}>
                    <Avatar className="h-16 w-16 border-2 border-orange-100 p-0.5">
                      <AvatarImage src={ticket.assigned_to[0].name} />
                      <AvatarFallback>
                        {ticket.assigned_to[0].name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg leading-tight">
                  {ticket.title}
                </h4>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Category</span>
                  <span className="font-bold text-slate-700">
                    {ticket.event_category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Status</span>
                  <Badge className="bg-pink-50 text-pink-500 hover:bg-pink-50 border-none font-medium text-xs px-3">
                    ●{" "}
                    {ticket.status === "in_progress"
                      ? "In Progress"
                      : ticket.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Priority</span>
                  <Badge
                    variant="outline"
                    className={`border ${ticket.priority === "high" ? "text-red-500 border-red-200" : "text-blue-500 border-blue-200"} font-bold text-xs px-3`}>
                    ● {ticket.priority}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/api/placeholder/24/24" />
                  </Avatar>
                  <span className="text-xs font-semibold text-slate-600">
                    Edgar Hansel
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100">
                    <MessageSquare size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-slate-100 text-slate-500">
                    <Phone size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-10 pb-10">
        <Button className="bg-[#FF6B35] hover:bg-[#E85A20] px-10 h-11 gap-2">
          <ArrowUpRight size={18} className="rotate-90" /> Load More
        </Button>
      </div>
    </div>
  );
}
