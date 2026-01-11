import React from "react";
import {
  Download,
  Calendar,
  ChevronDown,
  MoreVertical,
  Phone,
  MessageSquare,
  Mail,
  User,
  Eye,
  ArrowUpRight,
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
  Sector,
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const BAR_DATA = [
  { name: "Inpipeline", value: 170 },
  { name: "Follow Up", value: 130 },
  { name: "Schedule", value: 200 },
  { name: "Conversion", value: 100 },
];

const SOURCE_DATA = [
  { name: "Google", value: 40, color: "#005f73" },
  { name: "Paid", value: 35, color: "#ffb703" },
  { name: "Campaigns", value: 15, color: "#e94560" },
  { name: "Referals", value: 10, color: "#9d4edd" },
];

const RECENT_DEALS = [
  {
    name: "Collins",
    stage: "Quality To Buy",
    value: "$4,50,000",
    owner: "Anthony Lewis",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Konopelski",
    stage: "Proposal Made",
    value: "$3,15,000",
    owner: "Brian Villalobos",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    name: "Adams",
    stage: "Contact Made",
    value: "$8,40,000",
    owner: "Harvey Smith",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
];

// --- Sub-Components ---

const Card = ({ title, children, extra, footerLink }: any) => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full">
    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-bold text-slate-800 text-[15px]">{title}</h3>
      {extra}
    </div>
    <div className="p-5 flex-1">{children}</div>
    {footerLink && (
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-center">
        <button className="text-xs font-semibold text-blue-600 hover:underline">
          {footerLink}
        </button>
      </div>
    )}
  </div>
);

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) => {
  const styles: any = {
    Contacted: "bg-slate-100 text-slate-600",
    Closed: "bg-emerald-100 text-emerald-600",
    Lost: "bg-red-100 text-red-600",
    "Not Contacted": "bg-purple-100 text-purple-600",
  };
  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-[10px] font-bold uppercase",
        styles[variant as string]
      )}>
      {children}
    </span>
  );
};

