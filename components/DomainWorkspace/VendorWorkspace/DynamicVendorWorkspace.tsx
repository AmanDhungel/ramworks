"use client";
import React, { useState, useMemo } from "react";
import { Search, CirclePlus, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { CreateVendorWorkspace } from "./CreateVendorWorkspaceDialog";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetVendorWorkspace } from "@/services/vendorworkspace.service";

const VENDORS = [
  {
    id: 1,
    name: "lorem co",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    id: 2,
    name: "lorem co",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    id: 3,
    name: "lorem co",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    id: 4,
    name: "lorem co",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    id: 5,
    name: "lorem co",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
];

export default function VendorWorkspace() {
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("id");
  const router = useRouter();

  const { data } = useGetVendorWorkspace();

  const filteredVendors = useMemo(() => {
    return (
      data?.data?.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? []
    );
  }, [searchTerm, data]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 capitalize">
            {id} Workspace
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="w-3 h-3" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {id} Workspace
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <CreateVendorWorkspace />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-slate-800">
            Vendor Workspace
          </h2>
          <span className="flex items-center justify-center bg-slate-100 text-slate-600 text-sm font-medium px-2.5 py-0.5 rounded-md border">
            {filteredVendors.length}
          </span>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search"
            className="pl-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVendors.map((vendor) => (
          <Card
            key={vendor._id}
            className="group p-0 cursor-pointer border-slate-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
            onClick={() =>
              router.push(
                `/domain-workspace/${id}/${vendor.name
                  .split(" ")
                  .join("_")}?vendor=${vendor._id}&workspace=${workspaceId}`
              )
            }>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm font-bold text-slate-700">{vendor.name}</p>
              <div className="h-20 flex items-center justify-center">
                <Image
                  width={500}
                  height={500}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${vendor.logo ?? ""}`}
                  alt={vendor.name}
                  className="max-h-full max-w-full object-cover  transition-all"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <p>No vendors found matching `{searchTerm}`</p>
        </div>
      )}
    </div>
  );
}
