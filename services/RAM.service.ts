import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { ActivityFormValues } from "@/components/CRM/Activities/NewActivityDialog";
import { CompanyType } from "./company.service";
import { ContactFormValues } from "./contact.service";
import { useSearchParams } from "next/navigation";
import { MaintenanceRequest } from "@/components/RepairMaintenance/CreateMaintenanceItemDialog/schema";

export type ActivityType = {
  _id: string;
  title: string;
  description: string;
  activity_type: string;
  due_date: string;
  owner: ContactFormValues;
  guests: ContactFormValues[];
  deals?: string[];
  contacts: ContactFormValues[];
  companies: CompanyType[];
  createdAt: string;
  updatedAt: string;
};

export const useCreateRAM = () => {
  return useMutation<
    ApiResponseType<MaintenanceRequest>,
    any,
    MaintenanceRequest
  >({
    mutationKey: ["createRAM"],
    mutationFn: (data: MaintenanceRequest) =>
      Post<MaintenanceRequest, ApiResponseType<MaintenanceRequest>>({
        url: "/client_api/ram/create",
        data: data,
      }),
  });
};

export const useGetRAM = () => {
  return useFetcher<ApiResponseType<ActivityType[]>>(
    "RAM",
    null,
    "/client_api/ram"
  );
};

export const useGetSingleRAM = (id: string) => {
  return useFetcher<ApiResponseType<ActivityType>>(
    ["singleRAM", id],
    null,
    `/client_api/ram/${id}`
  );
};
