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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

interface CompanyProps {
  name: string;
  logo: React.ReactNode;
  email: string;
  phone: string;
  country: string;
  rating: number;
  members: string[];
}

export const CompanyCard = ({
  name,
  logo,
  email,
  phone,
  country,
  rating,
  members,
}: CompanyProps) => {
  const router = useRouter();
  return (
    <Card className="relative group hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <Checkbox className="rounded-sm border-gray-300" />
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div
              onClick={() => router.push(`/crm/companies/${name}`)}
              className="w-16 cursor-pointer h-16 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden">
              {logo}
            </div>
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <h3 className="font-bold text-gray-900 text-md mb-2">{name}</h3>

          <div className="flex -space-x-3 mb-6">
            {members.map((m, i) => (
              <Avatar key={i} className="w-7 h-7 border-2 border-white">
                <AvatarImage src={m} />
                <AvatarFallback>U</AvatarFallback>
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
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> <span>{country}</span>
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
            {rating.toFixed(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
