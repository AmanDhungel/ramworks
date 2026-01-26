"use client";
import {
  MoreVertical,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Facebook,
  Star,
  MapPin,
  EditIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { CompanyType, useDeleteCompany } from "@/services/company.service";
import { DeleteConfirmDialog } from "@/components/ui/DynamicDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const CompanyCard = (company: CompanyType) => {
  const router = useRouter();
  const { mutate } = useDeleteCompany();
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    mutate(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Company deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["company"] });
        },
        onError: (error) => {
          console.error("Error deleting company:", error);
        },
      },
    );
  };
  return (
    <Card className="relative group hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <Checkbox className="rounded-sm border-gray-300" />
          <button className="text-gray-400 hover:text-gray-600">
            <button className="text-gray-400 hover:text-gray-600">
              <div className="relative">
                <MoreVertical
                  className="w-4 h-4"
                  onClick={() => {
                    const box = document.getElementById(`box-${company._id}`);
                    box?.classList.toggle("hidden");
                  }}
                />
                <div
                  id={`box-${company._id}`}
                  className="hidden absolute right-[-4] top-3 mt-2 w-7 bg-white shadow-lg">
                  <div className="py-1 px-1.5 flex flex-col gap-2">
                    <DeleteConfirmDialog
                      text={company.name}
                      onConfirm={() => handleDelete(company._id)}
                    />
                    <EditIcon
                      size={15}
                      // onClick={() => console.log("edit")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </button>
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div
              onClick={() => router.push(`/crm/companies/${company._id}`)}
              className="w-16 cursor-pointer h-16 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden">
              <Avatar className="w-7 h-7 border-2 border-white">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}/contact.address.png`}
                />
                <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <h3 className="font-bold text-gray-900 text-md mb-2">
            {company.name}
          </h3>

          <div className="flex -space-x-3 mb-6">
            {company.contacts.map((m, i) => (
              <Avatar key={i} className="w-7 h-7 border-2 border-white">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}/contact.address.png`}
                />
                <AvatarFallback>
                  {m?.name?.charAt(0)} {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="w-7 h-7 z-50 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center border-2 border-white font-bold">
              +1
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2 text-[13px] text-gray-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />{" "}
            <span className="truncate">{company.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> <span>{company.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />{" "}
            <span>
              {company.address.address} {company.address.city}{" "}
              {company.address.country}
            </span>
          </div>
        </div>

        <hr className="my-4 border-gray-100" />
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-gray-400">
            <Mail className="w-4 h-4 cursor-pointer hover:text-blue-500" />
            <Phone className="w-4 h-4 cursor-pointer hover:text-blue-500" />
            <MessageSquare className="w-4 h-4 cursor-pointer hover:text-blue-500" />
            <Globe className="w-4 h-4 cursor-pointer hover:text-blue-500" />
            <Facebook className="w-4 h-4 cursor-pointer hover:text-blue-500" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {company.rating}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
