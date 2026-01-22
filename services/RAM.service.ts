import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { ActivityFormValues } from "@/components/CRM/Activities/NewActivityDialog";
import { CompanyType } from "./company.service";
import { ContactFormValues } from "./contact.service";
import { useSearchParams } from "next/navigation";
import { MaintenanceRequest } from "@/components/RepairMaintenance/CreateMaintenanceItemDialog/schema";

export type RAMResponse = {
  cost_breakdown: {
    labor: number;
    materials: number;
    additional_charges: number;
  };
  _id: string;
  type: "scheduled" | "recurring" | "reported" | "emergency";
  domain_workspace: {
    board_deletion_restriction: {
      public_board_deletion: "only_workspace_admins";
      visible_board_creation: "any_workspace_member";
      private_board_creation: "only_workspace_admins";
    };
    _id: string;
    title: string;
    visibility: "public" | "private";
    membership_restriction: "restricted" | "open";
    createdAt: string;
    updatedAt: string;
    icon: string | null;
    image: string;
  };
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  property: string;
  location: string;
  vendor_workspace: {
    _id: string;
    name: string;
    domain: string;
    logo: string;
    label_color: string;
    createdAt: string;
    updatedAt: string;
  };
  board: string;
  date: string;
  time: string;
  estimated_duration: string;
  total_estimated_cost: number;
  tags: string[];
  internal_notes: string;
  attachments: string[];
  notify_affected_tenants: boolean;
  require_approval_before_starting_work: boolean;
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
  return useFetcher<ApiResponseType<RAMResponse[]>>(
    "RAM",
    null,
    "/client_api/ram",
  );
};

export const useGetSingleRAM = (id: string) => {
  return useFetcher<ApiResponseType<RAMResponse>>(
    ["singleRAM", id],
    null,
    `/client_api/ram/${id}`,
  );
};
