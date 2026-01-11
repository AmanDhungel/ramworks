import React from "react";
import {
  LayoutGrid,
  List,
  Download,
  PlusCircle,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  PhoneCall,
  MessageSquare,
  FileText,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Mock Data Structures ---

const COLUMNS = [
  {
    id: "new",
    title: "New",
    count: 45,
    value: "$15,44,540",
    color: "bg-emerald-500",
  },
  {
    id: "prospect",
    title: "Prospect",
    count: 30,
    value: "$19,94,938",
    color: "bg-sky-500",
  },
  {
    id: "proposal",
    title: "Proposal",
    count: 25,
    value: "$10,36,390",
    color: "bg-orange-400",
  },
  {
    id: "won",
    title: "Won",
    count: 50,
    value: "$18,82,456",
    color: "bg-purple-500",
  },
];

const DEALS = [
  {
    id: 1,
    stage: "new",
    company: "Howell, Tremblay and Rath",
    initials: "HT",
    value: "3,50,000",
    email: "darleeo@gmail.com",
    phone: "(163) 2459 315",
    location: "Newyork, United States",
    owner: "Darlee Robertson",
    ownerImg: "https://i.pravatar.cc/150?u=darlee",
    productivity: 85,
    date: "10 Jan 2024",
  },
  {
    id: 2,
    stage: "new",
    company: "Robert, John and Carlos",
    initials: "RJ",
    value: "2,10,000",
    email: "sheron@gmail.com",
    phone: "(146) 1249 296",
    location: "Exeter, United States",
    owner: "Sharon Roy",
    ownerImg: "https://i.pravatar.cc/150?u=sharon",
    productivity: 15,
    date: "12 Jan 2024",
  },
];

const DealCard = ({ deal }: { deal: (typeof DEALS)[0] }) => (
  <Card className="mb-4 border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
    <CardContent className="p-4 space-y-4">
      {/* Header */}
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
          {deal.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-slate-800 truncate leading-tight hover:text-orange-500 cursor-pointer">
            {deal.company}
          </h4>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="font-bold text-slate-400">$</span>
          <span className="font-bold text-slate-700">${deal.value}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Mail size={12} className="text-slate-400" />
          <span className="truncate">{deal.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Phone size={12} className="text-slate-400" />
          <span>{deal.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <MapPin size={12} className="text-slate-400" />
          <span className="truncate">{deal.location}</span>
        </div>
      </div>

      {/* Owner Section */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={deal.ownerImg} />
            <AvatarFallback>{deal.owner[0]}</AvatarFallback>
          </Avatar>
          <span className="text-[11px] font-bold text-slate-700">
            {deal.owner}
          </span>
        </div>
        <Badge
          variant="secondary"
          className="bg-sky-50 text-sky-500 text-[9px] font-bold h-5 border-none px-1.5 flex gap-1">
          <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
            <circle cx="12" cy="12" r="10" />
          </svg>
          {deal.productivity}%
        </Badge>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
          <Calendar size={12} />
          {deal.date}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <PhoneCall
            size={14}
            className="cursor-pointer hover:text-slate-600"
          />
          <MessageSquare
            size={14}
            className="cursor-pointer hover:text-slate-600"
          />
          <FileText size={14} className="cursor-pointer hover:text-slate-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// --- Main Page ---

export default function DealsGridPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-6 font-sans">
      {/* Breadcrumb & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Deals</h1>
          <nav className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            / <span>CRM</span> /{" "}
            <span className="text-slate-600 font-medium">Deals List</span>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm h-9">
            <button className="px-3 border-r hover:bg-slate-50 text-slate-400">
              <List size={16} />
            </button>
            <button className="px-3 bg-slate-100 text-slate-600">
              <LayoutGrid size={16} />
            </button>
          </div>
          <Button
            variant="outline"
            className="bg-white border-slate-200 h-9 gap-2 text-xs font-bold text-slate-600 shadow-sm">
            <Download size={14} /> Export <ChevronDown size={14} />
          </Button>
          <Button className="bg-[#ff6b35] hover:bg-orange-600 text-white font-bold h-9 gap-2 shadow-sm">
            <PlusCircle size={16} /> Add New Deal
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 border border-slate-200 rounded-xl mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-bold text-slate-800 text-sm ml-2">Deals Grid</h3>
        <div className="flex items-center gap-3">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[160px] h-8 text-[11px] border-slate-200">
              <div className="flex items-center gap-1">
                <span className="text-slate-400">Sort By :</span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((col) => (
          <div key={col.id} className="space-y-4">
            {/* Column Header */}
            <div
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm border-t-4 border-t-transparent"
              style={{ borderTopColor: "transparent" }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2.5 w-2.5 rounded-full", col.color)} />
                  <h3 className="font-bold text-slate-800 text-sm">
                    {col.title}
                  </h3>
                </div>
                <div className="flex gap-2 text-slate-300">
                  <Plus
                    size={14}
                    className="cursor-pointer hover:text-slate-500"
                  />
                  <Edit2
                    size={14}
                    className="cursor-pointer hover:text-slate-500"
                  />
                  <Trash2
                    size={14}
                    className="cursor-pointer hover:text-slate-500"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold ml-4.5">
                {col.count} Leads - {col.value}
              </p>
              {/* Underline for branding */}
              <div
                className={cn(
                  "h-[3px] w-full rounded-full mt-4 opacity-40",
                  col.color
                )}
              />
            </div>

            {/* Column Deals */}
            <div className="space-y-4">
              {DEALS.filter((d) => d.stage === "new" || col.id !== "new")
                .slice(0, col.id === "new" ? 2 : 1)
                .map((deal) => (
                  <DealCard key={`${col.id}-${deal.id}`} deal={deal} />
                ))}

              {/* If no data, show placeholder or similar mockup items */}
              {col.id !== "new" && (
                <DealCard
                  deal={{
                    ...DEALS[0],
                    initials: "BR",
                    company: "Byron, Roman and Bailey",
                    value: "2,45,000",
                    stage: col.id,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Utility
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
