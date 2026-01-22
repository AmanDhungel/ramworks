import React from "react";
import {
  CheckCircle2,
  Clock,
  Circle,
  Paperclip,
  Star,
  Download,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RAMResponse } from "@/services/RAM.service";

// --- Types & Data Models ---
type MaintenanceLog = {
  status: "SCHEDULED" | "CONFIRMED" | "IN-PROGRESS" | "COMPLETED";
  actor: string;
  description: string;
  timestamp: string;
  files?: string[];
};

type Message = {
  sender: string;
  tag: string;
  content: string;
  timeAgo: string;
  file?: string;
};

type Document = {
  name: string;
  size: string;
  date: string;
};

// --- Mock Data ---
const maintenanceLogs: MaintenanceLog[] = [
  {
    status: "SCHEDULED",
    actor: "System (Automated Recurring)",
    description:
      "Quarterly HVAC maintenance automatically scheduled based on recurring maintenance plan.",
    timestamp: "Oct 15, 2024, 12:00 AM",
  },
  {
    status: "CONFIRMED",
    actor: "Property Manager",
    description:
      "Maintenance confirmed with CoolAir HVAC Services. Technician Robert Chen assigned.",
    timestamp: "Jan 10, 2025, 02:30 PM",
  },
  {
    status: "IN-PROGRESS",
    actor: "Robert Chen (Technician)",
    description:
      "Arrived on-site and started maintenance. Beginning with filter inspection and replacement.",
    timestamp: "Jan 15, 2025, 10:15 AM",
    files: ["initial-inspection.jpg"],
  },
  {
    status: "IN-PROGRESS",
    actor: "Robert Chen (Technician)",
    description:
      "Filters replaced successfully. Now proceeding with coolant level check and condenser cleaning. All readings are within normal parameters.",
    timestamp: "Jan 15, 2025, 12:30 PM",
    files: ["filter-replacement.jpg"],
  },
  {
    status: "COMPLETED",
    actor: "Robert Chen (Technician)",
    description:
      "All maintenance tasks completed successfully. System performance test shows optimal efficiency. No issues found. Next maintenance scheduled for April 15, 2025.",
    timestamp: "Jan 15, 2025, 03:30 PM",
    files: ["completion-report.pdf", "performance-test.jpg"],
  },
];

const messages: Message[] = [
  {
    sender: "System",
    tag: "Scheduled",
    content:
      "Quarterly HVAC maintenance MAINT-2025-042 has been automatically scheduled for January 15, 2025 at 10:00 AM.",
    timeAgo: "434d ago",
  },
  {
    sender: "CoolAir HVAC",
    tag: "Scheduled",
    content:
      "We have confirmed the scheduled maintenance. Our lead technician Robert Chen will handle this service.",
    timeAgo: "346d ago",
  },
  {
    sender: "Robert Chen",
    tag: "Scheduled",
    content: "Arriving on-site now. Will begin inspection shortly.",
    timeAgo: "343d ago",
  },
  {
    sender: "Robert Chen",
    tag: "Scheduled",
    content:
      "Maintenance progressing well. Filters replaced and coolant levels are optimal. Proceeding with condenser cleaning.",
    timeAgo: "343d ago",
  },
  {
    sender: "Robert Chen",
    tag: "Scheduled",
    content:
      "All work completed successfully! System is running at optimal efficiency. Performance report and invoice will be uploaded shortly.",
    timeAgo: "343d ago",
    file: "performance-report.pdf",
  },
];

const documents: Document[] = [
  {
    name: "Maintenance Checklist.pdf",
    size: "156 KB",
    date: "Jan 15, 2025, 03:45 PM",
  },
  {
    name: "Performance Report.pdf",
    size: "234 KB",
    date: "Jan 15, 2025, 04:00 PM",
  },
  {
    name: "Parts Replaced Log.pdf",
    size: "89 KB",
    date: "Jan 15, 2025, 04:10 PM",
  },
];

// --- Helper Components ---
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    SCHEDULED: "bg-blue-50 text-blue-500 border-blue-100",
    CONFIRMED: "bg-cyan-50 text-cyan-500 border-cyan-100",
    "IN-PROGRESS": "bg-purple-50 text-purple-500 border-purple-100",
    COMPLETED: "bg-emerald-50 text-emerald-500 border-emerald-100",
    Scheduled: "bg-slate-100 text-slate-500 border-slate-200",
  };
  return (
    <Badge
      variant="outline"
      className={`${
        variants[status] || variants["Scheduled"]
      } text-[10px] font-bold px-2 py-0 h-5 uppercase tracking-tight`}>
      {status}
    </Badge>
  );
};

export default function FilesTab({ data }: { data?: RAMResponse }) {
  return (
    <div className="mx-auto p-6 space-y-8  min-h-screen font-sans">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-700 text-lg font-bold">
            Communication Thread
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-white group hover:border-blue-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-md">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700">
                    {doc.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                    {doc.size} • {doc.date}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 group-hover:text-blue-500">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full mt-4 border-slate-200 text-slate-700 font-bold gap-2 py-6">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </CardContent>
      </Card>

      {/* 4. COMPLETION FOOTER */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="flex flex-col items-center py-10 space-y-4 text-center">
          <div className="bg-white p-3 border-2 border-orange-500 rounded-full shadow-sm">
            <CheckCircle2 className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Maintenance Completed
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Please rate the service provided
            </p>
          </div>
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-md px-10 py-5 h-auto text-sm font-bold gap-2">
            <Star className="h-4 w-4 fill-white" />
            Rate Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
