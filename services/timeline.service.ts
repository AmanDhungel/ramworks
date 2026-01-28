import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { TicketType } from "./ticket.service";
import { useFetcher } from "@/lib/generic.service";

export type CreateTimelineFormData = {
  _id: string;
  board: string;
  task_list: string;
  task: string;
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "canceled";
  date: string;
  members: string[];
  description: string;
  attachments: string[];
};

export const useCreateTimeLine = () => {
  return useMutation<ApiResponseType<FormData>, any, FormData>({
    mutationKey: ["createTimeline"],
    mutationFn: (data: FormData) =>
      Post<FormData, ApiResponseType<FormData>>({
        url: `/client_api/timeline/create_timeline`,
        data: data,
      }),
  });
};

export const useGetTimeLine = ({
  board_id,
  task_list_id,
  task_id,
}: {
  board_id: string;
  task_list_id: string;
  task_id: string;
}) => {
  return useFetcher<ApiResponseType<CreateTimelineFormData[]>>(
    "timeline",
    null,
    `/client_api/timeline/board_timelines/${board_id}/${task_list_id}/${task_id}`,
  );
};
