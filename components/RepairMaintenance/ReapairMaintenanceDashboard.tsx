"use client";
import React from "react";
import {
  Search,
  Filter,
  Plus,
  Clock,
  Wrench,
  CheckCircle2,
  DollarSign,
  Download,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { CreateMaintenanceDialog } from "./CreateMaintenanceItemDialog/MaintainanceDialog";

const MaintenanceDashboard = () => {
  const stats = [
    {
      label: "Pending",
      value: "2",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "In Progress",
      value: "2",
      icon: Wrench,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Completed",
      value: "1",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Cost",
      value: "$9,750",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  const tickets = [
    {
      id: 1,
      title: "HVAC System Quarterly Maintenance",
      priority: "MEDIUM",
      location: "Sunset Apartments • Building A - Common Area",
      description:
        "Routine HVAC system inspection, filter replacement, and performance check",
      tags: ["Recurring", "Hvac", "Quarterly"],
      provider: "CoolAir HVAC Services",
      assigned: "Tech Team Av50",
      nextScheduled: "Feb 15, 2025, 10:00 AM",
      cost: "$850 (est.)",
      status: "SCHEDULED",
      icon: RefreshCw,
      iconColor: "text-orange-400",
    },
    {
      id: 2,
      title: "Leaking Faucet - Unit 301",
      priority: "HIGH",
      location: "Sunset Apartments • Unit 301",
      description: "Kitchen faucet leaking continuously, causing water wastage",
      tags: ["Recurring", "Plumbing"],
      provider: "QuickFix Plumbing",
      assigned: "Mike Wilson",
      nextScheduled: "Jan 19, 2025, 09:00 AM",
      cost: "$320",
      status: "IN PROGRESS",
      icon: AlertCircle,
      iconColor: "text-red-400",
    },
    {
      id: 3,
      title: "Exterior Wall Repainting - Building B",
      priority: "LOW",
      location: "Sunset Apartments • Building B - Exterior",
      description:
        "Complete exterior wall repainting including prep work and two coats",
      tags: ["Scheduled", "Painting"],
      provider: "Premium Painters Inc",
      assigned: "Paint Crew 1",
      nextScheduled: "Mar 1, 2025, 08:00 AM",
      cost: "$4500 (est.)",
      status: "PENDING",
      icon: Calendar,
      iconColor: "text-green-400",
    },
  ];

  const router = useRouter();

  return (
    <div className="p-6  mx-auto pl-0 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-gray-600">←</span> Repair & Maintenance
          </h1>
          <p className="text-sm text-gray-500 ml-7">8 total items</p>
        </div>
        <CreateMaintenanceDialog />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input className="pl-10 bg-white" placeholder="Search tickets..." />
        </div>
        <Button variant="outline" className="bg-white">
          Filter <Filter className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="flex items-center p-6 gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    stat.label === "Total Cost"
                      ? "text-blue-600"
                      : "text-gray-900"
                  }`}>
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="border-none shadow-sm overflow-hidden cursor-pointer"
            onClick={() =>
              router.push(`/tenant/repair-maintenance/${ticket.id}`)
            }>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className={`p-2 rounded-md `}>
                    <ticket.icon className={`w-6 h-6 ${ticket.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">
                        {ticket.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={
                          ticket.priority === "HIGH"
                            ? "bg-red-500 text-white"
                            : ticket.priority === "MEDIUM"
                            ? "bg-orange-500 text-white"
                            : "bg-green-500 text-white"
                        }>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{ticket.location}</p>
                    <p className="text-sm text-gray-600">
                      {ticket.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {ticket.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-gray-500 font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge
                  className={
                    ticket.status === "SCHEDULED"
                      ? "bg-blue-100 text-blue-600"
                      : ticket.status === "IN PROGRESS"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-orange-100 text-orange-600"
                  }>
                  {ticket.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 pt-4 border-t border-gray-100 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    Service Provider
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {ticket.provider}
                  </p>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    Assigned To
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {ticket.assigned}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    Next Scheduled
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {ticket.nextScheduled}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    Cost
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {ticket.cost}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" className="flex-1 bg-white h-12">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
        <Button variant="outline" className="flex-1 bg-white h-12">
          <BarChart3 className="w-4 h-4 mr-2" /> Analytics
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
