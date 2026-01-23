import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { LeadFormValues } from "@/components/CRM/Leads/AddLeadlDialog";
import { ContactFormValues } from "./contact.service";

export type LeadType = {
  pipeline: {
    board: string;
    step: string;
  };
  _id: string;
  name: string;
  company: {
    address: {
      address: string;
      country: string;
      state: string;
      city: string;
      zip_code: string;
    };
    social_accounts: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
      whatsapp: string;
    };
    _id: string;
    name: string;
    email: string;
    phone: string;
    rating: number;
    tags: string[];
    industry: string;
    source: string;
    currency: string;
    language: string;
    contacts: {
      address: {
        address: string;
        country: string;
        state: string;
        city: string;
        zip_code: string;
      };
      social_accounts: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
        whatsapp: string;
      };
      _id: string;
      name: string;
      job_title: string;
      email: string;
      phone: string;
      rating: string;
      industry: string;
      currency: string;
      language: string;
      tags: string[];
      source: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  value: number;
  currency: string;
  phone: string;
  email: string;
  industry: string;
  source: string;
  owner: {
    address: {
      address: string;
      country: string;
      state: string;
      city: string;
      zip_code: string;
    };
    social_accounts: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
      whatsapp: string;
    };
    _id: string;
    name: string;
    job_title: string;
    email: string;
    phone: string;
    rating: string;
    industry: string;
    currency: string;
    language: string;
    tags: string[];
    source: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  tags: string[];
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const useGetLeads = () => {
  return useFetcher<ApiResponseType<LeadType[]>>(
    "leads",
    null,
    "/client_api/lead",
  );
};

export const useCreateLeads = () => {
  return useMutation<ApiResponseType<LeadFormValues>, any, LeadFormValues>({
    mutationKey: ["createLeads"],

    mutationFn: (data: LeadFormValues) =>
      Post<LeadFormValues, ApiResponseType<LeadFormValues>>({
        url: "/client_api/lead/add",
        data: data,
      }),
  });
};

export const useDeleteLead = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteLead"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/lead/delete/${data.id}`,
        data: { id: data.id },
      }),
  });
};
