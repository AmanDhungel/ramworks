import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, PlayCircle, Paperclip } from "lucide-react";
import { AddTimelineDialog } from "./AddTimeline";

export function TimelineTab() {
  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">
          Maintenance Details
        </h2>
        <AddTimelineDialog />
      </div>

      <div className="relative space-y-8 left-4 border-l-2 border-slate-100 pl-8">
        {/* Step: Scheduled */}
        <div className="relative">
          <Clock
            className="absolute -left-[45px] bg-white text-blue-400 p-1 rounded-full border"
            size={28}
          />
          <div className="flex justify-between">
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 uppercase text-[10px]">
              Scheduled
            </Badge>
            <span className="text-xs text-gray-400">
              Oct 16, 2024, 12:00 AM
            </span>
          </div>
          <h4 className="font-semibold mt-1">System (Automated Recurring)</h4>
          <p className="text-sm text-gray-500">
            Quarterly HVAC maintenance automatically scheduled.
          </p>
        </div>

        {/* Step: In Progress with Attachments */}
        <div className="relative">
          <PlayCircle
            className="absolute -left-[45px] bg-white text-purple-400 p-1 rounded-full border"
            size={28}
          />
          <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 uppercase text-[10px]">
            In-Progress
          </Badge>
          <h4 className="font-semibold mt-1">Robert Chen (Technician)</h4>
          <p className="text-sm text-gray-500">
            Filters replaced successfully. Proceeding with coolant level check.
          </p>
          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-1 text-xs border rounded-md px-2 py-1 bg-slate-50">
              <Paperclip size={12} /> filter-replacement.jpg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
