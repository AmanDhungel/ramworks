import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { RAMResponse } from "@/services/RAM.service";

type MaintenanceTask = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  assignee: string;
  frequency: string;
  duration: string;
  lastCompleted: string;
  nextScheduled: string;
  upcomingDates: string[];
  property: {
    name: string;
    address: string;
    location: string;
  };
  provider: {
    name: string;
    rating: number;
    technician: string;
    techId: string;
    phone: string;
    email: string;
    cost: string;
    started: string;
    completed: string;
  };
};

const maintenanceData: MaintenanceTask = {
  id: "1",
  title: "HVAC System Quarterly Maintenance",
  description:
    "Routine quarterly maintenance of all HVAC systems in Building A. Includes filter replacement, coolant level check, condenser cleaning, thermostat calibration, and overall system performance evaluation.",
  tags: ["Preventive", "Recurring", "Hvac", "Scheduled"],
  category: "Hvac",
  assignee: "Mike Wilson",
  frequency: "Quarterly",
  duration: "5 hours 15 minutes",
  lastCompleted: "Oct 15, 2024, 10:00 AM",
  nextScheduled: "Jan 15, 2025, 10:00 AM",
  upcomingDates: [
    "Apr 15, 2025, 10:00 AM",
    "Jul 15, 2025, 10:00 AM",
    "Oct 15, 2025, 10:00 AM",
  ],
  property: {
    name: "Sunset Apartments",
    address: "123 Main St, Building A",
    location: "Building A - Common Area",
  },
  provider: {
    name: "CoolAir HVAC Services",
    rating: 4.8,
    technician: "Robert Chen",
    techId: "TECH-2045",
    phone: "+1 (555) 123-4567",
    email: "lorem@email.com",
    cost: "$920",
    started: "Jan 15, 2025, 10:15 AM",
    completed: "Jan 15, 2025, 03:30 PM",
  },
};

const OverviewTab = ({ data }: { data?: RAMResponse }) => {
  return (
    <div className="mx-auto p-6 space-y-6 min-h-screen">
      {/* SECTION 1: Maintenance Details */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-600 text-sm font-semibold uppercase tracking-wider">
            Maintenance Details
          </CardTitle>
          <h1 className="text-xl font-bold pt-2">{data?.title}</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-4xl">
            {data?.internal_notes}
          </p>
          <div className={`flex gap-2 ${data?.tags && "mt-4"}`}>
            {data?.tags &&
              data?.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-slate-100 text-slate-500 font-normal px-3 py-1">
                  {tag}
                </Badge>
              ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <div>
              <p className="text-xs text-slate-400 uppercase">Category</p>
              <p className="font-semibold">{data?.domain_workspace?.title}</p>
            </div>
            <div className="text-right md:text-left">
              <p className="text-xs text-slate-400 uppercase">Type</p>
              <p className="font-semibold">{data?.type}</p>
            </div>
            {/* <div>
              <p className="text-xs text-slate-400 uppercase">Frequency</p>
              <p className="font-semibold">{data.frequency}</p>
            </div> */}
            <div className="text-right md:text-left">
              <p className="text-xs text-slate-400 uppercase">Duration</p>
              <p className="font-semibold">{data?.estimated_duration}</p>
            </div>
            {/* <div>
              <p className="text-xs text-slate-400 uppercase">Last Completed</p>
              <p className="font-semibold text-sm">
                {maintenanceData.lastCompleted}
              </p>
            </div> */}
            <div className="text-right md:text-left">
              <p className="text-xs text-slate-400 uppercase">Next Scheduled</p>
              <p className="font-semibold text-sm">
                {data?.date?.split("T")[0]} At {data?.time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: Recurring Schedule */}
      {/* <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <h2 className="text-lg font-bold mb-4">Recurring Schedule</h2>
          <p className="text-xs text-slate-400 uppercase mb-1">Frequency</p>
          <p className="font-semibold mb-4">{maintenanceData.frequency}</p>

          <p className="text-xs text-slate-400 uppercase mb-2">
            Upcoming Occurrences
          </p>
          <div className="space-y-2">
            {maintenanceData.upcomingDates.map((date, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-blue-700 text-sm">
                <Calendar className="h-4 w-4" />
                {date}
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* SECTION 3: Photos Grid */}
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <h2 className="text-lg font-bold mb-4">Photos (4)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="aspect-[3/1] bg-slate-200 rounded-lg overflow-hidden relative">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg"
                  alt="Unit"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                HVAC Unit - Before Maintenance
              </p>
            </div>
            <div className="space-y-1">
              <div className="aspect-[3/1] bg-slate-200 rounded-lg overflow-hidden relative">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg"
                  alt="Filter"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-[10px] text-slate-400">Filter Replacement</p>
            </div>
            <div className="space-y-1">
              <div className="aspect-[3/1] bg-slate-200 rounded-lg overflow-hidden relative">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg"
                  alt="Cleaning"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-[10px] text-slate-400">Condenser Cleaning</p>
            </div>
            <div className="space-y-1">
              <div className="aspect-[3/1] bg-slate-200 rounded-lg overflow-hidden relative">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg"
                  alt="Test"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                System Performance Test
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-bold">Property Information</h2>
          <div>
            <p className="text-xs text-slate-400 uppercase">Property</p>
            <p className="font-bold text-sm">{data?.location}</p>
            {/* <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
              <MapPin className="h-3 w-3" /> {data.}
            </div> */}
          </div>
          {/* <div>
            <p className="text-xs text-slate-400 uppercase">Location</p>
            <p className="font-bold text-sm">
              {data.}
            </p>
            <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
              <MapPin className="h-3 w-3" /> {maintenanceData.property.address}
            </div>
          </div> */}
        </CardContent>
      </Card>

      {/* <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-bold">Service Provider</h2>
            <Badge className="bg-emerald-50 text-emerald-600 border-none hover:bg-emerald-50 text-[10px]">
              Assigned
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-bold text-blue-600">
                {maintenanceData.provider.name}
              </p>
              <p className="text-[10px] text-slate-400">HVAC Services</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">
                  {maintenanceData.provider.rating}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase">
                Assigned Technician
              </p>
              <p className="font-bold text-sm">
                {maintenanceData.provider.technician}
              </p>
              <p className="text-xs text-slate-400 uppercase mt-1">
                ID: {maintenanceData.provider.techId}
              </p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1 text-slate-500 text-xs">
                  <Phone className="h-3 w-3" /> {maintenanceData.provider.phone}
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs">
                  <Mail className="h-3 w-3" /> {maintenanceData.provider.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-xs text-slate-400">Scheduled</p>
                <p className="text-xs font-semibold">
                  {maintenanceData.nextScheduled}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Started</p>
                <p className="text-xs font-semibold">
                  {maintenanceData.provider.started}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Completed</p>
                <p className="text-xs font-semibold">
                  {maintenanceData.provider.completed}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Cost</p>
                <p className="text-lg font-bold text-emerald-500">
                  {maintenanceData.provider.cost}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* FOOTER: Completion Status */}
      <div className="flex flex-col items-center py-8 space-y-3">
        <div className="bg-white p-2 rounded-full shadow-sm">
          <CheckCircle2
            className="h-10 w-10 text-orange-500"
            strokeWidth={1.5}
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-700">Maintenance Completed</p>
          <p className="text-xs text-slate-400">
            Please rate the service provided
          </p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-8 py-2 gap-2">
          <Star className="h-4 w-4" /> Rate Service
        </Button>
      </div>
    </div>
  );
};

export default OverviewTab;
