import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { EmployeeType } from "./employee.service";
import { DesignationType } from "./designation.service";
import { PromotionFormValues } from "@/components/HRM/Promotion/AddPromotionList";

export type PromotionType = {
  _id?: string;
  promotion_for: EmployeeType;
  promotion_from: DesignationType;
  promotion_to: DesignationType;
  promotion_date: string;
};

export const useCreatePromotion = () => {
  return useMutation<
    ApiResponseType<PromotionFormValues>,
    any,
    PromotionFormValues
  >({
    mutationKey: ["createPromotion"],
    mutationFn: (data: PromotionFormValues) =>
      Post<PromotionFormValues, ApiResponseType<PromotionFormValues>>({
        url: `/client_api/promotion/add_promotion`,
        data: data,
      }),
  });
};

export const useGetPromotion = () => {
  return useFetcher<ApiResponseType<PromotionType[]>>(
    "promotion",
    null,
    `/client_api/promotion`,
  );
};

export const useGetSinglePromotion = ({ id }: { id: string }) => {
  return useFetcher<ApiResponseType<PromotionType>>(
    ["singlePromotion", id],
    null,
    `/client_api/promotion/${id}`,
  );
};

export const useDeletePromotion = () => {
  return useMutation<ApiResponseType<{ id: string }>, any, { id: string }>({
    mutationKey: ["deletePromotion"],
    mutationFn: (data: { id: string }) =>
      Post<{ id: string }, ApiResponseType<{ id: string }>>({
        url: `/client_api/promotion/delete/${data.id}`,
        data: { id: data.id },
      }),
  });
};
