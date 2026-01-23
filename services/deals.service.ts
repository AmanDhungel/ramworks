import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { ContactType } from "@/components/CRM/Contacts/ContactCard";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { DealFormValues } from "@/components/CRM/Deals/AddDealDialog";

export type DealType = {
  pipeline: {
    board: string;
    step: string;
  };
  _id: string;
  name: string;
  status: string;
  value: number;
  currency: string;
  contacts: ContactType[];
  due_date: string;
  expected_close_date: string;
  assignees: Array<{
    _id: string;
    employee_id: string;
    name: string;
    join_date: string;
    email: string;
    phone: string;
    company: string;
    about: string;
    createdAt: string;
    updatedAt: string;
  }>;
  tags: string[];
  followup_date: string;
  source: string;
  priority: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const useGetDeals = () => {
  return useFetcher<ApiResponseType<DealType[]>>(
    "deals",
    null,
    "/client_api/deal",
  );
};

export const useCreateDeals = () => {
  return useMutation<ApiResponseType<DealType>, any, DealFormValues>({
    mutationKey: ["createDeals"],
    mutationFn: (data: DealFormValues) =>
      Post<DealFormValues, ApiResponseType<DealType>>({
        url: "/client_api/deal/add",
        data: data,
      }),
  });
};

// export const useGetActivity = () => {
//   return useFetcher<ApiResponseType<ActivityType[]>>(
//     "activity",
//     null,
//     "/client_api/activity"
//   );
// };

export const useDeleteDeal = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteDeal"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/deal/delete/${data.id}`,
        data: { id: data.id },
      }),
  });
};
