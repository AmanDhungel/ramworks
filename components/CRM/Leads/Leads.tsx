"use client";
import React from "react";
import {
  LayoutGrid,
  List,
  Download,
  PlusCircle,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  PhoneCall,
  MessageSquare,
  FileText,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  Search,
  Building2,
  Loader,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddLeadDialog, LeadFormValues } from "./AddLeadlDialog";
import { LeadType, useDeleteLead, useGetLeads } from "@/services/lead.service";
import { DeleteConfirmDialog } from "@/components/ui/DynamicDeleteButton";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// --- Mock Data Structures ---

const COLUMNS = [
  {
    id: "new",
    title: "New",
    count: 45,
    value: "$15,44,540",
    color: "bg-emerald-500",
  },
  {
    id: "prospect",
    title: "Prospect",
    count: 30,
    value: "$19,94,938",
    color: "bg-sky-500",
  },
  {
    id: "proposal",
    title: "Proposal",
    count: 25,
    value: "$10,36,390",
    color: "bg-orange-400",
  },
  {
    id: "won",
    title: "Won",
    count: 50,
    value: "$18,82,456",
    color: "bg-purple-500",
  },
];

const DEALS = [
  {
    id: 1,
    stage: "new",
    company: "Howell, Tremblay and Rath",
    initials: "HT",
    value: "3,50,000",
    email: "darleeo@gmail.com",
    phone: "(163) 2459 315",
    location: "Newyork, United States",
    owner: "Darlee Robertson",
    ownerImg: "https://i.pravatar.cc/150?u=darlee",
    productivity: 85,
    date: "10 Jan 2024",
  },
  {
    id: 2,
    stage: "new",
    company: "Robert, John and Carlos",
    initials: "RJ",
    value: "2,10,000",
    email: "sheron@gmail.com",
    phone: "(146) 1249 296",
    location: "Exeter, United States",
    owner: "Sharon Roy",
    ownerImg: "https://i.pravatar.cc/150?u=sharon",
    productivity: 15,
    date: "12 Jan 2024",
  },
];

const LeadTable = ({
  leads,
  isFetching,
}: {
  leads: LeadType[];
  isFetching: boolean;
}) => {
  const { mutate, isPending } = useDeleteLead();
  const queryClient = useQueryClient();
  const handleDelete = (id: string) => {
    mutate(
      { id: id },
      {
        onSuccess: () => {
          console.log("Lead deleted successfully");
          toast.success("Lead deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["leads"] });
        },
        onError: (error) => {
          console.error("Error deleting Lead:", error);
        },
      },
    );
  };
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      {isFetching ? (
        <Loader className="animate-spin ml-2 w-full m-auto  my-2" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[250px] font-bold text-slate-600 text-xs">
                Lead / Company
              </TableHead>
              <TableHead className="font-bold text-slate-600 text-xs">
                Value
              </TableHead>
              <TableHead className="font-bold text-slate-600 text-xs">
                Owner
              </TableHead>
              <TableHead className="font-bold text-slate-600 text-xs">
                Status
              </TableHead>
              <TableHead className="font-bold text-slate-600 text-xs">
                Location
              </TableHead>
              <TableHead className="font-bold text-slate-600 text-xs">
                Socials
              </TableHead>
              <TableHead className="text-right font-bold text-slate-600 text-xs">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads?.map((lead) => (
              <TableRow
                key={lead._id}
                className="group hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 uppercase">
                      {lead.name.slice(0, 2)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-800 truncate leading-none mb-1">
                        {lead.name}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate">
                        <Building2 size={10} className="shrink-0" />
                        <span className="truncate">{lead.company.name}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Value */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">
                      {lead.currency} {lead.value.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {lead.source}
                    </span>
                  </div>
                </TableCell>

                {/* Owner (Assignee) */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.owner.name}`}
                      />
                      <AvatarFallback className="text-[9px]">
                        {lead.owner.name.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                      {lead.owner.name}
                    </span>
                  </div>
                </TableCell>

                {/* Status / Pipeline Step */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={"default"}
                      className={`${
                        lead.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                      {lead.status}
                    </Badge>
                  </div>
                </TableCell>

                {/* Location (from Company) */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 max-w-[140px]">
                    <MapPin size={12} className="text-slate-400 shrink-0" />
                    <span className="truncate">
                      {lead.company.address.city},{" "}
                      {lead.company.address.country}
                    </span>
                  </div>
                </TableCell>

                {/* Socials Column */}
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-400">
                    <PhoneCall
                      size={14}
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                    />
                    <MessageSquare
                      size={14}
                      className="cursor-pointer hover:text-green-500 transition-colors"
                    />
                    <FileText
                      size={14}
                      className="cursor-pointer hover:text-orange-500 transition-colors"
                    />
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <DeleteConfirmDialog
                      text={lead.name}
                      onConfirm={() => handleDelete(lead._id)}
                      isPending={isPending}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

// --- Main Page ---

export default function LeadsGridPage() {
  const { data: leadData, isFetching } = useGetLeads();
  console.log("Leads Data:", leadData);
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-6 font-sans">
      {/* Breadcrumb & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Leads</h1>
          <nav className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            / <span>CRM</span> /{" "}
            <span className="text-slate-600 font-medium">Leads List</span>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm h-9">
            <button className="px-3 border-r hover:bg-slate-50 text-slate-400">
              <List size={16} />
            </button>
            <button className="px-3 bg-slate-100 text-slate-600">
              <LayoutGrid size={16} />
            </button>
          </div>
          <Button
            variant="outline"
            className="bg-white border-slate-200 h-9 gap-2 text-xs font-bold text-slate-600 shadow-sm">
            <Download size={14} /> Export <ChevronDown size={14} />
          </Button>
          <AddLeadDialog />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 border border-slate-200 rounded-xl mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-bold text-slate-800 text-sm ml-2">Leads Grid</h3>
        <div className="flex items-center gap-3">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[160px] h-8 text-[11px] border-slate-200">
              <div className="flex items-center gap-1">
                <span className="text-slate-400">Sort By :</span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <LeadTable leads={leadData?.data || []} isFetching={isFetching} />
    </div>
  );
}

// Utility
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
