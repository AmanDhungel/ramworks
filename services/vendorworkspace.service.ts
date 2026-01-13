import { useFetcher } from "@/lib/generic.service";
import { useSearchParams } from "next/navigation";
import { ApiResponseType } from "./apitypes";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";

export type VendorWorkspaceType = {
  createdAt: string;
  domain: string;
  labelColor: string;
  logo: string;
  name: string;
  updatedAt: string;
  _id?: string;
};
export const useGetVendorWorkspace = () => {
  const params = useSearchParams();
  const id = params.get("id");
  return useFetcher<ApiResponseType<VendorWorkspaceType[]>>(
    "vendorworkspace",
    null,
    `/client_api/workspace/vendor_workspaces/${id}`
  );
};

export const useGetVendorWorkspaceForRAM = ({ id }: { id: string }) => {
  return useFetcher<ApiResponseType<VendorWorkspaceType[]>>(
    "vendorworkspace",
    null,
    `/client_api/workspace/vendor_workspaces/${id}`
  );
};

export const useCreateVendorWorkspace = () => {
  return useMutation<
    ApiResponseType<any>, // Response type
    any, // Error type
    FormData // The type of the argument to mutate
  >({
    mutationKey: ["workspace"],
    mutationFn: (formData: FormData) =>
      Post<FormData, ApiResponseType<VendorWorkspaceType>>({
        url: "/client_api/workspace/create_vendor_workspace",
        data: formData,
      }),
  });
};
