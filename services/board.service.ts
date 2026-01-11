import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { ActivityFormValues } from "@/components/CRM/Activities/NewActivityDialog";
import { CompanyType } from "./company.service";
import { ContactFormValues } from "./contact.service";
import { useSearchParams } from "next/navigation";

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
  return useMutation<
    ApiResponseType<ActivityFormValues>,
    any,
    ActivityFormValues
  >({
    mutationKey: ["createActivity"],
    mutationFn: (data: ActivityFormValues) =>
      Post<ActivityFormValues, ApiResponseType<ActivityFormValues>>({
        url: data._id
          ? `/client_api/activity/edit/${data._id}`
          : "/client_api/activity/add",
        data: data,
      }),
  });
};

export const useGetBoard = () => {
  return useFetcher<ApiResponseType<ActivityType[]>>(
    "activity",
    null,
    "/client_api/activity"
  );
};

export const useGetSingleActivity = (id: string) => {
  return useFetcher<ApiResponseType<ActivityType>>(
    ["singleActivity", id],
    null,
    `/client_api/activity/${id}`
  );
};
