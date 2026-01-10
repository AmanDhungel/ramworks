import { useFetcher, useMutator } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { WorkSpaceFormValues } from "@/components/DomainWorkspace/CreateDomainWorkspaceDialog";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";

export const useCreateWorkspace = () => {
  return useMutation<
    ApiResponseType<WorkSpaceFormValues>, // Response type
    any, // Error type
    FormData // The type of the argument to mutate
  >({
    mutationKey: ["create-workspace"],
    mutationFn: (formData: FormData) =>
      Post<FormData, ApiResponseType<WorkSpaceFormValues>>({
        url: "/client_api/workspace/create_domain_workspace",
        data: formData,
      }),
  });
};

export const useGetWorkspace = () => {
  return useFetcher<ApiResponseType<WorkSpaceFormValues>>(
    "workspace",
    null,
    "/client_api/workspace"
  );
};
