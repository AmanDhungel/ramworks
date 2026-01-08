import React, { useState, useMemo } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// --- Types ---
type TicketStatus = "Resolved" | "Closed" | "Open";
type Priority = "Medium" | "Emergency" | "Low";

interface MaintenanceTicket {
  id: string;
  title: string;
  ticketCode: string;
  priority: Priority;
  status: TicketStatus;
  location: string;
  unit: string;
  category: string;
  submittedDate: string;
  expectedDate: string;
  progress: number;
  provider: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

// --- Mock Data ---
const MOCK_DATA: MaintenanceTicket[] = [
  {
    id: "1",
    title: "Bedroom Light Not Working",
    ticketCode: "MNT-2024-002",
    priority: "Medium",
    status: "Resolved",
    location: "Sunset Apartments",
    unit: "Unit 304",
    category: "Electrical",
    submittedDate: "2024-01-10",
    expectedDate: "2024-01-12",
    progress: 70,
    provider: { name: "David Martinez", role: "Service Provider" },
  },
  {
    id: "2",
    title: "Heating System Not Working",
    ticketCode: "MNT-2023-125",
    priority: "Emergency",
    status: "Closed",
    location: "Sunset Apartments",
    unit: "Unit 304",
    category: "HVAC",
    submittedDate: "2023-12-20",
    expectedDate: "2023-12-21",
    progress: 100,
    provider: { name: "Robert Lee", role: "Service Provider" },
  },
];

export default function RequestHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  // --- Filter Logic ---
  const filteredTickets = useMemo(() => {
    return MOCK_DATA.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProperty =
        propertyFilter === "all" || ticket.location === propertyFilter;
      // Note: Rating filter placeholder logic (mapped to priority for this demo)
      const matchesRating =
        ratingFilter === "all" ||
        ticket.priority.toLowerCase() === ratingFilter.toLowerCase();

      return matchesSearch && matchesProperty && matchesRating;
    });
  }, [searchQuery, ratingFilter, propertyFilter]);

  return (
    <div className="min-h-screen  p-6 font-sans">
      <div className=" mx-auto space-y-6">
        {/* --- Header / Filters --- */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Select onValueChange={setRatingFilter} defaultValue="all">
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setPropertyFilter} defaultValue="all">
              <SelectTrigger className="w-[160px] bg-white">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="Sunset Apartments">
                  Sunset Apartments
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- Ticket List --- */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="overflow-hidden border-gray-200 shadow-sm">
              <CardContent className="p-6">
                {/* Badges */}
                <div className="flex gap-2 mb-3">
                  <Badge
                    className={`${
                      ticket.priority === "Emergency"
                        ? "bg-red-600"
                        : "bg-orange-500"
                    } hover:opacity-90 border-none px-3 py-0.5 rounded-sm`}>
                    {ticket.priority}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-500 hover:bg-blue-100 border-none px-3 py-0.5 rounded-sm">
                    {ticket.status}
                  </Badge>
                </div>

                {/* Title & Code */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {ticket.title}
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  {ticket.ticketCode}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{ticket.location}</span>
                    <span className="text-gray-300">•</span>
                    <span>{ticket.unit}</span>
                    <span className="text-gray-300">•</span>
                    <span>{ticket.category}</span>
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Submitted: {ticket.submittedDate}</span>
                    <span className="text-gray-300">•</span>
                    <span>Expected: {ticket.expectedDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-gray-600">
                      Progress
                    </span>
                    <span className="text-sm font-semibold text-gray-500">
                      {ticket.progress}%
                    </span>
                  </div>
                  <Progress value={ticket.progress} className="h-2 bg-gray-100">
                    <div
                      className="h-full bg-orange-500 transition-all"
                      style={{ width: `${ticket.progress}%` }}
                    />
                  </Progress>
                </div>

                {/* Provider Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ticket.provider.name}`}
                    />
                    <AvatarFallback>{ticket.provider.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {ticket.provider.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {ticket.provider.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No tickets found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
