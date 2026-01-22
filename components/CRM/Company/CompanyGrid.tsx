"use client";
import {
  ChevronDown,
  Globe,
  Home,
  LayoutGrid,
  List,
  Loader,
  Plus,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CompanyCard } from "./CompanyCard";
import { CompanyFormDialog } from "./CreateCompanyDialog";
import { useGetCompany } from "@/services/company.service";

export default function CompaniesPage() {
  const { data: companyData, isLoading } = useGetCompany();

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Companies</h1>
          <div className="flex text-xs text-gray-400 mt-1">
            <Home size={15} /> / CRM / Companies Grid
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 gap-2">
            Export <ChevronDown className="w-4 h-4" />
          </Button>
          <CompanyFormDialog />
        </div>
      </div>

      {/* Grid Container */}
      <Card className="rounded-lg shadow-sm border-none overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h2 className="font-semibold text-sm">Companies Grid</h2>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            Sort By :{" "}
            <span className="text-gray-900 font-medium">Last 7 Days</span>{" "}
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
        {isLoading ? (
          <div className="p-6">
            <Loader className="animate-spin m-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white">
            {companyData?.data.map((company, idx) => (
              <CompanyCard key={idx} {...company} />
            ))}
          </div>
        )}
      </Card>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="text-orange-500 border-orange-200 hover:bg-orange-50 gap-2">
          <RotateCw className="w-4 h-4" /> Load More
        </Button>
      </div>
    </div>
  );
}
