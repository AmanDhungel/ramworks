import React from "react";
import { CheckCircle2, Clock, Circle, Paperclip, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Types ---
type Attachment = {
  name: string;
  type: "image" | "pdf";
};

type TimelineEvent = {
  status: "SCHEDULED" | "CONFIRMED" | "IN-PROGRESS" | "COMPLETED";
  title: string;
  subtitle: string;
  description: string;
  timestamp: string;
  attachments?: Attachment[];
};

// --- Mock Data ---
const timelineData: TimelineEvent[] = [
  {
    status: "SCHEDULED",
    title: "System (Automated Recurring)",
    subtitle: "",
    description:
      "Quarterly HVAC maintenance automatically scheduled based on recurring maintenance plan.",
    timestamp: "Oct 15, 2024, 12:00 AM",
  },
  {
    status: "CONFIRMED",
    title: "Property Manager",
    subtitle: "",
    description:
      "Maintenance confirmed with CoolAir HVAC Services. Technician Robert Chen assigned.",
    timestamp: "Jan 10, 2025, 02:30 PM",
  },
  {
    status: "IN-PROGRESS",
    title: "Robert Chen (Technician)",
    subtitle: "",
    description:
      "Arrived on-site and started maintenance. Beginning with filter inspection and replacement.",
    timestamp: "Jan 15, 2025, 10:15 AM",
    attachments: [{ name: "initial-inspection.jpg", type: "image" }],
  },
  {
    status: "IN-PROGRESS",
    title: "Robert Chen (Technician)",
    subtitle: "",
    description:
      "Filters replaced successfully. Now proceeding with coolant level check and condenser cleaning. All readings are within normal parameters.",
    timestamp: "Jan 15, 2025, 12:30 PM",
    attachments: [{ name: "filter-replacement.jpg", type: "image" }],
  },
  {
    status: "COMPLETED",
    title: "Robert Chen (Technician)",
    subtitle: "",
    description:
      "All maintenance tasks completed successfully. System performance test shows optimal efficiency. No issues found. Next maintenance scheduled for April 15, 2025.",
    timestamp: "Jan 15, 2025, 03:30 PM",
    attachments: [
      { name: "completion-report.pdf", type: "pdf" },
      { name: "performance-test.jpg", type: "image" },
    ],
  },
];

// --- Sub-Components ---
const StatusBadge = ({ status }: { status: TimelineEvent["status"] }) => {
  const styles = {
    SCHEDULED: "bg-blue-50 text-blue-500 border-blue-100",
    CONFIRMED: "bg-cyan-50 text-cyan-500 border-cyan-100",
    "IN-PROGRESS": "bg-purple-50 text-purple-500 border-purple-100",
    COMPLETED: "bg-emerald-50 text-emerald-500 border-emerald-100",
  };

  return (
    <Badge
      variant="outline"
      className={`${styles[status]} text-[10px] font-bold px-2 py-0 h-5 tracking-tight`}>
      {status}
    </Badge>
  );
};

const TimelineItem = ({
  event,
  isLast,
}: {
  event: TimelineEvent;
  isLast: boolean;
}) => {
  const getIcon = () => {
    switch (event.status) {
      case "COMPLETED":
        return <CheckCircle2 className="h-5 w-5 text-emerald-400 bg-white" />;
      case "IN-PROGRESS":
        return (
          <Circle className="h-5 w-5 text-purple-400 bg-white fill-purple-50" />
        );
      default:
        return <Clock className="h-5 w-5 text-blue-400 bg-white" />;
    }
  };

  return (
    <div className="relative flex gap-4 pb-8">
      {!isLast && (
        <div className="absolute left-[9px] top-6 w-[2px] h-full bg-slate-100" />
      )}

      <div className="relative z-10 mt-1">{getIcon()}</div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <StatusBadge status={event.status} />
          <span className="text-[11px] text-slate-400">{event.timestamp}</span>
        </div>

        <h4 className="text-sm font-semibold text-slate-700">{event.title}</h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {event.description}
        </p>

        {event.attachments && (
          <div className="flex flex-wrap gap-2 mt-3">
            {event.attachments.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-md">
                <Paperclip className="h-3 w-3 text-slate-400" />
                <span className="text-[11px] text-slate-600">{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function TimelineTab() {
  return (
    <div className="mx-auto p-6 space-y-6  min-h-screen">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-600 text-sm font-semibold uppercase tracking-wider">
            Maintenance Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="ml-1">
            {timelineData.map((event, index) => (
              <TimelineItem
                key={index}
                event={event}
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completion & Rating Section */}
      <Card className="border-none shadow-sm">
        <CardContent className="flex flex-col items-center py-12 space-y-4">
          <div className="relative">
            <div className="bg-orange-50 p-3 rounded-full">
              <CheckCircle2
                className="h-10 w-10 text-orange-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="font-bold text-slate-800">Maintenance Completed</h3>
            <p className="text-xs text-slate-400">
              Please rate the service provided
            </p>
          </div>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-10 py-5 h-auto text-sm font-medium gap-2 shadow-sm transition-all active:scale-95">
            <Star className="h-4 w-4 fill-current" />
            Rate Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
