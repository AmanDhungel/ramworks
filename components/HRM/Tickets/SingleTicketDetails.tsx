"use client";

import React from "react";
import {
  ChevronLeft,
  LayoutGrid,
  List,
  Download,
  Plus,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  Reply,
  History,
  Clock,
  User,
  ShieldCheck,
  Mail,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const TicketDetails = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 font-sans">
      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
          <ChevronLeft size={18} /> Ticket Details
        </div>
        <div className="flex gap-3">
          <div className="flex border rounded-md bg-white overflow-hidden shadow-sm">
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
          <Button
            variant="outline"
            className="bg-white gap-2 shadow-sm border-slate-200">
            <Download size={16} /> Export <ChevronDown size={14} />
          </Button>
          <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2">
            <Plus size={16} className="border rounded-full p-0.5" /> Add New
            Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Discussion Thread (75%) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              {/* Ticket Top Meta */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-blue-600 font-bold text-lg">
                  IT Support
                </span>
                <div className="flex gap-2">
                  <Badge className="bg-red-500 hover:bg-red-500 px-3">
                    ● High
                  </Badge>
                  <Select defaultValue="private">
                    <SelectTrigger className="h-8 w-32 border-slate-200 text-xs">
                      <SelectValue placeholder="Mark as Private" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Mark as Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subject Line */}
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-md py-1 px-3">
                  Tic - 001
                </Badge>
                <h1 className="text-2xl font-bold text-slate-900">
                  Laptop Issue
                </h1>
                <Badge className="bg-pink-100 text-pink-500 border-none font-medium">
                  ● Open
                </Badge>
              </div>

              {/* Author Meta */}
              <div className="flex items-center gap-6 text-sm text-slate-500 mb-8">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/api/placeholder/24/24" />
                  </Avatar>
                  Assigned to <span className="font-bold">Edgar Hansel</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <History size={16} /> Updated 10 hours ago
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare size={16} /> 9 Comments
                </div>
                <Button className="ml-auto bg-slate-800 hover:bg-slate-900 gap-2 h-9 px-5">
                  <Plus size={14} className="border rounded-full p-0.5" /> Post
                  Reply
                </Button>
              </div>

              {/* Main Ticket Content */}
              <div className="prose max-w-none text-slate-600 space-y-4 leading-relaxed">
                <p>
                  For the past week, my laptop has been experiencing
                  intermittent freezing issues. The freezes occur randomly,
                  approximately 3-4 times a day, and last about 30-60 seconds
                  each time. During these freezes, the cursor becomes
                  unresponsive, and I am unable to click on anything or use
                  keyboard shortcuts. The issue usually resolves itself, but it
                  significantly disrupts my work.
                </p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    I first noticed the problem on February 1, 2024, while using
                    Google Meet for a video conference. Since then, the issue
                    has occurred during various tasks, including browsing with
                    Chrome, using Microsoft Office applications, and even when
                    the laptop is idle.
                  </li>
                  <li>
                    Error messages: No specific error messages have appeared,
                    but the Task Manager (when accessible) shows a spike in CPU
                    usage to 100% during these freezes.
                  </li>
                </ul>
              </div>

              <Separator className="my-10" />

              {/* Replies Section */}
              <div className="space-y-12">
                {[
                  {
                    name: "James Hendriques",
                    time: "5 hours ago",
                    msg: "This issue disrupts meetings, delays task completion, and affects my overall productivity.",
                    files: ["Screenshot.png"],
                  },
                  {
                    name: "Jessica Louise",
                    time: "5 hours ago",
                    msg: "Switch on the side panel & update the OS, Login in to the device manager and update the password",
                    files: ["Screenshot.png"],
                    count: 1,
                  },
                  {
                    name: "Vaughan Lewis",
                    time: "5 hours ago",
                    msg: "Check the System and Application logs in the Event Viewer for warnings or errors that coincide with the times the freezes occur.",
                    files: [
                      "Screenshot.png",
                      "Screenshot.png",
                      "Screenshot.png",
                      "Screenshot.png",
                    ],
                    count: 5,
                  },
                  {
                    name: "Jonelle Curtiss",
                    time: "5 hours ago",
                    msg: "Check for any pending updates and installing them to see if it resolves the issue",
                    files: [],
                    count: 9,
                  },
                ].map((reply, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/api/placeholder/48/48" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">
                          {reply.name}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Clock size={12} /> Updated {reply.time}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {reply.msg}
                      </p>

                      {/* Attachments */}
                      {reply.files.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          {reply.files.map((file, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-md px-3 py-1.5 text-xs font-medium text-slate-500">
                              {file}{" "}
                              <Download
                                size={14}
                                className="text-slate-400 cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs font-bold text-orange-500">
                        <button className="flex items-center gap-1 hover:underline">
                          <Reply size={14} className="-rotate-180" /> Reply
                        </button>
                        <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-medium">
                          <MessageSquare size={14} /> {reply.count || 1} Comment
                          {reply.count !== 1 ? "s" : ""}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex justify-center mt-12 pb-4">
                <Button className="bg-[#FF6B35] hover:bg-[#E85A20] px-8 h-10 gap-2">
                  <Plus size={18} className="rotate-45" /> Load More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Ticket Info Sidebar (25%) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-900">
                Ticket Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selectors */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Change Priority
                  </label>
                  <Select defaultValue="high">
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Assign To
                  </label>
                  <Select defaultValue="edgar">
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edgar">Edgar Hansel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Ticket Status
                  </label>
                  <Select defaultValue="open">
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* User Profiles */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/api/placeholder/40/40" />
                  </Avatar>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      User
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      Anthony Lewis
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/api/placeholder/40/40" />
                  </Avatar>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      Support Agent
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      Edgar Hansel
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Categorical Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                    Category
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    Repair & Service
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                    Email
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    Hellana@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                    Last Updated / Closed On
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    25 May 2024
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
