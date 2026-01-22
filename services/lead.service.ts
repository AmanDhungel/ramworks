import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { LeadFormValues } from "@/components/CRM/Leads/AddLeadlDialog";

export const useGetLeads = () => {
  return useFetcher<ApiResponseType<any[]>>("leads", null, "/client_api/deal");
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
