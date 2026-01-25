import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";

export type EventType = {
  _id?: string;
  name: string;
  type: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  location: string;
};

export const useCreateEvent = () => {
  return useMutation<ApiResponseType<EventType>, any, EventType>({
    mutationKey: ["createEvents"],
    mutationFn: (data: EventType) =>
      Post<EventType, ApiResponseType<EventType>>({
        url: "/client_api/event/add",
        data: data,
      }),
  });
};

export const useGetEvents = () => {
  return useFetcher<ApiResponseType<EventType[]>>(
    "events",
    null,
    "/client_api/event",
  );
};
