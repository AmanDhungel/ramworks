import React from "react";
import { Settings, Plus, ChevronUp, Home } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeavePolicy {
  id: string;
  label: string;
  isEnabled: boolean;
}

const initialPolicies: LeavePolicy[] = [
  { id: "annual", label: "Annual Leave", isEnabled: true },
  { id: "sick", label: "Sick Leave", isEnabled: false },
  { id: "hospitalisation", label: "Hospitalisation", isEnabled: true },
  { id: "maternity", label: "Maternity", isEnabled: true },
  { id: "paternity", label: "Paternity", isEnabled: false },
  { id: "lop", label: "LOP", isEnabled: false },
];

export default function LeaveSettings() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">
            Leave Settings
          </h1>
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Home className="w-3 h-3" />
            <span>/</span>
            <span>Employee</span>
            <span>/</span>
            <span className="font-medium text-slate-800">Leave Settings</span>
          </nav>
        </div>

        <div className="flex gap-2">
          <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white rounded-md px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus className="w-4 h-4 stroke-[3]" />
            Add Custom Policy
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white border-slate-200">
            <ChevronUp className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPolicies.map((policy) => (
          <Card
            key={policy.id}
            className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Switch
                  defaultChecked={policy.isEnabled}
                  className="data-[state=checked]:bg-[#F97316] data-[state=unchecked]:bg-slate-200"
                />
                <span className="font-bold text-[#1E293B] text-[15px]">
                  {policy.label}
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-sm text-slate-600 font-medium underline decoration-slate-300 underline-offset-4 group-hover:text-slate-900 transition-colors">
                  Custom Policy
                </span>
                <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
