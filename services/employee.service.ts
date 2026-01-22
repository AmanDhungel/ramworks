import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { CompanyType } from "./company.service";

export type EmployeeType = {
  _id: string;
  employee_id: string;
  name: string;
  join_date: string;
  email: string;
  phone: string;
  company: CompanyType;
  about: string;
  createdAt: string;
  updatedAt: string;
};

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

export const useGetEmployee = () => {
  return useFetcher<ApiResponseType<EmployeeType[]>>(
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
