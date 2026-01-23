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
  TrashIcon,
  EditIcon,
  Pencil,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/ui/DynamicDeleteButton";
import { useDeleteContact } from "@/services/contact.service";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export type ContactType = {
  _id: string;
  address: {
    address: string;
    city: string;
    country: string;
    state: string;
    zip_code: string;
  };
  createdAt: string;
  currency: string;
  date_of_birth: string;
  email: string;
  industry: string;
  job_title: string;
  language: string;
  name: string;
  phone: string;
  rating: string;
  secondary_phone: string;
  social_accounts: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
  source: string;
  status: string;
  tags: string[];
  updatedAt: string;
};

export const ContactCard = (contact: ContactType) => {
  const { mutate } = useDeleteContact();
  const queryClient = useQueryClient();
  const handleDelete = (id: string) => {
    console.log("Deleting contact:", contact._id);
    mutate(
      { id: id },
      {
        onSuccess: () => {
          console.log("Contact deleted successfully");
          toast.success("Contact deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["contact"] });
        },
        onError: (error) => {
          console.error("Error deleting contact:", error);
        },
      },
    );
  };
  const router = useRouter();
  return (
    <Card className="relative group hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <Checkbox className="rounded-sm border-gray-300" />
          <button className="text-gray-400 hover:text-gray-600">
            <div className="relative">
              <MoreVertical
                className="w-4 h-4"
                onClick={() => {
                  const box = document.getElementById(`box-${contact._id}`);
                  box?.classList.toggle("hidden");
                }}
              />
              <div
                id={`box-${contact._id}`}
                className="hidden absolute right-[-4] top-3 mt-2 w-7 bg-white shadow-lg">
                <div className="py-1 px-1.5 flex flex-col gap-2">
                  <DeleteConfirmDialog
                    text={contact.name}
                    onConfirm={() => handleDelete(contact._id)}
                  />
                  <EditIcon
                    size={15}
                    onClick={() => console.log("edit")}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <Avatar
              className="w-20 h-20 border-2 border-white shadow-sm cursor-pointer"
              onClick={() => router.push(`/crm/contacts/${contact._id}`)}>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_API_URL}/contact.address.png`}
                alt={contact.name}
              />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <h3 className="font-bold text-gray-900 text-lg">{contact.name}</h3>
          <Badge
            variant="secondary"
            className="mt-1 bg-pink-50 text-pink-600 hover:bg-pink-50 text-[10px] uppercase font-bold px-2 py-0">
            {contact.currency}
          </Badge>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Link
              href={`mailto: ${contact.email}`}
              className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> <span>{contact.email}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`tel: ${contact.phone}`}
              className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> <span>{contact.phone}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />{" "}
            <span>{contact.address.address}</span>
          </div>
        </div>

        <hr className="my-4 border-gray-100" />
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-gray-400">
            <Link href={`mailto: ${contact.email}`}>
              {" "}
              <Mail className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
            <Link href={`tel: ${contact.phone}`}>
              <Phone className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
            <Link href={`sms: ${contact.phone}`}>
              <MessageSquare className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
            <Globe className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors" />
            <Link
              href={`${
                contact.social_accounts.facebook
                  ? contact.social_accounts.facebook
                  : "#"
              }`}
              target="_blank">
              <Facebook className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {contact.rating}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
