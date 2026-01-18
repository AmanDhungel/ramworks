"use client";

import React from "react";
import {
  Plus,
  Download,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  Phone,
  MessageSquare,
  MoreVertical,
  Globe,
  Laptop,
  Bug,
  CreditCard,
  ShieldAlert,
  Wifi,
  RefreshCcw,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// --- Mock Data ---
const TICKET_STATS = [
  {
    label: "New Tickets",
    count: 120,
    trend: "+19.01%",
    color: "text-orange-500",
    bg: "bg-orange-50",
    icon: <AlertCircle size={18} />,
  },
  {
    label: "Open Tickets",
    count: 60,
    trend: "+19.01%",
    color: "text-purple-500",
    bg: "bg-purple-50",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Solved Tickets",
    count: 50,
    trend: "+19.01%",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    icon: <ShieldAlert size={18} />,
  },
  {
    label: "Pending Tickets",
    count: 10,
    trend: "+19.01%",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    icon: <Clock size={18} />,
  },
];

const TICKETS = [
  {
    id: "Tic - 001",
    title: "Laptop Issue",
    cat: "Hardware Issues",
    status: "Open",
    priority: "Low",
    icon: <Laptop />,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: "Tic - 002",
    title: "Payment Issue",
    cat: "Software Issues",
    status: "Open",
    priority: "High",
    icon: <CreditCard />,
    color: "text-cyan-600 bg-cyan-50",
  },
  {
    id: "Tic - 003",
    title: "Bug Report",
    cat: "IT Support",
    status: "Open",
    priority: "High",
    icon: <Bug />,
    color: "text-orange-600 bg-orange-50",
  },
  {
    id: "Tic - 004",
    title: "Access Denied",
    cat: "IT Support",
    status: "Open",
    priority: "High",
    icon: <ShieldAlert />,
    color: "text-red-600 bg-red-50",
  },
  {
    id: "Tic - 005",
    title: "Display Glitch",
    cat: "Hardware Issues",
    status: "Open",
    priority: "High",
    icon: <Laptop />,
    color: "text-pink-600 bg-pink-50",
  },
  {
    id: "Tic - 006",
    title: "Security Alert",
    cat: "IT Support",
    status: "Open",
    priority: "High",
    icon: <ShieldAlert />,
    color: "text-orange-600 bg-orange-50",
  },
  {
    id: "Tic - 007",
    title: "Connectivity Issue",
    cat: "Connectivity",
    status: "Open",
    priority: "High",
    icon: <Wifi />,
    color: "text-purple-600 bg-purple-50",
  },
  {
    id: "Tic - 008",
    title: "Update Error",
    cat: "IT Support",
    status: "Open",
    priority: "High",
    icon: <RefreshCcw />,
    color: "text-red-600 bg-red-50",
  },
];

export default function TicketsDashboard() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tickets</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            🏠 / Employee /{" "}
            <span className="text-slate-900 font-medium">Tickets</span>
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white border border-slate-200 rounded-md p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400">
              <List size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-slate-50 text-slate-900 shadow-sm">
              <LayoutGrid size={18} />
            </Button>
          </div>
          <Button variant="outline" className="bg-white gap-2 border-slate-200">
            <Download size={16} /> Export <ChevronDown size={14} />
          </Button>
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 px-6">
            <Plus size={16} className="border rounded-full p-0.5" /> Add New
            Ticket
          </Button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {TICKET_STATS.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-5 flex justify-between">
              <div>
                <div
                  className={`h-10 w-10 rounded-full border-2 border-dashed flex items-center justify-center mb-3 ${stat.color} ${stat.bg} border-current opacity-80`}>
                  {stat.icon}
                </div>
                <p className="text-xs font-bold text-slate-400 mb-1">
                  {stat.label}
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {stat.count}
                </h2>
              </div>
              <div className="text-right flex flex-col justify-between">
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-600 border-none text-[10px]">
                  <RefreshCcw size={10} className="mr-1" /> {stat.trend}
                </Badge>
                {/* Mock Bar Chart to match design */}
                <div className="flex items-end gap-1 h-12">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 rounded-full ${stat.color.replace("text", "bg")}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Section */}
      <Card className="border-none shadow-sm mb-6">
        <div className="p-4 flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-800">Ticket Grid</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Select>
              <SelectTrigger className="w-[130px] h-10 border-slate-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px] h-10 border-slate-200">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
            </Select>
            <Select defaultValue="7">
              <SelectTrigger className="w-[180px] h-10 border-slate-200">
                <SelectValue placeholder="Sort By : Last 7 Days" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </Card>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TICKETS.map((ticket, i) => (
          <Card key={i} className="border-none shadow-sm relative group">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <Checkbox className="border-slate-200 rounded-sm" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400">
                  <MoreVertical size={16} />
                </Button>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-3">
                  <Avatar className="h-16 w-16 border-2 border-orange-500 p-0.5">
                    <AvatarImage
                      src="/api/placeholder/64/64"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="absolute bottom-0 right-1 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {ticket.title}
                </h3>
                <Badge className="bg-blue-50 text-blue-500 hover:bg-blue-50 border-none text-[10px] py-0 mt-1">
                  {ticket.id}
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Category</span>
                  <span className="font-bold text-slate-800">{ticket.cat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Status</span>
                  <Badge
                    variant="outline"
                    className="text-pink-500 bg-pink-50 border-pink-100 font-normal py-0">
                    ● {ticket.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Priority</span>
                  <Badge
                    variant="outline"
                    className={`border-slate-200 font-bold ${ticket.priority === "High" ? "text-red-500 border-red-200" : "text-blue-500"}`}>
                    ● {ticket.priority}
                  </Badge>
                </div>
              </div>

              <Separator className="mb-4 bg-slate-100" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/api/placeholder/24/24" />
                  </Avatar>
                  <div className="text-[10px]">
                    <p className="text-slate-400 leading-none mb-1">
                      Assigned To
                    </p>
                    <p className="font-bold text-slate-800 leading-none">
                      Edgar Hansel
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-100 transition-colors">
                    <MessageSquare size={14} />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Phone size={14} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-[#FF6B35] hover:bg-[#E85A20] px-8 gap-2 h-11">
          <RefreshCcw size={16} /> Load More
        </Button>
      </div>
    </div>
  );
}

const Separator = ({ className }: { className?: string }) => (
  <div className={`h-px w-full ${className}`} />
);
