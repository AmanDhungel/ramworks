import React from "react";
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
  Legend,
} from "recharts";
import {
  Download,
  Calendar,
  Home,
  MoreVertical,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  ExternalLink,
  FileText,
  ChevronDown,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Mock Data ---
const dealsByStageData = [
  { name: "Inpipeline", value: 170 },
  { name: "Follow Up", value: 135 },
  { name: "Schedule", value: 200 },
  { name: "Conversion", value: 100 },
];

const wonDealsData = [
  { name: "Calls", value: 24, color: "#FF0000" },
  { name: "Email", value: 39, color: "#FFC107" },
  { name: "Chats", value: 20, color: "#4DB6AC" },
  { name: "Conversion", value: 48, color: "#455A64" },
];

const leadsBySourceData = [
  { name: "Google", value: 40, color: "#E91E63" },
  { name: "Paid", value: 35, color: "#FFC107" },
  { name: "Campaigns", value: 15, color: "#F06292" },
  { name: "Referals", value: 10, color: "#9C27B0" },
];

const recentContacts = [
  {
    name: "Darlee Robertson",
    role: "Facility Manager",
    email: "darlee@example.com",
    phone: "(163) 2459 315",
    img: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Sharon Roy",
    role: "Installer",
    email: "darlee@example.com",
    phone: "(146) 1249 296",
    img: "https://i.pravatar.cc/150?u=2",
  },
  {
    name: "Vaughan Lewis",
    role: "Senior Manager",
    email: "vaughan@example.com",
    phone: "(135) 3489 516",
    img: "https://i.pravatar.cc/150?u=3",
  },
];

const recentActivities = [
  {
    type: "call",
    text: "Drain responded to your appointment schedule question.",
    time: "09:25 PM",
    icon: <Phone className="w-4 h-4 text-emerald-500" />,
    bg: "bg-emerald-50",
  },
  {
    type: "msg",
    text: "You sent 1 Message to the James.",
    time: "10:25 PM",
    icon: <MessageSquare className="w-4 h-4 text-blue-500" />,
    bg: "bg-blue-50",
  },
  {
    type: "call",
    text: "Denwar responded to your appointment on 25 Jan 2025, 08:15 PM",
    time: "09:25 PM",
    icon: <Phone className="w-4 h-4 text-emerald-500" />,
    bg: "bg-emerald-50",
  },
];

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 bg-[#F8F9FC] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <nav className="flex items-center text-xs text-slate-500 mt-1 gap-1">
            <Home size={12} /> / CRM /{" "}
            <span className="text-slate-900 font-medium">Analytics</span>
          </nav>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white border-slate-200">
            <Download className="mr-2 h-4 w-4" /> Export{" "}
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
          <Button variant="outline" className="bg-white border-slate-200">
            <Calendar className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Recently Created Contacts */}
        <Card className="col-span-12 lg:col-span-6 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">
              Recently Created Contacts
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold">
              <Calendar className="w-3 h-3 mr-2" /> This Week
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-[#F8F9FC]">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase">
                    Contact
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Email
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Phone
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentContacts.map((contact, i) => (
                  <TableRow key={i} className="border-slate-100">
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-slate-100">
                        <AvatarImage src={contact.img} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-bold text-slate-800">
                          {contact.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {contact.role}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {contact.email}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {contact.phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Deals by Stage Bar Chart */}
        <Card className="col-span-12 lg:col-span-6 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">
              Deals by Stage
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold">
              <Calendar className="w-3 h-3 mr-2" /> This Week
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-2xl font-bold">98%</span>
              <Badge className="ml-2 bg-emerald-50 text-emerald-500 hover:bg-emerald-50 border-none">
                12%
              </Badge>
              <span className="ml-2 text-xs text-slate-400 font-medium">
                vs last years
              </span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dealsByStageData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip cursor={{ fill: "#F8FAFC" }} />
                  <Bar
                    dataKey="value"
                    fill="#F26522"
                    radius={[4, 4, 0, 0]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Won Deals Stage Pie Chart */}
        <Card className="col-span-12 lg:col-span-6 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">
              Won Deals Stage
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
              Sales Pipeline <ChevronDown size={14} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <p className="text-xs text-slate-400 font-bold uppercase">
                Stages Won This Year
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-2xl font-bold text-slate-800">
                  $45,899,79
                </span>
                <Badge className="bg-red-50 text-red-500 hover:bg-red-50 text-[10px] px-1 h-5">
                  $45,899,79
                </Badge>
              </div>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center relative">
              {/* Custom Circular Bubble Chart Representation using PieChart */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wonDealsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value">
                    {wonDealsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend overlay to match design positions */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-[10px] font-bold text-white">
                  <div className="text-center">
                    Calls
                    <br />
                    24%
                  </div>
                  <div className="text-center">
                    Email
                    <br />
                    39%
                  </div>
                  <div className="text-center">
                    Conversion
                    <br />
                    48%
                  </div>
                  <div className="text-center">
                    Chats
                    <br />
                    20%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities List */}
        <Card className="col-span-12 lg:col-span-6 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">
              Recent Activities
            </CardTitle>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 text-[10px] font-bold bg-slate-100">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Vertical Line */}
                {i !== recentActivities.length - 1 && (
                  <div className="absolute left-[15px] top-[32px] bottom-[-24px] w-[1px] bg-slate-100" />
                )}
                <div
                  className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${activity.bg}`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {activity.text}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium uppercase tracking-wider">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Avatar className="w-4 h-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Meeting With{" "}
                  <span className="flex items-center gap-1 inline-flex">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src="https://i.pravatar.cc/150?u=4" />
                    </Avatar>{" "}
                    Abraham
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium uppercase">
                  09:25 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads by Source Donut Chart */}
        <Card className="col-span-12 lg:col-span-6 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">
              Leads by Source
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold">
              <Calendar className="w-3 h-3 mr-2" /> This Week
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[250px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsBySourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none">
                    {leadsBySourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <p className="text-xs text-slate-400 font-medium">Google</p>
                <p className="text-2xl font-bold">40%</p>
              </div>
            </div>
            <div className="w-full mt-4 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase">
                Status
              </p>
              {leadsBySourceData.map((source, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-sm text-slate-500 font-medium">
                      {source.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {source.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Created Companies */}
        <Card className="col-span-12 lg:col-span-6 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">
              Recently Created Companies
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold">
              <Calendar className="w-3 h-3 mr-2" /> This Week
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-[#F8F9FC]">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase">
                    Company Name
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Email
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Phone
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "BrightWave Innovations",
                    email: "darlee@example.com",
                    phone: "(163) 2459 315",
                    iconColor: "bg-indigo-100 text-indigo-600",
                  },
                  {
                    name: "Stellar Dynamics",
                    email: "darlee@example.com",
                    phone: "(146) 1249 296",
                    iconColor: "bg-emerald-100 text-emerald-600",
                  },
                  {
                    name: "Quantum Nexus",
                    email: "jessica@example.com",
                    phone: "(148) 1229 235",
                    iconColor: "bg-blue-100 text-blue-600",
                  },
                ].map((company, i) => (
                  <TableRow key={i} className="border-slate-100">
                    <TableCell className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${company.iconColor}`}>
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        {company.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {company.email}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {company.phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
