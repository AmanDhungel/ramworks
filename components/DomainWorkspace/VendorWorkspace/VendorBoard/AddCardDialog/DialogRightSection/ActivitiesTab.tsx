import { Card } from "@/components/ui/card";
import { MessageSquare, StickyNote } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function ActivitiesTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Activities</h2>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Sort By: Last 7 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Badge variant="secondary" className="bg-purple-50 text-purple-600">
          15 Feb 2024
        </Badge>

        <Card className="p-4 flex gap-4 items-start border-slate-100">
          <div className="p-2 bg-cyan-100 rounded-full text-cyan-600">
            <MessageSquare size={20} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              You sent 1 Message to the contact.
            </p>
            <p className="text-sm text-gray-400">10:25 pm</p>
          </div>
        </Card>

        <Card className="p-4 flex gap-4 items-start border-slate-100">
          <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
            <StickyNote size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold">Notes added by Antony</p>
              <p className="text-sm text-gray-400">10:00 pm</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Please accept my apologies for the inconvenience caused...
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