// --- Main Dashboard ---

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 font-sans text-slate-600">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1d1f]">Analytics</h1>
          <nav className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="hover:text-slate-600 cursor-pointer">CRM</span>
            <span>/</span>
            <span className="text-slate-600">Analytics</span>
          </nav>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm font-medium shadow-sm">
            <Download size={16} /> Export <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm font-medium shadow-sm">
            <Calendar size={16} />{" "}
            <span className="w-24 text-left">Select Date</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Recently Created Contacts */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <Card
            title="Recently Created Contacts"
            extra={
              <button className="text-xs border px-2 py-1 rounded flex items-center gap-1">
                <Calendar size={12} /> This Week
              </button>
            }>
            <div className="space-y-5">
              {[
                {
                  name: "Darlee Robertson",
                  role: "Facility Manager",
                  email: "darlee@example.com",
                  phone: "(163) 2459 315",
                  img: "https://i.pravatar.cc/150?u=9",
                },
                {
                  name: "Sharon Roy",
                  role: "Installer",
                  email: "darlee@example.com",
                  phone: "(146) 1249 296",
                  img: "https://i.pravatar.cc/150?u=10",
                },
                {
                  name: "Vaughan Lewis",
                  role: "Senior Manager",
                  email: "vaughan@example.com",
                  phone: "(135) 3489 516",
                  img: "https://i.pravatar.cc/150?u=11",
                },
              ].map((contact, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img
                      src={contact.img}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none mb-1">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-400">{contact.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-medium text-slate-500">
                      {contact.email}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Won Deals Stage"
            extra={
              <button className="text-xs font-semibold flex items-center gap-1">
                Sales Pipeline <ChevronDown size={14} />
              </button>
            }>
            <div className="text-center mb-4">
              <p className="text-xs text-slate-400">Stages Won This Year</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-slate-800">
                  $45,899,79
                </span>
                <span className="bg-red-50 text-red-500 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  $45,899,79
                </span>
              </div>
            </div>
            {/* Venn-style Mockup using Recharts Pie or Custom Circles */}
            <div className="h-[200px] relative flex items-center justify-center">
              <div className="absolute w-32 h-32 rounded-full bg-[#3a6375] flex flex-col items-center justify-center text-white text-center border-2 border-white shadow-lg z-10 translate-x-[-20%]">
                <span className="text-[10px]">Conversion</span>
                <span className="font-bold">48%</span>
              </div>
              <div className="absolute w-24 h-24 rounded-full bg-[#ef233c] flex flex-col items-center justify-center text-white text-center border-2 border-white shadow-lg z-20 translate-y-[-40%] translate-x-[20%]">
                <span className="text-[10px]">Calls</span>
                <span className="font-bold">24%</span>
              </div>
              <div className="absolute w-28 h-28 rounded-full bg-[#ffb703] flex flex-col items-center justify-center text-white text-center border-2 border-white shadow-lg z-10 translate-x-[40%] translate-y-[20%]">
                <span className="text-[10px]">Email</span>
                <span className="font-bold">39%</span>
              </div>
              <div className="absolute w-24 h-24 rounded-full bg-[#2a9d8f] flex flex-col items-center justify-center text-white text-center border-2 border-white shadow-lg z-30 translate-y-[50%] translate-x-[-10%]">
                <span className="text-[10px]">Chats</span>
                <span className="font-bold">20%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Deals by Stage & Activities */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Card
            title="Deals by Stage"
            extra={
              <button className="text-xs border px-2 py-1 rounded flex items-center gap-1">
                <Calendar size={12} /> This Week
              </button>
            }>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-slate-800">98%</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-500 font-bold px-1.5 py-0.5 rounded">
                12%
              </span>
              <span className="text-[10px] text-slate-400">vs last years</span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BAR_DATA}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                  />
                  <Tooltip cursor={{ fill: "#f8fafc" }} />
                  <Bar
                    dataKey="value"
                    fill="#f26522"
                    radius={[4, 4, 0, 0]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card
            title="Recent Activities"
            extra={
              <button className="text-xs font-bold text-slate-400 hover:text-slate-600">
                View All
              </button>
            }>
            <div className="space-y-6">
              {[
                {
                  icon: <Phone size={16} />,
                  color: "bg-emerald-50 text-emerald-600",
                  text: "Drain responded to your appointment schedule question.",
                  time: "09:25 PM",
                },
                {
                  icon: <MessageSquare size={16} />,
                  color: "bg-blue-50 text-blue-600",
                  text: "You sent 1 Message to the James.",
                  time: "10:25 PM",
                },
                {
                  icon: <User size={16} />,
                  color: "bg-purple-50 text-purple-600",
                  text: "Meeting With Abraham",
                  time: "09:25 PM",
                  meta: true,
                },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                      activity.color
                    )}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 leading-snug">
                      {activity.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-slate-400">
                        {activity.time}
                      </span>
                      {activity.meta && (
                        <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                          <Image
                            alt="name"
                            src="https://i.pravatar.cc/150?u=5"
                            className="w-4 h-4 rounded-full"
                          />
                          <span className="text-[10px] font-bold">Abraham</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Full Width - Recent Deals */}
        <div className="col-span-12">
          <Card
            title="Recent Deals"
            extra={
              <button className="text-xs bg-slate-100 px-3 py-1 rounded font-bold">
                View All
              </button>
            }>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Deal Name
                    </th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Deal Value
                    </th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Probability
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {RECENT_DEALS.map((deal, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-sm font-bold text-slate-800">
                        {deal.name}
                      </td>
                      <td className="py-4 text-sm text-slate-500">
                        {deal.stage}
                      </td>
                      <td className="py-4 text-sm font-bold text-slate-700">
                        {deal.value}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Image
                            src={deal.avatar}
                            className="w-7 h-7 rounded-full"
                            alt="name"
                          />
                          <span className="text-sm font-medium text-slate-700">
                            {deal.owner}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400 w-[70%]" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between text-[11px] text-slate-400 font-medium">
        <p>© 2024 - 2025 SmartHR.</p>
        <p>
          Designed & Developed By{" "}
          <span className="text-orange-500">Dreams</span>
        </p>
      </div>
    </div>
  );
}
