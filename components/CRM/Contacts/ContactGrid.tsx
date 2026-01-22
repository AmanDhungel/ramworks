"use client";
import { Home, LayoutGrid, List, Loader, Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactCard } from "./ContactCard";
import { useGetContact } from "@/services/contact.service";
import { ContactFormDialog } from "./CreateContactDialog";

export default function ContactsGrid() {
  const { data, isLoading } = useGetContact();
  return (
    <div className="p-8 pl-0 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={15} /> / CRM /{" "}
            <span className="text-gray-900">Contacts Grid</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="csv">
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">Export CSV</SelectItem>
              <SelectItem value="pdf">Export PDF</SelectItem>
            </SelectContent>
          </Select>

          <ContactFormDialog />
        </div>
      </div>

      {/* Grid Sub-Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-t-lg border-x border-t">
        <h2 className="font-semibold text-gray-800">Contact Grid</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          Sort By:
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px] h-8 text-xs border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Last 7 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <Loader className="animate-spin m-auto" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 p-6 bg-white border rounded-b-lg shadow-sm">
          {data?.data?.map((contact, index) => (
            <ContactCard key={index} {...contact} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="gap-2 text-orange-500 border-orange-200 hover:bg-orange-50">
          <RotateCw className="w-4 h-4" /> Load More
        </Button>
      </div>
    </div>
  );
}
