import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";

export type DepartmentType = {
  _id?: string;
  name: string;
  status: "active" | "inactive";
};

export const useGetDepartment = () => {
  return useFetcher<ApiResponseType<DepartmentType[]>>(
    "department",
    null,
    "/client_api/department",
  );
};

export const useCreateDepartment = () => {
  return useMutation<ApiResponseType<DepartmentType>, any, DepartmentType>({
    mutationKey: ["createDepartment"],
    mutationFn: (data: DepartmentType) =>
      Post<DepartmentType, ApiResponseType<DepartmentType>>({
        url: "/client_api/department/add",
        data: data,
      }),
  });
};

export const useDeleteDepartment = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteDepartment"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/department/delete/${data.id}`,
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
