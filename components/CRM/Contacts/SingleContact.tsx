"use client";
import React from "react";
import {
  Phone,
  Mail,
  User,
  Cake,
  MapPin,
  Languages,
  DollarSign,
  Clock,
  Share2,
  Trash2,
  Edit2,
  ChevronDown,
  Copy,
  CheckCircle2,
  Globe,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useGetSingleContact } from "@/services/contact.service";

export default function ProfileSidebar() {
  const { id } = useParams();
  const idString = Array.isArray(id) ? id[0] : id || "";
  const { data } = useGetSingleContact(idString);

  console.log("data", data);
  return (
    <div className="max-w-[400px] mt-4 bg-white border rounded-lg overflow-hidden shadow-sm font-sans">
      <div className="relative h-32 bg-gradient-to-r from-orange-400 to-orange-600">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <Avatar className="w-24 h-24 border-4 border-white shadow-md">
            <AvatarImage
              src="/api/placeholder/150/150"
              alt="Darlee Robertson"
            />
            <AvatarFallback className="uppercase">
              {data?.data.name.slice(0, 1)}
              {data?.data.name.split(" ")[1].slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Name & Title */}
      <div className="mt-14 text-center px-4">
        <div className="flex items-center justify-center gap-1">
          <h2 className="text-xl font-bold text-slate-900">
            {data?.data.name}
          </h2>
          <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500 text-white" />
        </div>
        <p className="text-sm text-slate-600 font-medium mt-1 capitalize">
          {data?.data.industry}
        </p>
        <Badge
          variant="secondary"
          className="mt-3 bg-pink-50 text-pink-500 hover:bg-pink-50 border-none font-semibold text-[11px] uppercase px-3">
          {data?.data.job_title}
        </Badge>
      </div>

      <div className="mt-6 px-4 space-y-6 pb-6">
        {/* Basic Information Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Basic information</h3>
            <div className="flex gap-2">
              <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer" />
              <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
          </div>
          <div className="space-y-4">
            <InfoRow
              icon={<Phone size={16} />}
              label="Phone"
              value={data?.data.phone}
            />
            <InfoRow
              icon={<Mail size={16} />}
              label="Email"
              value={data?.data.email}
              color="text-blue-500"
              action={<Copy size={14} className="text-slate-400" />}
            />
            <InfoRow icon={<User size={16} />} label="Gender" value="Male" />
            <InfoRow
              icon={<Cake size={16} />}
              label="Birthday"
              value={data?.data.date_of_birth?.split("T")[0]}
            />
            <InfoRow
              icon={<MapPin size={16} />}
              label="Address"
              value={`${data?.data.address.address}, ${data?.data.address.city}, ${data?.data.address.country}`}
              vertical
            />
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* Other Information Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Other Information</h3>
            <div className="flex gap-2">
              <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer" />
              <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
          </div>
          <div className="space-y-4">
            <InfoRow
              icon={<Languages size={16} />}
              label="Language"
              value={data?.data.language}
            />
            <InfoRow
              icon={<DollarSign size={16} />}
              label="Currency"
              value={data?.data.currency}
            />
            <InfoRow
              icon={<Clock size={16} />}
              label="Last Modified"
              value={
                data?.data.updatedAt
                  ? data?.data.updatedAt.split("T")[0]
                  : data?.data.createdAt.split("T")[0]
              }
            />
            <InfoRow
              icon={<Globe size={16} />}
              label="Source"
              value={data?.data.source}
            />
          </div>
        </section>

        <Separator className="bg-slate-100" />

        <section>
          <h3 className="font-bold text-slate-800 mb-3">Tags</h3>
          <div className="flex gap-2">
            {data?.data?.tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                className="bg-emerald-50 text-emerald-500 border-none hover:bg-emerald-100">
                {tag === "" ? "N/A" : tag} {index + 1}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="bg-slate-100" />

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800">Company</h3>
            <button className="text-xs text-orange-500 font-semibold flex items-center gap-1">
              <Plus size={14} /> Add New
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-sm capitalize font-bold text-slate-800">
                {data?.data.industry}
              </p>
              <p className="text-xs text-slate-400">{data?.data.job_title}</p>
            </div>
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* Social Links */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Social Links</h3>
            <div className="flex gap-2">
              <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer" />
              <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
          </div>
          <div className="flex gap-3">
            <SocialIcon bg="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
            <SocialIcon bg="bg-black" />
            <SocialIcon bg="bg-green-500" />
            <SocialIcon bg="bg-red-600" />
            <SocialIcon bg="bg-blue-600" />
            <SocialIcon bg="bg-blue-500" />
          </div>
        </section>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 bg-slate-800 text-white hover:bg-slate-900 border-none">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button
            variant="destructive"
            className="flex-1 bg-orange-500 hover:bg-orange-600 border-none">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  color = "text-slate-800",
  vertical = false,
  action = null,
}: any) {
  return (
    <div
      className={`flex ${
        vertical ? "items-start" : "items-center"
      } justify-between text-sm`}>
      <div className="flex items-center gap-3 text-slate-400 min-w-[120px]">
        {icon}
        <span>{label}</span>
      </div>
      <div
        className={`flex items-center gap-2 font-medium ${color} ${
          vertical ? "text-right max-w-[180px]" : ""
        }`}>
        {value}
        {action}
      </div>
    </div>
  );
}

function SocialIcon({ bg }: { bg: string }) {
  return <div className={`w-8 h-8 rounded-full ${bg} cursor-pointer`} />;
}
