import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";

export const useCreateEmployee = () => {
  return useMutation<ApiResponseType<any>, any, any>({
    mutationKey: ["createEmployee"],
    mutationFn: (data: any) =>
      Post<any, ApiResponseType<any>>({
        url: "/client_api/employee/add",
        data: data,
      }),
  });
};

export const useGetInvoices = () => {
  return useFetcher<ApiResponseType<any[]>>(
    "employee",
    null,
    "/client_api/employee",
  );
};

export const useGetSingleActivity = (id: string) => {
  return useFetcher<ApiResponseType<any>>(
    ["singleEmployee", id],
    null,
    `/client_api/employee/${id}`,
  );
};
