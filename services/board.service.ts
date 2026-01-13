import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { ActivityFormValues } from "@/components/CRM/Activities/NewActivityDialog";
import { CompanyType } from "./company.service";
import { ContactFormValues } from "./contact.service";
import { useSearchParams } from "next/navigation";
import { VendorFormValues } from "@/components/DomainWorkspace/VendorWorkspace/CreateVendorWorkspaceDialog";

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

export const useCreateBoard = () => {
  return useMutation<ApiResponseType<VendorFormValues>, any, VendorFormValues>({
    mutationKey: ["createBoard"],
    mutationFn: (data: VendorFormValues) =>
      Post<VendorFormValues, ApiResponseType<VendorFormValues>>({
        url: "/client_api/board/create_board",
        data: data,
      }),
  });
};

export const useGetBoard = (id: string) => {
  return useFetcher<ApiResponseType<any[]>>(
    ["board", id],
    null,
    `/client_api/board/vendor_boards/${id}`
  );
};
export const useGetDNDBoard = (id: string) => {
  return useFetcher<ApiResponseType<any[]>>(
    "dndboard",
    null,
    `/client_api/board/${id}`
  );
};
// /api/board/add_tasklist/:board_id
export const useCreateTaskList = (id: string) => {
  return useMutation<ApiResponseType<VendorFormValues>, any, VendorFormValues>({
    mutationKey: ["createBoard"],
    mutationFn: (data: VendorFormValues) =>
      Post<VendorFormValues, ApiResponseType<VendorFormValues>>({
        url: "/client_api/board/add_tasklist/" + id,
        data: data,
      }),
  });
};

export const useGetSingleBoard = (id: string) => {
  return useFetcher<ApiResponseType<ActivityType>>(
    ["singleBoard", id],
    null,
    `/client_api/activity/${id}`
  );
};
