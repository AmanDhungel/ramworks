import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Delete, Post } from "@/lib/action";
import { ContactFormPayload } from "@/components/CRM/Contacts/CreateContactDialog";
import { ContactFormValues } from "./contact.service";
export type CompanyType = {
  about: string;
  address: {
    address: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
  };
  contacts: [
    {
      name: string;
      email: string;
      phone: string;
    },
  ];
  createdAt: string;
  currency: string;
  email: string;
  industry: string;
  language: string;
  name: string;
  owner: ContactFormValues;
  phone: string;
  rating: number;
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
  website: string;
  _id: string;
};
export const useCreateCompany = () => {
  return useMutation<
    ApiResponseType<ContactFormPayload>,
    any,
    ContactFormPayload
  >({
    mutationKey: ["createCompany"],
    mutationFn: (data: ContactFormPayload) =>
      Post<ContactFormPayload, ApiResponseType<ContactFormPayload>>({
        url: "/client_api/company/add",
        data: data,
      }),
  });
};

export const useGetCompany = () => {
  return useFetcher<ApiResponseType<CompanyType[]>>(
    "company",
    null,
    "/client_api/company",
  );
};

export const useGetSingleCompany = (id: string) => {
  return useFetcher<ApiResponseType<CompanyType>>(
    "singleContact",
    null,
    `/client_api/company/${id}`,
  );
};

export const useDeleteCompany = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteCompany"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/company/delete/${data.id}`,
        data: { id: data.id },
      }),
  });
};
