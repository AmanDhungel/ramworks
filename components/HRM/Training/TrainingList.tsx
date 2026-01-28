"use client";

import React from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Settings,
  LayoutGrid,
  List,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTraining } from "@/services/training.service";
import AddTrainingDialog from "./AddTraining";

// --- Mock Data following image_6f1b63.png ---
const TRAINING_DATA = [
  {
    id: 1,
    type: "Git Training",
    trainer: "Anthony Lewis",
    trainerRole: "Senior Dev",
    duration: "12 Jan 2024 - 12 Feb 2024",
    desc: "Version control and code collaboration.",
    cost: 200,
    status: "Active",
    employees: 5,
  },
  {
    id: 2,
    type: "HTML Training",
    trainer: "Brian Villalobos",
    trainerRole: "Frontend Dev",
    duration: "17 Jan 2024 - 17 Feb 2024",
    desc: "Basics of web page structure and markup.",
    cost: 100,
    status: "Active",
    employees: 4,
  },
  {
    id: 3,
    type: "React Training",
    trainer: "Harvey Smith",
    trainerRole: "Lead Dev",
    duration: "10 Feb 2024 - 10 Mar 2024",
    desc: "Dynamic web applications with components.",
    cost: 300,
    status: "Active",
    employees: 7,
  },
  {
    id: 4,
    type: "Nodejs Training",
    trainer: "Stephan Peralt",
    trainerRole: "Backend Dev",
    duration: "20 Feb 2024 - 20 Mar 2024",
    desc: "Building scalable server-side applications.",
    cost: 250,
    status: "Active",
    employees: 6,
  },
  {
    id: 5,
    type: "Vuejs Training",
    trainer: "Doglas Martini",
    trainerRole: "Manager",
    duration: "16 Mar 2024 - 16 Apr 2024",
    desc: "Interactive single-page applications.",
    cost: 280,
    status: "Active",
    employees: 8,
  },
];

export default function TrainingList() {
  const { data } = useGetTraining();
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Training</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            🏠 / Performance /{" "}
            <span className="text-slate-900 font-medium">Add Training</span>
          </p>
        </div>
        <div className="flex gap-3">
          <AddTrainingDialog />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-200 bg-white">
            <Settings className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        {/* Table Filter Bar */}
        <div className="p-5 flex flex-wrap justify-between items-center gap-4 border-b bg-white">
          <CardTitle className="text-base font-bold text-slate-800">
            Training List
          </CardTitle>
          <Select defaultValue="7">
            <SelectTrigger className="w-[180px] h-10 border-slate-200 text-slate-600 font-medium bg-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Sort By : Last 7 Days</SelectItem>
              <SelectItem value="30">Sort By : Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 bg-white">
          {/* Row Per Page & Search */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-tight">
              Row Per Page
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-9 border-slate-200 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              Entries
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search"
                className="pl-10 h-10 border-slate-100 bg-[#F9FAFB] focus:bg-white transition-colors border shadow-none"
              />
            </div>
          </div>

          {/* Training Data Table */}
          <div className="rounded-md border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#E9ECEF]">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-12 px-4">
                    <Checkbox className="border-slate-300" />
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Training Type
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Trainer
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Employee
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Time Duration
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Description
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Cost
                  </TableHead>
                  <TableHead className="uppercase text-[11px] font-bold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((item) => (
                  <TableRow
                    key={item._id}
                    className="group hover:bg-slate-50/50 border-slate-100 transition-colors">
                    <TableCell className="px-4 py-4">
                      <Checkbox className="border-slate-300" />
                    </TableCell>
                    <TableCell className="font-bold text-slate-500">
                      {item.training_type.type}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback>
                            {item.trainer.first_name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-slate-800 whitespace-nowrap">
                          {item.trainer.first_name} {item.trainer.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {item.employees.slice(0, 2).map((item, i) => (
                          <Avatar
                            key={item._id}
                            className="h-7 w-7 border-2 border-white ring-0">
                            <AvatarImage
                              src={`/api/placeholder/28/28?id=${i}`}
                            />
                            <AvatarFallback>
                              {item.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {item.employees.length > 2 && (
                          <div className="h-7 w-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-600">
                            +{item.employees.length - 2}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 font-medium whitespace-nowrap">
                      {item.start_date.split("T")[0]} -{" "}
                      {item.end_date.split("T")[0]}
                    </TableCell>
                    <TableCell className="text-slate-500 max-w-[200px] truncate">
                      {item.description}
                    </TableCell>
                    <TableCell className="font-bold text-slate-500">
                      ${item.training_cost}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-[#10B981] hover:bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded gap-1.5 border-none">
                        <div className="h-1 w-1 rounded-full bg-white" />{" "}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 flex flex-wrap justify-between items-center text-[13px] font-bold text-slate-400 px-2">
            <p>Showing 1 - 5 of 5 entries</p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100">
                <ChevronLeft size={16} />
              </Button>
              <div className="h-8 w-8 flex items-center justify-center bg-[#FF6B35] text-white rounded-full shadow-sm">
                1
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
