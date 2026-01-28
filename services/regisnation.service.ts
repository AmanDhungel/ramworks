import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { EmployeeType } from "./employee.service";
import { DesignationType } from "./designation.service";
import { PromotionFormValues } from "@/components/HRM/Promotion/AddPromotionList";
import { ResignationFormValues } from "@/components/HRM/Resignation/AddResignation";

export type RegisnationType = {
  _id?: string;
  resigning_employee: EmployeeType;
  notice_date: string;
  resignation_date: string;
  reason: string;
};

export const useCreateRegisnation = () => {
  return useMutation<
    ApiResponseType<ResignationFormValues>,
    any,
    ResignationFormValues
  >({
    mutationKey: ["createResignation"],
    mutationFn: (data: ResignationFormValues) =>
      Post<ResignationFormValues, ApiResponseType<ResignationFormValues>>({
        url: `/client_api/resignation/add`,
        data: data,
      }),
  });
};

export const useGetResignation = () => {
  return useFetcher<ApiResponseType<RegisnationType[]>>(
    "resignation",
    null,
    `/client_api/resignation`,
  );
};

export const useGetSingleRegisnation = ({ id }: { id: string }) => {
  return useFetcher<ApiResponseType<RegisnationType>>(
    ["singleResignation", id],
    null,
    `/client_api/resignation/${id}`,
  );
};

export const useDeleteRegisnation = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deleteRegisnation"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/resignation/delete/${data.id}`,
        data: { id: data.id },
      }),
  });
};
