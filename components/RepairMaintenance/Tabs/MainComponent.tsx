"use client";
import {
  ArrowLeft,
  LayoutDashboard,
  History,
  MessageSquare,
  Paperclip,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import TimelineTab from "./TimelineTab";
import MessageTab from "./MessageTab";
import FilesTab from "./FilesTab";
import InvoiceTab from "./InvoiceTab";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleRAM } from "@/services/RAM.service";

const TicketHeader = () => {
  const router = useRouter();
  const { id } = useParams();
  const RAMID = Array.isArray(id) ? id[0] : id;
  const { data } = useGetSingleRAM(RAMID ?? "");

  console.log("Single RAM Data", data);
  return (
    <div className="w-full bg-white border-b border-gray-100 p-6 pb-0 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ArrowLeft
            className="w-5 h-5 text-gray-600 cursor-pointer"
            onClick={() => router.push("/tenant/repair-maintenance")}
          />
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {data?.data.title}
            </h1>
            <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] h-5 px-1.5 rounded-md font-bold">
              {data?.data.priority}
            </Badge>
          </div>
        </div>

        <p className="text-gray-400 text-sm ml-8 -mt-3">
          {data?.data.internal_notes}
        </p>

        <div className="flex items-center gap-2 ml-8">
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-500 hover:bg-emerald-100 border-none font-semibold px-3 py-1 text-[11px]">
            {data?.data.type}
          </Badge>
          {/* <Badge
            variant="outline"
            className="text-gray-600 font-normal px-4 py-1 border-gray-200">
            Recurring
          </Badge>
          <Badge
            variant="outline"
            className="text-gray-600 font-normal px-4 py-1 border-gray-200">
            Quarterly
          </Badge> */}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-transparent border-b-0 w-full justify-start h-auto p-0 gap-8">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 pb-4 pt-2 flex gap-2 font-medium transition-all">
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="timeline"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 pb-4 pt-2 flex gap-2 font-medium text-gray-500 transition-all">
            <History className="w-4 h-4" />
            Timeline
          </TabsTrigger>

          <TabsTrigger
            value="messages"
            className="relative data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 pb-4 pt-2 flex gap-2 font-medium text-gray-500 transition-all">
            <MessageSquare className="w-4 h-4" />
            Messages
            <span className=" bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              1
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="files"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 pb-4 pt-2 flex gap-2 font-medium text-gray-500 transition-all">
            <Paperclip className="w-4 h-4" />
            Files
          </TabsTrigger>

          <TabsTrigger
            value="invoice"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 pb-4 pt-2 flex gap-2 font-medium text-gray-500 transition-all">
            <FileText className="w-4 h-4" />
            Invoice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab data={data?.data} />
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineTab data={data?.data} />
        </TabsContent>
        <TabsContent value="messages">
          <MessageTab data={data?.data} />
        </TabsContent>
        <TabsContent value="files">
          <FilesTab data={data?.data} />
        </TabsContent>
        <TabsContent value="invoice">
          <InvoiceTab data={data?.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketHeader;
