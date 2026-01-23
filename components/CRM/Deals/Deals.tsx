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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddDealDialog } from "./AddDealDialog";
import { DealType, useDeleteDeal, useGetDeals } from "@/services/deals.service";
import { DeleteConfirmDialog } from "@/components/ui/DynamicDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

export const DealTable = ({ deals }: { deals: DealType[] }) => {
  const { mutate } = useDeleteDeal();
  const queryClient = useQueryClient();
  const handleDelete = (id: string) => {
    mutate(
      { id: id },
      {
        onSuccess: () => {
          console.log("Deal deleted successfully");
          toast.success("Deal deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["deals"] });
        },
        onError: (error) => {
          console.error("Error deleting deal:", error);
        },
      },
    );
  };
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead className="w-[250px] font-bold text-slate-600">
              Deal Name
            </TableHead>
            <TableHead className="font-bold text-slate-600">Value</TableHead>
            <TableHead className="font-bold text-slate-600">Assignee</TableHead>
            <TableHead className="font-bold text-slate-600">Location</TableHead>
            <TableHead className="font-bold text-slate-600">Due Date</TableHead>
            <TableHead className="font-bold text-slate-600">
              Probability
            </TableHead>
            <TableHead className="text-right font-bold text-slate-600">
              Socials
            </TableHead>
            <TableHead className="text-right font-bold text-slate-600">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow
              key={deal._id}
              className="group hover:bg-slate-50/50 transition-colors">
              {/* Deal Name & Initial Box */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 shrink-0 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                    {deal.name.slice(0, 2)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate hover:text-orange-500 cursor-pointer">
                      {deal.name}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Mail size={10} /> {deal.assignees[0].email}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Deal Value */}
              <TableCell>
                <span className="text-xs font-bold text-slate-700">
                  ${deal.value}
                </span>
              </TableCell>

              {/* Assignee */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${deal.name}`}
                    />
                    <AvatarFallback className="text-[10px]">
                      {deal.assignees[0].name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                    {deal.assignees[0].name}
                  </span>
                </div>
              </TableCell>

              {/* Location */}
              <TableCell>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 max-w-[150px]">
                  <MapPin size={12} className="text-slate-400 shrink-0" />
                  <span className="truncate">
                    {deal.contacts[0]?.address.address},{" "}
                    {deal.contacts[0]?.address.country}
                  </span>
                </div>
              </TableCell>

              {/* Due Date */}
              <TableCell>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar size={12} className="text-slate-400" />
                  {deal.due_date.split("T")[0]}
                </div>
              </TableCell>

              {/* Probability */}
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-sky-50 text-sky-500 text-[10px] font-bold h-5 border-none px-2 flex items-center gap-1 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  85%
                </Badge>
              </TableCell>

              {/* Footer Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-3 text-slate-400">
                  <PhoneCall
                    size={14}
                    className="cursor-pointer hover:text-slate-600 transition-colors"
                  />
                  <MessageSquare
                    size={14}
                    className="cursor-pointer hover:text-slate-600 transition-colors"
                  />
                  <FileText
                    size={14}
                    className="cursor-pointer hover:text-slate-600 transition-colors"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-3 text-slate-400">
                  <DeleteConfirmDialog
                    text={deal.name}
                    onConfirm={() => handleDelete(deal._id)}
                  />
                  <MessageSquare
                    size={14}
                    className="cursor-pointer hover:text-slate-600 transition-colors"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function DealsGridPage() {
  const { data: dealData, isLoading } = useGetDeals();

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Deals</h1>
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
            <span className="text-slate-600 font-medium">Deals List</span>
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
          <AddDealDialog />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 border border-slate-200 rounded-xl mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-bold text-slate-800 text-sm ml-2">Deals Grid</h3>
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

      {isLoading ? (
        <Loader className="m-auto flex w-full animate-spin" />
      ) : (
        <DealTable deals={dealData?.data || []} />
      )}
    </div>
  );
}

// Utility
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
