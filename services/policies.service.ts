import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { DepartmentType } from "./departments.service";

export type PolicyType = {
  _id?: string;
  appraisal_date: string;
  department: DepartmentType;
  files: File[];
  name: string;
  createdAt?: string;
};

export const useGetPolicy = () => {
  return useFetcher<ApiResponseType<PolicyType[]>>(
    "policy",
    null,
    "/client_api/policy",
  );
};

export const useCreatePolicy = () => {
  return useMutation<ApiResponseType<PolicyType>, any, PolicyType>({
    mutationKey: ["createpolicy"],
    mutationFn: (data: PolicyType) =>
      Post<PolicyType, ApiResponseType<PolicyType>>({
        url: data._id
          ? `/client_api/policy/edit/${data._id}`
          : "/client_api/policy/add",
        data: data,
      }),
  });
};

export const useDeletePolicy = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteDesignation"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/policy/delete/${data.id}`,
        data: { id: data.id },
      }),
  });
};

// export const useCreateEvent = () => {
//   return useMutation<ApiResponseType<EventType>, any, EventType>({
//     mutationKey: ["createEvents"],
//     mutationFn: (data: EventType) =>
//       Post<EventType, ApiResponseType<EventType>>({
//         url: "/client_api/event/add",
//         data: data,
//       }),
//   });
// }
