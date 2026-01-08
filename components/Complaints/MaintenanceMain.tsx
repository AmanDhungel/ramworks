"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ActiveRequests } from "./ActiveRequest";
import { RequestDetails } from "./RequestDetails";
import RequestHistory from "./RequestHistory";
import MaintenanceRequestForm from "./NewRequestForm";

export default function MaintenanceMain() {
  return (
    <div className="p-8 pl-0 sm:pl-2 min-h-screen">
      <div className="flex flex-col gap-6  mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Maintenance & Repairs
          </h1>
          <p className="text-slate-500 text-sm">
            Submit and track all maintenance requests
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <SummaryCard label="Active" value={1} color="orange" icon="●" />
          <SummaryCard label="Resolved" value={2} color="green" icon="✓" />
          <SummaryCard label="Urgent" value={2} color="red" icon="!" />
        </div>

        <Tabs defaultValue="new" className="w-full mt-4">
          <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start rounded-none h-12 p-0 gap-8">
            <TabsTrigger value="new" className="tab-style">
              New
            </TabsTrigger>
            <TabsTrigger value="active" className="tab-style">
              Active
            </TabsTrigger>
            <TabsTrigger value="history" className="tab-style">
              History
            </TabsTrigger>
            <TabsTrigger value="details" className="tab-style">
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-6">
            <MaintenanceRequestForm />
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            <ActiveRequests />
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <RequestHistory />
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <RequestDetails />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color, icon }: any) {
  const colors: any = {
    orange: "text-orange-500 bg-orange-50",
    green: "text-emerald-500 bg-emerald-50",
    red: "text-red-500 bg-red-50",
  };
  return (
    <Card className="p-6 flex flex-row items-center gap-4">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-bold">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </Card>
  );
}
