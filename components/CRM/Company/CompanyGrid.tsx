import {
  ChevronDown,
  Globe,
  Home,
  LayoutGrid,
  List,
  Plus,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CompanyCard } from "./CompanyCard";

const COMPANIES = [
  {
    name: "BrightWave Innovations",
    email: "darlee@example.com",
    phone: "(163) 2459 315",
    country: "Germany",
    rating: 4.2,
    members: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
    logo: (
      <div className="p-3 bg-indigo-50 text-indigo-600">
        <Globe />
      </div>
    ),
  },
  {
    name: "Stellar Dynamics",
    email: "sharon@example.com",
    phone: "(146) 1249 296",
    country: "USA",
    rating: 5.0,
    members: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
    logo: (
      <div className="p-3 bg-green-50 text-green-600">
        <RotateCw />
      </div>
    ),
  },
  // Add other companies here...
];

export default function CompaniesPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
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
          <Button className="h-9 bg-orange-500 hover:bg-orange-600 gap-2">
            <Plus className="w-4 h-4" /> Add New Company
          </Button>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white">
          {COMPANIES.map((company, idx) => (
            <CompanyCard key={idx} {...company} />
          ))}
        </div>
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
