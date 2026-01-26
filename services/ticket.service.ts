import { useFetcher } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { DepartmentType } from "./departments.service";

export type TicketType = {
  _id?: string;
  title: string;
  event_category: "water_leakage" | "new_project" | "electricity_problem";
  subject: string;
  assigned_to: string[];
  description?: string;
  due_date: string;
  expected_closing_date: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
};

export const useGetTicket = () => {
  return useFetcher<ApiResponseType<TicketType[]>>(
    "ticket",
    null,
    "/client_api/ticket",
  );
};

export const useCreateTicket = () => {
  return useMutation<ApiResponseType<TicketType>, any, TicketType>({
    mutationKey: ["createticket"],
    mutationFn: (data: TicketType) =>
      Post<TicketType, ApiResponseType<TicketType>>({
        url: data._id
          ? `/client_api/ticket/edit/${data._id}`
          : "/client_api/ticket/add",
        data: data,
      }),
  });
};

export const useDeleteTicket = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteticket"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/ticket/delete/${data.id}`,
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
