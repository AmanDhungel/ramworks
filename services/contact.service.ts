import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { ContactType } from "@/components/CRM/Contacts/ContactCard";
import { CompanyFormPayload } from "@/components/CRM/Company/CreateCompanyDialog";

export type RatingEnum = "1" | "2" | "3" | "4" | "5";
export type IndustryEnum =
  | "retail_industry"
  | "banking_finance"
  | "it_software"
  | "healthcare"
  | "manufacturing"
  | "education";
export type CurrencyEnum = "USD" | "NPR";
export type LanguageEnum = "English" | "Nepali";
export type SourceEnum =
  | "phone_call"
  | "social_media"
  | "referral"
  | "previous_contact"
  | "other";
export type StatusEnum = "active" | "inactive";

export type ContactFormValues = {
  _id: string;
  name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string;
  secondary_phone: string;
  date_of_birth: string;
  rating: RatingEnum;
  industry: IndustryEnum;
  currency: CurrencyEnum;
  language: LanguageEnum;
  tags: string[];
  source: SourceEnum;
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
  status: StatusEnum;
};

export const useCreateContact = () => {
  return useMutation<
    ApiResponseType<CompanyFormPayload>,
    any,
    CompanyFormPayload
  >({
    mutationKey: ["createContact"],
    mutationFn: (data: CompanyFormPayload) =>
      Post<CompanyFormPayload, ApiResponseType<CompanyFormPayload>>({
        url: "/client_api/contact/add",
        data: data,
      }),
  });
};

export const useGetContact = () => {
  return useFetcher<ApiResponseType<ContactType[]>>(
    "contact",
    null,
    "/client_api/contact",
  );
};

export const useGetSingleContact = (id: string) => {
  return useFetcher<ApiResponseType<ContactType>>(
    ["singleContact", id],
    null,
    `/client_api/contact/${id}`,
  );
};
