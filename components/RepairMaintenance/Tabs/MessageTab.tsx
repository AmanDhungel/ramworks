import React from "react";
import {
  CheckCircle2,
  Clock,
  Circle,
  Paperclip,
  Star,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RAMResponse } from "@/services/RAM.service";

// --- Types ---
type Attachment = {
  name: string;
  type: "image" | "pdf";
};

type TimelineEvent = {
  status: "SCHEDULED" | "CONFIRMED" | "IN-PROGRESS" | "COMPLETED";
  title: string;
  description: string;
  timestamp: string;
  attachments?: Attachment[];
};

type ThreadMessage = {
  sender: string;
  badge: string;
  content: string;
  timeAgo: string;
  attachment?: string;
};

// --- Mock Data ---
const timelineData: TimelineEvent[] = [
  {
    status: "SCHEDULED",
    title: "System (Automated Recurring)",
    description:
      "Quarterly HVAC maintenance automatically scheduled based on recurring maintenance plan.",
    timestamp: "Oct 15, 2024, 12:00 AM",
  },
  {
    status: "CONFIRMED",
    title: "Property Manager",
    description:
      "Maintenance confirmed with CoolAir HVAC Services. Technician Robert Chen assigned.",
    timestamp: "Jan 10, 2025, 02:30 PM",
  },
  {
    status: "IN-PROGRESS",
    title: "Robert Chen (Technician)",
    description:
      "Arrived on-site and started maintenance. Beginning with filter inspection and replacement.",
    timestamp: "Jan 15, 2025, 10:15 AM",
    attachments: [{ name: "initial-inspection.jpg", type: "image" }],
  },
  {
    status: "IN-PROGRESS",
    title: "Robert Chen (Technician)",
    description:
      "Filters replaced successfully. Now proceeding with coolant level check and condenser cleaning. All readings are within normal parameters.",
    timestamp: "Jan 15, 2025, 12:30 PM",
    attachments: [{ name: "filter-replacement.jpg", type: "image" }],
  },
  {
    status: "COMPLETED",
    title: "Robert Chen (Technician)",
    description:
      "All maintenance tasks completed successfully. System performance test shows optimal efficiency. No issues found. Next maintenance scheduled for April 15, 2025.",
    timestamp: "Jan 15, 2025, 03:30 PM",
    attachments: [
      { name: "completion-report.pdf", type: "pdf" },
      { name: "performance-test.jpg", type: "image" },
    ],
  },
];

const threadData: ThreadMessage[] = [
  {
    sender: "System",
    badge: "Scheduled",
    content:
      "Quarterly HVAC maintenance MAINT-2025-042 has been automatically scheduled for January 15, 2025 at 10:00 AM.",
    timeAgo: "434d ago",
  },
  {
    sender: "CoolAir HVAC",
    badge: "Scheduled",
    content:
      "We have confirmed the scheduled maintenance. Our lead technician Robert Chen will handle this service.",
    timeAgo: "346d ago",
  },
  {
    sender: "Robert Chen",
    badge: "Scheduled",
    content: "Arriving on-site now. Will begin inspection shortly.",
    timeAgo: "343d ago",
  },
  {
    sender: "Robert Chen",
    badge: "Scheduled",
    content:
      "Maintenance progressing well. Filters replaced and coolant levels are optimal. Proceeding with condenser cleaning.",
    timeAgo: "343d ago",
  },
  {
    sender: "Robert Chen",
    badge: "Scheduled",
    content:
      "All work completed successfully! System is running at optimal efficiency. Performance report and invoice will be uploaded shortly. Next maintenance recommended for April 15, 2025.",
    timeAgo: "343d ago",
    attachment: "performance-report.pdf",
  },
];

// --- Sub-Components ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    SCHEDULED: "bg-blue-50 text-blue-500 border-blue-100",
    CONFIRMED: "bg-cyan-50 text-cyan-500 border-cyan-100",
    "IN-PROGRESS": "bg-purple-50 text-purple-500 border-purple-100",
    COMPLETED: "bg-emerald-50 text-emerald-500 border-emerald-100",
    Scheduled: "bg-slate-50 text-slate-500 border-slate-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${
        styles[status] || styles["Scheduled"]
      } text-[10px] font-bold px-2 py-0 h-5`}>
      {status}
    </Badge>
  );
};

export default function MessageTab({ data }: { data?: RAMResponse }) {
  return (
    <div className=" mx-auto p-6 space-y-8 min-h-screen">
      <Card className="border border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-white py-4">
          <CardTitle className="text-slate-700 text-lg font-bold">
            Communication Thread
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3 bg-white">
          {threadData.map((msg, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700">
                    {msg.sender}
                  </span>
                  <StatusBadge status={msg.badge} />
                </div>
                <span className="text-[11px] text-slate-400">
                  {msg.timeAgo}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {msg.content}
              </p>
              {msg.attachment && (
                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-white border border-slate-100 rounded text-slate-500 cursor-pointer shadow-sm">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-[11px] font-medium">
                    {msg.attachment}
                  </span>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="flex flex-col items-center py-12 space-y-4">
          <div className="bg-white p-2 border-2 border-orange-500 rounded-full">
            <CheckCircle className="h-8 w-8 text-orange-500" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-800">
              Maintenance Completed
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Please rate the service provided
            </p>
          </div>
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-md px-10 py-5 h-auto text-sm font-medium gap-2 shadow-sm">
            <Star className="h-4 w-4 fill-white" />
            Rate Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
