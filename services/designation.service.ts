import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { useParams } from "next/navigation";

export type DesignationType = {
  _id?: string;
  name: string;
  status: "active" | "inactive";
  department: string;
  no_of_employees: number;
};

export const useGetDesignation = () => {
  return useFetcher<ApiResponseType<DesignationType[]>>(
    "designation",
    null,
    "/client_api/designation",
  );
};

export const useCreateDesignation = () => {
  return useMutation<ApiResponseType<DesignationType>, any, DesignationType>({
    mutationKey: ["createDesignation"],
    mutationFn: (data: DesignationType) =>
      Post<DesignationType, ApiResponseType<DesignationType>>({
        url: data._id
          ? `/client_api/designation/edit/${data._id}`
          : "/client_api/designation/add",
        data: data,
      }),
  });
};

export const useDeleteDesignation = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteDesignation"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/designation/delete/${data.id}`,
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
